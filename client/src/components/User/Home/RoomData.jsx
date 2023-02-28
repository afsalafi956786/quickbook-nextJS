import React from "react";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function RoomData() {
  return (
    <>
      <div className="  py-14 px-4 md:px-6  2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className=" border-gray-300 flex flex-col justify-start items-start   bg-white border px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <div className=" flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                <div className=" w-full md:w-40">
                  <img
                    className="w-full hidden md:block border border-gray-400"
                    src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                    alt="dress"
                  />
                  <img
                    className="w-full md:hidden border"
                    src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                    alt="dress"
                  />
                </div>
                <div className=" border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-sky-600">
                      Premium Quaility Dress
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <div className="px-2  bg-green-700 rounded text-white font-bold">
                        Free cancellation
                      </div>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-black font-bold">
                          <DirectionsCarIcon /> :{" "}
                        </span>{" "}
                        Parking
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-black font-bold">
                          Property type :{" "}
                        </span>{" "}
                        Hotel
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-black font-bold">
                          Location :{" "}
                        </span>{" "}
                        calicut
                      </p>
                    </div>
                  </div>

                 

                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6 mt-16">
                      {/* $36.00 <span className="text-red-300 line-through"> $45.00</span> */}
                      ₹ 1200
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800 mt-16">
                      01
                    </p>
                    {/* <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">$36.00</p> */}
                    <div className="h-8 w-16 flex text-white border rounded bg-yellow-300">
                      <p className="ml-2 mt-1 text-white">4.2</p>
                      <StarIcon className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-sky-600 hover:bg-sky-800  ml-auto  p-1 px-3 rounded text-white font-bold">
                View availability
              </button>
            </div>

            <div className="flex flex-col justify-start items-start bg-white border border-2 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-md md:text-md font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img
                    className="w-full hidden md:block"
                    src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                    alt="dress"
                  />
                  <img
                    className="w-full md:hidden"
                    src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                      Premium Quaility Dress
                    </h3>
                    <div className="px-2  bg-green-700 rounded text-white font-bold">
                        Free cancellation
                      </div>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Style: </span> Italic
                        Minimal Design
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Size: </span> Small
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Color: </span> Light
                        Blue
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start  w-full">
                    <p className="text-base xl:text-lg leading-6 mt-12">
                      $36.00{" "}
                      <span className="text-red-300 line-through"> $45.00</span>
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800 mt-12">
                      01
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      $36.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomData;
