
import  jwt  from "jsonwebtoken"

//user jwt 
export async function verifyJWT(req,res,next){
    try{
        const token=req.headers['usertoken']
    
        if(!token){
            res.json({'status':'failed','message':'You need a token'})
        }else{
            jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
                if(err){
                    res.json({auth:false,status:'failed',message:'failed to authenticate'})
                }else{
                    req.userId=decoded.userId
                    next();
                }
            })
        }

    }catch(error){
        res.json({auth:false,status:'failed',message:error.message})

    }
}