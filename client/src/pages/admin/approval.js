import React, { useState ,useEffect} from 'react'
import AdminSide from '@/components/admin/home/AdminSide'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import Router, { useRouter } from 'next/router'
import { adminData,getRoomDetails } from '@/config/AdminEndpoint'
import Approval from '@/components/admin/home/Approval'

 
 function approval() {

    const router=useRouter();


    const [admin,setAdmin]=useState('')
    const [room,setRoom]=useState([])
    const [refresh, setRefresh] = useState(false);
  
    useEffect(()=>{
      async function invokeForAwait(){
          if(localStorage.getItem('admintoken')){
      const data=await adminData ({'admintoken':localStorage.getItem('admintoken')})
    
       setAdmin(data.adminDatas)
      if(data.status=='failed'){
        router.push('/admin/signin')
      }else if(data.auth){
        router.push('/admin/approval')
      }
    }else{
      router.push('/admin/signin')
    }
      }
      invokeForAwait()
  
      
  
     },[])

     useEffect(()=>{
        async function invoke(){
            const details=await getRoomDetails({'admintoken':localStorage.getItem('admintoken')})
            console.log(details)
                 setRoom(details.property)
             
          
        }
        invoke();

     },[refresh])


   return (
    <>
     
    <VendorNav admin={admin}/>

   <div className='md:lg:h-auto xs:h-auto  flex bg-gray-100 items-center'>
    <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
      <AdminSide className='bg-gray-300'/>
        <Approval room={room} setRefresh={setRefresh} refresh={refresh}/>
        </div>

      </div>
    
    </>
    
   )
 }
 
 export default approval

 