import { useState } from "react"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import { createProject } from "./projects-slice"
import { Modal } from "../../5_shared/ui/modal"
import Input from "../../5_shared/ui/input/Input"

interface AddProjectModalProps {
  setIsModalOpen: (b: boolean) => void
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ setIsModalOpen}) => {

  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    inputValue !== '' && dispatch(createProject(inputValue))
  }

  const onEnterDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit()
      setIsModalOpen(false)
    }

  }

  return (
    <Modal name="New project" setIsModalOpen={setIsModalOpen} handleSubmit={handleSubmit} >
      <Input type="text" value={inputValue} onChange={handleChange} onKeyDown={onEnterDown} autoFocus />
    </Modal>
  )
}

export default AddProjectModal