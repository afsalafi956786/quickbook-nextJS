import React from 'react'
import SideBar from '@/components/Vendor/Home/SideBar'
import VendorNav from '@/components/Vendor/Nav/VendorNav'
import { useEffect,useState } from 'react'
import { vendorDatafetch,roomViewData } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'
import RoomView from '@/components/Vendor/Home/RoomView'



function rooms() {


    const router=useRouter();
    const [vendor,setVendor]=useState('')
    const[roomData,setRoomData]=useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
        async function invoke(){
            if(localStorage.getItem('vendortoken')){
                const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
                setVendor(data.vendorDetails)
                if(data.status =='failed'){
                    router.push('/vendor/login')
                }else if(data.auth){
                    router.push('/vendor/rooms')
                }
            
            }else{
                router.push('/vendor/login')
            }
    
        }
        invoke()
    
      },[])

      useEffect(()=>{
        async function run(){
            const roomDatas=await roomViewData({'vendortoken':localStorage.getItem('vendortoken')})
            setRoomData(roomDatas.roomView);
           
        }
        run()

      },[refresh])

  return (
    <>
    <VendorNav vendor={vendor}/>

<div className='md:lg:h-auto xs:h-auto  flex bg-gray-100 items-center'>
 <div className='grid mb-4 h-[97%] w-[97%] sm:mt-4 xs:mt-4 rounded bg-white   xs:grid-cols-1 overflow-hidden lg:md:grid-cols-[13rem_auto] mx-6 gap-[10px] lg:md:grid-cols-[20% auto]'>
   <SideBar className='bg-gray-300'/>
   <RoomView roomData={roomData} setRefresh={setRefresh} refresh={refresh}/>
    
     </div>

   </div>
      </>
  )
}

export default rooms
