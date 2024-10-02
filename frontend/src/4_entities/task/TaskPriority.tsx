import { useState } from "react"
import { Priority } from "../../5_shared/types"
import { useMutation } from "@tanstack/react-query"
import { updateTaskRequest } from "../../5_shared/api/taskAPI"
import './task.scss'
import { useAppDispatch } from "../../5_shared/hooks/redux"
import { updateTaskPriority } from "../../2_widgets/project/project-slice"
import PrioritySelection from "../../5_shared/ui/priority/PrioritySelection"

interface TaskPriorityProps {
    priority?: Priority | null
    id: number
}

const TaskPriority: React.FC<TaskPriorityProps> = ({ priority, id }) => {

    const dispatch = useAppDispatch()

    const { mutate } = useMutation({
        mutationFn: (priority_id: number | null) => updateTaskRequest(id, { priority_id }),
    })

    const [selectedValue, setSelectedValue] = useState<number>(priority ? priority.id : 4)

    const handlePriorityChoise = (selectedPriority: Priority) => {

        mutate(selectedPriority?.id || null, {
            onSuccess: () => {
                dispatch(updateTaskPriority({ id, priority: selectedPriority || null }));
            }
        });
    };

    return (
        <div>
            <label htmlFor="priority" className="task-content" >Priority:</label>

            <PrioritySelection
                handlePriorityChoise={handlePriorityChoise}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                width="100%"
            />
        </div>
    )
}

export default TaskPriority