import AdminSide from '@/components/admin/home/AdminSide'
import Dashboard from '@/components/admin/home/Dashboard'
// import Navbar from '@/components/User/Navbar/Navbar'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import React from 'react'
import { adminData } from '@/config/AdminEndpoint'
import Router, { useRouter } from 'next/router'
import { useState,useEffect } from 'react'

function index() {
  const router=useRouter();

const [admin,setAdmin]=useState('')


  useEffect(()=>{
    async function invokeForAwait(){
        if(localStorage.getItem('admintoken')){
    const data=await adminData ({'admintoken':localStorage.getItem('admintoken')})
     console.log(data)
     setAdmin(data.adminDatas)
    if(data.status=='failed'){
      router.push('/admin/signin')
    }else if(data.auth){
      router.push('/admin')
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
      {/* <Navbar/> */}
     <div className='md:lg:h-[85vh] xs:h-auto  flex bg-gray-100 items-center'>
      <div className='grid h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
        <AdminSide className='bg-gray-300'/>
        <Dashboard/>
          </div>

        </div>


  </>
  )
}

export default index
