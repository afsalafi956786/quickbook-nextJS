// import userModel from "../models/userShema";
import userModel from "../models/userShema.js";
import bcrypt, { hash,compare } from "bcrypt";
import jwt from 'jsonwebtoken'




export async function userCheck(req,res){
  try{

    let obj=req.body
   let regName=/^[a-zA-Z]+$/;
   let regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
   let mob=/^([+]\d{2})?\d{10}$/
   if(obj.name && obj.email && obj.password && obj.confirmPass && obj.mobile){
     if(regName.test(obj.name)){
      if(regEmail.test(obj.email)){
        if(obj.password===obj.confirmPass){
          if(mob.test(obj.mobile)){
               let user=await userModel.findOne({email:obj.email})
               if(!user){
                let phoneNumber=await userModel.findOne({phone:obj.mobile})
                if(!phoneNumber){
                        res.json({'status':'success' ,'message':'approved'})
                }else{
                  res.json({'staus':'failed','message':'phone number is already registered !'})
                }
               }else{
                res.json({'status':'failed','message':'email is already registered !'})
               }
          }else{
            res.json({'staus':'failed' ,'message':'Enter a valid phone number'})
          }

        }else{
          res.json({'staus':'failed','message':'password is not matched' })
        }
      }else{
        res.json({'status':'failed','message':'Enter a valid email'})
      }
     }else{
      res.json({'status':'failed' ,'message':'Enter a valid name'})
     }
   }else{
    res.json({'status':'failed','message':'All fieldsa are required'})
   }

  }catch(error){
    res.json({ status: "failed", message: error.message })
  }
   

}

//user signup validation
export async function SignupValidate(req, res) {
  try {
    const obj = req.body;
    if (
      !obj.name &&
      obj.email &&
      obj.password &&
      obj.confirmPass &&
      obj.mobile
    ) {
      res.json({ status: "failed", message: "All fields are required !" });
    } else {
      console.log("emial check");
      let existUser = await userModel.findOne({ email: obj.email });
      if (existUser) {
        res.json({ status: "failed", message: "Email is already taken " });
      } else {
        const userDetails = obj;
        if (userDetails.password == userDetails.confirmPass) {
          userDetails.password = await bcrypt.hash(userDetails.password, 10);
          console.log(userDetails.password);
          await userModel.create({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            phone: userDetails.mobile,
          });
          let userInfo = await userModel.findOne({ email: userDetails.email });
          let userId = userInfo._id;

          const token = jwt.sign({ userId }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
          });
          res.json({
            status: "success",
            message: "signup success",
            token: token,
          });
        } else {
          res.json({ status: "failed", message: "password is not matched" });
        }
      }
    }
  } catch (error) {
    res.json({ status: "failed", message: error.message });
}

}

//user login validatin
export async function singninValidate(req,res){
    try{
        let obj=req.body;
        if(!obj.email && obj.password){
          console.log('kayari');
          res.json({'status':'failed','message':'All fields are required !'})
        }else{
        let user=await userModel.findOne({email:obj.email})
        if(user){
            const isMatch=await bcrypt.compare(obj.password,user.password)
            if(isMatch){
                const userId=user._id
                const token=jwt.sign({userId},process.env.TOKEN_KEY,{expiresIn:'2h'})
                res.json({'status':'success','message':'signin succecess',token:token})
            }else{
              res.json({'status':'failed',message:'password is incorrect !'})
            }
        }else{
          res.json({status:'failed',message:'Email is not registered !'})
        }
      }
    }catch(error){
        res.json({status:'failed',message:error.message})
    }
}


export async function userDataFetch(req,res){
  try{
     let userDetails=await userModel.findById(req.userId)
     res.json({userDetails,auth:true})
  }catch(error){
    res.json({status:'failed',message:error.message})
  }
}