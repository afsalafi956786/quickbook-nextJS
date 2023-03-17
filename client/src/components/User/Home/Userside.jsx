import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from "@mui/icons-material/Logout";
import swal from "sweetalert";
import Link from "next/link";

function UserSide() {
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
        localStorage.removeItem("vendortoken");
        router.push("/vendor/login");
      }
    });
  };
  return (
    <>
      <div className="flex flex-col  align-middle ml-24 lg:mt-[60%] md:mt-24 sm:mt-28 xs:mt-36 border-t h-  w-64  px-4 py-8 overflow-y-auto border-r">
        <div className="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md "
                  
                >
                  <PersonIcon />

                  <span className="mx-4 font-medium">Acccount details</span>
                </Link>
              </li>

              <li>
                <Link href="/bookings"
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
                 
                >
                  <BookIcon />

                  <span className="mx-4 font-medium">Booking history</span>
                </Link>
              </li>
              <li>
                <Link href="/"
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
                 
                >
                  < HomeIcon/>

                  <span className="mx-4 font-medium">Home</span>
                </Link>
              </li>
          
              <li>
                <a
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
                  href="#"
                >
                  <LogoutIcon onClick={logout} />
                  <span onClick={logout} className="mx-4 font-medium">
                    Log out
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}

export default UserSide;
