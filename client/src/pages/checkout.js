import React from 'react'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import CheckOut from '@/components/User/Home/CheckOut'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'

function checkout() {
  const router=useRouter();
  const {obj}=router.query;
 
  useEffect(()=>{
    const Obj = JSON.parse(obj)
    console.log(Obj,"===+++++++++++++")
  },[obj])
  
  return (
    <>
  <HomeNav />
      <div className="container p-[15px]  mx-auto relative">
        {/* <Booking/>  */}
      </div>
      <Newnav />
      <CheckOut obj={obj}/>
    
    
    </>
  )
}

export default checkout