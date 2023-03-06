
import SideBar from '@/components/Vendor/Home/SideBar'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import React from 'react'
import { useEffect,useState } from 'react'
import { vendorDatafetch } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
import AddRooms from '@/components/Vendor/Home/AddRooms'
import { useDispatch } from 'react-redux'
import {vendor} from '@/store/vendor'

function addroom() {
    let dispatch=useDispatch()
    const router=useRouter();
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
                    router.push('/vendor/addroom')
                }
            
            }else{
                router.push('/vendor/login')
            }
    
        }
        invoke()
    
      },[])

  return (
    <>
    <VendorNav />
    <div className='lg:h-auto xs:h-auto pb-12  flex bg-gray-100 items-center'>
    <div className='grid h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[15rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
      <SideBar className='bg-gray-300'/>
    
       <AddRooms/>
        </div>

      </div>
      </>
  )
}

export default addroom
