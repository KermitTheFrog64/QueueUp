import React, { ReactNode } from "react"
import './modal.scss'
import { Icon } from "../icons"
import ReactDOM from "react-dom"

interface ModalProps {
    name: string
    children: ReactNode
    setIsModalOpen: (b: boolean) => void
    handleSubmit?: () => void
}

const Modal: React.FC<ModalProps> = ({ name, children, setIsModalOpen, handleSubmit }) => {

    const onOutsideClick = () => {
        setIsModalOpen(false)
        handleSubmit && handleSubmit()
    }

    const onButtonClick = () => {
        setIsModalOpen(false)
        handleSubmit && handleSubmit()
    }

    return ReactDOM.createPortal(
        <div>
            <div className="darkBg" onClick={onOutsideClick} />

            <div className="modal" >

                <div className="modalHeader">
                    <div className="heading" >
                        <h5>{name}</h5>
                    </div>

                    <div className="modalClose">
                        <Icon name="close" size={30} onClick={onButtonClick}/>
                    </div>
                </div>
                                                                    
                <div className="modalContent" >
                    {children}
                </div>   

            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    )
}

export default Modal