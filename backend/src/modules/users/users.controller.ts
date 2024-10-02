import { Context, Next } from "koa"
import UsersService from "./users.service"

interface LogInPayload {
    email: string
    password: string
}

interface signUpPayload extends LogInPayload {
    name: string
    phoneNumber: string
}

interface UserPayload {
    access_token: string
}

class UserController {

    async logIn(ctx: Context, next: Next) {
        const usersService = new UsersService()
        const { email, password } = ctx.request.body as LogInPayload
        ctx.body = await usersService.logIn(email, password)        
        await next()
    }

    async signUp(ctx: Context, next: Next) {
        const usersService = new UsersService()
        const { email, password, name, phoneNumber } = ctx.request.body as signUpPayload
        ctx.body = await usersService.signUp(email, password, name, phoneNumber)
        await next()
    }

    async User(ctx: Context, next: Next) {
        const usersService = new UsersService()
        const access_token = ctx.state.access_token        
        ctx.body = await usersService.User(access_token)
        await next()
    }
}

export default UserController