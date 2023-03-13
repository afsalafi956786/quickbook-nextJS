import React, { useState } from 'react'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import UserSide from '@/components/User/Home/Userside'
import BookingHistory from '@/components/User/Home/BookingHistory'
import { users } from "@/store/users";
import { useEffect } from 'react'
import {userDatafetch,getBookings } from "@/config/userEndpoints";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'



function bookings() {

    let dispatch = useDispatch();
    const router=useRouter();
    const [booked,setBooked]=useState({})
    const [refresh,setRefresh]=useState(false)
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
                router.push("/bookings");
              }
            }
          } else {
            router.push("/auth");
          }
        }
        invoke();
      }, []);


      useEffect(()=>{
        async function run(){
            const bookings=await getBookings({'usertoken':localStorage.getItem('usertoken')})
            setBooked(bookings)           

        }

        run();

      },[refresh])


  return (
   <>

    <div className=''>
      <HomeNav/>
    </div>
    <div className='py-6'>
      <Newnav />
    </div>

    <div className='flex lg:flex-row md:flex-col sm:flex-col xs:flex-col' >
      <div>
        <UserSide/>
      </div>
        
      <BookingHistory setRefresh={setRefresh} refresh={refresh} booked={booked}/>
            </div>
       
       
         
   </>
  )
}

export default bookings