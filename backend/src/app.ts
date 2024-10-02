import 'dotenv/config'
import Koa, { Context, Next } from 'koa'
import { DefaultState, DefaultContext } from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'


import { AppDataSource } from './data-source'
import taskRouter from './modules/tasks/tasks.router'
import projectRouter from './modules/projects/projects.router'
import subtaskRouter from './modules/subtasks/subtask.router'
import priorityRouter from './modules/priorities/priorities.router'
import userRouter from './modules/users/users.router'

const cors = require('@koa/cors');

const app: Koa<DefaultState, DefaultContext> = new Koa()

app.use(bodyParser())

//app.use(cors())

app.use(async (ctx: Context, next: Next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  await next()
})

const router: Router = new Router({
  prefix: '/api',
})

router
  .use(subtaskRouter.routes())
  .use(subtaskRouter.allowedMethods())

router
  .use(priorityRouter.routes())
  .use(priorityRouter.allowedMethods())

router
  .use(projectRouter.routes())
  .use(projectRouter.allowedMethods())

router
  .use(taskRouter.routes())
  .use(taskRouter.allowedMethods())

router
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())

app
  .use(router.routes())
  .use(router.allowedMethods())

const port = 3001

AppDataSource.initialize()
  .then(async () => {
    app
      .listen(port)
      .on('listening', () => {
        console.log(`Server is running on port ${port}`);
      })
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })