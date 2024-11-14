import express from "express"
import { allOrder, placeOrder, placeOrderStripe, updateOrder, userOrder, verifyStripe } from "../controller/orderController.js";
import { authenticate } from "../middleware/auth.js";
const orderRouter=express.Router()
//admin router
orderRouter.post("/list",authenticate,allOrder)
orderRouter.post("/status",authenticate,updateOrder)

//payment router
orderRouter.post("/place",authenticate,placeOrder)
orderRouter.post("/stripe",authenticate,placeOrderStripe)

//user router
orderRouter.get("/userorders",authenticate,userOrder)

//verify payment
orderRouter.post("/verifystripe",authenticate,verifyStripe)

export default orderRouter 