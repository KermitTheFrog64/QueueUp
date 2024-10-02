import { TaskDateTime, TaskDescription, TaskHeader, TaskPriority } from "../../4_entities/task"
import { TaskSubtasks } from "../subtasks"
import { Task } from "../../5_shared/types"
import './task-modal.scss'

interface TaskProps {
    task: Task
}

const TaskData: React.FC<TaskProps> = ({ task }) => {
    return (
        <div className="flex flex-column flex-gap-15 overflow" >
            <TaskHeader name={task.name} id={task.id} />

            <TaskDescription description={task.description} id={task.id} />

            <TaskDateTime
                date_created={task.dateCreated}
                time_in_progress={task.timeInProgress}
                date_completed={task.dateCompleted}
                status={task.status}
            />

            <TaskPriority priority={task.priority} id={task.id} />

            {/* <TaskFiles /> */}

            <TaskSubtasks id={task.id} />

            {/* <TaskComments /> */}
        </div>
    )
}

export default TaskData