import { Modal } from "../../5_shared/ui/modal"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { createTaskRequest } from "../../5_shared/api/projectAPI"
import { Task } from "../../5_shared/types"
import Input from "../../5_shared/ui/input/Input"

interface AddTaskModalProps {
    setIsModalOpen: (b: boolean) => void
    projectId: number
    onSave: (task: Task) => void
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({setIsModalOpen, projectId, onSave}) => {

    const [name, setName] = useState('')

    const {mutate} = useMutation({
      mutationFn: () => createTaskRequest(projectId, {name}),
      onSuccess: (data) => {
        data?.data && onSave(data.data)
      }
    })

    const handleChange = (event: any) => {
      setName(event.target.value)
    }

    const handleSubmit = () => {
      name !== '' && mutate()
    }

    const onEnterDown = (event: any) => {
      if (event.key === 'Enter') {
        handleSubmit()
        setIsModalOpen(false)
      }
    }



  return (
    <Modal name="New task" setIsModalOpen={setIsModalOpen} handleSubmit={handleSubmit} >
        <Input type="text" value={name} onChange={handleChange} onKeyDown={onEnterDown} autoFocus/>
    </Modal>
  )
}

export default AddTaskModal