import React from "react";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useRouter } from "next/router";
import { rooms } from "@/store/rooms";
import { useDispatch } from "react-redux";





function RoomData({location}) {
  const router=useRouter();
  let dispach=useDispatch();

  let room=useSelector((state)=>state.rooms.value)
  if(!location?.length==0){
    dispach(rooms(location));
  }
  

  return (
    <div>
      <div className="  py-14 px-4  md:px-6  2xl:container 2xl:mx-auto">
        {room?.map((rooms)=>(
        <div key={rooms._id} className="mt-10 flex">

          <div className="flex flex-col justify-start items-start w-full px-8 mx-4 ">
            <div className="flert bg-white border border-2 px-4  w-full">
              <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                <div className="pb-4 md:pb-8 lg:w-[40%] md:w-62 cursor-pointer">
                  <img  onClick={async()=>{
                   router.push(`/details/${rooms._id}`)
                }}
                    className="w-full hidden md:block"
                    src={rooms.img}
                    alt="dress"
                  />
                  <img onClick={async()=>{
                   router.push(`/details/${rooms._id}`)
                }}
                    className="w-full md:hidden"
                    src={rooms.img}
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-4">
                    <h3 onClick={async()=>{
                   router.push(`details/${rooms._id}`)
                }}
                     className="text-xl xl:text-2xl font-semibold leading-6 text-sky-600 cursor-pointer">
                     {rooms?.vendorId?.propertyName}
                    </h3>
                    <div className="px-2  bg-green-700 rounded text-white font-bold">
                        {rooms?.category}
                      </div>
                      <p className="text-sm  leading-none text-orange-700">{rooms?.location}</p>
                    <div className="flex justify-start items-start flex-col ">
                      <p className="text-sm text-md leading-none text-gray-800">
                        <span className="text-gray-700 ">capacity : </span> 
                        {rooms?.capacity}
                      </p>
                      {/* <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300 text-bold"> </span> Small
                      </p> */}
                      <p className="text-sm leading-none text-gray-800 mt-2">
                        <span className="text-gray-700"> </span> 
                        {rooms.description.substring(1,150)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start  w-full">
                    <p className="text-base xl:text-lg leading-6 mt-12">
                    ₹ {rooms?.price}
                      
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800 mt-12">
                      {rooms?.totalrooms}
                    </p>
                    <div className="text-base xl:text-lg cursor-pointer font-semibold leading-6 rounded-md  text-white p-1 bg-green-600 text-gray-800">
                      4.2<StarIcon className="h-4"/>
                    </div>
                  </div>
               
                </div>
                <button onClick={async()=>{
                   router.push(`/details/${rooms._id}`)
                }} className="bg-sky-600 text-white text-bold cursor-pointer hover:bg-sky-800 mt-16 rounded w-[25%] p-2 xs:mb-2">view more</button>
              </div>
              
            </div>
          </div>


        </div>
        ))}
      </div>
    </div>
  );
}

export default RoomData;
