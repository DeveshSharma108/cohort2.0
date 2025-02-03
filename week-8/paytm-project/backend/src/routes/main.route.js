import { Router} from "express";
import accountRouter from "./account.routes.js";
import userRouter from "./user.routes.js";
const mainRouter = Router()
mainRouter.use('/user',userRouter)
mainRouter.use('/account',accountRouter)
export default mainRouter

