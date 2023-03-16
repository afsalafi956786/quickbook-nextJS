import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";
import { PostReview } from "@/config/userEndpoints";
import Rating from "@mui/material/Rating";
import { cancelBooking } from "@/config/userEndpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useState } from "react";
import moment from "moment/moment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

////////////////////////////

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function BookingHistory({ setRefresh, refresh, booked }) {
  const router = useRouter();

  let details = booked.bookedRooms;
  const bookDate = moment(booked?.createdAt).format("DD-MM-YYYY");
  const today = moment().format("DD-MM-YYYY");

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [feedback, setFeedback] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addFeedback = async (roomId, vendorId) => {
    let obj = {
      roomId: roomId,
      feedback: feedback,
      stars: value,
      vendorId: vendorId,
    };
    

    if (obj.feedback && obj.stars) {
      const data = await PostReview(obj, {
        usertoken: localStorage.getItem("usertoken"),
      });
      if(data.status=='success'){
        toast.success( `Wow! ${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
          handleClose()

      }
      if(data.status=='false'){
        toast.error(`OOPS! ${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
          handleClose()
      }


    } else {
      toast.error(`OOPS! all fields are required`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  };

  return (
    <>
      <div className="flex ">
        <ToastContainer />
        <div className="lg:ml-45 md:px-6  lg:px-20  md:py-12 py-8 mt-24">
          <h2 className="-mt-12 py-8 text-sky-600">Booking History</h2>
          {details?.map((booking) => (
            <div className="flex flex-col-reverse lg:flex-row items-center border border-gray-300 p-6  rounded-lg shadow-lg mb-12  ">
              <div className="">
                <div className="flex justify-start item-start space-y-2 flex-col ">
                  <h4 className="text-md lg:text-md font-semibold   text-gray-800">
                    Booking id: {booking?._id?.substring(0, 10)}
                  </h4>
                  {/* <p className="text-base font-medium leading-6 text-gray-600">
                    Booking Date: {bookDate}
                  </p> */}
                </div>
                <img
                  onClick={() =>
                    router.push(`/details/${booking?.roomId?._id}`)
                  }
                  src={booking?.roomId?.img[0]}
                  alt="bag"
                  className="lg:w-48 h-32 object-cover object-center w-full cursor-pointer"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:pr-24">
                <p className="md:text-3xl lg:text-2xl text-2xl font-semibold lg:leading-9 text-gray-800 lg:pb-6 md:pb-4 pb-2">
                  {booking?.vendorId?.propertyName}
                </p>
                <p className="text-lg text-orange-600">{booking?.location}</p>
                <p className="text-sm leading-5 text-gray-600 md:pb-10 pb-8">
                  {booking?.roomId?.description.substring(0, 170)}
                </p>
                <p>
                  Total Price :{" "}
                  <span className="text-orange-600 border ">
                    {booking?.total}
                  </span>{" "}
                  ₹
                </p>
                <p>
                  Check in : <span className=" ">{booking?.checkIn}</span>
                </p>
                <p>
                  Check out : <span className=" ">{booking?.checkOut}</span>
                </p>
                {booking?.isCancel ? (
                  <p className="text-lg font-semibold text-center lg:leading-9 text-red-600 lg:pb-6 md:pb-4 pb-2">
                    Your booking has been cancelled!
                  </p>
                ) : (
                  ""
                )}

                {!booking?.isCancel && today > booking?.checkOut ? (
                  <p className="text-lg font-semibold text-center lg:leading-9 text-green-600 lg:pb-6 md:pb-4 pb-2">
                    Thank you for using our Room
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="md:flex flex items-center justify-center space-x-2">
                {!booking?.isCancel && today <= booking?.checkIn ? (
                  <button
                    onClick={async () => {
                      swal({
                        title: "Are you sure?",
                        background: "black",
                        text: "Once Canceled, you will not be able to recover this booking!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then(async (wilDelete) => {
                        if (wilDelete) {
                          const data = await cancelBooking(booking._id);
                          if (data.status == "success") {
                            toast.success(`${data?.message}`, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                            setRefresh(!refresh);
                          }
                        }
                      });
                    }}
                    className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-red-600 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                  >
                    Cancel
                  </button>
                ) : (
                  ""
                )}
                {!booking?.isCancel && today > booking?.checkIn ? (
                  <button
                    onClick={handleOpen}
                    className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-green-700 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                  >
                    Review
                  </button>
                ) : (
                  ""
                )}

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
                          bgcolor: "white",
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
                    <textarea
                      className="border mt-4 border-gray-400 
                  "
                      id="story"
                      name="feedback"
                      placeholder="Enter your feedback here..."
                      onChange={(e) => setFeedback(e.target.value)}
                      rows="10"
                      cols="65"
                    ></textarea>
                    <hr className="h-[1px] bg-gray-100 my-10" />

                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                      <button
                        onClick={() =>
                          addFeedback(
                            booking?.roomId?._id,
                            booking?.vendorId?._id
                          )
                        }
                        className="bg-sky-600 rounded hover:bg-sky-900 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full "
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => {
                          handleClose();
                        }}
                        className=" rounded bg-red-700 hover:bg-red-900 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white border lg:max-w-[95px]  w-full "
                      >
                        Cancel
                      </button>
                    </div>
                  </Box>
                </Modal>

                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <button
                        {...bindTrigger(popupState)}
                        className="lg:w-auto w-full border border-gray-800 hover:text-white hover:bg-sky-600 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                      >
                        View
                      </button>
                      <Popover
                        sx={{ ml: -10 }}
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
                          <div className="">
                            <p className="text-base leading-4 mt-4 text-gray-600">
                              Check-in Date: {booking?.checkIn}
                            </p>
                            <p className="text-base leading-4 mt-4 text-gray-600">
                              Check-Out Date: {booking?.checkOut}
                            </p>
                            <p className="text-base leading-4 mt-4 text-gray-600">
                              No. of Rooms: {booking?.rooms}
                            </p>
                            <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                              No.of days: {booking?.days}
                            </p>
                            <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                              property Type: {booking?.type}
                            </p>
                            <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                              No.of adults: {booking?.adult}
                            </p>
                          </div>
                        </Typography>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </div>
              {!booking?.isCancel && today > booking?.checkOut ? (
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 w-16 h-12 mx-auto  lg:mt-44 sm:pb-4 xs:pb-4"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
