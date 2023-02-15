import { async } from '@firebase/util'
import axios  from './axios'



export async function userSignupOtp(formData){
    try{
        const {data}=await axios.post(`/user_check`,formData)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function userSignup(formData) {
    try {
        const {data} = await axios.post(`/user_signup`,formData)
        return data
    } catch (error) {
      return {status:'failed', message:'Network error'}
        
    }
}


export async function userSignin(formData){
    try{
         const {data}=await axios.post(`/user_signin`,formData)
         return data
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}
export async function userDatafetch(header){
    try{
        const {data}= await axios.get(`/user_data`,{headers:header})
        return data;
    }catch(erorr){
         return {status:'failed',message:erorr.message}
    }
}

