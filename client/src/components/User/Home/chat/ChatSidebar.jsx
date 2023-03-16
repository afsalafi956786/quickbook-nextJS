import React, { useState,useEffect } from 'react'
import { getUsers } from '@/config/userEndpoints'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatSidebar({data,currUserId,currentChat,setCurrentChat,online}) {
  const [vendorData,setVendorData]=useState(null)

  useEffect(()=>{
    const userId=data.members.find((id)=>id!==currUserId)
  async function invoke(){
      const data=await getUsers(userId)
      setVendorData(data.vendor)

   }
   invoke()

},[])
  return (
    
    <>
  

      <div    onClick={()=>setCurrentChat(data)}
      className="flex flex-row py-4 s px-2 justify-center items-center border-b-2 hover:bg-sky-100"
    >
      <div  className="cursor-pointer">
        {/* {userData? <AccountCircleIcon classNameName='text-4xl ml-4 text-gray-600' /> :'' } */}
        <img
              src={vendorData?.image? vendorData?.image : <AccountCircleIcon/> }
              class="object-cover h-12 w-12 rounded-full "
              alt=""
            />
      </div>
      <div  className="w-full cursor-pointer xs:hidden lg:md:block sm:block">
        <div className="text-lg font-semibold">{vendorData?.name}</div>
       {online?<span className="text-gray-500">online</span> :<span className="text-gray-500">offline</span> } 
      </div>
    </div>

    </>
  )
}

export default ChatSidebar