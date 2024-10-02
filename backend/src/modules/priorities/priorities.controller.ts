import { Context, Next } from "koa"
import PrioritiesService from "./priorities.service"

class PriorityController {

    async getPriorities(ctx: Context, next: Next) {
        const prioritiesServies = new PrioritiesService()
        ctx.body = await prioritiesServies.getPriorities()
        await next()
    }
}

export default PriorityController