import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
// import DatePicker from 'react-date-picker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';

function Booking() {
  //   const [startDate, setStartDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    Adult: 1,
    Room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <>
      <div className="h-[300px] bg-green-100  w-full lg:h-[70px] md:-mt-10 xl:w-2/4 xl:mx-auto ">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex-1 border-r h-full">
            <div className="datepicker relative form-floating  xl:w-60  ">
              <input
                type="date"
                className="form-control py-5 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                placeholder="check in"
              />
            </div>
          </div>

          <div className="flex-1 border-r">
            <div className="datepicker relative form-floating mb-3 xl:w-60 ">
              <input
                type="date"
                className="form-control py-5 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                placeholder="check in"
              />
            </div>
          </div>

          <div className="flex-1 border-r">
            <div className="mt-6 bg-white ">
              <span onClick={()=>setOpenOptions(!openOptions)} className="px-12">{`${options.Adult} Adult .${options.Room} Room`}</span>
             { openOptions && <div className=" bg-slate-50 text-slate-500 rounded shadow-xl px-14 py-3 ">
                <div classsName="w-[200px] flex justify-between m-[10px]">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
