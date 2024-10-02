import Button from "../../5_shared/ui/Button"
import { Modal } from "../../5_shared/ui/modal"
import './projects.scss'

interface DeleteProjectModalProps {
    setIsModalOpen: (b: boolean) => void
    onCancelClick: () => void
    onDeleteClick: (e: React.MouseEvent) => void
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ setIsModalOpen, onCancelClick, onDeleteClick }) => {
    return (
        <Modal name="Delete project?" setIsModalOpen={setIsModalOpen} >
            <div className="button-container" >
                <Button onClick={onCancelClick} >Cancel</Button>
                <Button onClick={onDeleteClick} >Delete</Button>
            </div>
        </Modal>
    )
}

export default DeleteProjectModal