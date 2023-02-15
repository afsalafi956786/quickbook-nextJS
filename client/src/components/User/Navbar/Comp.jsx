// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// function Comp() {
//   return (
//     <>
//     <div className="h-[200px] lg:h-[200px] bg-blue-500 absolute">

//     </div>
//     </>
//   );
// }

// export default Comp;


import React from "react";
import Image from "next/image";
import Link from "next/link";

function Comp() {
  return (
    <>
      <div className=" w-full h-20 shadow-lg ">
        
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
          <Image
            src="/logo/qb.png"
            alt="/"
            width="150"
            height="80"
          />
          <div className="text-black">
         <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 ">
            <p
              href="#"
              className="text-stone-700 cursor-pointer mt-5 ml-12"
            >
              Login/
            </p>
            <p href="#" className="text-stone-700 cursor-pointer ml-1 mt-5">
              Signup
            </p>
          </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default Comp;