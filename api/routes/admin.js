import express from "express";
const router=express.Router();
import { getOneRoom,adminLogin,adminDetails,findUser,getStatus,getRoomData,propertyApprove,getProperties,getPropertystatus,propertyReject} from "../controller/adminController.js";
import { adminJwt, vendorJWT } from "../middleware/auth.js";



router.post('/adminSignin',adminLogin)
router.get('/adminData',adminJwt,adminDetails)
router.get('/userDetails',findUser)
router.post('/userStatus',getStatus)
router.get('/roomDetails',adminJwt,getRoomData)
router.post('/propertyApprovel',propertyApprove)
router.post('/propertyReject',propertyReject)
router.get('/getoneroom/:roomId',getOneRoom)
router.get('/getProperties',adminJwt,getProperties)
router.post('/getPropertyStatus',getPropertystatus)


export default router;