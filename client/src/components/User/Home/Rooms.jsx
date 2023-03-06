import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function Rooms() {
    let room=useSelector((state)=>(state.rooms.value))
  return (
    <section className="container mx-atuo md:px-20 py-16 ">
      <div className="grid lg:grid-cols-2 sm:mx-12 xs:ml-24  ">
        {room?.slice(0,4)?.map((rooms)=>(
        <div className="item">
          <h1 className="font-bold text-gray-600 text-4xl py-12 text-center">
            {" "}
            {rooms?.category}
          </h1>
          <div className="flex flex-col gap-6 ">
            {/* post */}
            <div className="flex gap-5 ">
              <div className="image flex flex-col justify-start">
                <Link href="#">
                  <img
                    src={rooms?.img}
                    alt=""
                    width={300}
                    height={250}
                    className="rounded  "
                  />
                </Link>
              </div>
              <div className="info flex justify-center flex-col">
                <div className="title">
                  <Link
                    href="#"
                    className="text-xl font-bold text-gray-800 hover:text-gray-500"
                  >
                    {rooms?.vendorId?.propertyName}
                  </Link>
                  <p className="text-gray-500 py-3">
                  {rooms?.description?.substring(1,150)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
         ))}
       

  

      </div>
    </section>
  );
}

export default Rooms;
