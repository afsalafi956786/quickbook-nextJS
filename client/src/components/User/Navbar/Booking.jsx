// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPerson } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import DatePicker from 'react-date-picker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';

function Booking() {
  //   const [startDate, setStartDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [RoomOption,setRoomOptions]=useState(false);
  // const [adults,setAdults]=useState('1 Adult')
  // const [room,setRoom]=useState('1 Room')
  // const [total,setTotal]=useState(0);
  // const [options, setOptions] = useState({
  //   Adult: 1,
  //   Room: 1,
  // });
  // const handleOption = (name, operation) => {
  //   setOptions((prev) => {
  //     return {
  //       ...prev,
  //       [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
  //     };
  //   });
  // };
  return (
    <>
      <div className="h-[300px] bg-green-100 sm:h-[60px] bg-white  w-full lg:h-[60px] md:-mt-10 xl:w-2/4 xl:mx-auto sm:w-[70%] sm:mx-20 ">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex-1 h-full">
            <div className="datepicker shadow-lg relative form-floating  xl:w-60  ">
              <input
                type="date"
                className="form-control bg-slate-50 text-center py-5 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                placeholder="check in"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="datepicker shadow-lg relative form-floating mb-3 xl:w-60 cursor-pointer  ">
              <input
                type="date"
                className="form-control bg-slate-50 cursor-pointer  text-center py-5 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                placeholder="check in"
              />
            </div>
          </div>

          {/* <div className="flex-1 border-r">
            <div className="mt-6 bg-white cursor-pointer">
              <span  onClick={()=>setOpenOptions(!openOptions)} className="px-12 text-center ">{`${options.Adult} Adult .${options.Room} Room`}</span>
             { openOptions && <div className=" bg-slate-50 text-slate-500 rounded shadow-xl px-2 py-3 ">
                <div classsName="w-[200px] flex justify-between ">
                  <span className="px-2 font-bold text-black">Adult</span>
                  <div className="flex items-center gap-[10px]">
                    <button
                     
                      className="bg-sky-600 border-2 border-slate-500 cursor-pointer text-white px-3 text-semibold text-black "
                      onClick={() => handleOption("Adult", "i")}
                    >
                      +
                    </button>
                    <span className="">{options.Adult}</span>
                    <button
                    
                      className="bg-sky-600 border-2 cursor-pointer border-slate-500 text-white px-3 text-semibold text-black "
                      onClick={() => handleOption("Adult", "d")}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div classsName="w-[200px] flex justify-between m-[10px]">
                  <span className="px-2 font-bold text-black">Room</span>
                  <div className="flex items-center gap-[10px]">
                    <button
                      className="bg-sky-600 border-2 border-slate-500 text-white px-3 text-semibold text-black"
                      onClick={() => handleOption("Room", "i")}
                    >
                      +
                    </button>
                    <span className="">{options.Room}</span>
                    <button
                      className="bg-sky-600 border-2 border-slate-500 text-white px-3 text-semibold text-black"
                      onClick={() => handleOption("Room", "d")}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>}
            </div>
          </div> */}
          <div className="flex-1 ">
            <div className="w-full h-full shadow-lg  md:h-[67px]  xl:lg:h-[67px] bg-white relative -mt-3">
              <button className="w-full lg:mt-3 lg:h-[67px] xl:lg:mt-3  h-full flex items-center border  justify-between py-6 sm:py- md:py-6 px-8" onClick={()=>setOpenOptions(!openOptions)}>
                Adults
               <ArrowDropDownIcon className="text-base"/>
                </button>
              { openOptions &&  <ul className="bg-white absolute w-full flex flex-col z-40">
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">1.Adult </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">2.Adult </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">3.Adult </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">4.Adult </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer ">5.Adult </li>
                </ul>}
            </div>

          </div>

          <div className="flex-1  -mt-3">
            <div className="w-full shadow-lg   lg:mt-3 h-full lg:h-[67px]  xl:lg:h-[67px] bg-white relative">
              <button className="w-full  xl:lg:mt-3 h-full border flex items-center justify-between  py-6  sm:py-6 md:py-6 px-8" onClick={()=>setRoomOptions(!RoomOption)}>
                Rooms
               <ArrowDropDownIcon className="text-base"/>
                </button>
              {RoomOption  &&  <ul className="bg-white absolute  w-full flex flex-col z-40">
                  <li className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">1 Room </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">2 Room </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">3 Room </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer">4 Room </li>
                  <li  className="border-b last-of-type:border-b-0 h-12 hover:bg-sky-600 hover:text-white w-full flex justify-center items-center cursor-pointer ">5 Room </li>
                </ul>}
            </div>

          </div>

        
          
        </div>
      </div>
    </>
  );
}

export default Booking;
