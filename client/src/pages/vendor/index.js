
import DashRight from '@/components/Vendor/Home/DashRight'
import MainDash from '@/components/Vendor/Home/MainDash'
import SideBar from '@/components/Vendor/Home/SideBar'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { vendorDatafetch } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import { useDispatch } from 'react-redux'
import {vendor} from '@/store/vendor'

function home() {
   const router=useRouter();
   let dispatch=useDispatch()

  useEffect(()=>{
    async function invoke(){
        if(localStorage.getItem('vendortoken')){
            const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
            console.log(data)
            // setVendor(data.vendorDetails)
            dispatch(vendor(data.vendorDetails))
            if(data.status =='failed'){
                router.push('/vendor/login')
            }else if(data.auth){
                router.push('/vendor')
            }
        
        }else{
            router.push('/vendor/login')
        }

    }
    invoke()

  },[])
  
  

  return (
    <>
<VendorNav/>
    <div className='md:lg:h-[85vh] xs:h-auto  flex bg-gray-100 items-center'>
        
        <div className='grid h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto_20rem] mx-6 gap-[10px] lg:md:grid-cols-[20% 50% auto]'>
            <SideBar className='bg-gray-300'/>
            <MainDash/>
          <DashRight/>

        </div>
      
    </div>
      </>
  )
}

export default home
