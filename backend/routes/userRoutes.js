import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello New")
})

router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)

export default router