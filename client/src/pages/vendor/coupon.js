 import React, { useState } from 'react'
 import { useEffect } from 'react'
import { vendorDatafetch,viewCoupon } from '@/config/venderEndpoints'
import {vendor} from '@/store/vendor'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import SideBar from '@/components/Vendor/Home/SideBar'
import CouponView from '@/components/Vendor/Home/CouponView'


 
 function coupon() {
    const router=useRouter();
    let dispatch=useDispatch()

    const [refresh, setRefresh] = useState(false)

    const [coupons,setCoupons]=useState([])
    useEffect(()=>{
        async function invoke(){
            if(localStorage.getItem('vendortoken')){
                const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
                // setVendor(data.vendorDetails)
                dispatch(vendor(data.vendorDetails))
                if(data.status =='failed'){
                    router.push('/vendor/login')
                }else if(data.auth){
                    router.push('/vendor/coupon')
                }
            
            }else{
                router.push('/vendor/login')
            }
    
        }
        invoke()
    
      },[])

      useEffect(()=>{
       async function run(){
            const coupon=await viewCoupon({'vendortoken':localStorage.getItem('vendortoken')})
            setCoupons(coupon)
        }

        run()
        
      },[refresh])

   return (
    <>

<VendorNav />

<div className='md:lg:h-auto xs:h-auto   flex bg-gray-100 items-center'>
 <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
   <SideBar className='bg-gray-300'/>
   <CouponView coupons={coupons}  setRefresh={setRefresh} refresh={refresh}/>
   
   
    
     </div>

   </div>
    
    
    </>
   )
 }
 
 export default coupon