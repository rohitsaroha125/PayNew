import express from "express";
import userControllers from "../controllers/userControllers.js";
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello New")
})

router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)
router.put('/',authMiddleware, userControllers.updateProfile)
router.get('/bulk', authMiddleware, userControllers.filterUsers)

export default router