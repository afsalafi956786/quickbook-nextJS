import React from "react";
import moment from "moment/moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteCoupon } from "@/config/venderEndpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Fragment } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { createCoupon } from '@/config/venderEndpoints';
import { Dialog, Transition } from "@headlessui/react";

function CouponView({ coupons,setRefresh,refresh }) {
  // const startDate=moment(coupons?.startDate).format('DD-MM-YYYY',';;;;;;;;;;;;;;;')
  // const endDate=moment(coupons?.endDate).format('DD-MM-YYYY','eeeeeeeeeeeee')

  let [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [codeErr,setCodeErr]=useState('')
  const [dateErr,setdateErr]=useState('')

  const today = new Date()
     
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  
  let handleSubmit = async(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    let obj={
      code:inputValue,
      discount:data.get('discount'),
      startDate:data.get('startDate'),
      endDate:data.get('endDate')
    }
  
    obj.startDate = new Date(obj.startDate)
    if(obj.code && obj.discount && obj.startDate && obj.endDate){
      if(inputValue.length <= 12){
        if(today.getDay()<=obj.startDate.getDay()){                                              
             const data=await createCoupon(obj,{'vendortoken':localStorage.getItem('vendortoken')})
            console.log(data)
            if(data?.status=='success'){
                setRefresh(!refresh);
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
                
            }
            
        }else{
          setdateErr('please Enter valid date')
        }
      }else{
        setCodeErr('Input value must be 12 character or shot.')    
      }
  
    }else{
      
      toast.error(`OOPS! All fields are required`, {
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
      <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
      <ToastContainer />
        <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
          <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
           
            <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-sky-600">
              Coupons
            </h3>
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
                      <div className="text-sky-600">Coupon</div>
                    </div>
                    <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                      <div className="w-full">
                     

                        <div className=" flex space-x-3 w-full">
                          <div className="flex-grow mt-5">
                          <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                              
                              <label  className="block text-black text-sm font-bold mb-2">
                              Coupon code
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="fullname"
                                type="text"
                                name="code"
                                value={inputValue}
                                onChange={ handleInputChange}
                                // defaultValue={vendors?.name}
                                placeholder="Enter the coupon code here"
                              />
                                <p className='text-red-500 text-md'>{codeErr}</p> 
                              
                              
                              
                            </div>
                            <div className="mb-4">
                              
                              <label className="block text-black text-sm font-bold mb-2">
                              discount (Amount)
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="fullname"
                                type="text"
                                name="discount"
                                // defaultValue={vendors?.name}
                                placeholder="Enter the coupon discount"
                              />
                              
                              
                            </div>
                         

                            <div className="mb-4">
                              <label className="block text-black text-sm font-bold mb-2">
                              start date
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="date"
                                placeholder="Enter the start date"
                                name="startDate"
                                
                                // defaultValue={vendors?.email}
                              />
                                <p className='text-red-500 text-md'>{dateErr}</p>  
                            </div>
                        

                            <div className="mb-4">
                              <label className="block text-black text-sm font-bold mb-2">
                              End date
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                                id="dates"
                                type="date"
                                placeholder="Enter the End date"
                                name="endDate"
                                // defaultValue={vendors?.email}
                              />
                            </div>
                        
                            <div className="flex items-center justify-between pt-2.5">
                              <button
                                className="bg-sky-600 ml-auto text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-sky-800 disabled:opacity-50 disabled:cursor-default"
                                type="submit"
                                // disabled={!comment.trim()}
                              >
                                Submit
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

             <button onClick={openModal} className="ml-auto bg-sky-600 rounded text-bold text-white p-2 px-4 hover:bg-sky-800 cursor-pointer  ">Add coupon</button>
            {coupons?.map((coupn) => (
              <div key={coupn._id} className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
                <div className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full">
                  <div className="w-40 md:w-32">
                    <img
                      className="hidden md:block"
                      src="/logo/coupon.png"
                      alt="girl-in-red-dress"
                    />
                    <img className="md:hidden " src="/logo/coupon.png" />
                  </div>
                  <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                    <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                      <h4 className="text-md md:text-lg  w-full font-semibold leading-6 md:leading-5  text-sky-600">
                        <span className="text-sm text-gray-800">
                          coupon code:{" "}
                        </span>
                        {coupn?.couponCode}
                      </h4>
                      <p className="mt-2">Discount : <span className="mt-2 text-orange-600">₹{coupn?.discount}</span></p>
                      <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                        <p className="text-sm leading-none text-gray-600">
                          Start date:{" "}
                          <span className="text-gray-800">
                            {" "}
                            {moment(coupn?.startDate).format("MMM Do YY") }
                          </span>
                        </p>
                        <p className="text-sm leading-none text-gray-600">
                          End date:{" "}
                          <span className="text-gray-800">
                          {moment(coupn?.endDate).format("MMM Do YY") }
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                      <DeleteIcon
                        onClick={() => {
                          swal({
                            title: "Are you sure?",
                            background: "black",
                            text: "Once delete, you can't retrieve back",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then(async (wilDelete) => {
                            if (wilDelete) {
                                const data=await DeleteCoupon({'vendortoken':localStorage.getItem('vendortoken')},coupn._id)
                              if (data?.status == "success") {
                                setRefresh(!refresh);
                                toast.success(`Wow! ${data?.message}`, {
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
                          });
                        }}
                        className="text-red-700 cursor-pointer hover:text-red-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CouponView;
