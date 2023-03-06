import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { getPropertyStatus } from "@/config/AdminEndpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Properties({setRefresh,refresh}) {
  const router=useRouter();
  const room = useSelector((state) => state.rooms.value);
  console.log(room);
  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <ToastContainer />
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <h2 className=" md:text-xl  leading-6 xl:leading-5 text-gray-800">
                Properties
              </h2>
            {
                room?.map((rooms)=>(

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
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
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
                    <p onClick={async()=>{
                      router.push(`room/${rooms._id}`)
                    }} className="font-bold text-sky-600 hover:text-sky-800  leading-6">
                      view
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
                   
                    { rooms.isBanned ?(
                          <button onClick={()=>{
                            swal({
                              title: "Are you sure?",
                              background:'black',
                              text: "Do you want to unblock this property",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then(async (wilDelete)=>{
                              if(wilDelete){
                               const data= await getPropertyStatus(rooms._id,false)
                               if(data.status=='success'){
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

                          }}

                           className=" p-1 rounded px-3 font-semibold bg-green-600 leading-6 text-white">
                      Unblock
                    </button>
                    ):(
                      <button   onClick={()=>{
                        swal({
                          title: "Are you sure?",
                          background:'black',
                          text: "Do you want to unblock this property",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                        }).then(async (wilDelete)=>{
                          if(wilDelete){
                           const data= await getPropertyStatus(rooms._id,true)
                           if(data.status=='success'){
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

                      }}

                       className=" p-1 rounded hover:bg-red-800 px-3 font-semibold bg-red-600 leading-6 text-white">
                      Block
                    </button>
                    )
                   
                    }
                   
                  </div>
                </div>
              </div>
               ))}
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Properties;
