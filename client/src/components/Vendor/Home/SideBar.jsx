import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from 'react';
import swal from "sweetalert";
import Router, { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';




function SideBar() {
  const router=useRouter();

    //  const [selected,setSelected]=useState(false)
    //  const [expended,setExpended]=useState(true)

     const logout=()=>{
      swal({
        title: "Are you sure?",
        background:'black',
        text: "Once logout, you need to add credentials when login",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((wilDelete)=>{
        if(wilDelete){
          localStorage.removeItem('vendortoken')
          router.push('/vendor/login')
        }
      })

     }
  return ( 
   <>
   <div className=' flex flex-col relative pt-[4rem] transition-all-[300ms] ease'>
    {/* <div className=''>
      <MenuIcon/>
    </div> */}
    {/* <div className='flex'>
      <HotelIcon className='-mt-4 ml-4'/>
       <h4 className='-mt-4 ml-4'>Admin page</h4>
    </div> */}
    
        
    {/* menu */}
    <div className='lg:mt-[2rem] mt-[2rem]  lg:h-[66%] lg:md:bg-white flex flex-col lg:gap-[2rem] gap-[2rem] lg:block lg:space-y-8 xs:fixed xs:z-10 xs:h-[100%] ' >
  
        <Link href='/vendor' className='flex xs:w-[55%]  lg:md:w-[75%] items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-x-1 hover:scale-110 duration-50  cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HomeIcon/>
            </div>
            <span className='md:hidden xs:hidden  lg:xl:block'>Dashbord</span>
        </Link>
        <Link href='/vendor/account' className='flex xs:w-[55%]  lg:md:w-[75%]  items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <PersonIcon/>
            </div>
            <span className='md:hidden xs:hidden  lg:xl:block' >Account</span>
        </Link>

        <Link href='/vendor/rooms' className='flex xs:w-[55%]  lg:md:w-[75%]  items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HotelIcon/>
            </div>
            <span className='md:hidden xs:hidden  lg:xl:block' >Rooms</span>
        </Link>

        <div className='flex items-center xs:w-[55%]  lg:md:w-[75%]   gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <ArticleIcon />
            </div>
            <span className='md:hidden xs:hidden  lg:xl:block'>Bookings</span>
        </div>


        <div className='flex items-center gap-[1rem] xs:w-[55%]  lg:md:w-[75%]  h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HomeIcon/>
            </div>
            <span className='md:hidden xs:hidden  lg:xl:block'>Discount</span>
        </div>

        
        <Link href='/vendor/addroom' className='flex bg-sky-600 xs:block md:lg:hidden items-center gap-[1rem] xs:w-[55%]  lg:md:w-[75%]   h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              < AddIcon className='text-white mt-2 text-bold'/>
            </div>
        </Link>

            <Link href='/vendor/addroom'  className='flex  xs:hidden md:lg:block lg:md:items-center gap-[1rem] lg:md:h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl'>

            <button className='bg-sky-600 p-1 px-4 rounded text-white font-bold hover:bg-sky-700 '>Add Room</button>
            </Link>
            <div className='flex w-[20%]   xs:w-[25%] lg:md:w-[85%]  items-center gap-[1rem] h-[2.5rem] ml-[3rem]  relative  transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl'>
              < LogoutIcon onClick={logout}/>
            </div>
            
            
            
      

       

        

    </div>


   </div>
     
   </>
  )
}

export default SideBar

