

import { async } from '@firebase/util';
import { headers } from 'next.config';
import axios  from './axios'

export async function  adminSignin (formData){
    try{
        const {data}=await axios.post('/admin/adminSignin',formData)
        return data;
    }catch(error){
        console.log(error.message)
        return {status:'failed',message:'Network error'}
    }
}

export async function adminData(header){
    try{
        const {data}=await axios.get('/admin/adminData',{headers:header})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
//user detials
export async function UsersDatas(){
    try{
        const {data}=await axios.get('/admin/userDetails')
        return data;
    }catch(error){
        return {status:'faled',message:'Network error'}
    }
}


//staus check
export async function  getuserStatus(userId,isBanned){
    try{
      const {data}=await axios.post(`/admin/userStatus`,{userId,isBanned})
      return data;

    }catch(error){
        return {status:'failed',message:'Network error'}

    }
}

export async function  getRoomDetails(header){
    try{
        console.log('end point')
        const { data }=await axios.get('/admin/roomDetails',{headers:header})
         return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  propertyApprovel(roomId){
    try{
        const {data}= await axios.post('/admin/propertyApprovel',{roomId})
        return data;

    }catch(error){
        return {status:'failed',message:'Network error'}
    }

}

// export async function propertyClick(header,roomid){
//     try{
//         const {data}=await axios.get('/admin/getproperty',{roomid,headers:header})
//         return data;

//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }

// }

export async function getOneRoomDetails(roomid){
    try{
        const {data}=await axios.get(`/admin/getoneroom/${roomid}`)
        return data;

    }catch(error){
        return {status:'failed',message:'Network error'}
    }

}
export async function showProperties(header){
    try{
        const { data }=await axios.get('/admin/getProperties',{headers:header})
         return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function getPropertyStatus(roomId,isBanned){
    try{
        const {data}=await axios.post('admin/getPropertyStatus',{roomId,isBanned})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

