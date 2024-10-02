import Router from 'koa-router'
import SubtaskController from './subtasks.controller'

const subtaskRouter: Router = new Router({
    prefix: '/subtasks'
})

const subtaskController = new SubtaskController()

subtaskRouter.get('/:taskId', subtaskController.getSubtasks)
subtaskRouter.put('/:subtaskId/toggle', subtaskController.toggleSubtask)
subtaskRouter.post('/:taskId', subtaskController.addSubtask)
subtaskRouter.delete('/:id', subtaskController.deleteSubtask)
subtaskRouter.put('/:id', subtaskController.updateSubtask)

export default subtaskRouter