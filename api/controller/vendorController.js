import vendorModel from "../models/vendorShema.js";
import bcrypt, { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
// import userModel from "../models/userShema.js";
import RoomModel from "../models/RoomSchem.js";
import { futimesSync } from "fs";
// import adminModel from "../models/adminShema.js";





export async function vendorCheck(req,res){
  try{
    let obj=req.body
    console.log(obj)
    let regName=/^[a-zA-Z]+$/;
    let regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let mob=/^([+]\d{2})?\d{10}$/
    if(obj.name && obj.email && obj.password && obj.confirmPass && obj.phone &&  obj.propertyName && obj.propertyLocation ){
      if(regName.test(obj.name)){
        if(regEmail.test(obj.email)){
          if(mob.test(obj.phone)){
            if(obj.password === obj.confirmPass){
              let vendor=await vendorModel.findOne({email:obj.email})
              if(!vendor){
                let mobileNumber=await vendorModel.findOne({phone:obj.phone})
               
                if( !mobileNumber){
                   res.json({'status':'success' ,'message':'approved'})
                }else{
                  res.json({'staus':'failed','message':'phone number is already registered !'})
                  
                }

              }else{
                res.json({'status':'failed','message':'email is already registered !'})
              }

            }else{
              res.json({'staus':'failed','message':'password is not matched' })
            }

          }else{
            res.json({'staus':'failed' ,'message':'Enter a valid phone number'})
            
          }

        }else{
          res.json({'status':'failed','message':'Enter a valid email'})
        }

      }else{
        res.json({'status':'failed' ,'message':'Enter a valid name'})
      }

    }else{
      res.json({'status':'failed', 'message':'All fields are required !'})
    }
   } catch(error){
    res.json({ status: "failed", message: error.message })
  }
}



export async function vendorSignup(req, res) {
  try {
    let obj = req.body;
    if (
      !obj.name &&
      obj.email &&
      obj.password &&
      obj.confirmPass &&
      obj.propertyname &&
      obj.propertylocation &&
      obj.phone
    ) {
      res.json({ status: "failed", message: "All fields are required !" });
    } else {
      let existVendor = await vendorModel.findOne({ email: obj.email });
      if (existVendor) {
        res.json({
          status: "failed",
          message: "Email is already registered !",
        });
      } else {
        const vendorDetails = obj;
        console.log(vendorDetails);
        if (vendorDetails.password == vendorDetails.confirmPass) {
          vendorDetails.password = await bcrypt.hash(
            vendorDetails.password,
            10
          );
          await vendorModel.create({
            name: vendorDetails.name,
            email: vendorDetails.email,
            password: vendorDetails.password,
            phone: vendorDetails.phone,
            propertyName: vendorDetails.propertyName,
            propertyLocation: vendorDetails.propertyLocation,
          });
          let vendorInfo = await vendorModel.findOne({
            email: vendorDetails.email,
          });
          let vendorId = vendorInfo._id;

          const token = jwt.sign({ vendorId }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
          });
          res.json({
            status: "success",
            message: "signup success",
            token: token,
          });
        } else {
          res.json({ status: "failed", message: "Password is not mathced !" });
        }
      }
    }
  } catch (error) {
    res.json({ status: "failed", message: "error.message" });
  }
}

export async function vendorLogin(req, res) {
  try {
    let obj = req.body;
    if (obj.email && obj.password) {
      let vendor = await vendorModel.findOne({ email: obj.email });
      if (vendor) {
        const isMatch = await bcrypt.compare(obj.password, vendor.password);
        if (isMatch) {
          const vendorId = vendor._id;
          const token = jwt.sign({ vendorId }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
          });
          res.json({
            status: "success",
            message: "signin success",
            token: token,
          });
        } else {
          res.json({ status: "failed", message: "Incorrect password !" });
        }
      } else {
        res.json({ status: "failed", message: "Email is not registered" });
      }
    } else {
      res.json({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    res.json({ status: "failed", message: "error.message" });
  }
}
//vendor data
export async function vendorData(req, res) {
  try {
    let vendorDetails = await vendorModel.findById(req.vendorId);
    res.json({ vendorDetails, auth: true });
  } catch (error) {
    res.json({ status: "failed", message: "error.message" });
  }
}
//add room
export async function addRoom(req,res){
  try{
    let obj=req.body;
    
    let vendorId=req.vendorId;
    const room=await RoomModel.create({
        vendorId:vendorId,
        propertyType:obj.property,
        totalrooms :obj.roomNo,
        capacity:obj. capacity,
        totalRoomRate:obj.OneRoom,
        price:obj.price,
        AdultsRate:obj.adultRate,
        address:obj.address,
        city:obj.city,
        state:obj.state,
        zip:obj.zip,
        description:obj.description,
        amenities:obj.amenities,
        img:obj.image,
        category:obj.category,
        parking:obj.parking,
        swimmingPool:obj.swimmingPool

    })
    console.log(room)
    res.json({'status':'success','message':'Room  added successfully'})
    

  }catch(error){
    console.log(error.message)
    res.json({ status: "failed", message: "error.message" });   
  }
}

//fetch vendor id in roomModel
export async function getRoomview(req,res){
  try{

      const roomView=await RoomModel.find({vendorId:req.vendorId}).populate('vendorId')
      res.json({roomView})
  }catch(error){
    res.json({ status: "failed", message: "error.message" });   
  }

}

//vendor data display using id
export async function getvendorRoom(req,res){
  try{
    const roomId=req.params.roomId
    const room=await RoomModel.findById(roomId).populate('vendorId')
    res.json(room)

  }catch(error){
    res.json({ status: "failed", message: "error.message" });  
  }
}

//edit room  data
export async function getEditRoom(req,res){
  try{
    const editId=req.params.editId;
    console.log(editId);
    const editRoom=await RoomModel.findById(editId)
    res.json(editRoom)


  }catch(error){
    console.log(error.message)
    res.json({ status: "failed", message: "error.message" });  
  }
}
//edit room
export async function editRoomData(req,res){
  try{
    const obj=req.body;
    const roomId=req.params.roomId
    let editRoom=await RoomModel.findByIdAndUpdate(roomId,{
      propertyType:obj.property,
      totalrooms :obj.roomNo,
      capacity:obj. capacity,
      totalRoomRate:obj.OneRoom,
      price:obj.price,
      AdultsRate:obj.adultRate,
      address:obj.address,
      city:obj.city,
      state:obj.state,
      zip:obj.zip,
      description:obj.description,
      amenities:obj.amenities,
      img:obj.image,
      category:obj.category,
      parking:obj.parking,
      swimmingPool:obj.swimmingPool

    })
    res.json({'status':'success',message:'updated successfully'})


  }catch(error){
    res.json({ status: "failed", message: "error.message" }); 
  }

}
//delete room
export async function delelteRoom(req,res){
  try{
  const roomId=req.params.roomId
  await RoomModel.findByIdAndDelete(roomId);
  res.json({'status':'success','message':'deleted successfully'})
  }catch(error){
    res.json({ status: "failed", message: "error.message" }); 
  }

}

//edit vendor profile
export async function editProfile(req,res){
  try{
     const obj=req.body;
     let editVendor= await vendorModel.findByIdAndUpdate(req.vendorId,{
        name:obj.name,
        email:obj.email,
        image:obj.image || null,
        propertyName:obj.propertyName,
        propertyLocation:obj.propertyLocation
       })
       console.log(editVendor)
       res.json({'status':'success','message':'updated successfully',editVendor})

  }catch(error){
    console.log(error.message)
      return {status:'failed',message:'Network error'} 
  }
}