import React, { useContext, useRef } from 'react'
import { users } from "@/store/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import {userDatafetch } from "@/config/userEndpoints";
import HomeNav from '@/components/User/Navbar/HomeNav';
import Newnav from '@/components/User/Navbar/Newnav';
import ChatSidebar from '@/components/User/Home/chat/ChatSidebar';
import ChatBox from '@/components/User/Home/chat/ChatBox';
import { userChat } from '@/config/chatEndpoints';
import {io} from  'socket.io-client'
import { AuthContext } from '@/context/AuthContext';
function chat() {
    let dispatch = useDispatch();
    const router=useRouter();
  // const socket=useRef()
    let user=useSelector((state)=>state.users.value)
    const [chats,setChats]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
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
      socket.emit("new-user-add",user?._id)
      socket.on("get-users",(user)=>{
        setOnlineUsers(user)
       
      })
//this is some doubt
    },[user])

        //recieve message from server

        useEffect(()=>{
          socket.on('receive-message',(data)=>{
            setRecieveMessage(data)
          })
        },[])
  
  
  
    useEffect(() => {
      // function created for do await
      async function invoke() {
        if (localStorage.getItem("usertoken")) {
          const data = await userDatafetch({
            usertoken: localStorage.getItem("usertoken"),
          });
          
          //    setUser(data.userDetails)
          dispatch(users(data.userDetails));
          if (data.status == "failed") {
            router.push("/auth");
          } else if (data.auth) {
            if (data?.userDetails?.isBanned) {
              localStorage.removeItem("usertoken");
  
              toast.error(`OOPS! You were banned few days `, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
  
              router.push("/auth");
            } else {
              router.push("/chat");
            }
          }
        } else {
          router.push("/auth");
        }
      }
      invoke();
    }, []);

    useEffect(()=>{
      async function invoke(){
        const data=await userChat(user?._id)
        setChats(data.chat)
        
  
      }
      invoke();
  
    },[user])
  
  return (
    <>
      <div className=''>
      <HomeNav/>
    </div>
    <div className='py-6'>
      <Newnav />
    </div>

 <div class="  rounded-lg py-24 px-24 ">

<h2 className='px-16 text-sky-600 hover:text-sky-800'>Message</h2>
<div class="flex flex-row justify-between   "> 


   {chats?.map((chat)=>(
     
       <ChatSidebar  data={chat} currUserId={user?._id} currentChat={currentChat}  setCurrentChat={setCurrentChat} />
      
    ))} 

<ChatBox chat={currentChat} currentUser={user?._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
</div>
</div>
     
           
    
    </>
  )
}

export default chat