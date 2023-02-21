import express from "express";
const router=express.Router();
import { adminLogin } from "../controller/adminController.js";



router.post('/adminSignin',adminLogin)

export default router;