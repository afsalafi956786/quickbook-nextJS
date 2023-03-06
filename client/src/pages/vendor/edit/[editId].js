import SideBar from '@/components/Vendor/Home/SideBar'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import React from 'react'
import { useEffect,useState } from 'react'
import { vendorDatafetch,getEditRoom } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
import EditRoom from '@/components/Vendor/Home/EditRoom'
import {vendor} from '@/store/vendor'
import { useDispatch } from 'react-redux'





function editroom({room}) {


    const router=useRouter();
    let dispatch=useDispatch()
    
    useEffect(()=>{
        async function invoke(){
            if(localStorage.getItem('vendortoken')){
                const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
                console.log(data)
               
                dispatch(vendor(data.vendorDetails))

                if(data.status =='failed'){
                    router.push('/vendor/login')
                }else if(data.auth){
                   
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
    
       <EditRoom room={room}/>
        </div>

      </div>
      </>
  )
}

export default editroom;

export async function getServerSideProps(context){
    const data=await getEditRoom(context.params.editId)

    return{
        props:{
            room:data

        }
    }
}