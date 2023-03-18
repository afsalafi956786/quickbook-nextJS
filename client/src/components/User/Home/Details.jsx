import React from "react";
import { useState, Fragment } from "react";
import StarIcon from "@mui/icons-material/Star";
import Crop169OutlinedIcon from "@mui/icons-material/Crop169Outlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, Transition } from "@headlessui/react";
import { coupenApply,DatesCheck } from "@/config/userEndpoints";
import MessageIcon from "@mui/icons-material/Message";
import { useSelector } from "react-redux";
import { createdChat } from "@/config/chatEndpoints";

// const reviews = { href: "#", average: 4, totalCount: 117 };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

function Details({ rooms, userReview, coupon }) {
  console.log(coupon, "0000000000");

  const user = useSelector((state) => state.users.value);

  const router = useRouter();

  const [openDate, setOpenDate] = useState(false);
  const [dayCount, setCount] = useState(null);
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

  const [inputValue, setInputValue] = useState("");
  const [discounts, setDiscount] = useState(null);

  const [open, setOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [onOpen, setOnOpen] = useState(false);
  let [copied, setCopied] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [codeErr, setCodeErr] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function openCoupon() {
    setOnOpen(true);
  }

  function closeCoupon() {
    setOnOpen(false);
  }

  useEffect(() => {
    if (date != null) {
      const startDate = moment(date[0].startDate).format("DD-MM-YYYY");
      const endDate = moment(date[0].endDate).format("DD-MM-YYYY");
      const newstartdate = Date(startDate);
      console.log(newstartdate, "date");
      const newenddate = Date(endDate);
      const day = Math.floor(
        (date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24)
      );
      setCount(day);
    }
  }, [date]);

  const applyCoupon = async () => {
    let roomIds = rooms._id;
    let vendorid = rooms?.vendorId?._id;
    let obj = {
      roomIds: roomIds,
      couponCode: couponCode,
      vendorid: vendorid,
    };

    if (obj.couponCode || obj.roomIds) {
      

      const data = await coupenApply(obj, {
        usertoken: localStorage.getItem("usertoken"),
      });
      setDiscount(data?.coupon?.discount);
      if (data?.status == "success") {
        toast.success( `Wow! ${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
      }else{
        toast.error(`OOPS! ${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

      }
    } else {
      setCodeErr("Please add your coupone code");
    }
  };

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
    let day_count = dayCount == 0 ? 1 : dayCount;
    let total = options?.room * day_count * rooms?.price;
    if (discounts != null) {
      total = total - discounts;
    }
    const room = options?.room;
    const adult = options?.adult;
    const userToken = localStorage.getItem("usertoken");
    const price = rooms?.price * options?.room;
    const dayPrice = rooms?.price * day_count;

    let obj = {
      roomId: rooms._id,
      Date: date,
      token: userToken,
      Room: room,
      Adult: adult,
      total: total,
      discount: discounts,
      location: rooms.location,
      price: price,
      dayprice: dayPrice,
      type: rooms.propertyType,
      daycount: dayCount,
      img1: rooms.img[0],
      img2: rooms.img[1],
      vendorId: rooms.vendorId._id,
    };
    let bookDate = await DatesCheck(rooms?._id)
    let startDate = new Date(obj.Date[0].startDate).getTime()
    let endDate = new Date(obj.Date[0].endDate).getTime()
    let existedDates = false
    bookDate.dates.map((doc)=>{
      doc.checkIn = new Date(doc.checkIn).getTime()
      doc.checkOut = new Date(doc.checkOut).getTime()
      //date calculation start to end
      if (doc.checkIn <= startDate && startDate <= doc.checkOut || doc.checkIn <= endDate && endDate <= doc.checkOut) {
        existedDates = true
      }
    })
    if (existedDates) {
      toast.error(`Already booked this date`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      if (obj.Date && obj.Room && obj.Adult && obj.total) {
        router.push({
          pathname: "/checkout",
          query: { obj: JSON.stringify(obj) },
        });
      } else {
        toast.error(`OOPS! something error`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    
  };

  async function createChat() {
    let obj = {
      senderId: user?._id,
      receiverId: rooms?.vendorId?._id,
    };
    const create = await createdChat(obj);
    if (create.status == "success") {
      router.push("/chat");
    } else {
      router.push("/chat");
    }
  }

  return (
    <>
      {/* Image gallery */}
      <div className="mx-auto mt-20 max-w-2xl cursor-pointer lg:mt-42 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <ToastContainer />
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
        <div className=" lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="flex justify-between">
            <p className="text-orange-700">{rooms?.location}</p>
            <MessageIcon
              onClick={createChat}
              className="text-sky-600 hover:text-sky-800 cursor-pointer text-4xl  "
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mt-4">
            {rooms?.vendorId?.propertyName}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            {/* <div className="flex items-center">
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
            </div> */}
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
                    )}  to   ${format(date[0]?.endDate, "dd/MM/yyyy")}`}</span>
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
                  <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
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
                    {rooms?.propertyType}
                  </div>
                </div>
              </li>

              <li className="flex items-start justify-between">
                <p className="mt-6">
                  days
                  <span className="text-sm dark:text-violet-400"></span>
                </p>
                <div className="text-right mt-6">
                  {dayCount ? (
                    <span className="block">{dayCount}</span>
                  ) : (
                    <span className="block">1</span>
                  )}
                </div>
              </li>
            </ul>
            <div className="pt-4 space-y-2">
              <div className="p-2">
                <div className="flex justify-between">
                  <input
                    type="text"
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                    className="border p-2 border-gray-400 shadow-md "
                    placeholder="enter your coupon code"
                  />

                  {/* coupon modal */}

                  <Transition appear show={onOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-100"
                      onClose={closeCoupon}
                    >
                      <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-scroll">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed scroll-m-2 inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <div className="inline-block align-bottom bg-gray-50 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:max-w-xl sm:w-full">
                                <div className="flex items-center px-1.5 py-2 border-b border-gray-black">
                                  <div
                                    className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                                    onClick={() => setOnOpen(false)}
                                  >
                                    <CloseIcon className="h-[22px] text-black cursor-pointer" />
                                  </div>
                                </div>
                                <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                                  <div className="w-full">
                                    <h4>Coupons</h4>
                                    {coupon?.coupon?.map((coupn) => (
                                      <div className=" flex space-x-3 w-full">
                                        <div className="flex-grow mt-5">
                                          <a
                                            href="#"
                                            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-sky-100 bg-white-400"
                                          >
                                            <div
                                              key={coupn?._id}
                                              class="flex flex-col justify-between p-4 leading-normal"
                                            >
                                              <h5 class=" text-2xl font-bold tracking-tight text-gray-900  text-black">
                                                {rooms?.vendorId?.propertyName}
                                              </h5>
                                              <h3 className=" text-black mb-1">
                                                Discount
                                                <span className="text-orange-600 text-lg">
                                                  {" "}
                                                  ₹{coupn?.discount}
                                                </span>
                                                
                                              </h3>
                                              <div className="flex">
                                                 <span className="flex text-orange-600">{moment(coupn?.startDate).format("MMM Do YY")} </span>  <span className="ml-2">to</span>  <span className="text-orange-600 ml-2"> {moment(coupn?.endDate).format("MMM Do YY")}</span> 
                                              </div>
                                             
                                              <div className="flex">
                                                <input
                                                  onChange={(e) =>
                                                    setInputValue(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  value={coupn?.couponCode}
                                                  className="border p-2 border-gray-400 shadow-md w-[80%] "
                                                />
                                                <button
                                                  onClick={() => {
                                                    navigator.clipboard.writeText(
                                                      coupn?.couponCode
                                                    );
                                                    setCopied(
                                                      coupn?.couponCode
                                                    );
                                                  }}
                                                  className="ml-auto cursor-pointer rounded px-4 xs:ml-2 bg-sky-600 text-white text-bold hover:bg-sky-800"
                                                >
                                                  {copied == coupn?.couponCode
                                                    ? "Copied"
                                                    : "Copy"}
                                                </button>
                                              </div>
                                            </div>
                                            <img
                                              className="w-[30%] ml-auto "
                                              src="/logo/qb.png"
                                            />
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Transition.Child>
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>

                  {/* coupon modal end */}

                  <button
                    onClick={() => {
                      applyCoupon();
                    }}
                    className="bg-sky-600 cursor-pointer p-1 rounded text-white text-semibold px-5 focus:border-none"
                  >
                    {discounts ? "Applied" : "Apply"}
                  </button>
                </div>
                <p className="text-red-500">{codeErr}</p>
                <div className="flex items-center space-x-2 text-md ">
                  {" "}
                  you have a coupon click{" "}
                  <span
                    onClick={openCoupon}
                    className="ml-2 text-sky-600 cursor-pointer hover:underline"
                  >
                    {" "}
                    here
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                {discounts ? <span>{discounts}₹</span> : <span>0₹</span>}
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Day price</span>
                {dayCount ? (
                  <span>{rooms?.price * dayCount}₹</span>
                ) : (
                  <span>{rooms?.price}₹</span>
                )}
              </div>
              <div className="flex justify-between  p-1">
                <span>Room price</span>
                <span className="font-semibold">
                  {rooms?.price * options?.room}₹
                </span>
              </div>
              <div className="space-y-6 pt-4">
                <div className="flex justify-between">
                  <span>Total price</span>
                  {dayCount ? (
                    <span className="font-semibold text-orange-900 text-xl">
                      {discounts
                        ? options?.room * dayCount * rooms?.price - discounts
                        : options?.room * dayCount * rooms?.price}
                      ₹
                    </span>
                  ) : (
                    <span className="font-semibold text-orange-900 text-xl">
                      {discounts
                        ? options?.room * rooms?.price - discounts
                        : options?.room * rooms?.price}
                      ₹
                    </span>
                  )}
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

          {/* review section */}

          {/* <div className="container mx-auto px-4 flex flex-col lg:items-center justify-between lg:flex-row"> */}
          {userReview?.review?.length == 0 ? (
            ""
          ) : (
            <div
              role="list"
              aria-label="Testimonials"
              className="xl:w-2/2 grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-1 gap-3 flex-wrap justify-center items-start"
            >
              <div className="flex space-x-3 ">
                <h3
                  onClick={() => router.push("/review")}
                  className=" cursor-pointer hover:text-sky-600 text-gray-700 text-2xl"
                >
                  Reviews
                </h3>
              </div>

              <div className="flex items-center">
                <div className="flex items-center ml-auto">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                </div>
                {/* <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a> */}
              </div>
              {userReview?.review?.slice(0, 3)?.map((rev) => (
                <div
                  key={userReview.review._id}
                  role="listitem"
                  className="bg-white shadow rounded p-4 xl:p-6"
                >
                  <div className=" flex items-start justify-between">
                    <div className="mr-6">
                      <p className=" text-gray-600">{rev?.feedback}</p>

                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={rev?.stars}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                      <p className="mt-2 text-base font-semibold leading-none text-sky-600">
                        {rev?.userId?.name}
                      </p>
                    </div>
                    <AccountCircleIcon />
                  </div>
                </div>
              ))}
              <p
                onClick={openModal}
                className="text-sky-600 text-md cursor-pointer hover:text-sky-900 ml-auto"
              >
                More
              </p>

              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-100"
                  onClose={closeModal}
                >
                  <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-scroll">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed scroll-m-2 inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div className="inline-block align-bottom bg-gray-50 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:max-w-xl sm:w-full">
                            <div className="flex items-center px-1.5 py-2 border-b border-gray-black">
                              <div
                                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                                onClick={() => setIsOpen(false)}
                              >
                                <CloseIcon className="h-[22px] text-black cursor-pointer" />
                              </div>
                            </div>
                            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                              <div className="w-full">
                                <h4>Reviews</h4>
                                <div className=" flex space-x-3 w-full">
                                  <div className="flex-grow mt-5">
                                    {userReview?.review?.map((rev) => (
                                      <div
                                        key={userReview.review._id}
                                        role="listitem"
                                        className="bg-white shadow rounded p-4 xl:p-6 mt-4 "
                                      >
                                        <div className=" flex items-start justify-between">
                                          <div className="mr-6">
                                            <p className=" text-gray-600">
                                              {rev?.feedback}
                                            </p>

                                            <Stack spacing={1}>
                                              <Rating
                                                name="half-rating-read"
                                                defaultValue={rev?.stars}
                                                precision={0.5}
                                                readOnly
                                              />
                                            </Stack>
                                            <p className="mt-2 text-base font-semibold leading-none text-sky-600">
                                              {rev?.userId?.name}
                                            </p>
                                          </div>
                                          <AccountCircleIcon />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Transition.Child>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          )}
          {/* review section end */}

          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Details;
