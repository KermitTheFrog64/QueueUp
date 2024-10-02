import { LogInPayload, LogInResponse, SignUpPayload, SignUpResponse, User } from "../types"
import { fetchData } from "."

export const logInRequest = (payload: LogInPayload) => {
    return fetchData<LogInPayload, LogInResponse>({
        path: '/users/login', method: 'POST', payload
    })
}

export const signUpRequest = (payload: SignUpPayload) => {
    return fetchData<SignUpPayload, SignUpResponse>({
        path: '/users/signup', method: 'POST', payload
    })
}

export const isAuthenticatedRequest = () => {
    return fetchData<unknown, User>({
        path: '/users/user', method: 'GET'
    })
}