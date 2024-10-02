import { getUser, logOut } from "../../../2_widgets/authorization/auth-slice"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import './app-bar.scss'
import { Link, useLocation } from "react-router-dom"
import { Icon } from "../icons"

const AppBar: React.FC = () => {

    const location = useLocation()

    const user = useAppSelector(getUser)

    const dispatch = useAppDispatch()

    const handleLogOutClick = () => {
        dispatch(logOut())
    }

    return (
        <header>
            <div className="acc-wrapper" >
                <Icon name="account_circle" size={30} color="white"/>
                <div className="user-name" >{user?.name}</div>
            </div>
            {location.pathname !== '/' && <Link to='/' className="link">
                To my projects
            </Link>}
            <div><Icon name='logout' size={30} color="white" onClick={handleLogOutClick}/></div>
        </header>
    )
}

export default AppBar