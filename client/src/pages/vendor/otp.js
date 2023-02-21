import Navbar from '@/components/User/Navbar/Navbar'
import VendorOtp from '@/components/Vendor/Login/VendorOtp'
// import { vendorDatafetch } from '@/config/venderEndpoints'
import React from 'react'
// import { useEffect } from 'react'
// import { AuthContext } from '@/context/AuthContext';
// import { useContext } from 'react'
import { useRouter } from 'next/router'


function otp() {

  return (
   <>
   <Navbar/>
   <VendorOtp/>
   
   </>
  )
}

export default otp