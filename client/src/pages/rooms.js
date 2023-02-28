import SideBar from '@/components/User/Sidebar/SideBar'
import HomeNav from '../components/User/Navbar/HomeNav'
import Booking from '@/components/User/Navbar/Booking'
import React from 'react'
import RoomData from '@/components/User/Home/RoomData'

function rooms() {
  return (
    <>
    <HomeNav/>
    <div className='container p-[15px]  mx-auto relative'>  
       <Booking/> 
       {/* <Newnav/> */}
    </div>
    <div className='flex'>
        <SideBar/>
       
         <RoomData/>
    </div>
         
      
        
    
      

    
   
    
    </>
  )
}

export default rooms