import express from "express"
import { getCurrentShopUser, shopLogin, shopSignup } from "../controllers/auth.controller.js";
import { deleteOrder, updateOrderStatus } from "../controllers/features.controller.js";
import { verifyToken } from "../utils/verifyUser.js";



const router = express.Router();


router.post("/shop-login" , shopLogin)
router.post("/shop-signup" , shopSignup)
router.get("/current-shop" ,verifyToken, getCurrentShopUser)
router.post("/update-order" ,verifyToken, updateOrderStatus)
router.post("/delete-order" ,verifyToken, deleteOrder)



export default router