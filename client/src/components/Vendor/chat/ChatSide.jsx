
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser} from '@/config/venderEndpoints'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatSide({data,currVendorId,currentChat,setCurrentChat,online}) {
    const [userData,setUserData]=useState(null)
    useEffect(()=>{
        const userId=data.members.find((id)=>id!==currVendorId)
      async function invoke(){
          const data=await getUser(userId)
          setUserData(data.user)

       }
       invoke()

    },[])
  return (
    <>
  

      <div onClick={()=>setCurrentChat(data)}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer hover:bg-sky-100"
    >
      <div   className="">
        {/* {userData? <AccountCircleIcon classNameName='text-4xl ml-4 text-gray-600' /> :'' } */}
      <AccountCircleIcon className='text-4xl ml-4 text-gray-600' />
      </div>
      <div  className="w-full xs:hidden sm:block lg:md:block">
        <div className="text-lg font-semibold ml-4">{userData?.name}</div>
       {online?<span className="text-gray-500 ml-4">Online</span>:<span className="text-gray-500 ml-4">Offline</span>}
      </div>
    </div>
   

    </>
  )
}

export default ChatSide