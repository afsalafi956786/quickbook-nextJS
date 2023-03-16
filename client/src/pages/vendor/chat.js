import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {vendor} from '@/store/vendor'
import { vendorDatafetch} from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
import { useEffect,useState } from 'react'
import SideBar from '@/components/Vendor/Home/SideBar'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import ChatVendor from '@/components/Vendor/chat/ChatVendor'
import ChatSide from '@/components/Vendor/chat/ChatSide'
import { useSelector } from 'react-redux'
import { vendorChat } from '@/config/chatEndpoints'
import {io} from  'socket.io-client'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

function chat() {
        const router=useRouter();
    let dispatch=useDispatch()
    const vendors=useSelector((state)=>state.vendor.value)

    const [chats,setChats]=useState([])
    // const[roomData,setRoomData]=useState([])
    // const [refresh, setRefresh] = useState(false)
    // const socket=useRef()
    const [onlinvendors,setOnlineVendors]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [sendMessage,setSendMessage]=useState(null)
    const [recieveMessage,setRecieveMessage]=useState(null)

    const { socket } = useContext(AuthContext)

    //send message to socket server
    useEffect(()=>{
      if(sendMessage!==null){
        socket.emit('send-message',sendMessage)
      }
    },[sendMessage])

    useEffect(()=>{
      socket.emit("new-user-add",vendors?._id)
      socket.on("get-users",(vendor)=>{
        setOnlineVendors(vendor)
       
      })
//this is some doubt
    },[vendors])

    
    //recieve message from server receive-message

    useEffect(()=>{
      socket.on('receive-message',(data)=>{
        setRecieveMessage(data)
      })
    },[])

    useEffect(()=>{
        async function invoke(){
            if(localStorage.getItem('vendortoken')){
                const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
                // setVendor(data.vendorDetails)
                dispatch(vendor(data.vendorDetails))
                if(data.status =='failed'){
                    router.push('/vendor/login')
                }else if(data.auth){
                    router.push('/vendor/chat')
                }
            
            }else{
                router.push('/vendor/login')
            }
    
        }
        invoke()
    
      },[])

      
      useEffect(()=>{
        async function invoke(){
          const data=await vendorChat(vendors?._id)
          setChats(data.chat)
          
    
        }
        invoke();
    
      },[vendors])

      function checkOnlineStatus(chat){
        const chatMembers=chat?.members.find((member)=>member!==vendors._id)
        const online=onlinvendors.find((vendors)=>vendors.vendorId === chatMembers)
        return online ? true: false
      }
    
  return (
    <>
<VendorNav/>
<div className='md:lg:h-auto xs:h-auto   flex bg-gray-100 items-center'>
 <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
   <SideBar className='bg-gray-300'/>
   <div class="container mx-auto shadow-lg rounded-lg mt-12">

 <h2 className='px-16 text-sky-600 hover:text-sky-800'>Message</h2>
<div class="flex flex-row justify-between bg-white py-16 xs:w-[120%] sm:w-full lg:md:w-full "> 

<div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
    {/* <!-- search compt --> */}
    <div className="border-b-2 py-4 px-2">
      <input
        type="text"
        placeholder="search chatting"
        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
      />
    </div>
      {/* onClick={()=>setCurrentChat(chat)} */}
        {chats?.map((chat)=>(
          
            <ChatSide data={chat} currVendorId={vendors?._id} currentChat={currentChat} setCurrentChat={setCurrentChat} online={checkOnlineStatus(chat)} />
          
        ))}
    </div>
<ChatVendor chat={currentChat} currentVendor={vendors?._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
</div>
</div>
     
    
     </div>

   </div>
    
    
    </>
  )
}

export default chat