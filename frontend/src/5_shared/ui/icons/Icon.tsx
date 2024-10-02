import './icon.scss'

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: string
    size?: number
    color?: string
}

const Icon: React.FC<IconProps> = ({ style, name, color, size, ...props }) => {

    const classList = ['material-symbols-outlined']

    color && classList.push('white-icons')

    return (
        <span
            className={classList.join(' ')}
            style={{
                padding: 0,
                margin: 0,
                display: 'block',
                fontSize: size ? `${size}px` : 'inherit'
            }}
            {...props}
        >
            {name}
        </span>
    )
}

export default Icon