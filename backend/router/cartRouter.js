import express from "express"
import { addToCart, cartItemList, deleteToCart, updateToCart } from "../controller/cartController.js";
import { authenticate } from "../middleware/auth.js";

const cartRouter=express.Router();

 cartRouter.post("/add-cart",authenticate,addToCart);
 cartRouter.get("/list-cart",authenticate,cartItemList);
 cartRouter.put("/update-cart",authenticate,updateToCart);
 cartRouter.delete("/delete-cart",authenticate,deleteToCart);



 export default cartRouter;