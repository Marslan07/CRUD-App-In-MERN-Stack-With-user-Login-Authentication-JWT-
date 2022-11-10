import express from "express"
import { addUser ,getUsers,getUser,updateUser,deleteUser,loginUser,getrefreshToken } from "../contoller/user-controller.js";
import { decrypted } from "../Request_transition/Decrypted.js";
import { encrypted } from "../Request_transition/Encrypted.js";
import { verifyUser } from "../Token/verifyToken.js";

const router=express.Router();

router.get('/all',verifyUser, getUsers,encrypted)
router.post('/useradded/add',decrypted,verifyUser,addUser,encrypted)
router.post('/get/:id',verifyUser, getUser,encrypted)
router.post('/update/:id',decrypted,verifyUser, updateUser,encrypted)
router.delete('/delete/:id',decrypted,verifyUser, deleteUser,encrypted)
router.post('/userlogin', loginUser)
router.post('/refreshToken',decrypted,getrefreshToken,encrypted)

export default router