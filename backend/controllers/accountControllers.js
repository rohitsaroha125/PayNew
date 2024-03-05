import Account from "../models/account.js"
import ErrorObject from "../utils/ErrorObject.js"
import mongoose from "mongoose"

const accountController = {}

accountController.getBalance = async(req, res, next) => {
    try{
        const balanceData = await Account.findOne({userId: req.userId})
        if (!balanceData) {
            throw new Error('No Balance found for account')
        }

        res.status(200).json({
            status: 'ok',
            data: {
                balance: balanceData.balance
            }
        })
    }catch(err){
        next(new ErrorObject(401,'fail', err))
    }
}

accountController.transferFunds = async(req, res, next) => {
    try{
        const session = await mongoose.startSession()

        session.startTransaction()

        const {to, amount} = req.body

        const fromUser = await Account.findOne({userId: req.userId}).session(session)
        if (!fromUser || fromUser.balance < amount) {
            await session.abortTransaction()
            throw new Error('Insufficient Balance')
        }

        const toUser = await Account.findOne({userId: to}).session(session)

        if (!toUser) {
            throw new Error('Account not found')
        }

        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session)

        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session)

        await session.commitTransaction()

        res.status(200).json({
            status: 'ok',
            message: 'Amount Sent'
        })

    }catch(err){
        next(new ErrorObject(401, 'fail', err))
    }
}

export default accountController