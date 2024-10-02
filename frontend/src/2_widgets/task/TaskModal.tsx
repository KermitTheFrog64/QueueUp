import { Modal } from "../../5_shared/ui/modal"
import { TaskData } from "."
import { useQuery } from "@tanstack/react-query"
import { fetchCurrentTaskRequest } from "../../5_shared/api/taskAPI"

interface TaskModalProps {
    setIsModalOpen: (b: boolean) => void
    taskId: number
}

const TaskModal: React.FC<TaskModalProps> = ({ setIsModalOpen, taskId }) => {

    const {data} = useQuery({
        queryFn: () => fetchCurrentTaskRequest(taskId),
        queryKey: ['tasks', taskId],
        gcTime: 0
    })

    if (!data?.data) return

    return (
        <Modal name="Task's details" setIsModalOpen={setIsModalOpen} >
            <TaskData task={data.data}/>
        </Modal>

    )
}

export default TaskModal