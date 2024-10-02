import './input.scss'
import '../../../3_features/search.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startButton?: React.ReactNode
    children?: React.ReactNode
    
}

const Input: React.FC<InputProps> = ({startButton, children, ...props}) => {

    const classList = ['castom-input', props.className].join(' ')

    return (
        <div className={classList}>
            {startButton}
            {children ? children : <input {...props} />}
        </div>
    )
}

export default Input