import React from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


function HomePage() {
  let room=useSelector((state)=>state.rooms.value)
  let router=useRouter();
  return (
    <>
      {room?.slice(0,3)?.map((rooms)=>(
      <div key={rooms._id} className= "ml-8 bg-white xs:ml-16  rounded-lg pb-6 shadow-2xl sm:items-center lg:md:h-[100%] min-h-[200px] max-w-[66%] group">
        <div className="overflow-hidden">
          <img onClick={()=>router.push(`details/${rooms?._id}`)}
            className="group-hover:scale-110 rounded transition-all duration-300 w-full cursor-pointer "
            src={rooms?.img}
            alt=""
          />
        </div>
        <div className="bg-white   border-b-2 shadow-xl   max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center font-bold text-gray-500 tracking-[1px] text-base">
          <div className="flex justify-between w-[80%]">
            
            <div className="flex items-center gap-x-2">
              <div className="text-sky-600">
                <PeopleAltIcon className="text-[17px]" />
              </div>
              <div className="flex gap-x-1">
                <div>max  </div>
                <div>{rooms?.capacity}</div>
              </div>
            </div>

            <div className="flex items-center gap-x-2 ml-2">
              <div className="text-sky-600">
                < CurrencyRupeeIcon className="text-[15px]" />
              </div>
              <div className="flex gap-x-1">
                <div>Rs.</div>
                <div>{rooms?.price}</div>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center -mt-6">
            <Link href=''>
            <h3 className="">{rooms?.vendorId?.propertyName}</h3>
            </Link>
            <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
            {rooms?.description?.substring(1,250)} 
            </p>
        </div>
        <div className="flex flex-col items-center">
            <button onClick={()=>router.push(`details/${rooms?._id}`)} className="bg-sky-600 rounded hover:bg-sky-800 text-white  border p-2 px-12 text-semibold max-w-[240px]">Book Now</button>
        </div>
    
      </div>
      ))}




    
    


    
    </>
  );
}

export default HomePage;
