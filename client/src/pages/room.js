import SideBar from "@/components/User/Sidebar/SideBar";
import HomeNav from "../components/User/Navbar/HomeNav";
// import Booking from '@/components/User/Navbar/Booking'
import React from "react";
import RoomData from "@/components/User/Home/RoomData";
import { rooms } from "@/store/rooms";
import { getRoomInfo, userDatafetch } from "@/config/userEndpoints";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { users } from "@/store/users";
import { useRouter } from "next/router";
import Newnav from "@/components/User/Navbar/Newnav";

function room() {
  let dispatch = useDispatch();
  let router = useRouter();
  useEffect(() => {
    // function created for do await
    async function invoke() {
      if (localStorage.getItem("usertoken")) {
        const data = await userDatafetch({
          usertoken: localStorage.getItem("usertoken"),
        });
        //    setUser(data.userDetails)
        dispatch(users(data.userDetails));
        if (data.status == "failed") {
          router.push("/auth");
        } else if (data.auth) {
          if (data?.userDetails?.isBanned) {
            localStorage.removeItem("usertoken");

            toast.error(`OOPS! You were banned few days `, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            router.push("/auth");
          } else {
            router.push("/room");
          }
        }
      } else {
        router.push("/auth");
      }
    }
    invoke();
  }, []);

  useEffect(() => {
    async function run() {
      const roomDetails = await getRoomInfo();
      dispatch(rooms(roomDetails.roomData));
    }
    run();
  }, []);
  return (
    <>
      <HomeNav />
      <div className="container p-[15px]  mx-auto relative">
        {/* <Booking/>  */}
      </div>
      <Newnav />
      <div className="flex">
        <SideBar />

        <RoomData />
      </div>
    </>
  );
}

export default room;
