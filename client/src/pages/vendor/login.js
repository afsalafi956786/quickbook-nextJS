import Navbar from '@/components/User/Navbar/Navbar'
import VendorLogin from '@/components/Vendor/Login/VendorLogin'
import React from 'react'
import { useEffect } from 'react'
import { vendorDatafetch } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
function login() {
  const router=useRouter();
  useEffect(()=>{
    async function invoke(){
        if(localStorage.getItem('vendortoken')){
            const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
            console.log(data)
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
     <Navbar/>
     <VendorLogin/>
     </>
  )
}

export default login