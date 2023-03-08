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
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}

export async function  editUserProfile(formData,header){
    try{
        const {data}=await axios.patch('/editProfile',formData,{headers:header})
        return data;

    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}
 
export async function editPassword(formData,header){
    try{
        const {data}=await axios.patch('/editpassword',formData,{headers:header})
        return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
    

}

export async function getRoomInfo(req,res){
    try{
        const {data}=await axios.get('/getRoomdetails')
        return data;

    }catch(error){
        return {status:'failed', message:'Network error'}
    }

}

export async function getDisplayDetails(roomId){
    try{
         
        const {data}=await axios.get(`/getDetails/${roomId}`)
         return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}

export async function getLocation(place){
    try{
        const { data }=await axios.get(`/getLocation?place=${place}`)
        return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}
export async function doBooking(bookingData,header){
    try{
    const {data}=await axios.post('/createbooking',bookingData,{headers:header})
    return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}

export async function SuccessDetails(roomId,header){
    try{
    const {data}=await axios.get(`/successData/${roomId}`,{headers:header})
    return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}

export async function  getBookings (header){
    try{
    const {data}=await axios.get('/bookingData',{headers:header})
    return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}

export async function cancelBooking (bookId){
    try{
    const {data}=await axios.post('/cancelbooking',{bookId})
    return data;
    }catch(error){
        return {status:'failed', message:'Network error'}
    }
}