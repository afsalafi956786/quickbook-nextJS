import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@mui/material/Typography";
function ViewBook({ booking }) {
  console.log(booking, "555555555555555555555,,,,,,,,,,");
  return (
    <>
      <div className="py-20">
        <div className="mx-auto container bg-white dark:bg-gray-00 shadow rounded">
          <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
            <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
              <div className="flex items-center">
                {/* <a className="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                    <line x1={16} y1={5} x2={19} y2={8} />
                                </svg>
                            </a> */}
                {/* <a className="text-gray-600 dark:text-gray-400 mx-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-settings" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <circle cx={12} cy={12} r={3} />
                                </svg>
                            </a> */}
                {/* <a className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                </svg>
                            </a> */}
                {/* <a className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-copy" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x={8} y={8} width={12} height={12} rx={2} />
                                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                </svg>
                            </a> */}
                {/* <a className="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-trash" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={4} y1={7} x2={20} y2={7} />
                                    <line x1={10} y1={11} x2={10} y2={17} />
                                    <line x1={14} y1={11} x2={14} y2={17} />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </a> */}
                <h1 className="font-bold text-sky-600">Booking Details</h1>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
              <div className="flex items-center  lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                <p className="text-base text-black " id="page-view">
                  Viewing 1 - 20 of 60
                </p>
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
                {booking?.viewBookings?.map((book) => (
                    
                  
                  <tr className="h-24 border-gray-300  dark:border-gray-200 border-b ">
                    
                    <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-sky-800 text-black tracking-normal leading-4">
                
                      <img
                        className="p-3 cursor-pointer"
                        src="https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571458.jpg&fm=jpg"
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
                          Carrie Anthony
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
                      {book?.checkIn}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-black text-black tracking-normal leading-4">
                      {book?.checkOut}
                    </td>
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
                                    total Rooms: {book?.rooms}
                                  </p>
                                  <p className="text-base leading-4 mt-4 text-gray-600">
                                    Check-Out Date:
                                  </p>
                                  <p className="text-base leading-4 mt-4 text-gray-600">
                                    No. of Rooms:
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    No.of days:
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    property Type:
                                  </p>
                                  <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                                    No.of adults:
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
      </div>
    </>
  );
}

export default ViewBook;
