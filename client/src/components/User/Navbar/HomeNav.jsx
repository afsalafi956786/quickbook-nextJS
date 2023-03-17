import React from "react";
import Image from "next/image";
// import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import swal from "sweetalert";
import Router, { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useState } from "react";

function HomeNav() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  let user = useSelector((state) => state.users.value);
  const logout = () => {
    swal({
      title: "Are you sure?",
      background: "black",
      text: "Once logout, you need to add credentials when login",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((wilDelete) => {
      if (wilDelete) {
        localStorage.removeItem("usertoken");
        router.push("/auth");
      }
    });
  };

  return (
    <>
      <div className=" w-full h-28 shadow-lg bg-slate-50 fixed">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-18">
          <Image src="/logo/qb.png" alt="/" width="150" height="80" c />

          <LogoutIcon
            onClick={logout}
            className=" ml-auto   h-24 w-22 cursor-pointer"
          />

          {user && (
            <div className="relative ">
              <div
                className="  flex items-center justify-between  rounded  w-40 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                <h3 className="pl-3 text-sky-600   text-xl leading-3 tracking-normal font-normal">
                  {" "}
                  <PersonIcon className=" text-sky-600 cursor-pointer " />{" "}
                  {user?.name}
                </h3>
              </div>
              {show && (
                <ul className="visible transition duration-300 opacity-100 bg-white -ml-6 shadow rounded mt-2 pb-1 w-44 absolute">
                  <li
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer text-gray-600  text-md hover:bg-sky-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                  >
                    Account Details
                  </li>
                  <li
                    onClick={() => router.push("/bookings")}
                    className="cursor-pointer text-gray-600  text-md hover:bg-sky-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                  >
                    Bookings History
                  </li>
                  <li
                    onClick={() => router.push("/")}
                    className="cursor-pointer text-gray-600  text-md hover:bg-sky-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                  >
                    Home
                  </li>
                
                  <li
                    onClick={logout}
                    className="cursor-pointer text-gray-600  text-md hover:bg-sky-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                  >
                    Logout
                  </li>

                  <li>{/* <hr className="border-gray-200 my-1" /> */}</li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeNav;
