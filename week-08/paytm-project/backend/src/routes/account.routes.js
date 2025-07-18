import { Router } from "express"
import authMiddleware from "../middleware/user.middleware.js"
import { Account } from "../models/accounts.model.js"
import moneyTransferService from "../services/moneyTransfer.service.js"
const accountRouter = Router()

accountRouter.get('/balance',authMiddleware,async (req,res) => {
    try {
        // req.userId 😡😡❌❌  
        const account = await Account.findOne({userId:req.body.userId})
        console.log(req.body)
        console.log(account)
        res.status(200).json({balance:account.balance})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
})

accountRouter.post('/transfer',authMiddleware,moneyTransferService)

export default accountRouter;