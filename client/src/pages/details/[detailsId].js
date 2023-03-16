import Details from '@/components/User/Home/Details'
import Footer from '@/components/User/Home/Footer'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import Map from '@/components/User/Home/Map'
import { users } from "@/store/users";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import React from 'react'
import {userDatafetch,getDisplayDetails,getReviews,getCoupons } from "@/config/userEndpoints";


function details({rooms}) {
  let dispatch = useDispatch();
  let router = useRouter();
  const room=useSelector((state)=>state.rooms.value);
  const [reviews,setReviews]=useState({})
  const [coupon,setCoupon]=useState([])

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
            // router.push("/details");
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
    const review= await getReviews(rooms?._id,{'usertoken':localStorage.getItem('usertoken')})
    setReviews(review) 
    }
    run();

  },[])

  useEffect(()=>{
    async function run(){
      const couponCode=await getCoupons(rooms?.vendorId?._id)
      setCoupon(couponCode)
    
    }
    run();

  },[])
  

  
  
  return (
   <>
<div className=''>
   <HomeNav/>
   </div>
   <div className='py-8'>
    <Newnav/> 
   </div>

    <Details rooms={rooms} userReview={reviews} coupon={coupon} />
   <Map rooms={rooms}/>
    <Footer/>


   </>
  )
}

export default details


export async function getServerSideProps(context){
  const data=await getDisplayDetails(context.params.detailsId)

  return{
    props:{
      rooms:data

    }
  }
}