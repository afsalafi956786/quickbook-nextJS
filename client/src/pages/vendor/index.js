import DashRight from '@/components/Vendor/Home/DashRight'
import MainDash from '@/components/Vendor/Home/MainDash'
import SideBar from '@/components/Vendor/Home/SideBar'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { vendorDatafetch } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import { useDispatch, useSelector } from 'react-redux'
import {vendor} from '@/store/vendor'
import { vendorDash, fetchRooms, vendorGraph} from '@/config/venderEndpoints'
import {rooms} from '@/store/rooms'





function home() {
   const router=useRouter();
   let dispatch=useDispatch()

   let room=useSelector((state)=>state.rooms.value);

   const [dashboard,setDashboard]=useState({})

   const [monthlySalary,setMonthlySalary]=useState([])

  useEffect(()=>{
    async function invoke(){
        if(localStorage.getItem('vendortoken')){
            const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
            console.log(data)
            // setVendor(data.vendorDetails)
            dispatch(vendor(data.vendorDetails))
            if(data.status =='failed'){
                router.push('/vendor/login')
            }else if(data.auth){
                router.push('/vendor')
            }
        
        }else{
            router.push('/vendor/login')
        }

    }
    invoke()

  },[])


  useEffect(()=>{
    async function value(){
      let  roomData=await fetchRooms({'vendortoken':localStorage.getItem('vendortoken')})
      dispatch(rooms(roomData))
    }
    value()
  },[])

  useEffect(()=>{
   async function run(){
        const datas=await vendorDash({'vendortoken':localStorage.getItem('vendortoken')})
       setDashboard(datas)
    }
    run()

  },[])



  useEffect(()=>{
    async function load(){
      const graph=await vendorGraph({'vendortoken':localStorage.getItem('vendortoken')})
      setMonthlySalary(graph)
     }
     load()
  },[])

  // useEffect(()=>{
  //   async function running(){
  //     const salesReport=await getSalesReport({'vendortoken':localStorage.getItem('vendortoken')})

  //   }
  //   running()
  // },[])
  


  return (
    <>
<VendorNav/>
    <div className='md:lg:h-[full] xs:h-auto  flex bg-gray-100 items-center'>
        
        <div className='grid h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto_20rem] mx-6 gap-[10px] lg:md:grid-cols-[20% 50% auto]'>
            <SideBar className='bg-gray-300'/>
            <MainDash dashDetails={dashboard} monthlySalary={monthlySalary}/>
           
          <DashRight/>
      

        </div>
      
    </div>
      </>
  )
}

export default home
