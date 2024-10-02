import { Context, Next } from "koa"
import ProjectsService from "./projects.service"

interface createProjectPayload {
    name: string
}

interface updateProjectPayload {
    name: string
}

class ProjectController {

    async getProjects (ctx: Context, next: Next) {
        const projectService = new ProjectsService()
        const userId = ctx.state.user.id
        ctx.body = await projectService.getProjects(userId)
        await next()
    }

    async createProject (ctx: Context, next: Next) {
        const projectService = new ProjectsService()
        const id = ctx.state.user.id
        const { name } = ctx.request.body as createProjectPayload
        ctx.body = await projectService.createProject(id, name)
        await next()
    }

    async getProjectById (ctx: Context, next: Next) {
        const projectService = new ProjectsService()
        const {projectId} = ctx.params
        const userId = ctx.state.user.id
        ctx.body = await projectService.getProjectById(projectId, userId)
        await next()
    }

    async deleteProject(ctx: Context, next: Next) {
        const projectService = new ProjectsService()
        const { id } = ctx.params        
        ctx.body = await projectService.deleteProject(id)
        await next()
    }

    async updateProjectName (ctx: Context, next: Next) {
        const projectsService = new ProjectsService()      
        const { id } = ctx.params
        const { name } = ctx.request.body as updateProjectPayload        
        ctx.body = await projectsService.updateProjectName(id, name)
        await next()
    }
}

export default ProjectController