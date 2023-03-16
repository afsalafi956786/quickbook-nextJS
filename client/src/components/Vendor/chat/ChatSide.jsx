
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser} from '@/config/venderEndpoints'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatSide({data,currVendorId,currentChat,setCurrentChat}) {
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
     <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
    {/* <!-- search compt --> */}
    <div className="border-b-2 py-4 px-2">
      <input
        type="text"
        placeholder="search chatting"
        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
      />
    </div>
  

      <div onClick={()=>setCurrentChat(data)}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
    >
      <div   className="w-1/4">
        {/* {userData? <AccountCircleIcon classNameName='text-4xl ml-4 text-gray-600' /> :'' } */}
      <AccountCircleIcon className='text-4xl ml-4 text-gray-600' />
      </div>
      <div  className="w-full">
        <div className="text-lg font-semibold">{userData?.name}</div>
        <span className="text-gray-500">online</span>
      </div>
    </div>
    </div>
   

    </>
  )
}

export default ChatSide