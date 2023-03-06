import React from "react";

function ReviewForm() {
  return (
    <div class="  max-w-2xl bg-white py-10 px-8 m-auto w-full mt-2">
      <div className="md:flex items-center  py-8 border-t border-gray-200">
        <div className="w-[20%]">
          <img
            src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png"
            alt
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="md:pl-3 md:w-3/4">
          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
          <div className="flex items-center justify-between w-full pt-1">
            <p className="text-base font-black leading-none text-gray-800">
              North wolf bag
            </p>
            <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
              <option>01</option>
              <option>02</option>
              <option>03</option>
            </select>
          </div>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            Height: 10 inches
          </p>
          <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
          <p className="w-96 text-xs leading-3 text-gray-600">
            Composition: 100% calf leather
          </p>
          <div className="flex items-center justify-between pt-5 pr-6">
            <div className="flex itemms-center">
              <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                Add to favorites
              </p>
              <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                Remove
              </p>
            </div>
            <p className="text-base font-black leading-none text-gray-800">
              $9,000
            </p>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-2 gap-4 max-w-xl m-auto -ml-2">
        <div className="col-span-2 lg:col-span-1">
          <input
            type="text"
            className="border-solid border-gray-100 shadow-md border-2 p-1 md:text-xl w-full"
            placeholder="Name"
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <input
            type="text"
            className="border-solid border-gray-100 shadow-md border-2 p-1 md:text-xl w-full"
            placeholder="Email Address"
          />
        </div>

        <div className="col-span-2">
          <textarea
            cols="30"
            rows="3"
            className="border-solid border-gray-100 shadow-md border-2 p-3 md:text-xl w-full"
            placeholder="Message"
          ></textarea>
        </div>

        <div className="col-span-2 text-right">
          <button class="py-3 px-3 bg-sky-600 rounded hover:bg-sky-700 text-white font-bold w-full sm:w-32">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
