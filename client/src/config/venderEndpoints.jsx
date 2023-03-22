
import { async } from '@firebase/util';
import { headers } from 'next.config';
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

export async function addRoom(formData,header){
    try{
        const {data}=await axios.post(`/vendor/addRoom`,formData,{headers:header})
         return data;
    }catch(error){
        return {status:'faled',message:'Network error'}
    }
}

// export async function EditRoomDetails(header,roomId){
//     try{
//         const {data}=await axios.get(`/vendor/getRoomData/${roomId}`,{headers:header})
//         return data;  
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }

export async function roomViewData(header){
    try{
        const {data}=await axios.get(`/vendor/getRoomview`,{headers:header})
        return data;

    }catch(error){
        return {status:'failed',message:'Network error'}

    }
}

export async function getRoomId(roomId){
    try{
        const {data}= await axios.get(`/vendor/getVendorRoom/${roomId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function getEditRoom(editId){
    try{
        const {data}=await axios.get(`/vendor/getEditRoom/${editId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }

}
export async function  EditRoomInfo(formData,roomId,header){
    try{
        const {data}=await axios.put(`/vendor/editRoomDetails/${roomId}`,formData,{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function DeleteRoom(header,roomId){
    try{
        const { data }=await axios.delete(`/vendor/delteRoom/${roomId}`,{headers:header})
        return data;

    }catch(error){
        return {status:'failed',message:'Network error'} 
    }

}
//edit profile
export async function editVendorProfile(formData,header){
    try{
        const {data}=await axios.patch('/vendor/editVendorProfile',formData,{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'} 
    }
}

export async function createCoupon(formData,header){
    try{
        const {data}=await axios.post('/vendor/createCoupon',formData,{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'} 
    }
}

export async function viewCoupon (header){
    try{
        const {data}=await axios.get('/vendor/viewcoupon',{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'} 
    }
}


export async function viewBooking (header){
    try{
        const {data}=await axios.get('/vendor/viewbooking',{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'} 
    }
}
export async function DeleteCoupon(header,couponId){
    try{
        const {data}=await axios.delete(`/vendor/deletecoupn/${couponId}`,{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'} 
    }
}

export async function getUser(userId){
    try{
        const {data}=await axios.get(`/vendor/vendors/${userId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}

export async function vendorDash(header){
    try{
        const {data}=await axios.get('/vendor/vendorDash',{headers:header})
        return data;

    }catch(error){
      return {status:'failed',message:'Network error'}
    }
}

export async function  fetchRooms(header){
    try{
        const {data}=await axios.get('/vendor/fetchrooms',{headers:header})
        return data;
    }catch(error){
      return {status:'failed',message:'Network error'}
    }
}

export async function  vendorReview(header){
    try{
        const {data}=await axios.get('/vendor/vendorreview',{headers:header})
        return data;
    }catch(error){
      return {status:'failed',message:'Network error'}
    }
}


export async function  vendorGraph(header){
    try{
        const {data}=await axios.get('/vendor/vendorgraph',{headers:header})
        return data;
    }catch(error){
      return {status:'failed',message:'Network error'}
    }
}

// export async function  getSalesReport(header){
//     try{
//         const {data}=await axios.get('/vendor/vendorsales',{headers:header})
//         return data;
//     }catch(error){
//       return {status:'failed',message:'Network error'}
//     }
// }