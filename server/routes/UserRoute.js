import express from "express"
import { addUser ,getUsers,getUser,updateUser,deleteUser,loginUser,getrefreshToken } from "../contoller/user-controller.js";
import { verifyUser } from "../Token/verifyToken.js";
// const UserRouter = require("./UserRoute.js");
// import {UserRouter} from "./UserRoute.js"
// var UserRouter = require('./UserRoute.cjs'); 
const router=express.Router();

router.get('/all',verifyUser, getUsers)
router.post('/useradded/add',verifyUser, addUser) 
router.get('/get/:id',verifyUser, getUser)
router.post('/update/:id',verifyUser, updateUser)
router.delete('/delete/:id',verifyUser, deleteUser)
router.post('/userlogin', loginUser)
router.post('/refreshToken', getrefreshToken)

export default router