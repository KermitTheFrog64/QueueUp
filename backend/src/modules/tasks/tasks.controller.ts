import { Context, Next } from "koa"
import TasksService from "./tasks.service"
import { UpdateTaskPayload } from "./dto/update-task.dto"

interface CreateTaskPayload {
    name: string
}

interface reorderProjectTasks2Payload {
    statusName: string
}

class TaskController {

    async getCurrentTask(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { id } = ctx.params
        ctx.body = await tasksService.getCurrentTask(Number(id))
        await next()
    }

    async updateTask(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { id } = ctx.params
        ctx.body = await tasksService.updateTask(id, ctx.request.body as UpdateTaskPayload)
        await next()
    }

    async reorderTasksInColumn(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { id } = ctx.params
        const idArray = ctx.request.body as number[]
        ctx.body = await tasksService.reorderTasksInColumn(id, idArray)
        await next()
    }

    async reorderTasksBetweenColumn(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { taskId } = ctx.params
        const { statusName } = ctx.request.body as reorderProjectTasks2Payload
        ctx.body = await tasksService.reorderTasksBetweenColumn(taskId, statusName)
        await next()
    }

    async deleteEndedTasks(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { projectId } = ctx.params
        ctx.body = await tasksService.deleteEndedTasks(projectId)
        await next()
    }

    async createTask(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { id } = ctx.params
        const { name } = ctx.request.body as CreateTaskPayload
        ctx.body = await tasksService.createTask(id, name)
        await next()
    }

    async deleteTaskById(ctx: Context, next: Next) {
        const tasksService = new TasksService()
        const { id } = ctx.params
        ctx.body = await tasksService.deleteTaskById(id)
        await next()
    }

}

export default TaskController