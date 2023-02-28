import React from "react";
import Image from "next/image";
// import ApartmentIcon from "@mui/icons-material/Apartment";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


function VendorNav({vendor,admin}) {
    console.log(vendor)
    console.log(admin);
    
  return (  
    <>
      <div className=" w-full h-20 shadow-lg  ">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
          <Image src="/logo/qb.png" alt="/" width="150" height="80" />
         {vendor ? ( <div className="flex p-2 space-x-2 ">
          
            <img className="rounded-full h-14  " src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8&w=1000&q=80" alt="" />        
            <h3 className="mt-4 font-bold ">
            {vendor?.email}
            </h3>

          </div>
         ):(
          <div className="flex p-2 space-x-2 ">
          
            < AdminPanelSettingsIcon className="w-12 h-12 "/>    
            <h3 className="mt-4 font-bold ">
            {admin?.email}
            </h3>

          </div>
         )
           } 

          
        </div>
      </div>
    </>
  );
}

export default VendorNav;
