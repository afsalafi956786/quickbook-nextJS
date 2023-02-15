
import { Inter } from '@next/font/google'

import { useEffect } from 'react'
import { userDatafetch } from '@/config/userEndpoints';
import { useRouter } from 'next/router'
import SideBar from '@/components/User/Sidebar/SideBar';
import HomePage from '@/components/User/Home/HomePage';
import Cards from '@/components/User/Home/Cards';
import FinalNav from '@/components/User/Navbar/FinalNav';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router=useRouter();

  useEffect(()=>{
    // function created for do await 
        async function invoke(){
        if(localStorage.getItem('usertoken')){
          const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
          console.log(data)
          if(data.status=='failed'){
            router.push('/auth')
          }else if(data.auth){
            router.push('/')
          }
        }else{
          router.push('/auth')
        }
        }
        invoke();
      
              
  
      },[])
  
  return (
    <>
   <FinalNav/>
   <HomePage/>
   <Cards/>
    
   
   

    </>
  )
}
