import vendorModel from "../models/vendorShema.js";
import bcrypt, { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userShema.js";




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

export async function vendorData(req, res) {
  try {
    let vendorDetails = await vendorModel.findById(req.vendorId);
    console.log(vendorDetails);
    res.json({ vendorDetails, auth: true });
  } catch (error) {
    res.json({ status: "failed", message: "error.message" });
  }
}
