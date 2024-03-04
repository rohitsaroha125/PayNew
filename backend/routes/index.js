import userRoutes from "./userRoutes.js";
import accountRoutes from './accountRoutes.js'
import express from "express";

const router = express.Router()

router.use('/user', userRoutes)
router.use('/account', accountRoutes)

export default router