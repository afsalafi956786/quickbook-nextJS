import React, { useState ,useEffect} from 'react'
import AdminSide from '@/components/admin/home/AdminSide'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import Router, { useRouter } from 'next/router'
import { adminData, getOneRoomDetails } from '@/config/AdminEndpoint'
import DetailsRoom from '@/components/admin/home/DetailsRoom'

// import RoomData from '@/components/admin/home/roomData'

function roomdetails({room}) {


    const router=useRouter();


    const [admin,setAdmin]=useState('')
  
  
    useEffect(()=>{
      async function invokeForAwait(){
          if(localStorage.getItem('admintoken')){
      const data=await adminData ({'admintoken':localStorage.getItem('admintoken')})
    
       setAdmin(data.adminDatas)
      if(data.status=='failed'){
        router.push('/admin/signin')
      }else if(data.auth){
        // router.push('/admin/roomdetails')
      }
    }else{
      router.push('/admin/signin')
    }
      }
      invokeForAwait()
  
      
  
     },[])
  return (
    <>
    <VendorNav admin={admin}/>

    <div className='md:lg:h-auto xs:h-auto  flex bg-gray-100 items-center'>
     <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
       <AdminSide className='bg-gray-300'/>
         {/* <RoomData/> */}
         <DetailsRoom room={room} />
         </div>
 
       </div>
     
     </>
  )
}

export default roomdetails

export async function getServerSideProps(context){
       const data = await getOneRoomDetails(context.params.roomId)
       

  return {
    props:{
      room:data

    }
  }

}