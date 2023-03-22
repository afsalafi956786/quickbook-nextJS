import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import GraphAdmin from './GraphAdmin';


function Dashboard({adminDash,revenue,graph}) {
  // if(Array.isArray(adminGraph)){
  
  return (
    <div className=''>
        <h1 className='lg:md:mt-4 lg:md:-ml-1 tex sm:ml-24 xs:ml-16'>Dashboard</h1>
        <div className='flex justify-evenly  mt-12 lg:flex-row lg:flex-row flex-col md:space-y-3 xs:space-y-3 sm:items-center xs:items-center'>
      
        <div className="border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]">
          <div className=" content-center flex  ">
            {/* <CircularProgressbar className='' value='434' text='30%'/> */}
            {/* <CurrencyRupeeOutlinedIcon className= 'text-gray-600 text-6xl mt-1'/> */}
            <img className="" src="/logo/money.png" />
          </div>
          <div className="">
            <h4 className="">Reveneu</h4>
          </div>
          <div className="py-10 ">
            <span className="text-lg font-semibold -ml-16">
              Total:{" "}
              {Array.isArray(revenue) ? 
              <span className="text-orange-600"> ₹{(revenue[0]?.total*20)/100}</span> :''
                  }          
            </span>
          </div>
        </div>

        <div className="border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]">
          <div className=" content-center flex  ">
            {/* <CircularProgressbar className='' value='434' text='30%'/> */}
            {/* <CurrencyRupeeOutlinedIcon className= 'text-gray-600 text-6xl mt-1'/> */}
            <img className="" src="/logo/Users.png" />
          </div>
          <div className="">
            <h4 className="">Users</h4>
          </div>
          <div className="py-10 ml-6">
            <span className="text-lg font-semibold -ml-16">
              Total:{" "}
              <span className="text-orange-600"> {adminDash?.usersCount}</span>
            </span>
          </div>
        </div>


 
        <div className="border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]">
          <div className=" content-center flex  ">
            {/* <CircularProgressbar className='' value='434' text='30%'/> */}
            {/* <CurrencyRupeeOutlinedIcon className= 'text-gray-600 text-6xl mt-1'/> */}
            <img className="" src="/logo/properties.png" />
          </div>
          <div className="">
            <h4 className="ml-8">Properties</h4>
          </div>
          <div className="py-10 ">
            <span className="text-lg font-semibold -ml-20">
              Total:{" "}
              <span className="text-orange-600"> {adminDash?.proeprties}</span>
            </span>
          </div>
        </div>

    </div>
    <h3 className="mt-32 text-xl ml-12">Total Revenue</h3>
    <GraphAdmin graph={graph}/>
    
   
    </div>
  )
}

export default Dashboard
