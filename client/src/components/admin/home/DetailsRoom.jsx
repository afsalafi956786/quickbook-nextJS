
import React from 'react'

function DetailsRoom({room}) {
  return (
   <>
   <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
            <div className="flex flex-col justify-start items-start w-full space-y-8">
              
                <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        <div className="flex flex-row justify-between items-start">
                            <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800">{room?.vendorId?.propertyName}</p>
                           
                        </div>
                     
                    </div>
                    
                 
                    
                        <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">{room?.description}</p>
                        <div className="flex flex-col md:flex-row justify-between w-full">
                        <div className="flex flex-row justify-between items-start">
                            <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800">Address : <span className='text-sm'>{room?.address}</span></p>
                           
                        </div>
                     
                    </div>
                 
                        <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                            <div>
                                <img src={room?.img[0]} alt="chair-1" />
                            </div>
                            <div>
                                <img src={room?.img[1]} alt="chair-2" />
                            </div>
                            <div className="hidden md:block">
                                <img src={room?.img[2]} alt="chair-3" />
                            </div>
                            <div className="hidden md:block">
                                <img src={room?.img[3]} alt="chair-4" />
                            </div>
                        </div>
                        <div className="md:hidden carousel pt-8 cursor-none" data-flickity='{ "wrapAround": true,"pageDots": false }'>
                            <div className="carousel-cell">
                                <div className="md:w-full h-full relative">
                                    <img src={room.img[0]} alt="bag" className="w-full h-full object-fit object-cover" />
                                </div>
                            </div>
                            <div className="carousel-cell">
                                <div className="md:w-full h-full relative">
                                    <img src={room.img[1]} alt="shoes" className="w-full h-full object-fit object-cover" />
                                </div>
                            </div>
                            <div className="carousel-cell">
                                <div className="md:w-full h-full relative">
                                    <img src={room.img[2]} alt="wallet" className="w-full h-full object-fit object-cover" />
                                </div>
                            </div>
                            <div className="carousel-cell">
                                <div className="md:w-full h-full relative">
                                    <img src={room.img[3]} alt="wallet" className="w-full h-full object-fit object-cover" />
                                </div>
                            </div>
                            <div className="carousel-cell"></div>
                        </div>
                    

            <div class="2xl:container 2xl:mx-auto md:py-0 py-9 mt-12">
        <p className="text-lg xl:text-lg font-semibold leading-9 text-black dark:text-black px-10">
         Top Amenities
        </p>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-12 gap-14 lg:px-20 lg:py-12 py-10 md:px-12 px-4">
         
         {
            room?.amenities.map((facility)=>(
                 <div class="">
              <h3 class="text-xl leading-5 dark:text-black font-semibold text-gray-800 lg:mt-4 mt-8">
                {facility}
              </h3>
            </div>
            ))}


        </div>
      </div>
                    

         <div className="text-gray-700 mt-4 w-full">
        <div className="border border-r border-gray-700">
          <h3 className="text-black ml-3 mt-2 font-semibold">
            Vendor info & Room info
          </h3>
          <div className="grid grid-cols-2 ml-3 mt-2 mb-3 font-normal">
            <div className="mt-3">
              OwnerName: {room?.vendorId.name}
            </div>
            <div className="mt-3">Property type: {room?.propertyType} </div>
            <div className="mt-3">Owner Number: {room?.vendorId?.phone}</div>
            <div className="mt-3">Price: {room?.price} </div>
            <div className="mt-3">email: {room?.vendorId?.email}</div>
            <div className="mt-3">Location: {room?.vendorId?.propertyLocation} </div>
            
          </div>
        </div>
      </div>
                  
                </div>
                
            </div>
            
        </div>
   </>
  )
}

export default DetailsRoom