import React, { useState } from "react";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import styles from "@/styles/Newnav.module.css";
import { mapboxGeo } from "@/constance/constance";
import { maptoken } from "@/constance/constance";
import { useRouter } from "next/router";

// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useNavigate } from "react-router-dom";

function Newnav() {
  //   const navigate=useNavigate()
   const router=useRouter();
  const [place, setPlace] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

 
  const [suggestion, setSuggestion] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // const handleSearch = () => {
  //   navigate("/hotels", { state: { place, date, options } });
  // };



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
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerSearch}>
          <div className={styles.headerSearchItem}>
            <FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
            <input
              type="text"
              value={place}
              placeholder="Where are you going?"
              className="headerSearchInput text-black outline-none"
              onChange={handleInput}

              // onChange={handleInput}
            />

            {suggestion.length > 0 && (
              <div className="absolute z-50">
                <ul className=" bg-white border border-gray-400  max-h-48 overflow-y-scroll mt-64 rounded shadow-md">
                  {suggestion.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handlePickup(suggestion)}
                      className="text-black cursor-pointer hover:bg-gray-200 p-2 hover:text-black  border-gray-400"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.headerSearchItem}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles.headerIcon}
            />
            <span
              onClick={() => setOpenDate(!openDate)}
              className={styles.headerSearchText}
            >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className={styles.date}
                minDate={new Date()}
              />
            )}
          </div>

          <div className={styles.headerSearchItem}>
            <FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className={styles.headerSearchText}
            >{`${options.adult} adult · ${options.room} room`}</span>
            {openOptions && (
              <div className={styles.options}>
                <div className={styles.optionItem}>
                  <span className={styles.optionText}>Adult</span>
                  <div className={styles.optionCounter}>
                    <button
                      disabled={options.adult <= 1}
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className={styles.optionCounterNumber}>
                      {options.adult}
                    </span>
                    <button
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.optionItem}>
                  <span className={styles.optionText}>Room</span>
                  <div className={styles.optionCounter}>
                    <button
                      disabled={options.room <= 1}
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className={styles.optionCounterNumber}>
                      {options.room}
                    </span>
                    <button
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.headerSearchItem}>
            <button
              className={styles.headerBtn}
              onClick={()=>{
                router.push(`/location/${place}`)
            
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newnav;
