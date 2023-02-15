import express from "express";
const router=express.Router();
import {  SignupValidate,singninValidate,userDataFetch,userCheck } from "../controller/userController.js";
import { verifyJWT } from "../middleware/auth.js";




//user authentication route
router.post('/user_check',userCheck)
router.post('/user_signup',SignupValidate)
router.get('/user_data',verifyJWT,userDataFetch)
router.post('/user_signin',singninValidate)


export default router;