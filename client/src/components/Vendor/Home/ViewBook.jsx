import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import { useRouter } from "next/router";

// import { viewBooking } from "@/config/venderEndpoints";
// import ReactPaginate from 'react-paginate';
function ViewBook({ booking }) {
  // if(loading){
  //   return <h2>Loading...</h2>
  // }
  let router=useRouter();
  const today = moment().format("DD-MM-YYYY");

  // const objectsPerPage = 6;
  // const pageCount = Math.ceil(booking.length / objectsPerPage);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState(booking.slice(1, objectsPerPage));
 

  // useEffect(()=>{
  //   async function invoke(){
  //     setLoading(true);
  //     const data=await viewBooking({'vendortoken':localStorage.getItem('vendortoken')})
  //     setpos

  //   }
  //   invoke();
  // },[])

  // const handlePageChange = ({ selected }) => {
  //   const startIndex = selected * objectsPerPage;
  //   const endIndex = startIndex + objectsPerPage;
  //   setCurrentPage(selected);
  //   setCurrentData(booking.slice(startIndex, endIndex));
  // };


  return (
    <>
      <div className="py-20">
        <div className="mx-auto container bg-white dark:bg-gray-00 shadow rounded">
          <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
            <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
              <div className="flex items-center">
                <h1 className="font-bold text-sky-600">Booking Details</h1>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
              <div className="flex items-center  lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
              
                <a
                  className="text-black dark:text-black ml-2 border-transparent border cursor-pointer rounded"
                  onclick="pageView(false)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </a>
                <a
                  className="text-black dark:text-black border-transparent border rounded focus:outline-none cursor-pointer"
                  onclick="pageView(true)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-right"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full ">
              <thead>
                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                  <th className="pl-8 w-[15%] m text-blac text-sky-800 font-normal pr-6  text-lg tracking-normal leading-4">
                    Room
                  </th>

                  <th className="text-black text-sky-800 text-bold font-normal pr-6 text-left text-lg tracking-normal leading-4 ">
                    Booking Id
                  </th>
                  <th className="text-black text-sky-800 text-bold font-normal pr-6 text-left text-lg tracking-normal leading-4">
                    Customers
                  </th>
                  <th className="text-black text-sky-800 text-bold font-normal pr-6 text-left text-lg tracking-normal leading-4">
                    total Amount
                  </th>
                  <th className="text-black text-sky-800 text-bold font-normal pr-6 text-left text-lg tracking-normal leading-4">
                    Status
                  </th>
                  <th className="text-black text-sky-800 text-bold font-normal pr-6 text-left text-lg tracking-normal leading-4">
                    Check-In
                  </th>
                  <th className="text-black text-sky-800 text-bold font-normal pr-6 text-left text-lg tracking-normal leading-4">
                    Check-out
                  </th>

                  <td className="text-black text-sky-800 text-bold font-normal pr-8 text-left text-lg tracking-normal leading-4">
                    Days
                  </td>
                  <td className="text-sky-800 text-sky-800 text-bold font-normal pr-8 text-left text-lg tracking-normal leading-4">
                    More
                  </td>
                </tr>
              </thead>
              <tbody>
                {booking?.map((book) => (
                    

                  
                  <tr className="h-24 border-gray-300  dark:border-gray-200 border-b ">
                    
                    <td className="pl-8 pr-6 text-left  whitespace-no-wrap text-sm text-sky-800 text-black tracking-normal leading-4">
                
                      <img 
                        className="lg:md:p-3   cursor-pointer"
                        src={book?.roomId?.img[0]}
                      />
                    </td>

                    <td className="text-sm pr-6 whitespace-no-wrap text-black text-black tracking-normal leading-4">
                      {book?._id?.substring(0, 10)}
                    </td>
                    <td className="pr-6 whitespace-no-wrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8">
                          <PersonIcon className="text-gray-700" />
                        </div>
                        <p className="ml-2 text-black text-sky-600 tracking-normal leading-4 text-sm">
                          {book?.userId?.name}
                        </p>
                      </div>
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-orange-600 tracking-normal leading-4">
                      {" "}
                      ₹{book?.total}
                    </td>

                    <td className="text-sm pr-6 whitespace-no-wrap text-black text-black tracking-normal leading-4">
                    {book?.isCancel? <div className="bg-red-500 text-center  rounded p-1  mt-1 text-white text-bold">
                            <p>Cancelled</p>
                        </div> : <div className="bg-sky-600 text-center  rounded p-1  mt-1 text-white text-bold">
                            <p>Active</p>
                        </div> }

                    </td>

                    <td className="text-sm pr-6 whitespace-no-wrap text-black text-black tracking-normal leading-4">
                       {moment(book?.checkIn).format("DD-MM-YYYY")}
                    </td>
                    {!book?.isCancel && today > moment(book?.checkOut).format("DD-MM-YYYY") ? (
                         <td className="text-sm pr-6 whitespace-no-wrap text-black text-black tracking-normal leading-4">
                       {moment(book?.checkOut).format("DD-MM-YYYY")}
                      <p className="text-green-500">Complete</p>
                    </td>
                    ):(
                      <td className="text-sm pr-6 whitespace-no-wrap text-black text-black tracking-normal leading-4">
                     {moment(book?.checkOut).format("DD-MM-YYYY")}
                    </td>
                    )}
                 
                    
                    <td className="pr-6">
                      <td className="text-sm pr-6 whitespace-no-wrap text-black text-orange-600 tracking-normal leading-4">
                        {book?.days}
                      </td>
                    </td>
                    <td className="pr-8 relative">
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                      >
                        {(popupState) => (
                          <div>
                            <button
                              {...bindTrigger(popupState)}
                              className="text-black rounded cursor-pointer border hover:text-sky-600 border-transparent focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-dots-vertical dropbtn"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                onclick="dropdownFunction(this)"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={19} r={1} />
                                <circle cx={12} cy={5} r={1} />
                              </svg>
                            </button>
                            <Popover
                              sx={{ ml: -10 }}
                              {...bindPopover(popupState)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                            >
                              <Typography sx={{ p: 2 }}>
                                <div className="">
                                  <p className="text-base leading-4 mt-4 text-gray-600">
                                    Total Rooms: {book?.rooms}
                                  </p>
                                  <p className="text-base leading-4 mt-4 text-gray-600">
                                    Room rate: {book?.roomId?.price}
                                  </p>
                                  <p className="text-base leading-4 mt-4 text-gray-600">
                                    Adult:{book?.adult}
                                  </p>
                                  <p className="text-base leading-4 mt-4 text-gray-600">
                                    Property Type: {book?.type}
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                      Location:{book?.location}
                                  </p>
                                  <p className="md:w-96 text-base text-lg leading-normal text-sky-600 mt-4">
                                    Customer Information
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    Name: {book?.userId?.name}
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    Address: {book?.address}
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    Phone number: {book?.phone}
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    Address: {book?.address}
                                  </p>
                                </div>
                              </Typography>
                            </Popover>
                          </div>
                        )}
                      </PopupState>
                      <div className="dropdown-content mt-1 absolute left-0 -ml-12 shadow-md z-10 hidden w-32">
                        {/* <ul className="bg-white dark:bg-gray-800 shadow rounded py-1">
                                            <li className="cursor-pointer text-black text-black text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">Edit</li>
                                            <li className="cursor-pointer text-black text-black text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">Delete</li>
                                            <li className="cursor-pointer text-black text-black text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">Duplicate</li>
                                        </ul> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <ReactPaginate className="flex space-x-4 text-lg text-bold text-sky-600 hover:text-sky-900 ml-2 mt-4"
      previousLabel={'previous'}
      nextLabel={'next'}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName={'pagination'}
      previousLinkClassName={'previous_page'}
      nextLinkClassName={'next_page'}
      disabledClassName={'disabled'}
      activeClassName={'active'}
    /> */}
      </div>
    </>
  );
}

export default ViewBook;
