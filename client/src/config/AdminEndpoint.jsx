import { async } from '@firebase/util'
import { ContactsOutlined } from '@mui/icons-material';
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