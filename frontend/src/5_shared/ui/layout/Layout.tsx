import './layout.scss'

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement>, React.PropsWithChildren {
    overlay?: boolean
    centered?: boolean
}

export const Layout: React.FC<LayoutProps> = ({ centered, overlay, children, className, ...props }) => {

    const classList = ['layout']

    overlay && classList.push('overlay')
    centered && classList.push('centered')
    className && classList.push(className)

    return (
        <div className={classList.join(' ')} {...props} >
            {children}
        </div>
    )
}