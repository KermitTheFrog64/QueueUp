import { useNavigate } from 'react-router-dom'
import './error.scss'

interface ErrorPayload {
    name: string
}

const Error: React.FC<ErrorPayload> = ({ name }) => {

    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/')
    }
    return (
        <div>
            {name}
            <span className="material-symbols-outlined" onClick={handleHomeClick} >
                home
            </span>
        </div>
    )
}

export default Error