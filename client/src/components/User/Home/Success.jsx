import React from "react";
import { useEffect } from "react";
import { SuccessDetails } from "@/config/userEndpoints";
import { useState } from "react";
// import moment from "moment/moment";
import moment from "moment/moment";
import { useRouter } from "next/router";

function Success({bookingData}) {
 const router=useRouter();

  const [roomData,setRoomData]=useState(null)
  const [refresh,setRefresh]=useState(false)

  // const checkIn = moment(bookingData?.checkIn).format("DD-MM-YYYY");
  // const checkOut = moment(bookingData?.checkOut).format("DD-MM-YYYY");
  // console.log(checkOut,'kitnlaaaaaaa')
  // console.log(checkIn,'kkkkkkkkkk');
   
  useEffect(()=>{
    async function invoke(){
      const data=await SuccessDetails(bookingData?.roomId,{'usertoken':localStorage.getItem('usertoken')})
      setRoomData(data)
    }
    invoke();
  },[refresh])

  useEffect(()=>{
    if (roomData == null) {
      setRefresh(!refresh)
    }
  },[])




  return (
    <>
      <div className="2xl:container 2xl:mx-auto py-14 mt-20 px-4 md:px-6 xl:px-48">
        <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
        
          <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
            <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-green-600">
              Thank you for your Booking
            </h3>
           
          
           
            <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
           
              
              <div className="flex md:flex-row justify-start items-start md:items-center p-4 border border-gray-200 w-full">
                <div className="w-40 md:w-32">
                  {roomData?.status == 'failed' ? '' :
                  <img
                    className="hidden md:block"
                    src={roomData?.img[0]}
                    alt="girl-in-white-dress"
                  />
            }
                  <img
                    className="md:hidden "
                    src="https://i.ibb.co/MsbCZNJ/Rectangle-8.png"
                    alt="girl-in-white-dress"
                  />
                </div>
                <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                  <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                    <h3 className="text-lg md:text-xl  font-semibold leading-6 md:leading-5  text-gray-800">
                     {roomData?.vendorId?.propertyName}
                    </h3>
                    <p>rooms: {bookingData?.rooms} </p>
                    <p>days: {bookingData?.days} </p>
                    <p className="text-md font-semibold text-orange-600">location: {roomData?.location} </p>
                    <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                      <p className="text-md leading-none text-gray-600">
                        Check In: <span className="text-sky-600">{moment(bookingData?.checkIn).format("DD-MM-YYYY")} </span>
                      </p>
                      <p className="text-md leading-none text-gray-600">
                        Check out: <span className="text-sky-600"> {moment(bookingData?.checkOut ).format("DD-MM-YYYY")}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                    <p className="text-lg lg:text-xl font-semibold leading-5 lg:leading-6 text-sky-600">
                      {bookingData?.RoomPrice} ₹
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
              <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
                <div className="flex jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">
                    Booking Address
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                  {bookingData?.address}
                  </p>
                </div>
                <div className="flex jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">
                   your place
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                    {bookingData?.place}
                  </p>
                </div>
                <div className="flex jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">
                    Phone number
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                 {bookingData?.phone}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Room Price
                    </p>
                    <p className="text-base leading-4 text-gray-600">{bookingData?.RoomPrice} ₹</p>
                  </div>
                  {/* <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount{" "}
                   
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div> */}
                
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                   {bookingData?.total} ₹
                  </p>
                </div>
                <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                  <button onClick={()=>router.push('/bookings')}  className="py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  w-full text-base font-medium leading-4 text-white bg-sky-600 hover:bg-sky-800">
                    View booking history
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
