import { Draggable } from "react-beautiful-dnd"
import { Task } from "../../5_shared/types"
import { useMutation } from "@tanstack/react-query"
import { deleteTaskByIdRequest } from "../../5_shared/api/taskAPI"
import { updateTasks } from "../../2_widgets/project/project-slice"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import DeleteIcon from '../../5_shared/delete.svg'
import './task-card.scss'
import { useState } from "react"
import DeleteTaskModal from "../../2_widgets/project/DeleteTaskModal"

interface TaskCardProps extends Task {
    handleTaskClick: (id: number) => void
    index: number
}

const TaskCard: React.FC<TaskCardProps> = ({ id, name, index, handleTaskClick }) => {

    const dispatch = useAppDispatch()

    const { mutate } = useMutation({
        mutationFn: () => deleteTaskByIdRequest(id),
        onSuccess: () => dispatch(updateTasks(id))
    })

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        mutate()
        setIsDeleteModalOpen(false)
    }

    const handleCancelClick = () => {
        setIsDeleteModalOpen(false)
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsDeleteModalOpen(true)
    }

    return (
        <div>
            <Draggable draggableId={id.toString()} index={index} >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleTaskClick(id)}
                    >
                        <div className="container" >
                            <div className="item-1" >
                                {name}
                            </div>

                            <div className="item-2" >
                                <img src={DeleteIcon} onClick={handleClick} width="20" className="img-svg" />
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

            {isDeleteModalOpen && <DeleteTaskModal
                setIsModalOpen={setIsDeleteModalOpen}
                onCancelClick={handleCancelClick}
                onDeleteClick={handleDeleteClick}
            />}
        </div>

    )
}

export default TaskCard