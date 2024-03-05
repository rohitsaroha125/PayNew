import express from "express";
import accountController from "../controllers/accountControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, accountController.getBalance);
router.post("/transfer", authMiddleware, accountController.transferFunds)

export default router;
