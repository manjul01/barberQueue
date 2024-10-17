import express from "express"
import { getAcceptedOrders, getHoldOrders, getOrderStatus, getPendingOrders } from "../controllers/features.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { logout } from "../controllers/auth.controller.js"


const router = express.Router()

router.get("/pending-orders" ,verifyToken, getPendingOrders)
router.get("/accepted-orders" ,verifyToken, getAcceptedOrders)
router.get("/hold-orders" ,verifyToken, getHoldOrders)
router.get("/current-order" ,verifyToken, getOrderStatus)
router.get("/logout" , verifyToken , logout)

export default router