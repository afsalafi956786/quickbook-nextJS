
import { Inter } from '@next/font/google'

import { useEffect } from 'react'
import { userDatafetch } from '@/config/userEndpoints';
import { useRouter } from 'next/router'
import Booking from '@/components/User/Navbar/Booking'
import HomeNav from '@/components/User/Navbar/HomeNav'
// import Home from '@/components/User/Home/HomePage'
import Plan from '@/components/User/Home/Plan'
import Room from '@/components/User/Home/Rooms'
import Footer from '@/components/User/Home/Footer'
import HomePage from '@/components/User/Home/HomePage';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const router=useRouter();
  const [user,setUser]=useState('')

  useEffect(()=>{
    // function created for do await 
        async function invoke(){
        if(localStorage.getItem('usertoken')){
          const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
         console.log(data)
         setUser(data.userDetails)
          if(data.status=='failed'){
            router.push('/auth')
            
          }else if(data.auth){
              if(data?.userDetails?.isBanned){
                toast.error(`OOPS! all fields are required`, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });

                router.push('/auth')
              }else{
                router.push('/')
              }
           
          }
        }else{
          router.push('/auth')
        }
        }
        invoke();
      
              
  
      },[])
  
  return (
    <>

   
    
<HomeNav  user={user} />
    <div className='container p-[15px]  mx-auto relative'>  
    <ToastContainer />
       <Booking/> 
       {/* <Newnav/> */}
    </div>
    <Plan/>

    <h1 className='mt-6 px-24 '>Browse your Rooms</h1>
    <section className='py-24  sm:ml-12  '>
        <div className='   '>
            <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px]
               lg:grid-cols-3 lg:max-w-none lg:mx-0'
            >
            <HomePage/>
            </div>

        </div>
          
    </section>
  <Room/>
  <Footer/>
   

    </>
  )
}
