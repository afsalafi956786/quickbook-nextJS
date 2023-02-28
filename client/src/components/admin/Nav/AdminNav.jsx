import React from "react";
import Image from "next/image";
import Link from "next/link";

function AdminNav() {
  return (
    <>
      <div className=" w-full h-20 shadow-lg z-[100] ">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
          <Image
            src="/logo/qb.png"
            alt="/"
            width="150"
            height="80"
          />
        </div>
      </div>
    </>
  );
}

export default AdminNav;