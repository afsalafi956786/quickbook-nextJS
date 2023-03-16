import React from "react";
import Image from "next/image";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ChatIcon from '@mui/icons-material/Chat';


function VendorNav({admin}) {
  const router=useRouter();
    const vendors=useSelector((state)=>state.vendor.value)

    
  return (  
    <>
      <div className=" w-full h-20 shadow-lg  ">
       
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 "> 
       
          <Image src="/logo/qb.png" alt="/" width="150" height="80" />
          {vendors ?  <ChatIcon onClick={()=>router.push('/vendor/chat')} className="text-4xl mt-4 cursor-pointer hover:text-sky-800 text-sky-600"/> : '' }
         
         {vendors ? ( <div className="flex p-2 space-x-6  ">
         
          
            <img onClick={()=>router.push('/vendor/account')}  className="rounded-full h-14 w-16 border cursor-pointer border-gray-300  " src={`${vendors?.image ?vendors.image:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}`} alt="" />        
            <h3 className="mt-4 font-bold text-sky-600">
            {vendors?.email}
            </h3>

          </div>
         ):(
          <div className="flex p-2 space-x-2 ">
          
            < AdminPanelSettingsIcon className="w-12 h-12 "/>    
            <h3 className="mt-4 font-bold ">
            {admin?.email}
            </h3>

          </div>
         )
           } 

          
        </div>
      </div>
    </>
  );
}

export default VendorNav;
