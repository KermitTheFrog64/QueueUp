import { useState } from "react"
import { LogIn, SignUp } from "."
import './authorization.scss'
import { Layout } from "../../5_shared/ui/layout/Layout"


const Authorization: React.FC = () => {

    const [form, setForm] = useState<string>("login")

    const onLoginClick = () => setForm("login")

    const onSignupClick = () => setForm("signup")

    return (
        <Layout overlay centered className="auth-background">
            <div className="form-container">
                <div className="form-content">
                    {form === 'login'
                        ? <LogIn onSignupClick={onSignupClick} />
                        : <SignUp onLoginClick={onLoginClick} />}
                </div>
            </div>
        </Layout>
    )
}

export default Authorization