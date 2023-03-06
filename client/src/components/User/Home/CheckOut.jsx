import React from "react";

function CheckOut({obj}) {
  console.log(obj)
  return (
    <>
     
     <form>
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
                Check out
              </p>
            </div>

            <div className="mt-12">
              <p className="text-lg leading-4 text-gray-800">
                Sign in or continue as
                <a
                  href="/"
                  className="
									focus:outline-none
									hover:underline
									font-semibold
									focus:underline focus:underline
								"
                >
                  guest?
                </a>
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
                type="email"
                placeholder="Enter your address"
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
                type="password"
                placeholder="Mobile Number"
              />
            </div>
        
           
          </div>

          <div className="flex  flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 border border-gray-300 shadow-lg dark:text-gray-700">
            <h2 className="text-2xl font-semibold ">Booking Details</h2>
            <ul className="flex flex-col pt-4 space-y-2">
              <div className="h-[20%] w-[40%] ml-6 shadow-lg flex space-x-4">
                <img className="rounded " src="https://images.oyoroomscdn.com/uploads/hotel_image/193860/13bc50ebcd7de6ef.jpg"/>
                <img className="rounded" src="https://images.oyoroomscdn.com/uploads/hotel_image/193860/13bc50ebcd7de6ef.jpg"/>
              </div>
              <li className="flex items-start justify-between">
             <div className="border p-2 ml-6 mt-4" >
                 30/12/200 to 30/12/2000
             </div>
              </li>

              <li className="flex items-start justify-between">
              <div className="border p-2 ml-6 mt-2" >
                 ! adult 2 room
             </div>
                <div className="text-right mt-6">
                  <span className="block">1</span>
                </div>
              </li>

              <li className="flex items-start justify-between">
                <p className="mt-3">
                  Room Type
                  <span className="text-sm dark:text-violet-400"></span>
                </p>
                <div className="text-right ">
                  <div className=" bg-green-600 rounded-md px-10 border text-white text-bold p-1 ml-9 mt-3 shadow-lg">
                    Classic
                  </div>
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
                <span>100₹</span>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Room rate</span>
                <span>1000 ₹</span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">1000₹</span>
                </div>
                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded bg-sky-600 text-white "
                >
                  Pay pal
                </button>

                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded bg-sky-600 text-white "
                >
                  continue booking
                </button>
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
