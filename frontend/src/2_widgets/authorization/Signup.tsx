import { Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../5_shared/hooks/redux"

import * as Yup from "yup"
import YupPassword from 'yup-password'
import { SignUpPayload } from "../../5_shared/types"
import { signUp } from "./auth-slice"
import Button from "../../5_shared/ui/Button"
YupPassword(Yup)

import './authorization.scss'
import { Icon } from "../../5_shared/ui/icons"
import { useState } from "react"
import FormInput from "../../5_shared/ui/input/FormInput"

interface SignUpProps {
    onLoginClick: () => void
}

const SignUp: React.FC<SignUpProps> = ({ onLoginClick }) => {

    let email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/

    const dispatch = useAppDispatch()

    const initialValues: SignUpPayload = {
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    const onSubmit = (values: SignUpPayload) => {
        dispatch(signUp(values))
    }

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)

    const toggleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation)
    }

    return (
        <div className="form-container" >
            <h3 className="form-header" >Sign Up</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(40, 'The name must not exceed 40 characters')
                        .required('Required'),
                    phoneNumber: Yup.string()
                        .max(11, 'The phone number must not exceed 11 characters')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .matches(email_regx, 'Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'The password must not be less than 8 characters')
                        .minLowercase(1, 'Password must contain at least 1 lowercase letter')
                        .minUppercase(1, 'Password must contain at least 1 uppercase letter')
                        .minNumbers(1, 'Password must contain at least 1 digit')
                        .minSymbols(1, 'Password must contain at least 1 character')
                        .required('Required'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password')], 'Password mismatch')
                        .required('Required')
                })}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            name="name"
                            type="text"
                            placeholder="Name"
                            autoFocus={true}
                            component={FormInput}
                            className={touched.name && errors.name ? 'error-field' : ' '}

                        />
                        {touched.name && errors.name && <div className="error">{errors.name}</div>}

                        <Field
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone number"
                            component={FormInput}
                            className={touched.phoneNumber && errors.phoneNumber ? 'error-field' : ' '}

                        />
                        {touched.phoneNumber && errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

                        <Field
                            name="email"
                            type="text"
                            placeholder="E-mail"
                            component={FormInput}
                            className={touched.email && errors.email ? 'error-field' : ' '}

                        />
                        {touched.email && errors.email && <div className="error">{errors.email}</div>}

                        <div className="password-input-container">

                            <Field
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                component={FormInput}
                                end={
                                    showPassword === true
                                        ? <Icon name="visibility" onClick={toggleShowPassword} size={24} />
                                        : <Icon name="visibility_off" onClick={toggleShowPassword} size={24} />
                                }
                                className={touched.password && errors.password ? 'error-field' : ' '}
                            />
                        </div>

                        {touched.password && errors.password && <div className="error">{errors.password}</div>}

                        <div className="password-input-container">

                            <Field
                                name="passwordConfirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                placeholder="Password confirmation"
                                component={FormInput}
                                end={
                                    showPasswordConfirmation === true
                                        ? <Icon name="visibility" onClick={toggleShowPasswordConfirmation} size={24} />
                                        : <Icon name="visibility_off" onClick={toggleShowPasswordConfirmation} size={24} />
                                }
                                className={touched.passwordConfirmation && errors.passwordConfirmation ? 'error-field' : ' '}
                            />
                        </div>
                        {touched.passwordConfirmation && errors.passwordConfirmation && <div className="error">{errors.passwordConfirmation}</div>}


                        <Button type="submit" className="authorization-button" >
                            Sign up
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className="login-signup" >
                <span className="text"> Already a member? <br />
                    <a href="#" className="text login-link" onClick={onLoginClick}>Log In Now</a>
                </span>
            </div>
        </div>
    )
}

export default SignUp