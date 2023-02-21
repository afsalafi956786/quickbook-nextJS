import Navbar from '@/components/User/Navbar/Navbar'
import DashRight from '@/components/Vendor/Home/DashRight'
import MainDash from '@/components/Vendor/Home/MainDash'
import SideBar from '@/components/Vendor/Home/SideBar'
import React from 'react'

function home() {
  return (
    <>
  <Navbar/>
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
