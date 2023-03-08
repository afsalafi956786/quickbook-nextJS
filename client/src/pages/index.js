
import { Inter } from '@next/font/google'

import { useEffect } from 'react'
import { userDatafetch,getRoomInfo } from '@/config/userEndpoints';
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
import { useDispatch } from 'react-redux'
import {users} from '@/store/users';
import {rooms} from '@/store/rooms';
import Newnav from '@/components/User/Navbar/Newnav';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const router=useRouter();
  // const [user,setUser]=useState('')
  let dispatch=useDispatch()
  

  useEffect(()=>{
    // function created for do await 
        async function invoke(){
        if(localStorage.getItem('usertoken')){
          const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
        //  setUser(data.userDetails)
        dispatch(users(data.userDetails))
          if(data.status=='failed'){
            router.push('/auth')
            
          }else if(data.auth){
              if(data?.userDetails?.isBanned){
                localStorage.removeItem('usertoken')
               

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

      useEffect(()=>{
        async function run(){
          const roomDetails=await getRoomInfo();
          dispatch(rooms(roomDetails.roomData))
         
        }
        run()
    
      },[])

  
  
  return (
    <>

   
    
<HomeNav/>
    <div className='container p-[15px]  mx-auto relative'>  
    <ToastContainer />
       {/* <Booking/>  */}
    </div>
    <Newnav/>
    <Plan/>

    <h1 className='mt-6 px-24 text-gray-600 '>Browse your Rooms</h1>
    <section className='py-24  sm:ml-12  '>
        <div className='   '>
            <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px]
               lg:grid-cols-3 lg:max-w-none lg:mx-0'
            >
            <HomePage/>
            </div>

        </div>
          
    </section>
    <h1 className='mt-6 px-24 text-gray-600 '>Top category</h1>
    
  <Room/>
  <Footer/>
   

    </>
  )
}
