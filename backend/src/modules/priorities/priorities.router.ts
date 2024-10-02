import Router from 'koa-router'
import PriorityController from './priorities.controller'

const priorityRouter: Router = new Router({
    prefix: '/priorities'
})

const priorityController = new PriorityController()

priorityRouter.get('/', priorityController.getPriorities)

export default priorityRouter