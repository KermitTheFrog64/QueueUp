import './card.scss'

interface CardProps extends React.PropsWithChildren {
    shadow?: boolean
}

const Card: React.FC<CardProps> = ({children, shadow}) => {

    const classList = ['card']
    shadow && classList.push('shadow')

    return (
        <div className={classList.join(' ')} >
            {children}
        </div>
    )
}

export default Card