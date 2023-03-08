import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import ReactQuill from "react-quill";
// import StarIcon from "@mui/icons-material/Star";
// import "react-quill/dist/quill.snow.css";
// import Rating from "@mui/material/Rating";
// import {  useState } from "react";
import { cancelBooking } from "@/config/userEndpoints";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import moment from "moment/moment";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 600,
//     height: 500,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

////////////////////////////

// const labels = {
//   0.5: "Useless",
//   1: "Useless+",
//   1.5: "Poor",
//   2: "Poor+",
//   2.5: "Ok",
//   3: "Ok+",
//   3.5: "Good",
//   4: "Good+",
//   4.5: "Excellent",
//   5: "Excellent+",
// };

// function getLabelText(value) {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// }

// const [value, setValue] = useState(2);
// const [hover, setHover] = useState(-1);
// const [text,setText]=useState('')
// const [err,setErr]=useState('')

// const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
// const handleClose = () => setOpen(false);

function BookingHistory({ booked }) {
  let details = booked.bookedRooms;
  const bookDate=moment(booked?.createdAt).format("DD-MM-YYYY");
  

  return (
    <>
      <div className="flex ">
      <ToastContainer />
        <div className="lg:ml-45 md:px-6  lg:px-20  md:py-12 py-8 mt-24">
          <h2 className="-mt-12 py-8 text-sky-600">Booking History</h2>
          {details?.map((booking) => (
            <div className="flex flex-col-reverse lg:flex-row items-center border border-gray-300 p-6 border-black rounded-lg shadow-lg mb-12  ">
              <div className="">
                <div className="flex justify-start item-start space-y-2 flex-col ">
                  <h1 className="text-lg lg:text-lg font-semibold leading-7 lg:leading-9  text-gray-800">
                    Booking id: {booking?._id?.substring(0, 10)}
                  </h1>
                  {/* <p className="text-base font-medium leading-6 text-gray-600">
                    Booking Date: {bookDate}
                  </p> */}
                </div>
                <img
                  src={booking?.roomId?.img[0]}
                  alt="bag"
                  className="lg:w-48 h-32 object-cover object-center w-full"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:pr-24">
                {/*            
                <p className="text-sm font-semibold lg:leading-9 text-red-600 lg:pb-6 md:pb-4 pb-2">
                  Your booking has been canceled!!!
                </p> */}

                <p className="md:text-3xl lg:text-2xl text-2xl font-semibold lg:leading-9 text-gray-800 lg:pb-6 md:pb-4 pb-2">
                  {booking?.vendorId?.propertyName}
                </p>
                <p className="text-lg text-green-800">{booking?.location}</p>
                <p className="text-sm leading-5 text-gray-600 md:pb-10 pb-8">
                  {booking?.roomId?.description.substring(0,170)}
                </p>
                <p>
                  Total Price :{" "}
                  <span className="text-orange-600 border ">{booking?.total}</span> ₹
                </p>
                <p>
                  Check in :{" "}
                  <span className=" ">{booking?.checkIn}</span> 
                </p>
                <p>
                  Check out :{" "}
                  <span className=" ">{booking?.checkOut}</span> 
                </p>
              </div>
              <div className="md:flex flex items-center justify-center space-x-2">
                {/* {!bookings.isUserCancel && bookings.check_out > today ? ( */}
                <button
                   onClick={async()=>{
                    swal({
                      title: "Are you sure?",
                      background:'black',
                      text: "Once Canceled, you will not be able to recover this booking!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then(async (wilDelete)=>{
                      if(wilDelete){
                        const data=await cancelBooking(booking._id)
                        if(data.status=='success'){
                          toast.success( `${data?.message}`, {
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
                    })
                   }}
                  className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-red-600 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                >
                  Cancel
                </button>
                {/* ) : (
                ""
              )} */}

                {/* {today > bookings.check_out && !bookings.isUserCancel ? ( */}
                <button
                  onClick={handleOpen}
                  className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-green-700 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                >
                  Review
                </button>
                {/* //   ) : (
            //     ""
            //   )} */}
                {/* 
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Rating
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2 }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p className="text-xl font-semibold leading-tight text-gray-800">
                      Feedback
                    </p>
                    <ReactQuill value={text} onChange={(v)=>{setText(v)}} className="h-40" />
                  </Typography>
                  <hr className="h-[1px] bg-gray-100 my-10" />

                  {err?(<p className="text-red-600 font-semibold text-sm italic">{err}</p>):("")}
                  

                  <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                    <button className="bg-white border-indigo-700 rounded hover:bg-gray-50 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-indigo-700 border lg:max-w-[95px]  w-full ">
                      Cancel
                    </button>
                    <button  className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full ">
                      Submit
                    </button>
                  </div>
                </Box>
              </Modal> */}
            
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <button
                      {...bindTrigger(popupState)}
                      className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-gray-800 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                    >
                      More Details
                    </button>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        <div>
                          <p className="text-lg lg:leading-tight leading-normal text-black mt-7">
                            Thank you for choosing HOTALE...
                          </p>
                        
                          <p className="text-base leading-4 mt-4 text-gray-600">
                            Check-in Date: 12/22/300
                          </p>
                          <p className="text-base leading-4 mt-4 text-gray-600">
                            Check-Out Date: 12/33/444
                          </p>
                          <p className="text-base leading-4 mt-4 text-gray-600">
                            No. of Rooms: 4
                          </p>
                          <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                            No. of Guests:5
                          </p>
                       
                        </div>
                      </Typography>
                    </Popover>
                  </div>
                )}
              </PopupState> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
