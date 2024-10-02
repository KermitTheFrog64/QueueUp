import { Context, Next } from "koa"
import SubtasksService from "./subtasks.service"
import { log } from "console"

interface addSubtaskPayload {
    name: string
}

interface updateSubtaskPayload {
    name: string
}

class SubtaskController {

    async getSubtasks(ctx: Context, next: Next) {
        const subtasksService = new SubtasksService()
        const { taskId } = ctx.params
        ctx.body = await subtasksService.getSubtasks(taskId)
        await next()
    }

    async toggleSubtask(ctx: Context, next: Next) {
        const subtasksService = new SubtasksService()
        const { subtaskId } = ctx.params    
        ctx.body = await subtasksService.toggleSubtask(subtaskId)
        ctx.body = {subtaskId}
        await next()
    }

    async addSubtask(ctx: Context, next: Next) {
        const subtasksService = new SubtasksService()
        const { taskId } = ctx.params
        const { name } = ctx.request.body as addSubtaskPayload
        ctx.body = await subtasksService.addSubtask(taskId, name)
        await next()
    }

    async deleteSubtask(ctx: Context, next: Next) {
        const subtasksService = new SubtasksService()
        const { id } = ctx.params    
        ctx.body = await subtasksService.deleteSubtask(Number(id))
        await next()
    }

    async updateSubtask (ctx: Context, next: Next) {
        const SubtaskService = new SubtasksService()      
        const { id } = ctx.params
        const { name } = ctx.request.body as updateSubtaskPayload        
        ctx.body = await SubtaskService.updateSubtask(id, name)
        await next()
    }
}

export default SubtaskController