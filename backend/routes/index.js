import userRoutes from "./userRoutes.js";
import express from "express";

const router = express.Router()

router.use('/user', userRoutes)

export default router