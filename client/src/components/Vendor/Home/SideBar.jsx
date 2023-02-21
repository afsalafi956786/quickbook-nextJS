import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';


function SideBar() {

     const [selected,setSelected]=useState(false)
     const [expended,setExpended]=useState(true)
  return ( 
   <>
   <div className=' flex flex-col relative pt-[4rem] transition-all-[300ms] ease'>
    {/* <div className=''>
      <MenuIcon/>
    </div> */}

    {/* menu */}
    <div className='lg:mt-[2rem] mt-[2rem]  lg:md:bg-white flex flex-col lg:gap-[2rem] gap-[2rem] lg:block lg:space-y-8 xs:fixed xs:bg-gray-50 xs:z-10   xs:p-[1rem] xs:h-[100%] xs:-mt-16  '>
  
        <div className='flex items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-x-1 hover:scale-110 duration-50  cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HomeIcon/>
            </div>
            <span className='md:hidden lg:xl:block'>Dashbord</span>
        </div>

        <div className='flex items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HotelIcon/>
            </div>
            <span className='md:hidden lg:xl:block' >Rooms</span>
        </div>

        <div className='flex items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <ArticleIcon />
            </div>
            <span className='md:hidden lg:xl:block'>Bookings</span>
        </div>


        <div className='flex items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HomeIcon/>
            </div>
            <span className='md:hidden lg:xl:block'>Discount</span>
        </div>


        <div className='flex items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HomeIcon/>
            </div>
            <span className='md:hidden lg:xl:block'>Dashbord</span>
        </div>

        

    </div>


   </div>
     
   </>
  )
}

export default SideBar

