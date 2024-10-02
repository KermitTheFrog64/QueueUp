import Router from 'koa-router'
import ProjectController from './projects.controller'
import jwtMiddleware from '../../middlewares/jwt.middleware'

const projectRouter: Router = new Router({
    prefix: '/projects'
})

const projectController = new ProjectController()

projectRouter.use(jwtMiddleware)

projectRouter.get('/', projectController.getProjects)
projectRouter.post('/', projectController.createProject)
projectRouter.get('/:projectId', projectController.getProjectById)
projectRouter.delete('/:id', projectController.deleteProject)
projectRouter.put('/:id', projectController.updateProjectName)

export default projectRouter