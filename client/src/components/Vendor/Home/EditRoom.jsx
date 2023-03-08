
import React from "react";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/config/firebase/firebase";
import { EditRoomInfo } from "@/config/venderEndpoints";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxGeo } from "@/constance/constance";
import { maptoken } from "@/constance/constance";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";

function EditRoom({room}) {
  mapboxgl.accessToken = maptoken;
  const router=useRouter();
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [aminites,setAmenities]=useState(null)
  const [image,setImage]=useState([])
  const [urls,setUrls]=useState([])

  const [place, setPlace] = useState(null);
  const [suggestion, setSuggestion] = useState([]);
  const [plongitude, setLongitude] = useState("76.2673");
  const [platitude, setLatitude] = useState("9.9312");
  const [clear, setClear] = useState("");

  //map useeffect map code
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [plongitude, platitude],
      zoom: 8,
    });
    const coordinates = [plongitude, platitude];
    addToMap(map, coordinates);
  }, [plongitude, platitude]);
  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    console.log(marker);
  };

  
  const handleInput = async (event) => {

    setPlace(null);
    const places = event.target.value;
    console.log(places);
    if (!places) {
      setSuggestion([]);
      return;
    }
    const url = `${mapboxGeo}/${encodeURIComponent(
      places
    )}.json?access_token=${maptoken}`;
    const response = await fetch(url);
    const data = await response.json();
    setSuggestion(data.features.map((f) => f.place_name));
  };


  const handlePickup = async (suggestion) => {
    const pla = suggestion;
    setPlace(pla);
    setSuggestion([]);
    const url = `${mapboxGeo}/${suggestion}.json?limit=1&access_token=${maptoken}`;
    const response = await fetch(url);
    const data = await response.json();
    const longitude = data.features[0].geometry.coordinates[0];
    const latitude = data.features[0].geometry.coordinates[1];
    setLongitude(longitude);
    setLatitude(latitude);
  };


  const handleFile = (e) => {
    setMessage("");
    const ingList=Array.from(e.target.files)
    setImage(ingList)
    for (let i = 0; i < ingList.length; i++) {
      const fileType = ingList[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, ingList[i]]);
        
        // console.log(imgList)
      } else {
        setMessage("This image formate not supported");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  function onAmenities(val, changeVal) {
   setAmenities(val)
  }



  const submiHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   if(image){
    for(let i=0;i<image.length;i++){
        let dir=Date.now();
        let rand=Math.random();
        let img=image[i]
        const imageRef=ref(storage,`posts/${dir}${rand}/${img?.name}`);
        const toBAse64=  (img)=>
            new Promise((resolve,reject)=>{
                const reader=new FileReader();
                reader.readAsDataURL(img);
                reader.onload=()=>resolve(reader.result)
                reader.onerror=(error)=>reject(error);
            }).catch((err)=>{
                console.log(err)
            })
            const imgBase=await toBAse64(img)
            await uploadString(imageRef,imgBase , 'data_url').then(async()=>{
               const downloadURL=await getDownloadURL(imageRef);
               urls.push(downloadURL)
            })
        

    }
   }else{

   }

    let obj = {
      property: data.get("property"),
      roomNo:data.get('roomNo'),
      price: data.get("price"),
      adultRate: data.get("adultRate"),
      OneRoom:data.get('oneRoom'),
      capacity:data.get('capacity'),
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zip: data.get("zip"),
      description:data.get('description'),
      amenities:aminites,
      image:urls,
      category: data.get("category"),
      parking: data.get("parking"),
      swimminPool: data.get("swimmingPool"),
      location: place,
      longitude: plongitude,
      latitude: platitude,

     
    };
   
    setUrls([])

    if (
      obj.property &&
      obj.roomNo &&
      obj.price &&
      obj.OneRoom &&
      obj.capacity &&
      obj.address &&
      obj.adultRate &&
      obj.address &&
      obj.city &&
      obj.state &&
      obj.zip &&
      obj.description &&
      obj.category &&
      obj.amenities &&
      obj.image &&
      obj.location
     
      
    ) {
        const data=await EditRoomInfo(obj,room._id,{'vendortoken':localStorage.getItem('vendortoken')})
        console.log(EditRoomInfo)
        if(data?.status=='success'){
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
          setTimeout(()=>{
            router.push('/vendor/rooms')
          },1000)
                

        }
    

    } else {
      toast.error(`OOPS! All fields are required`, {
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

<form
        className="w-full max-w-lg lg:ml-16 xs:px-4 "
        onSubmit={submiHandler}
      >
        <ToastContainer />
        <h2 className="mt-8">Edit  Your Room</h2>
        <div className="flex flex-wrap -mx-3 mb-6 mt-12 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Property type
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="property"
              type="text"
              defaultValue={room?.propertyType}
              name="property"
              placeholder="Enter your property type"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Total Rooms
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              defaultValue={room?.totalrooms}
              name="roomNo"
              min='1'
              max='10'
              placeholder="Enter your Room number"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
             single Room Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              defaultValue={room?.price}
              name="price"
              min='1'
              placeholder="Enter the amount of room"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              adults price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              defaultValue={room?.AdultsRate}
              name="adultRate"
              min='1'
              placeholder="Enter the adults price"
            />
          
          </div>


          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Total room price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              defaultValue={room?.totalRoomRate}
              name="oneRoom"
              min='1'
              placeholder="enter the amout of single room"
            />
          </div>


          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Capacity(total person's count)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              defaultValue={room?.capacity}
              name="capacity"
              min='1'
              placeholder=" total count  capacity"
            />
          
          </div>



        </div>

        
        



        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              property address
            </label>
            <textarea
              className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              name="address"
              defaultValue={room?.address}
              type="text"
              placeholder="Enter your property address"
            />
        
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              defaultValue={room?.city}
              name="city"
              placeholder="Enter your city"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              State
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="state"
                defaultValue={room?.state}
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadar and Nagar Haveli">
                  Dadar and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="number"
              defaultValue={room?.zip}
              name='zip'
              placeholder="90210"
            />
          </div>
        </div>

        <label
          className="block uppercase tracking-wide text-gray-700 mt-9 text-xs font-bold mb-2"
          for="grid-zip"
        >
          Room amenities
        </label>
        <Multiselect
          style={{
            chips: {
              background: "black",
            },
            multiselectContainer: {
              color: "white",
            },
            searchBox: {
              padding: "8px",
            },
            optionContainer: {
              color: "white",
            },
            option: {
              background: "#1e293b",
            },
            groupHeading: {
              background: "",
            },
          }}
          isObject={false}
          placeholder="select fecilities"
          selectedValues={room?.amenities}
          // selectedValues={hotel?.fesility}
          className="  bg-gray-800 border rounded-md border-gray-200  focus:outline-none  focus:border-gray-500"
          options={[
            "Ac",
            "Power backup",
            "Wifi",
            "Fire extinguisher",
            "TV",
            "Daily house keeping",
            "Attached bathroom",
            "First aid kit",
            "Air-conditionar",
          ]}
        //   onRemove={}
          onSelect={setAmenities}
        />
           <div className="flex flex-wrap -mx-3 mb-6 mt-8">
          <div className="w-full  px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Room description
            </label>
            <textarea
              className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              defaultValue={room?.description}
              name="description"
              type="text"
              placeholder="Enter your room description"
            />
          </div>
        </div>

        <label
          className="mt-9 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Choose category
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            selectedValues={room?.category}
            name='category'
          >
            <option value="deluxe">Deluxe</option>
            <option value="laxuary">Laxuary</option>
            <option value="classic">Classic</option>
            <option value="twinbedroom">Twin Bedroom</option>
            <option value="normalroom">Normal Room</option>
            <option value="familyroom">Family Room</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6 mt-12 ">
          <fieldset className="md:w-1/2 ">
            <div
              className="text-base font-medium text-gray-900"
              aria-hidden="true"
            >
              Extras
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="comments"
                    name="parking"
                    defaultValue={room?.parking}
                    value='parking'
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    parkig
                  </label>
                  <p className="text-gray-500">
                    Do you have a parking fecility in your property please check
                    this.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="mt-4 space-y-4 md:w-1/2 mt-9">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="comments"
                  name="swimmingPool"
                  value='swimmingPool'
                  defaultValue={room?.swimminPool}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Swimming Pool
                </label>
                <p className="text-gray-500">
                  Do you have swimmin pool in your propery please check this box
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex  items-center px-3 sm:w-[150%] lg:w-[150%]">
          <div class="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
            <div class="m-4">
              <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                {message}
              </span>
              <div class="flex items-center justify-center w-full">
                <label class="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Upload Room photo
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFile}
                    class="opacity-0"
                    multiple="multiple"
                    name="files"
                  />
                </label>
              </div>
              {image.length == 0 ?
              <div className="flex flex-wrap gap-2 mt-2">
              {room?.img?.map((file, key) => {
                return (
                  <div key={key} className="overflow-hidden relative">
                    <i
                      onClick={() => {
                        removeImage(file.name);
                      }}
                      className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                    ></i>
                    <img
                      className="h-20 w-20 rounded-md"
                      src={file}
                    />
                  </div>
                );
              })}
            </div>
            :
              <div className="flex flex-wrap gap-2 mt-2">
                {image.map((file, key) => {
                  return (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                      ></i>
                      <img
                        className="h-20 w-20 rounded-md"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                  );
                })}
              </div>
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col pb-10 w-full px-6 lg:flex-row md:flex-col p-2 ">
          <div className=" lg:max-w-[410px] w-full">
            <input
              placeholder="Add your property location"
              className="p-2 py-3 outline-none focus pr-10  bg-gray-100 border rounded border-gray-100 text-slate-600  lg:max-w-[410px] w-full leading-4"
              onChange={handleInput}
              value={place}
              defaultValue={room?.location}
            />
            <svg
              className="absolute pointer-events-none top-3 right-5 "
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                stroke="#4B5563"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L15 15"
                stroke="#4B5563"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <ClearIcon
            onClick={() => setPlace("")}
            className="mt-4 cursor-pointer"
          />
          {/* <button onClick={(event)=>{addMark(event)}} className="bg-sky-600  text-white lg:max-w-[164px] font-medium px-3 py-4 w-full  rounded-[4px] leading-[14px] hover:bg-sky-800">
                   Add location
                  </button> */}

          {suggestion.length > 0 && (
            <div className="absolute z-50">
              <ul className=" bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll mt-14 rounded shadow-md">
                {suggestion.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handlePickup(suggestion)}
                    className="text-black cursor-pointer hover:bg-gray-200 p-2 hover:text-black border-b border-gray-400"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
            

        <div className=" ml-6  -mt-8 lg:md:w-[700px] sm:w-[600px ">
          <div
            id="map"
            className=" h-80   rounded-lg border border-gray-200 mb-6 shadow-lg"
          ></div>
        </div>






        <div className="low-root mt-8 ">
          <button
            type="submit"
            className="bg-sky-600 rounded  hover:bg-sky-800 text-white px-6  p-1  "
          >
            {" "}
            submit{" "}
          </button>
        </div>
      </form>
    
    </>
  )
}

export default EditRoom