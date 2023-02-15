import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
// import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import swal from "sweetalert";
import Router, { useRouter } from "next/router";

function FinalNav() {
  const router = useRouter();
  // cosnt [nav,setNav]=useState(false)
  // const handleClick=()=>setNav(!nav)

  let logout = () => {
    swal({
      title: "Are you sure?",
      background: "black",
      text: "Once logout, you need to add credentials when login",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelet) => {
      if (willDelet) {
        localStorage.removeItem("usertoken");
        router.push("/auth");
      }
    });
  };

  return (
    <>
      <div className=" w-full h-20 shadow-xl z-[100]">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
          <div className="flex items-center">
            <Image src="/logo/qb.png" alt="/" width="150" height="65" />
            <div className="min-h-screen flex items-center justify-center ml-16">
              <div className="grid grid-cols md:grid-cols hidden lg:block  gap-4 p-5">
                <div className=" border   flex items-center justify-around h-12 p-[10px 0px] rounded pl-6 ml-6 ">
                  <div className="flex items-center gap-[10px] ">
                    <input
                      type="text"
                      placeholder="where are you going"
                      className=" outline-none "
                    />
                  </div>
                  <div className="flex items-center gap-[10px]  pr-6 ">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-slate-300   h-5"
                    />
                    <span headersearchText>date to date</span>
                  </div>
                  <div className="flex items-center gap-[10px] pr-6 ">
                    <FontAwesomeIcon
                      icon={faPerson}
                      className="text-slate-300 h-6"
                    />
                    <span className="hedaerseach">2 children 1 adult</span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <button className="bg-sky-600 h-12 px-6 text-semibold text-white">
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 ">
            <p
              href="#"
              onClick={logout}
              className="text-stone-700 cursor-pointer mt-5 ml-6"
            >
              Login/
            </p>
            <Link href="#" className="text-stone-700 cursor-pointer ml-1 mt-5">
              Signup
            </Link>
          </ul>
        </div>
         <ul className="absolute bg-zinc-200 w-full px-8">
        <li className="border-b-2 border-zinc-300 w-full py-4 ">Home</li>
        <li className="border-b-2 border-zinc-300 w-full py-4">Home</li>
        <li className="border-b-2 border-zinc-300 w-full py-4">Home</li>
        <li className="border-b-2 border-zinc-300 w-full py-4">Home</li>
        <div>
        <button className="bg-indigo-600 text- px-8 text-white mb-5">Sign in</button>
      </div>
      </ul>
      
      </div>
     
    </>
  );
}

export default FinalNav;