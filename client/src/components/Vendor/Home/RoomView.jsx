import React from 'react'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';
import swal from "sweetalert";
import { DeleteRoom } from '@/config/venderEndpoints';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';

function RoomView({roomData,setRefresh,refresh}) {
    const router=useRouter();
    // useEffect(()=>{
    //   console.log(roomData,"====");
    // },[roomData])
  return (
    <>

<div className="py-14 px-4 md:px-6  2xl:px-20 2xl:container 2xl:mx-auto">
     <ToastContainer />
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
        
            {
                roomData?.map((rooms)=>(
                  <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <h4 className=" md:text- lg leading-6 xl:leading-5 text-gray-800">
               Approval :
               { rooms.isApproved ?
                <span className='text-green-700'>confirmed</span> 
               : rooms.isRejected ? <span className='text-red-700'>Rejected</span>:
                <span className='text-yellow-500'>waiting for admin approval</span> 
               
               }
               
              </h4>

              <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img onClick={async()=>{
                    router.push(`room/${rooms._id}`)
                  }}
                    className="w-full hidden md:block cursor-pointer"
                    src={rooms?.img[0]}
                    alt="dress"
                  />
                  <img onClick={async()=>{
                    router.push(`room/${rooms._id}`)
                  }}
                    className="w-full md:hidden cursor-pointer"
                    src={rooms?.img[0]}
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-sky-600">
                     {rooms?.vendorId?.propertyName}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-700 font-bold">Property type : </span> 
                        {rooms?.propertyType}
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-700 font-bold">Category : </span> {rooms?.category}
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-700 font-bold">Location : </span> {rooms?.location}
                      
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-700 font-bold">Rate : </span> {rooms?.price}
                      
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between cursor-pointer space-x-8 items-start w-full">
                    <p  onClick={async()=>{
                    router.push(`room/${rooms._id}`)
                  }}
                     className="font-bold text-sky-600 hover:text-sky-800  leading-6">
                      view more
                      <span className="text-green-500 "> </span>
                    </p>
                    {
                      rooms.isBanned? (
                      <p className="text-base xl:text-lg leading-6 text-red-700">
                     blocked
                    </p>
                      ):(
                        <p className="text-base xl:text-lg leading-6 text-green-700">
                        Active
                       </p>
                      )
                    }
                     
                     {
                        rooms.isBanned? ( 
                            <button 
                            className="   p-1 rounded px-3 font-semibold bg-sky-200 leading-6 text-white" disabled>
                             Edit
                           </button>

                        ):(
                            <button onClick={()=>{
                                console.log('worjed');
                                router.push(`edit/${rooms._id}`)
                            }}

                      className=" p-1 rounded px-3 font-semibold hover:bg-sky-800 bg-sky-600 leading-6 text-white">
                       Edit
                     </button>
                        )
                     }
                    
                       <DeleteIcon onClick={()=>{
                          swal({
                            title: "Are you sure?",
                            background:'black',
                            text: "Once delete, you can't retrieve back",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then(async (wilDelete)=>{
                            if(wilDelete){
                                 const data=await DeleteRoom({'vendortoken':localStorage.getItem('vendortoken')},rooms._id)
                                 console.log(data,'----+++++++++++++++')
                                 if(data?.status=='success'){
                                  setRefresh(!refresh)
                                  toast.success( `Wow! ${data?.message}`, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    }); 
                                 }
                            }
                          })
                           
                       }} className='text-red-600 hover:text-red-400'/>
                   
                     
                  
                   
                  </div>
                  
                </div>
          {/* <p className=''>Approved</p> */}
              </div>
          
              
             
            </div>
             ))}
          </div>
        </div>
      </div>
    
    </>
  )
}

export default RoomView