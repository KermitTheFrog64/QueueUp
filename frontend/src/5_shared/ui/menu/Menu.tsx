import './menu.scss'

interface MenuProps extends React.PropsWithChildren {
    activator: React.ReactNode
}

const Menu: React.FC<MenuProps> = ({ activator, children }) => {
    return (
        <div className="menu" >
            <div className="activator" >
                {activator}
            </div>
            <div className="content" >
                {children}
            </div>
        </div>
    )
}

export default Menu