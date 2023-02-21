
import { async } from '@firebase/util';
import axios  from './axios'




export async function vendorSignupOtp(formData){
    try{
      const {data}=await axios.post(`/vendor/vendorCheck`,formData)
      return data;
    }catch(error){
        return {status:'faled',message:'Network error'}
    }
}

export async function vendorSignup(formData){
    try{
         const {data}=await axios.post(`/vendor/vendorSignup `,formData)
    return data;
    }catch(error){
        return {status:'faled',message:'Network error'}
    }
   
} 

export async function vendorLogin(formData){
    try{
         const { data }=await axios.post(`/vendor/vendorLogin`,formData)
         return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function vendorDatafetch(header){
    try{
           const {data}=await axios.get (`/vendor/vendorData`,{headers:header})
           return data;

    }catch(error){
        return {status:'faled',message:'Network error'}
    }
}