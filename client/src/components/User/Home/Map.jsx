import React from "react";
import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { maptoken } from "@/constance/constance";

function Map({ rooms }) {
  mapboxgl.accessToken = maptoken;

  const [p1, setP1] = useState(76.2673);
  const [p2, setP2] = useState(9.9312);
  useEffect(() => {
    setP1(rooms?.longitude);
    setP2(rooms?.latitude);
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [p1, p2],
      zoom: 9,
    });
    const coordinates = [p1, p2];
    addToMap(map, coordinates);
  }, [p1, p2]);
  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    console.log(marker);
  };
  return (
    <>
      <div className="  lg:md:px-40 -mt-16 sm:px-12 xs:px-6">
        <div
          id="map"
          className=" h-64   bg-white   rounded-lg border border-gray-300 mb-6 shadow-lg"
        ></div>
      </div>
    </>
  );
}

export default Map;
