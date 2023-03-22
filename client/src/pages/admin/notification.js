import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {rooms} from '../../store/rooms'
import Router, { useRouter } from 'next/router'
import { adminData } from '@/config/AdminEndpoint'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import AdminSide from '@/components/admin/home/AdminSide'
import Notification from '@/components/admin/home/Notification'
import { getallNotification } from '@/config/AdminEndpoint'



function notification() {
  const router=useRouter();
  const [admin,setAdmin]=useState('')
  let dispatch=useDispatch(rooms);
  const room = useSelector((state)=>state.rooms.value)
  const [refresh,setRefresh]=useState(false)
  const [notificationss,setNotificationss]=useState([])

  useEffect(()=>{
    async function invokeForAwait(){
        if(localStorage.getItem('admintoken')){
    const data=await adminData ({'admintoken':localStorage.getItem('admintoken')})
  
     setAdmin(data.adminDatas)
    if(data.status=='failed'){
      router.push('/admin/signin')
    }else if(data.auth){
      router.push('/admin/notification')
    }
  }else{
    router.push('/admin/signin')
  }
    }
    invokeForAwait()

    

   },[])


   useEffect(()=>{
     async function run(){
      const note=await getallNotification()
      setNotificationss(note?.notifications)
      

     }
     run();
   },[refresh])
  return (
    <>

<VendorNav admin={admin}/>

<div className='md:lg:h-auto xs:h-auto  flex bg-gray-100 items-center'>
 <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
   <AdminSide className='bg-gray-300'/>
  <Notification notification={notificationss} setRefresh={setRefresh} refresh={refresh}/>
    
     </div>

   </div>
    

    </>
  )
}

export default notification