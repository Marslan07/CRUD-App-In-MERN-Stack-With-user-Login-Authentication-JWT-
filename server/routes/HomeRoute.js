import express from "express";
import mongoose from "mongoose";
import { addUser ,getUsers,getUser,updateUser,deleteUser,loginUser } from "../contoller/user-controller.js";
import UserRoute from "../routes/UserRoute.js"
 
const router=express.Router();

router.route('/user', UserRoute)

export default router