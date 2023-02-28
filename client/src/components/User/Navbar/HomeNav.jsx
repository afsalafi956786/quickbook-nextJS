
import React from "react";
import Image from "next/image";
// import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import swal from "sweetalert";
import Router, { useRouter } from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
function HomeNav({user}) {
const router=useRouter();
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
      localStorage.removeItem('usertoken')
      router.push('/auth')
    }
  })
}

  return (
    <>
      <div className=" w-full h-28 shadow-lg bg-slate-50 ">
        
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
          <Image
            src="/logo/qb.png"
            alt="/"
            width="150"
            height="80"
          />

<form className="lg:w-[62%] lg:ml-2 md:w-[58%] md:px-8 md:-ml-9 sm:w-[58%] xs:w-[50%] xs:-ml-10 ">   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search"  className="block border w-full p-4 pl-10 text-sm  border-gray-300  bg-gray-50  border-gray-00 dark:placeholder-gray-400   " placeholder="Search Mockups, Logos..." required/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-600  ">Search</button>
    </div>
</form>

   
          

          
   
          <LogoutIcon onClick={logout} className="xs:ml-2 ml-auto -ml-1 h-24 w-22 cursor-pointer"/>
         

{user &&
        

        <div className="flex hover:border xs:w-[20%] space-x-3 lg:md:w-[10%] xs:w-[100%] h-16 w-40 hover:bg-slate-50 text-sky-600 hover:bg-gray-100 p-2">
            <PersonIcon className="mt-5 cursor-pointer "  />
              <p
              href="#" 
              className="  cursor-pointer mt-5 font-bold text-lg text-sky-700 "
            >
              
             {user?.name}
            </p> 
           
          </div>
          
          
     }
         
        </div>

      </div>
    </>
  );
}

export default HomeNav;