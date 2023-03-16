import express from "express";
const router=express.Router();
import { vendorSignup,vendorLogin,vendorData,vendorCheck,addRoom,getRoomview,getvendorRoom,getEditRoom,editRoomData,delelteRoom,editProfile,createCoupon ,viewCoupons, getallBookings,deleteCoupon,getVendorId} from '../controller/vendorController.js'
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
router.post('/createCoupon',vendorJWT,createCoupon)
router.get('/viewcoupon',vendorJWT,viewCoupons)
router.get('/viewbooking',vendorJWT, getallBookings)
router.delete('/deletecoupn/:couponId',vendorJWT,deleteCoupon)
router.get('/vendors/:userId',getVendorId)


export default router;