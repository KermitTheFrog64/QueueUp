import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../5_shared/hooks/redux"
import { addSubtask, fetchSubtasks, getSubtasks } from "./subtask-slice"
import './subtasks.scss'
import '../../4_entities/task/task.scss'
import { Icon } from "../../5_shared/ui/icons"
import Input from "../../5_shared/ui/input/Input"
import Subtask from "./Subtask"

interface TaskSubtasksProps {
    id: number
}

const TaskSubtasks: React.FC<TaskSubtasksProps> = ({ id }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSubtasks(id))
    }, [])

    const subtasks = useAppSelector(getSubtasks)

    const sortedSubtasks = [...subtasks].sort((a, b) => {
        return Number(a.isEnded) - Number(b.isEnded)
    })

    const [inputValue, setInputValue] = useState<string>('')

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value)
    }

    const handleAddClick = () => {
        dispatch(addSubtask({ taskId: id, name: inputValue }))
        setInputValue('')
    }

    const onEnterDown = (event: any) => {
        if (event.key === 'Enter') {
            handleAddClick()
        }
    }

    if (!sortedSubtasks) return

    return (
        <>
            <div className="task-content" >Subtasks:</div>

            <ul>
                {sortedSubtasks.map((item) => <li
                    key={item.id}
                    className="li"
                >
                    <Subtask item={item} />
                </li>)}
            </ul>

            <Input
                type="text"
                placeholder="Add subtask"
                value={inputValue}
                onChange={handleInputChange}
                startButton={<Icon name="add" size={24} onClick={handleAddClick} />}
                onKeyDown={onEnterDown}
            />

        </>
    )
}

export default TaskSubtasks