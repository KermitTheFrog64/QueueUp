import Router from 'koa-router'
import TaskController from './tasks.controller'

const taskRouter: Router = new Router({
    prefix: '/tasks'
})

const taskController = new TaskController()

taskRouter.post('/:id', taskController.createTask)
taskRouter.get('/:id', taskController.getCurrentTask)
taskRouter.put('/:id', taskController.updateTask)
taskRouter.put('/:projectId/reorderInColumn', taskController.reorderTasksInColumn)
taskRouter.put('/:taskId/reorderBetweenColumn', taskController.reorderTasksBetweenColumn)
taskRouter.delete('/:projectId/endedTasks', taskController.deleteEndedTasks)
taskRouter.delete('/:id', taskController.deleteTaskById)

export default taskRouter