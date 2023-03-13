import Review from '@/components/User/Home/Review'
import ReviewForm from '@/components/User/Home/ReviewForm'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import React from 'react'
import { userDatafetch,displayReview } from '@/config/userEndpoints';
import {users} from '@/store/users'
import { useDispatch,useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'

function review() {

  const router=useRouter();
  let dispatch = useDispatch()
  const room=useSelector((state)=>state.rooms.value);
  console.log(room,'/////////////////sdfdf');
  const [refresh,setRefresh]=useState(false)

  useEffect(()=>{
    // function created for do await 
        async function invoke(){
        if(localStorage.getItem('usertoken')){
          const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
         console.log(data)
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
                router.push('/review')
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

   <HomeNav/>

   <div className='py-8'>
    <Newnav/> 
   </div>
          <div class="min-h-screen flex items-center justify-center">
        <div class="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-5">
      
     <ReviewForm/>
      <Review/>
        </div>
    </div>

  

   
  
    
    
    </>
  )
}

export default review