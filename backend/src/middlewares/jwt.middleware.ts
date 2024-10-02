import { Context, Next } from "koa"
import * as jwt from 'jsonwebtoken'

const jwtMiddleware = async (ctx: Context, next: Next) => {
    const auth = ctx.headers.authorization
    if (auth) {
        const [type, access_token] = auth.split(' ')
        if (access_token && type === 'Bearer') {
            const payload = jwt.verify(access_token, process.env.JWT_SECRET_KEY)
            if (typeof payload === 'object' && payload !== null) {
                if (payload.id) {
                    ctx.state.user = payload
                    ctx.state.access_token = access_token                    
                    await next()
                }
            }
        }
    }
}



export default jwtMiddleware