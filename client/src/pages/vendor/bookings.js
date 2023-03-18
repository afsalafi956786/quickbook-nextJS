import React from 'react'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import SideBar from '@/components/Vendor/Home/SideBar'
import {vendor} from '@/store/vendor'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import ViewBook from '@/components/Vendor/Home/ViewBook'
import { useEffect } from 'react'
import { vendorDatafetch,viewBooking } from '@/config/venderEndpoints'
// import { useSelector } from 'react-redux'
import { useState } from 'react'



function bookings() {
  // let user=useSelector((state)=>(state.users.value))
    const router=useRouter();
    let dispatch=useDispatch()
    const [booking,setBooking]=useState([])
    // const [loading,setLoading]=useState(false)
    // const [currentPage,setCurrentPage]=useState(1)
    // const [postPerPage,setPostPerPage]=useState(5);

         
  

  
    useEffect(()=>{
        async function invoke(){
            if(localStorage.getItem('vendortoken')){
                const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
                dispatch(vendor(data.vendorDetails))
                if(data.status =='failed'){
                    router.push('/vendor/login')
                }else if(data.auth){
                    router.push('/vendor/bookings')
                }
            
            }else{
                router.push('/vendor/login')
            }
    
        }
        invoke()
    
      },[])


      useEffect(()=>{
       async function run(){
        // setLoading(true)
          const bookings=await viewBooking({'vendortoken':localStorage.getItem('vendortoken')})
          setBooking(bookings.viewBookings)
          // setLoading(false)
        }

        run()
      },[])
   
      //get index of last post
      // const indexofLastPost=currentPage * postPerPage
      // const indexOfFirstPost=indexofLastPost - postPerPage
      // const currentPost=booking.slice(indexOfFirstPost,indexofLastPost)


  return (
    <>
    <VendorNav />

<div className='md:lg:h-auto xs:h-auto   flex bg-gray-100 items-center'>
 <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
   <SideBar className='bg-gray-300'/>
   <ViewBook booking={booking}/>
   
    
     </div>

   </div>
    
    
    </>
  )
}

export default bookings