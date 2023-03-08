
import Profile from '@/components/User/Home/Profile'
import UserSide from '@/components/User/Home/Userside'
import HomeNav from '@/components/User/Navbar/HomeNav'

import React from 'react'
import Password from '@/components/User/Home/Password'
import { useEffect,useState } from 'react'
import { userDatafetch } from '@/config/userEndpoints';
import { useRouter } from 'next/router'
import {users} from '@/store/users'
import { useDispatch } from 'react-redux'
import Newnav from '@/components/User/Navbar/Newnav'


function profile() {
    const router=useRouter();
    // const [user,setUser]=useState('')
    let dispatch = useDispatch()
    const [refresh,setRefresh]=useState(false)
  
    useEffect(()=>{
      // function created for do await 
          async function invoke(){
          if(localStorage.getItem('usertoken')){
            const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
           console.log(data)
        //    setUser(data.userDetails)
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
                  router.push('/profile')
                }
             
            }
          }else{
            router.push('/auth')
          }
          }
          invoke();
        
                
    
        },[refresh])
    
  return (
    <>
    <div className=''>
      <HomeNav/>
    </div>
    <div className='py-6'>
      <Newnav />
    </div>
    
         
     <div className='grid lg:grid-cols-4 -mt-12  md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  sm:content-center xs:content-center ' >
     
        <UserSide/>

        <Profile setRefresh={setRefresh} refresh={refresh} />
        <Password setRefresh={setRefresh} refresh={refresh}/>
        </div>
    
   
    
    </>
  )
}

export default profile