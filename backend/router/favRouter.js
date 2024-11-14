import express from "express"
import { authenticate } from "../middleware/auth.js";
import { addToFavorite, deleteToFavorite, listFavorite } from "../controller/favController.js";

const favRouter=express.Router();


favRouter.post("/add-fav",authenticate,addToFavorite);
favRouter.get("/list-fav",authenticate,listFavorite);
favRouter.delete("/delete-fav",authenticate,deleteToFavorite);


 export default favRouter;