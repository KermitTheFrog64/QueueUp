import { Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import * as Yup from "yup"
import { logIn } from "./auth-slice"
import { LogInPayload } from "../../5_shared/types"
import Button from "../../5_shared/ui/Button"

import './authorization.scss'
import { useState } from "react"
import { Icon } from "../../5_shared/ui/icons"
import FormInput from "../../5_shared/ui/input/FormInput"

interface LogInProps {
    onSignupClick: () => void
}

const LogIn: React.FC<LogInProps> = ({ onSignupClick }) => {

    const dispatch = useAppDispatch()

    const initialValues: LogInPayload = {
        email: '',
        password: ''
    }

    const onSubmit = (values: LogInPayload) => {
        dispatch(logIn(values))

    }

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="form-container" >
            <h3 className="form-header" >Log In</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email: Yup.string().required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>

                        <Field
                            name="email"
                            autoFocus={true}
                            component={FormInput}
                            type='email'
                            placeholder="E-mail"
                            className={touched.email && errors.email ? 'error-field' : null}

                        />
                        {touched.email && errors.email && <div className="error">{errors.email}</div>}

                        <Field
                            name="password"
                            component={FormInput}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            end={
                                showPassword === true
                                    ? <Icon name="visibility" onClick={toggleShowPassword} size={24} />
                                    : <Icon name="visibility_off" onClick={toggleShowPassword} size={24} />
                            }
                            className={touched.password && errors.password ? 'error-field' : null}
                        />
                        {touched.password && errors.password && <div className="error">{errors.password}</div>}


                        <Button type="submit" className="authorization-button" >
                            Log in
                        </Button>

                    </Form>
                )}
            </Formik>
            <div className="login-signup" >
                <span className="text"> Not a member?
                    <a href="#" className="text signup-link" onClick={onSignupClick}>Sign Up Now</a>
                </span>
            </div>
        </div>
    )
}

export default LogIn