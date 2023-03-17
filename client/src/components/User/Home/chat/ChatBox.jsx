import React from 'react'
import InputEmojiWithRef from 'react-input-emoji'
import { getUsers } from '@/config/userEndpoints'
import { useState,useEffect } from 'react'
import { getMessage,addMessages } from '@/config/chatEndpoints'
import {format} from 'timeago.js'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRef } from 'react'

function ChatBox({chat,currentUser,setSendMessage,recieveMessage}) {
  const [userData,setUserData]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMessage,setNewMessage]=useState('')
  const scroll =useRef()

  useEffect(()=>{
    if(recieveMessage!==null && recieveMessage.chatId===chat?._id){
      setMessages([...messages,recieveMessage])

    }

  },[recieveMessage])

  useEffect(()=>{
    const userId=chat?.members?.find((id)=>id!==currentUser)
    async function invoke(){
      const data=await getUsers(userId)
      setUserData(data.vendor)
   }
   if(chat!==null) invoke();
  },[chat,currentUser])

  useEffect(()=>{
    async function fetch(){
      const data=await getMessage(chat._id)
      
      setMessages(data.result)


     }
   if(chat !==null) fetch();
},[chat])

function handleChange(newMessage){
  setNewMessage(newMessage)
}


async function handlSend(e){
  e.preventDefault();
     const message={
       senderId:currentUser,
       text:newMessage,
       chatId:chat?._id,
     }
     const data=await addMessages(message)
     setMessages([...messages,data])
     setNewMessage('')

       //send message to socket
       const receiverId=chat.members.find((id)=>id !== currentUser)
       setSendMessage({...message,receiverId})
 
   }

     //always scroll
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:'smooth'})

  },[messages])


  return (
    <>
    <div className="w-full px-5 flex flex-col  justify-between">
   
    {chat?(
 <div className="flex flex-col mt-5 lg:md:w-full sm:w-full xs:w-[150%]">
  
  <div  className="cursor-pointer border-b flex  p-4 bg-white fixed w-[70%] -mt-32 ">
        {/* {userData? <AccountCircleIcon classNameName='text-4xl ml-4 text-gray-600' /> :'' } */}
        <img
          src={userData?.image ? userData?.image : <AccountCircleIcon/> }
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
        <h2 className='ml-6 text-gray-700 '>{userData?.name}</h2>
      </div>
    
      
      {/* <div   className="flex justify-start mb-4">
        <div
          className="mr-2 flex flex-col py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
        >
        sfjbsjfnsdkjsnkjsndfkjnsdkjfnsdkjfnsdkjfnkjf
         <span className='text-sm text-gray-300 mt-1'></span>
        </div>
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      </div>  */}
    

   
       
       {messages?.map((message)=>( 
        <>
        {message.senderId == currentUser ?
      <div className="flex justify-start mb-4 ">
        {/* <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        /> */}

        <AccountCircleIcon className='text-3xl'/>
        <div   ref={scroll}
          className="ml-2 py-3 px-4 flex flex-col bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white "
        >
          {message?.text} 
       <span className='text-sm text-gray-300 mt-1'>{format(message?.createdAt)}</span>
        </div>
      </div>  
      :
      <div   className="flex justify-end mb-4 mt-3 ">
        <div
          className="mr-2 flex flex-col py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
        >
         {message?.text}
         <span className='text-sm text-gray-300 mt-1'>{format(message?.createdAt)}</span>
        </div>
        <img
          src={userData?.image ? userData?.image : <AccountCircleIcon/> }
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      </div>
      }
      </>
      ))} 
      
       <div className="py-5 flex ">
          <InputEmojiWithRef 
          value={newMessage}
          onChange={handleChange}
          
          />
          

<button onClick={handlSend} className='bg-sky-600 text-white text-bold rounded-lg px-6 h-10  hover:bg-sky-800'>sent</button>

    </div>
   
    </div>
     ):(
      <div className='bg-gray-50 h-[400px] flex flex-col justify-center'>
        <h2 className='xl-shadow text-gray-600 text-center py-12'>Tab on a chat to start conversation</h2>
      </div>
      
    )} 
   
   
     
  </div>


    
    </>
  )
}

export default ChatBox