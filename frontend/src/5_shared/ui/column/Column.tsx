import { ReactNode } from "react"
import './column.scss'

interface ColumnProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: ReactNode
    color: string
}

const Column: React.FC<ColumnProps> = ({ children, color }) => {

    const classList = ['column', color]

    return (
        <div className={classList.join(' ')}>
            {children}
        </div>
    )
}

export default Column