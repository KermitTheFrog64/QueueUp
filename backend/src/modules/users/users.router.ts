import Router from "koa-router";
import UserController from "./users.controller";
import jwtMiddleware from "../../middlewares/jwt.middleware";

const userRouter: Router = new Router({
    prefix: '/users'
})

const userController = new UserController()

userRouter.post('/login', userController.logIn)
userRouter.post('/signup', userController.signUp)
userRouter.get('/user', jwtMiddleware, userController.User)


export default userRouter