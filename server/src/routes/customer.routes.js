import express from "express"
import { customerSignin, customerSignup, getCurrentCustomer } from "../controllers/auth.controller.js";
import { placeOrder } from "../controllers/features.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();


router.post("/customer-login" , customerSignin)
router.post("/customer-signup" , customerSignup)
router.get("/place-order" ,verifyToken, placeOrder)
router.get("/current-customer" ,verifyToken, getCurrentCustomer)


export default router