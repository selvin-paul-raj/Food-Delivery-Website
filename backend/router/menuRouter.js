import express from "express"
import { addMenu, listmenu, removemenu, singlemenu, updateMenu } from "../controller/menuController.js";
import upload from "../middleware/multer.js";
import { authenticate, restrict } from "../middleware/auth.js";


const menuRouter=express.Router();

 menuRouter.post("/add-menu",authenticate,restrict('admin'),upload.single('photo'),addMenu);
 menuRouter.get("/all-menu",listmenu);
 menuRouter.put("/update-menu/:id",authenticate,restrict('admin'),upload.single('photo'),updateMenu);
 menuRouter.delete("/delete-menu/:id",authenticate,restrict('admin'),removemenu);



 export default menuRouter;