import AdminSide from '@/components/admin/home/AdminSide'
import Dashboard from '@/components/admin/home/Dashboard'
// import Navbar from '@/components/User/Navbar/Navbar'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import React from 'react'
import { adminData,userCountFetch,totalRevenue } from '@/config/AdminEndpoint'
import Router, { useRouter } from 'next/router'
import { useState,useEffect } from 'react'


function index() {
  const router=useRouter();

const [admin,setAdmin]=useState('')
const [adminDash,setAdminDash]=useState({})
const [revenue,setRevenue]=useState([])
const [graph,setGraph]=useState([])


  useEffect(()=>{
    async function invokeForAwait(){
        if(localStorage.getItem('admintoken')){
    const data=await adminData ({'admintoken':localStorage.getItem('admintoken')})
     console.log(data)
     setAdmin(data.adminDatas)
    if(data.status=='failed'){
      router.push('/admin/signin')
    }else if(data.auth){
      router.push('/admin')
    }
  }else{
    router.push('/admin/signin')
  }
    }
    invokeForAwait()
   },[])

   useEffect(()=>{
   async function run(){
      const userCount=await userCountFetch({'admintoken':localStorage.getItem('admintoken')})
      setAdminDash(userCount)
      // if(Array.isArray()){
      setRevenue(userCount.totalrevenue)
      // }

    }
    run()
   },[])

   useEffect(()=>{
    async function running(){
      const adminGraph=await totalRevenue()
        setGraph(adminGraph)
      
      

    }
    running();
   },[])

  return (
  <>

       
      <VendorNav admin={admin}/>
      {/* <Navbar/> */}
     <div className='md:lg:h-[full] xs:h-auto  flex bg-gray-100 items-center'>
      <div className='grid h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
        <AdminSide className='bg-gray-300'/>
        <Dashboard adminDash={adminDash} revenue={revenue} graph={graph}/>
          </div>

        </div>


  </>
  )
}

export default index
