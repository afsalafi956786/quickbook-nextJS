import React from "react";
import swal from "sweetalert";

import { propertyApprovel} from "@/config/AdminEndpoint";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Approval({ room, setRefresh, refresh }) {
  const router = useRouter();
  return (
    <div>
      <ToastContainer />
      {/* <h2 className="ml-6 mt-6">Approval</h2> */}
      <div className="flex pl-4 mt-8">
        <div className="text-balck ">
          <h2 className="font-noraml">Property Approval</h2>
        </div>
      </div>

      <div className="mt-12 ml-4 mr-6 ">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block  xs:w-1/3 w-1/3 p-4 pl-10 text-sm text-black border border-gray-300  rounded-lg   dark:placeholder-gray-400 "
              placeholder="Search Hotel name"
              required
            />
          </div>
        </form>
      </div>
      {/* {hotels.map((hotel, i) => ( */}

      {room.map((rooms, i) => (
        <div className="ml-4 mr-4 mt-4">
          <div className="w-full p-4 text-center hover:border-sky-600  border rounded-lg shadow-lg sm:p-8 bg-white border-gray-300">
            <div className="flex justify-between space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-white">
              <img
                onClick={async () => {
                  router.push(`room/${rooms._id}`);
                }}
                className="xl:lg:h-[10%] border cursor-pointer border-gray-300 xl:lg:w-[10%] xs:h-[30%] xs:w-[20%] xs:-ml-2  "
                src={rooms.img[0]}
              />

              <div className="max-w-sm">
                <h4 className="text-sky-600">Property Name</h4>
                <p className="text-black  break-all mt-4 font-semibold">
                  {rooms?.vendorId?.propertyName}
                </p>
              </div>

              <div className="relative">
                <h4 className="text-sky-600">Total Available Rooms</h4>
                <p className="text-gray-500 mt-4 font-normal break-all">
                  {rooms.totalrooms}
                </p>
              </div>

              <div>
                <h4 className="text-sky-600">Status</h4>
                <p className="text-red-700 mt-4 font-extrabold break-all">
                  Pending
                </p>
              </div>

              <div>
                <h4 className="text-sky-600">Action</h4>
                {/* <button
                  onClick={async () => {
                    swal({
                      title: "Are you sure?",
                      background: "black",
                      text: "Do you want to Reject  this property",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then(async (wilDelete) => {
                      if (wilDelete) {
                        const data = await propertyReject(rooms._id);
                        if (data?.status == "success") {
                          setRefresh(!refresh);
                          toast.success(`Wow! ${data?.message}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }
                      }
                    });
                  }}
                  className="text-white mt-4 bg-red-700 hover:bg-green-800 focus:outline-none font-medium rounded-xl text-sm px-6 py-2.5 text-center mr-2   dark:hover:bg-red-800 "
                >
                  Reject
                </button> */}
                <button
                  onClick={async () => {
                    swal({
                      title: "Are you sure?",
                      background: "black",
                      text: "Do you want to Accept  this property",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then(async (wilDelete) => {
                      if (wilDelete) {
                        const data = await propertyApprovel(rooms._id);
                        if (data?.status == "success") {
                          setRefresh(!refresh);
                          toast.success(`Wow! ${data?.message}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }
                      }
                    });
                  }}
                  className="text-white mt-4 bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-xl text-sm px-6 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Approval;
