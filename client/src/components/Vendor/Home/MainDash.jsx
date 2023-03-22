import React from "react";
import "react-circular-progressbar/dist/styles.css";
import RecentBook from "./RecentBook";
import Graph from "@/components/Vendor/Home/Graph";
// import Sales from '@/components/Vendor/Home/Sales';




function MainDash({ dashDetails, monthlySalary }) {
  return (
    <div className="">
      <h1 className="lg:md:mt-4 lg:md:-ml-1 sm:ml-24 xs:ml-16">Dashboard</h1>
      <div className="flex justify-evenly  mt-12 lg:flex-row lg:flex-row flex-col md:space-y-3 xs:space-y-3 sm:items-center xs:items-center">
        <div className="border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]">
          <div className=" content-center flex  ">
            {/* <CircularProgressbar className='' value='434' text='30%'/> */}
            {/* <CurrencyRupeeOutlinedIcon className= 'text-gray-600 text-6xl mt-1'/> */}
            <img className="" src="/logo/revenue.png" />
          </div>
          <div className="">
            <h4 className="">Reveneu</h4>
          </div>
          <div className="py-10 ">
            <span className="text-lg font-semibold -ml-16">
              Total:{" "}
              <span className="text-orange-600"> ₹{dashDetails?.bookAmount}</span>
            </span>
          </div>
        </div>


<div className="border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]">
          <div className=" content-center flex  ">
            {/* <CircularProgressbar className='' value='434' text='30%'/> */}
            {/* <CurrencyRupeeOutlinedIcon className= 'text-gray-600 text-6xl mt-1'/> */}
            <img className="" src="/logo/booking.png" />
          </div>
          <div className="">
            <h4 className="ml-4">Bookings</h4>
          </div>
          <div className="py-10 ">
            <span className="text-lg font-semibold -ml-16">
              Total:{" "}
              <span className="text-orange-600"> {dashDetails?.totalBookings}</span>
            </span>
          </div>
        </div>

        <div className="border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]">
          <div className=" content-center flex  ">
            {/* <CircularProgressbar className='' value='434' text='30%'/> */}
            {/* <CurrencyRupeeOutlinedIcon className= 'text-gray-600 text-6xl mt-1'/> */}
            <img className=" " src="/logo/customers.png" />
          </div>
          <div className="ml-4">
            <h4 className="">Customers</h4>
          </div>
          <div className="py-10 ">
            <span className="text-lg font-semibold -ml-16">
              Total:{" "}
              <span className="text-orange-600">{dashDetails?.customer}</span>
            </span>
          </div>
        </div>


    
        
      </div>
<h3 className="mt-32 text-xl ml-6">Total Revenue</h3>
      <Graph monthlySalary={monthlySalary} />
      <RecentBook recent={dashDetails} />
      
      {/* <h3 className="mt-32 text-xl ml-4">Total Revenue</h3> */}
      {/* <Sales/> */}
    </div>
  );
}

export default MainDash;
