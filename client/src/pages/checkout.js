import React from 'react'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import CheckOut from '@/components/User/Home/CheckOut'
import { useRouter } from 'next/router'
import {userDatafetch } from "@/config/userEndpoints";
import { users } from "@/store/users";
import { useDispatch } from "react-redux";
import { useEffect } from 'react'



function checkout({details}) {
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
            // router.push("/checkout");
          }
        }
      } else {
        router.push("/auth");
      }
    }
    invoke();
  }, []);

  useEffect(()=>{
    if(details == undefined){
      router.push('/')
    }
  },[])

  
  return (
    <>
    {details == undefined ? '':
    <>
  <HomeNav />
      <div className="container p-[15px]  mx-auto relative">
       
      </div>
      <Newnav />
      <CheckOut details={details}/>
      </>
    
    }
    </>
  )
}
//data passing using props
export default checkout
export function getServerSideProps(context){
  const {obj} = context.query

  try {
    const dat = JSON.parse(obj)
    return {
      props:{
        details:dat
      }
    }
    
  } catch (error) {
    return {
      props:{

      }
    }

  }
 

}