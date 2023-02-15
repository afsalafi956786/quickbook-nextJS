// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
// import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
// import { DateRange } from 'react-date-range';
// import {useState} from 'react'
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import {format} from 'date-fns'

// function UserNav() {
//     const [openDate,setOpenDate]=useState(false)
//     const [date, setDate] = useState([
//         {
//           startDate: new Date(),
//           endDate: new Date(),
//           key: 'selection'
//         }
//       ]);
//       const [openOption,setOpenOption]=useState(false)
//       const [options,setOptions]=useState({
//         Room:1,
//         Adult:1
//       })
      
//   return (
//     <>
//       <div className="w-full h-20 shadow-lg z-[100]">
//         <div className="flex justify-between items-center w-full h-full  px-16 ">
//           <Image src="/logo/qb.png" alt="/" width="150" height="80" />
//           <div className="h-14  border flex align-items-center rounded-md  ">
//           <div  className=" pt-4 border-r-2  w-full">
//             <input type="text" placeholder="Where are you going" className="outline-none" />
//           </div>
//           <div className=" px-6  border-r-2 cursor-pointer ">
//          <FontAwesomeIcon icon={faCalendarDays} className='text-slate-300   h-5'/>
//          <span onClick={()=>setOpenDate(!openDate)} className=" px-4 text-slate-500">{`${format(date[0].startDate,"MM/dd/yyy")} to ${format(date[0].endDate,"MM/dd/yyy")} `}</span>

//          { openDate && <DateRange
//        editableDateInputs={true}
//        onChange={item => setDate([item.selection])}
//        moveRangeOnFirstSelection={false}
//       ranges={date}
//       className='postion:absolute top:[50px]'
//         />}
//           </div>
          
//           <div className="flex px-5  pt-5 border-r-2 cursor-pointer">
//             <FontAwesomeIcon icon={faPerson} className='text-slate-300 h-6'/>
//             <span className="px-6 inline">{`${options.Room} Room . ${options.Adult} Adult`}</span>
//             <div className="">

//                 <div className="">
//                 <span className="">Room</span>
//                 <button className="">-</button>
//                 <span className="">1</span>
//                 <button className="">+</button>
//                 </div>
                

//                 <div className="">
//                 <span className="">Adult</span>
//                 <button className="">-</button>
//                 <span className="">0</span>
//                 <button className="">+</button>
//                 </div>


//             </div>
//           </div>
//          <button className="bg-sky-600 w-[30%] text-white font font-semibold">Search</button>
         
//           </div>

//           <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 ">
//             <li className="text-stone-700 cursor-pointer mt-5 ml-6">Login/</li>
//             <h className="text-stone-700 cursor-pointer ml-1 mt-5">Signup</h>
//           </ul>
          
//         </div>
//       </div>
      


//     </>
//   );
// }

// export default UserNav;
