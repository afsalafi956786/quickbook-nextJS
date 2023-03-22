import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ApprovalIcon from '@mui/icons-material/Approval';
import { useState } from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import swal from "sweetalert";
import Router, { useRouter } from 'next/router';
import NotificationsIcon from '@mui/icons-material/Notifications';

// import MenuIcon from '@mui/icons-material/Menu';


function AdminSide() {
  const router=useRouter()

     const [selected,setSelected]=useState(false)
    //  const [expended,setExpended]=useState(true)

    //  function handelExpand(){
    //   setExpended(!expended)
    //  }


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
          localStorage.removeItem('admintoken')
          router.push('/admin/signin')
        }
      })

     }
  return ( 
   <> 

   <div className={ 'flex flex-col relative pt-[4rem] transition-all-[300ms] ease '}>
    
                                                  
    {/* menu */}
    <div className='lg:mt-[2rem] mt-[2rem]  lg:h-[70%] lg:md:bg-white flex flex-col lg:gap-[2rem] gap-[2rem] lg:block lg:space-y-8 xs:fixed xs:z-10 xs:h-[100%]' >
    {/* <div onClick={handelExpand} className=' fixed z-10 cursor-pointer' style={expended? {left:'32%'} :{left:'5%'}}>
      <MenuIcon  className=''/>
    </div> */}
  
        <Link href='/admin' className='flex xs:ml-1 items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-x-1 hover:scale-110 duration-50  cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <HomeIcon/>
            </div>
            <span className='md:hidden xs:hidden lg:xl:block'>Dashbord</span>
        </Link> 
        
        
         <Link href='/admin/approval' className='flex  xs:ml-1 items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <ApprovalIcon />
            </div>
            <span className='md:hidden xs:hidden lg:xl:block'>Approval</span>
        </Link>
        
        <Link href='/admin/users' className='flex  xs:ml-1 items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
          
            <div className=''> 
              < GroupIcon/>
            </div>    
            <span className='md:hidden xs:hidden lg:xl:block' >Users</span>
        </Link>
        
        <Link href='/admin/notification' className='flex  xs:ml-1 items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
          
          <div className=''> 
            <NotificationsIcon/>
          </div>    
          <span className='md:hidden xs:hidden lg:xl:block' >Notification</span>
      </Link>

      


        <Link href='/admin/properties' className='flex  xs:ml-1 items-center gap-[1rem] h-[2.5rem] ml-[2rem]  relative px-3 transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl active:bg-gray-300 hover:bg-gray-300 ml-0 rounded-lg bg-gray-100'>
            <div className=''>
              <ApartmentIcon/>
            </div>
            <span className='md:hidden xs:hidden lg:xl:block'>Properties</span>
        </Link>
        
        <div className='flex w-[20%] items-center  xs:ml-1 gap-[1rem] h-[2.5rem] ml-[3rem]  relative  transition-all ease-in-out delay-150 hover:-y-1 hover:scale-110 duration-100 cursor-pointer text-xl'>
              < LogoutIcon onClick={logout}/>
            </div>
        

    </div>


   </div>
     
   </>
  )
}

export default AdminSide