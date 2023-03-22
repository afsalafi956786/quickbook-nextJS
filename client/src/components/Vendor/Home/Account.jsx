import React from 'react'
import { useRef,useState,Fragment } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector,useDispatch } from 'react-redux';
import { editVendorProfile } from '@/config/venderEndpoints';
import {vendor} from '@/store/vendor';

function Account({setRefresh,refresh}) {
    let dispatch = useDispatch()
    const vendors=useSelector((state)=>state.vendor.value)
    const [open, setOpen] = useState(false);
    // const [loading,setLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    const coverPickerRef = useRef(0)
    const profilePickerRef = useRef(0)
    const [profileImage, setProfileImage] = useState(null)  

    function closeModal() {
        setIsOpen(false);
      }
    
      function openModal() {
        setIsOpen(true);
      }

 

      const addProfilePhoto = (e)=>{
        try {
            
          let filePath = e.target.files[0].name;
          // Allowing file type
          let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
          if (!allowedExtensions.exec(filePath)) {
            toast.error(`OOPS! invalid file type`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              return false;
          }
          //base 64 conversion
          const reader = new FileReader();
          if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
          }
          reader.onload = (readerEvent)=>{
            setProfileImage(readerEvent.target.result)
          }
        } catch (error) {
          console.log(error)
        }
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        let obj = {
          name: data.get("name"),
          email: data.get("email"),
          image:profileImage || null,
          propertyName:data.get('propertyName'),
          propertyLocation:data.get('propertyLocation'),
          
        };
      console.log(data.profileImage)
             let regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if(obj.name && obj.email  && obj.propertyName && obj.propertyLocation){
                if(regEmail.test(obj.email)){
                    const data=await editVendorProfile(obj,{'vendortoken':localStorage.getItem('vendortoken')})
                    console.log(data)
                    if(data.status=='success'){
                        setRefresh(!refresh)
                        dispatch(vendor(data.editVendor))
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
    <div className="h-full px-6 py-32 ">
 
 <div className="border-b-2 block md:flex">
 <ToastContainer />

   <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
     <div className="flex justify-between">
       <span className="text-xl font-semibold text-sky-600 block">Vendor Profile</span>
       <a href="#" onClick={openModal} className="-mt-2 text-md font-bold text-white bg-sky-600 rounded-xl px-5 py-2 hover:bg-sky-800">Edit</a>
     </div>

   
     <div className="w-full p-8 mx-2 flex justify-center">
       <img id="showImage" className="max-w-xs w-32 h-32 items-center rounded-full border" src={`${vendors?.image ?vendors.image:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}`} alt=""/>                          
       </div>
   </div>
   
   <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
     <div className="rounded  shadow p-6">
       <div className="pb-6">
         <div className="flex">
           <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value= {vendors?.name} />
         </div>
       </div>
       <div className="flex pb-4">
           <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={vendors?.email} />
         </div>
         <div className="flex pb-4">
           <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={vendors?.propertyName} />
         </div>
         <div className="flex pb-4">
           <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value= {vendors?.propertyLocation} />
         </div>
     </div>
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
                  <div className="inline-block align-bottom bg-gray-50 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
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
                        <div className="text-[#6e767d] flex gap-x-3 relative">
                            
                            <div className="absolute   left-6 w-28 rounded-2xl bg-gray-200 h-28 ">
                            < CreateIcon className="right-2 bottom-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140" onClick={()=>profilePickerRef.current.click()}/>
                              <img
                                 src={`${profileImage?profileImage:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}`}
                                alt=""
                                className="rounded-2xl h-full w-full object-cover mr-2 "
                              />
                              <input type="file" accept="image/*" onChange={addProfilePhoto} ref={profilePickerRef} hidden  />
                            </div>
                        </div>

                        <div className="mt-24 flex space-x-3 w-full">
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
                                defaultValue={vendors?.name}
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
                                defaultValue={vendors?.email}
                              />
                            </div>
                           
                       
                          
                                 <div className="mb-6">
                              <label className="block text-black text-sm font-bold mb-2">
                                Property name
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="companyname"
                                name="propertyName"
                                defaultValue={vendors?.propertyName}
                                type="text"
                                placeholder="Enter property name"
                              />
                        
                            </div>
                            <div className="mb-6">
                              <label className="block text-black text-sm font-bold mb-2">
                                Property location
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="companyname"
                                name="propertyLocation"
                                defaultValue={vendors?.propertyLocation}
                                type="text"
                                placeholder="Enter property location"
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

export default Account