import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { useState,Fragment } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import { editUserProfile } from '@/config/userEndpoints';
import { useSelector } from 'react-redux';
function Profile({setRefresh,refresh}) {
  let user=useSelector((state)=>state.users.value)
  const [open, setOpen] = useState(false);
  // const [loading,setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let obj = {
      name: data.get("name"),
      email: data.get("email"),
      address:data.get('address') || null,
     
    };
    let regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(obj.name && obj.email){
      if(regEmail.test(obj.email)){
          const data=await editUserProfile(obj,{'usertoken':localStorage.getItem('usertoken')})
          console.log(data)
          if(data.status=='success'){
            setRefresh(!refresh)
              // dispatch(vendor(data.editVendor))
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
                  setIsOpen(false)
                  
          }else{
              toast.error(`OOPS! ${data?.message}`, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
          }
      }else{
          toast.error(`OOPS! enter valid email`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
       
      }

  }else{
      toast.error(`OOPS! all fields are required`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
  }

  }
  return (
   <>

      <div className='lg:md:mt-[60%] xs:mt-12 sm:mt-[60%] xs:ml-16 '>
    
            <div>
            <ToastContainer />
            
                <div className="max-w-xs h-auto flex flex-col items-center shadow-lg rounded-lg border border-gray-300 mb-6 py-5 px-4">
                    <div>
                        <h4 className="text-gray-400  font-bold  ">Full Name </h4>
                     
                    </div>
                    <div>
                        <h4 className="text-gray-800  font-bold  ">{user?.name}</h4>
                     
                    </div>
                    <div>
                        <h4 className="text-gray-400 font-bold mt-4  ">Email Address</h4>
                     
                    </div>
                    <div>
                        <h4 className="text-gray-800 d font-bold mb-3"> {user?.email}</h4>
                     
                    </div>

                    <div>
                        <h4 className="text-gray-400 d font-bold"> Booking Address</h4>
                     
                    </div>
                        
                   {user?.address ? <h4 className="text-sm text-gray-800 ">Arangadu house kavanoor po malappuram</h4> : ''
                      } 
                    <div>
                        <h4 className="text-gray-400  font-bold mt-4">Phone number</h4>
                     
                    </div>
                   
                    <h4 className="text-sm text-gray-800 ">{user?.phone}</h4>
                    <CreateIcon onClick={openModal} className='ml-auto hover:text-sky-600 cursor-pointer'/>
                </div>
                
            </div>
       
    </div>


    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={closeModal}>
          <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-scroll">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed scroll-m-2 inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block align-bottom bg-gray-50 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:max-w-xl sm:w-full">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-black">
                      <div
                        className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <CloseIcon  className="h-[22px] text-black cursor-pointer" />
                      </div>
                      <div className="text-sky-600">profile edit</div>
                    </div>
                    <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                      <div className="w-full">
                     

                        <div className=" flex space-x-3 w-full">
                          <div className="flex-grow mt-5">
                          <form  onSubmit={handleSubmit}>
                            <div className="mb-4">
                              
                              <label className="block text-black text-sm font-bold mb-2">
                             name
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="fullname"
                                type="text"
                                name="name"
                                defaultValue={user?.name}
                                placeholder="Enter your name"
                              />
                              
                              
                            </div>
                            <div className="mb-4">
                              <label className="block text-black text-sm font-bold mb-2">
                                Email
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="enter you email"
                                name="email"
                                defaultValue={user?.email}
                              />
                            </div>
                           
                            <div className="mb-4">
                              <label className="block text-black text-sm font-bold mb-2 ">
                                Address
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="enter your address"
                                name="address"
                                defaultValue={user?.address}
                              />
                            </div>
                       
                          
                              
                            

                            <div className="flex items-center justify-between pt-2.5">
                              <button
                                className="bg-sky-600 ml-auto text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-sky-800 disabled:opacity-50 disabled:cursor-default"
                                type="submit"
                                // disabled={!comment.trim()}
                              >
                                Update
                              </button>
                            
                            </div>
                            </form>
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

    
   </>
  )
}

export default Profile