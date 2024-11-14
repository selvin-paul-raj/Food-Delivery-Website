import express from "express";
import { deleteUser, getAllUser, getSingleUser, toggleUser, updateUser } from "../controller/userController.js";
import upload from '../middleware/multer.js';
import { authenticate, restrict } from "../middleware/auth.js";

// Create an instance of the router
const userRouter = express.Router();

// Update user with photo (using PUT method)
userRouter.put("/update", authenticate, upload.single('photo'), updateUser);
userRouter.get("/profile", authenticate,getSingleUser);
userRouter.get("/all-user", authenticate,restrict('admin'),getAllUser);
userRouter.delete("/delete-user/:id", authenticate,deleteUser);
userRouter.put("/update-role/:id", authenticate,restrict('admin'),toggleUser);

export default userRouter;