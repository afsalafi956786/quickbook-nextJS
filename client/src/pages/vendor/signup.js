import Navbar from '@/components/User/Navbar/Navbar'
import VendorLogin from '@/components/Vendor/Login/VendorLogin'
import VendorSignup from '@/components/Vendor/Login/VendorSignup'
import React from 'react'

function signup() {
  return (
    <div>
        <Navbar/>
        <VendorSignup/>
      
    </div>
  )
}

export default signup