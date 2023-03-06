import React from "react";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Crop169OutlinedIcon from "@mui/icons-material/Crop169Outlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { useRouter } from "next/router";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import FireExtinguisherOutlinedIcon from "@mui/icons-material/FireExtinguisherOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import HeatPumpOutlinedIcon from "@mui/icons-material/HeatPumpOutlined";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Details({ rooms}) {
  const router = useRouter();
 
  const [roomRate,setRoomRate]=useState()
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);



  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      if (operation != "d") {
        if (prev.room >= rooms?.totalrooms) return prev;
        if (prev.adult >= rooms?.capacity) return prev;
      }

      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    const total = options.room * rooms.price
    const room=options?.room;
    const adult=options?.adult;
    const userToken = localStorage.getItem("usertoken")
    let obj={
        roomId:rooms._id,
        Date:date,
        token:userToken,
        Room:room,
        Adult:adult,
        total:total,
    }
    // console.log(obj)
    if(obj.Date && obj.Room && obj.Adult && obj.total){
      router.push({
        pathname:'/checkout',query:{obj:JSON.stringify(obj)}
      })

    
    }else{
        
    }
  };
  return (
    <>
      {/* Image gallery */}
      <div className="mx-auto mt-20 max-w-2xl cursor-pointer lg:mt-42 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={rooms?.img[0]}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={rooms?.img[1]}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={rooms?.img[2]}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img
            src={rooms?.img[3]}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <p className="text-orange-700">{rooms?.location}</p>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mt-4">
            {rooms?.vendorId?.propertyName}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>

          <div className="flex flex-col max-w-md p-6 space-y-4 divide-y mt-8 sm:w-96 sm:p-10 border border-gray-300 shadow-lg dark:text-gray-700">
            
              <h2 className="text-2xl font-semibold -mt-6">Booking Details</h2>
              <ul className="flex flex-col pt-4 space-y-2">
                <li className="flex items-start ">
                  <label className="text-yellow-600">
                    Date
                    <div className="flex items-center gap-5">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="text-gray-500"
                      />

                      <span
                        onClick={() => setOpenDate(!openDate)}
                        className="text-gray-700 cursor-pointer border p-4"
                      >{`${format(
                        date[0]?.startDate,
                        "dd/MM/yyyy"
                      )}  to   ${format(
                        date[0]?.endDate,
                        "dd/MM/yyyy"
                      )}`}</span>
                      {openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          
                          className="absolute mt-96 z-[2] "
                          minDate={new Date()}
                        />
                      )}
                    </div>
                  </label>
                </li>
                <li className="flex items-start ">
                  <div className="flex items-center gap-[10px] mt-4">
                    <FontAwesomeIcon
                      icon={faPerson}
                      className="text-gray-500"
                    />
                    <span
                      onClick={() => setOpenOptions(!openOptions)}
                      className="text-gray-600 cursor-pointer border p-3 ml-4 "
                    >{`${options.adult} adult · ${options.room} room`}</span>
                    {openOptions && (
                      <div className="z-[2] ml-8 p-2 mt-36 absolute bg-white text-gray-600 rounded shadow-lg">
                        <div className="w-[200px]  flex justify-between mt-[10px]">
                          <span className="text-gray-900">Adult</span>
                          <div className="flex items-center gap-[10px] font-md text-black">
                            <button
                              disabled={options.adult <= 1}
                              className="w-[30px] h-[30px] border border-bold border-sky-600 text-sky-600 cursor-pointer bg-white  disabled:cursor-none "
                              onClick={() => handleOption("adult", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.adult}
                            </span>
                            <button
                              className="w-[30px] h-[30px] border border-solid border-sky-600 text-sky-600 cursor-pointer bg-white  disabled:cursor-none"
                              onClick={() => handleOption("adult", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-[200px] flex justify-between mt-[10px]">
                          <span className="text-gray-600">Room</span>
                          <div className="flex items-center gap-[10px] font-medium text-black">
                            <button
                              disabled={options.room <= 1}
                              className="w-[30px] h-[30px] border border-solid border-sky-600 text-sky-600 cursor-pointer bg-white  disabled:cursor-none"
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.room}
                            </span>
                            <button
                              className="w-[30px] h-[30px] border border-solid border-sky-600 text-sky-600 cursor-pointer bg-white  disabled:cursor-none"
                              onClick={() => handleOption("room", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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

                <li className="flex items-start justify-between">
                  <p className="mt-6">
                    days
                    <span className="text-sm dark:text-violet-400"></span>
                  </p>
                  <div className="text-right mt-6">
                    <span className="block">1</span>
                  </div>
                </li>
              </ul>
              <div className="pt-4 space-y-2">
                <div className="p-2">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="border p-2 border-gray-400 shadow-md "
                      placeholder="enter your coupon code"
                    />
                    <button className="bg-sky-600 cursor-pointer p-1 rounded text-white text-semibold px-5 focus:border-none">
                      Apply
                    </button>
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
                  <span>{rooms?.price}₹</span>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">{rooms?.price * options?.room}₹</span>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className="w-full py-2 font-semibold border rounded bg-sky-600 text-white hover:bg-sky-800 "
                  >
                    continue booking
                  </button>
                </div>
              </div>
          </div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{rooms?.description}</p>
            </div>
          </div>

          <h3 className="mt-12 text-gray-700 text-2xl">Amenties</h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-10 gap-12  md:py-12  py-9 px-4">
            {/* Free Shipping Grid Card */}
            {rooms?.amenities.includes("Ac") ? (
              <div className="flex space-x-4">
                <Crop169OutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">Ac</p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("Fire extinguisher") ? (
              <div className="flex space-x-4">
                <FireExtinguisherOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    Fire extinguisher
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("Power backup") ? (
              <div className="flex space-x-4">
                <PowerOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    Power backup
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("Wifi") ? (
              <div className="flex space-x-4">
                <WifiOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    Wifi
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("TV") ? (
              <div className="flex space-x-4">
                <TvOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">TV</p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("Attached bathroom") ? (
              <div className="flex space-x-4">
                <BathtubOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    Attached bathroom
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("Air-conditionar") ? (
              <div className="flex space-x-4">
                <HeatPumpOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    Air-conditionar
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            {rooms?.amenities.includes("Daily house keeping") ? (
              <div className="flex space-x-4">
                <CleaningServicesOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    Daily house keeping
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {rooms?.amenities.includes("First aid kit") ? (
              <div className="flex space-x-4">
                <MedicalServicesOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="  leading-5 font-semibold text-gray-800 ">
                    First aid kit
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* <div className="container mx-auto px-4 flex flex-col lg:items-center justify-between lg:flex-row"> */}

          <div
            role="list"
            aria-label="Testimonials"
            className="xl:w-2/2 grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-1 gap-3 flex-wrap justify-center items-start"
          >
            <div className="flex space-x-3 ">
              <h3 className=" text-gray-700 text-2xl">Reviews</h3>
              <CreateIcon
                onClick={() => router.push("/review")}
                className="mt-1 text-sky-600 cursor-pointer hover:text-sky-800"
              />
            </div>

            <div className="flex items-center">
              <div className="flex items-center ml-auto">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-yellow-400"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>

            <div role="listitem" className="bg-white shadow rounded p-4 xl:p-6">
              <div className=" flex items-start justify-between">
                <div className="mr-6">
                  <p className=" text-gray-600">
                    This website has a bunch of amazing components which
                    improves my design
                  </p>
                  <p className="mt-2 text-base font-semibold leading-none text-gray-800">
                    Anna Smith
                  </p>
                </div>
                <AccountCircleIcon />
              </div>
            </div>

            <div role="listitem" className="bg-white shadow rounded p-4 xl:p-6">
              <div className=" flex items-start justify-between">
                <div className="mr-6">
                  <p className=" text-gray-600">
                    This website has a bunch of amazing components which
                    improves my design
                  </p>
                  <p className="mt-2 text-base font-semibold leading-none text-gray-800">
                    Anna Smith
                  </p>
                </div>
                <AccountCircleIcon />
              </div>
            </div>

            <div role="listitem" className="bg-white shadow rounded p-4 xl:p-6">
              <div className=" flex items-start justify-between">
                <div className="mr-6">
                  <p className=" text-gray-600">
                    This website has a bunch of amazing components which
                    improves my design
                  </p>
                  <p className="mt-2 text-base font-semibold leading-none text-gray-800">
                    Anna Smith
                  </p>
                </div>
                <AccountCircleIcon />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Details;
