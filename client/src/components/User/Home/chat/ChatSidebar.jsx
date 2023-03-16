import React, { useState,useEffect } from 'react'
import { getUsers } from '@/config/userEndpoints'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatSidebar({data,currUserId,currentChat,setCurrentChat}) {
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
        <div  className="flex flex-col w-2/5 border-r-2 overflow-y-auto  ">
    <div className="border-b-2 py-4 px-2">
      <input
        type="text"
        placeholder="search chatting"
        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
      />
    </div>
  

      <div    onClick={()=>setCurrentChat(data)}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-sky-100"
    >
      <div  className="w-1/4 cursor-pointer">
        {/* {userData? <AccountCircleIcon classNameName='text-4xl ml-4 text-gray-600' /> :'' } */}
        <img
              src={vendorData?.image? vendorData?.image : <AccountCircleIcon/> }
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
      </div>
      <div  className="w-full cursor-pointer ">
        <div className="text-lg font-semibold">{vendorData?.name}</div>
        <span className="text-gray-500">online</span>
      </div>
    </div>
    </div>

    </>
  )
}

export default ChatSidebar