
import axios  from './axios'

export async function vendorChat(vendorId){
    try{
        const {data}=await axios.get(`/chat/${vendorId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}

export async function getMessages(chatId){
    try{
        const {data}=await axios.get(`/message/${chatId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}

export async function addMessage(datas){
    try{
        const {data}=await axios.post('/message',datas)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}

//user

export async function userChat(userId){
    try{
        const {data}=await axios.get(`/chat/${userId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}

export async function getMessage(chatId){
    try{
        const {data}=await axios.get(`/message/${chatId}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}


export async function addMessages(datas){
    try{
        const {data}=await axios.post('/message',datas)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}

export async function createdChat (obj){
    try{
        const {data}=await axios.post('/chat',obj)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }


}