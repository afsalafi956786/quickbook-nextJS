import React from 'react'
import SideBar from '@/components/User/Sidebar/SideBar'
import RoomData from '@/components/User/Home/RoomData'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { users } from "@/store/users";
import { userDatafetch,getLocation } from '@/config/userEndpoints'



function location({location}) {

  let dispatch = useDispatch();
  let router = useRouter();
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
            // router.push("/room");
          }
        }
      } else {
        router.push("/auth");
      }
    }
    invoke();
  }, []);

  return (
    <>
       <HomeNav/>
      <div className="container p-[15px]  mx-auto relative">
        {/* <Booking/>  */}
      </div>
      <Newnav/>
      <div className="flex">
        <SideBar/>
        <RoomData location={location}/>
      </div>
    </>
  )
}

export default location

export async function getServerSideProps(context){
  const data=await getLocation(context.params.location)
  return{
    props:{
      location:data 
      
    }
  }
}