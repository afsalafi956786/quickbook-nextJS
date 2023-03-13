import Success from '@/components/User/Home/Success'
import React from 'react'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import {userDatafetch } from "@/config/userEndpoints";
import { users } from "@/store/users";
import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function success({bookingData}) {
    let dispatch = useDispatch();
    const router=useRouter();
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
                // router.push("/success");
              }
            }
          } else {
            router.push("/auth");
          }
        }
        invoke();
      }, []);

      useEffect(()=>{
        if (bookingData == undefined) {
          router.push('/')
        }
      },[])
      
  return (
    <>
    { bookingData == undefined ? '' : 
   <>
  <HomeNav />
      <div className="container p-[15px]  mx-auto relative">
        {/* <Booking/>  */}
      </div>
      <Newnav />
   <Success bookingData={bookingData}/> 
   
   </>
  }
  </>
  )
}

export default success

export function getServerSideProps(context){
    const {obj}=context.query  
    try{
        const detail=JSON.parse(obj)
        return{
            props:{
                bookingData:detail
            }
        }
    }catch(error){
        return{
            props:{

            }
        }

       
    }
}