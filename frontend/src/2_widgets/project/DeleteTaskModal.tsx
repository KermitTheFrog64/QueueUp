import Button from "../../5_shared/ui/Button"
import { Modal } from "../../5_shared/ui/modal"

interface DeleteTaskModalProps {
    setIsModalOpen: (b: boolean) => void
    onCancelClick: () => void
    onDeleteClick: (e: React.MouseEvent) => void
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ setIsModalOpen, onCancelClick, onDeleteClick }) => {

    return (
        <Modal name="Delete task?" setIsModalOpen={setIsModalOpen} >
            <div className="button-container" >
                <Button onClick={onCancelClick} >Cancel</Button>
                <Button onClick={onDeleteClick} >Delete</Button>
            </div>
        </Modal>
    )
}

export default DeleteTaskModal