import express from "express";
const router=express.Router();
import { vendorSignup,vendorLogin,vendorData,vendorCheck } from '../controller/vendorController.js'
import { vendorJWT } from "../middleware/auth.js";


//vendor authentication route
router.post('/vendorCheck',vendorCheck)
router.post('/vendorSignup',vendorSignup)
router.post('/vendorLogin',vendorLogin)
router.get('/vendorData', vendorJWT,vendorData)

export default router;