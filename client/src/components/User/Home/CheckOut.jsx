import React from "react";
import moment from "moment/moment";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PaypalButton from "./PaypalButton";
import { useState } from "react";


function CheckOut({ details }) {

  
const [change,setChange]=useState(false);
const [booking,setBooking]=useState({})

  const startDate = details?.Date[0].startDate
  const endDate = details?.Date[0].endDate
  console.log(startDate,'---------start')
  console.log(endDate,']]]]]]]]]]]]]]]]]]end')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let obj = {
      address: data.get("address"),
      phone: data.get("phone"),
      place: data.get("place"),
      adult: details.Adult,
      check_in: startDate,
      check_out: endDate,
      roomCount: details.Room,
      dayPrice: details.dayprice,
      location: details.location,
      price: details.price,
      dayCount: details.daycount,
      type: details.type,
      total: details.total,
      roomId:details.roomId,
      vendorId:details.vendorId,
    };
    // console.log(obj.vendorId,'[[[')

    if (
      obj.address &&
      obj.phone &&
      obj.place &&
      obj.adult &&
      obj.check_in &&
      obj.check_out && 
      obj.location && 
      obj.price && 
      obj.dayPrice &&
      obj.type && 
      obj.total 
    ) {
      let regMob=/^([+]\d{2})?\d{10}$/;
      if(regMob.test(obj.phone)){
        setBooking(obj)
        setChange(true)
          
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
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
      <ToastContainer />
        <div
          className="
				flex
				justify-center
				items-center
				2xl:container 2xl:mx-auto
				lg:py-16
				md:py-12
				py-9
				px-4
				md:px-6
				lg:px-20
				xl:px-44
			"
        >
          <div
            className="
					flex
					w-full
					sm:w-9/12
					lg:w-full
					flex-col
					lg:flex-row
					justify-center
					items-center
					lg:space-x-10
					2xl:space-x-36
					space-y-12
					lg:space-y-0
				"
          >
            <div className="flex w-full flex-col justify-start items-start xs:mt-14 sm lg:-mt-24">
              <div className="">
                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Booking
                </p>
              </div>

              <div className="mt-12">
                <p className="text-xl leading-4 text-gray-800">
                  Enter your details
                </p>
              </div>

              <div className="mt-12 flex flex-col justify-start items-start w-full space-y-8">
                <input
                  className="
								focus:ring-2 focus:ring-gray-500 focus:outline-none
								px-2
								border-b border-gray-200
								leading-4
								text-base
								placeholder-gray-600
								py-4
								w-full
							"
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                />

                <input
                  className="
								focus:ring-2 focus:ring-gray-500 focus:outline-none
								px-2
								border-b border-gray-200
								leading-4
								text-base
								placeholder-gray-600
								py-4
								w-full
							"
                  type="text"
                  placeholder="Enter place"
                  name="place"
                />
                <input
                  className="
								focus:ring-2 focus:ring-gray-500 focus:outline-none
								px-2
								border-b border-gray-200
								leading-4
								text-base
								placeholder-gray-600
								py-4
								w-full
							"
                  type="text"
                  placeholder="Mobile Number"
                  name="phone"
                />
              </div>
         {
             !change ?(
              <button
              type="submit"
              className="
            mt-8
            text-base
            font-medium
            hover:bg-sky-800
            leading-4
            py-4
            w-full
            md:w-4/12
            lg:w-full
            text-white
            bg-sky-600
          "
            >
              Pay Now
            </button>
             ):(
              <div>
              <p className="mt-8 text-semibold text-orange-700">choose your  payment method  </p>
                 <div className="paypalbutton pt-12">
                  <PaypalButton  total={details?.total} bookingData={booking} />

                 </div>
                 </div>
             )
         }
             

               

            {/* <div class="relative flex  lg:w-[40%] border md:w-4/12 mt-8 border-gray-300 hover:bg-gray-200 cursor-pointer shadow-lg bg-white rounded ">
            <img className="h-[30%]  xs:w-[20%] sm:w-[20%]  lg:md:w-[30%] " src="https://freepngimg.com/save/13625-paypal-logo-transparent-png/1817x1266"/>
           <span className="mt-3 ml-4 text-bold text-xl text-blue-900">Pay <span className="text-sky-600">pal</span> </span> 
              </div>  */}
            </div>

            <div className="flex  flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 border border-gray-300 shadow-lg dark:text-gray-700">
              <h2 className="text-2xl font-semibold -mt-6">Booking Details</h2>
              <ul className="flex flex-col pt-4 space-y-2">
                <div className="h-[20%] w-[40%] ml-6 shadow-lg flex space-x-4">
                  <img className="rounded " src={details?.img1} />
                  <img className="rounded " src={details?.img2} />
                </div>
                <li className="flex items-start justify-between">
                  <div className="border p-2 ml-6 mt-4">
                    {details?.location}
                  </div>
                </li>
                <li className="flex items-start justify-between">
                  <div className="border p-2 ml-6 mt-4">
                    {moment(startDate).format("DD-MM-YYYY")} <spna className="text-orange-500">to</spna>{" "}
                    {moment(endDate).format("DD-MM-YYYY")}
                  </div>
                </li>

                <li className="flex items-start justify-between">
                  <div className="border p-2 ml-6 mt-2">
                    {details?.Adult} Adult {details?.Room} room
                  </div>
                </li>
              </ul>
              <div className="pt-4 space-y-2">
                <div className="p-2">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="border p-2 border-gray-400 shadow-md"
                      placeholder="enter your coupon code"
                      disabled
                    />
                    <div className="bg-white hover:cursor-none  ml-4  p-1 rounded text-white text-semibold px-5 ">
                      Apply
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs"></div>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                {details?.discount ?  <span>{details?.discount}₹</span> :<span>0₹</span> } 
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Day price</span>
                  <span>{details?.dayprice} ₹</span>
                </div>
                <div className="flex justify-between">
                  <span>Room price</span>
                  <span>{details?.price} ₹</span>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between mt-4">
                    <span>Total</span>
                    <span className="font-semibold text-xl text-orange-900">
                      {details?.total}₹
                    </span>
                  </div>
                  {/* <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded bg-sky-600 text-white "
                >
                  Pay pal
                </button> */}
                  {/* 
                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded bg-sky-600 text-white "
                >
                  continue booking
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CheckOut;
