import express from "express";
const router=express.Router();
import { vendorSignup,vendorLogin,vendorData,vendorCheck,addRoom,getRoomview,getvendorRoom,getEditRoom,editRoomData,delelteRoom,editProfile} from '../controller/vendorController.js'
import { vendorJWT } from "../middleware/auth.js";


//vendor authentication route
router.post('/vendorCheck',vendorCheck)
router.post('/vendorSignup',vendorSignup)
router.post('/vendorLogin',vendorLogin)
router.get('/vendorData',vendorJWT,vendorData)
//add room
router.post('/addRoom',vendorJWT,addRoom)
router.get('/getRoomview',vendorJWT,getRoomview)
router.get('/getVendorRoom/:roomId',getvendorRoom)
router.get('/getEditRoom/:editId',getEditRoom)
router.put('/editRoomDetails/:roomId',vendorJWT,editRoomData)
router.delete('/delteRoom/:roomId',vendorJWT,delelteRoom)
router.patch('/editVendorProfile',vendorJWT,editProfile)

export default router;