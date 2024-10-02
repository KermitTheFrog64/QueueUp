import { Droppable } from "react-beautiful-dnd"
import { Task } from "../../5_shared/types"
import { TaskCard } from "../../5_shared/ui"
import Column from "../../5_shared/ui/column/Column"
import { Icon } from "../../5_shared/ui/icons"
import './tasks-column.scss'
import DoneIcon from '../../5_shared/done.svg'
import QueueIcon from '../../5_shared/queue.svg'
import DevIcon from '../../5_shared/dev.svg'

export interface TasksColumnProps {
    id: string
    name: string
    tasks?: Task[]
    handleTaskClick: (id: number) => void
    handleAddTaskClick?: () => void
    handleDeleteTasksClick?: () => void
}

type ColumnType = 'queue' | 'done' | 'dev'

const TasksColumn: React.FC<TasksColumnProps> = ({ id, name, tasks, handleTaskClick, handleAddTaskClick, handleDeleteTasksClick }) => {

    const icons = {
        queue: QueueIcon,
        dev: DevIcon,
        done: DoneIcon
    }

    return (
        <Column color={id} >
            <Droppable droppableId={id} >
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="column-content"
                    >

                        <h3 className="column-header" >

                            <div className="flex flex-align-center flex-gap-15">
                                <img src={icons[id as ColumnType]} width={25} />
                                {name}

                            </div>
                        </h3>



                        {tasks?.map((task, index) =>
                            <TaskCard
                                key={index}
                                index={index}
                                {...task}
                                handleTaskClick={handleTaskClick}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {id === 'queue' && handleAddTaskClick && <div className="add-button">
                <Icon name="add_circle" size={30} onClick={handleAddTaskClick} />
            </div>}

            {id === 'done' && handleDeleteTasksClick &&
                <div className="delete-button" >
                    <Icon name="delete_forever" size={30} onClick={handleDeleteTasksClick} />
                </div>}

        </Column>
    )
}

export default TasksColumn