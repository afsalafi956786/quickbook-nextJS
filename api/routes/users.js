import express from "express";
const router=express.Router();
import {  SignupValidate,singninValidate,userDataFetch,userCheck,userProfile,changePass,getRoomDetails,getDispalyRoom,getlocalLocation } from "../controller/userController.js";
import { verifyJWT } from "../middleware/auth.js";





router.post('/user_check',userCheck)
router.post('/user_signup',SignupValidate)
router.get('/user_data',verifyJWT,userDataFetch)
router.post('/user_signin',singninValidate)
router.patch('/editProfile',verifyJWT,userProfile)
router.patch('/editpassword',verifyJWT,changePass)
router.get('/getRoomdetails',getRoomDetails)
router.get('/getDetails/:roomId',getDispalyRoom)
router.get('/getLocation',getlocalLocation)
// router.get('/continue',getContinueBook)




export default router;