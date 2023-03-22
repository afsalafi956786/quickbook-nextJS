import Router, { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

function Plan() {
  const room=useSelector((state)=>state.rooms.value)
  const router=useRouter();
  return (
    <div className=' flex max-w-[1400px] m-auto px-4 py-16 gird lg:grid-col-2  gap-4 '>
        <div className='grid grid-cols-2 grid-rows-6 h-[80vh]  cursor-pointer'>
          
            <img className='row-span-3 object-cover w-full  h-full p-2' src={room && room[0]?.img}></img>
            <img className='row-span-2 object-cover w-full h-full p-2' src={room && room[1]?.img}></img>
            <img className='row-span-2 object-cover w-full h-full p-2' src={room && room[2]?.img}></img>
            <img className='row-span-3 object-cover w-full h-full p-2' src={room && room[3]?.img}></img>
            <img className='row-span-2 object-cover w-full h-full p-2' src={room && room[4]?.img}></img>
        </div>
        {/* rigt side */}
        <div className='flex flex-col h-full justify-center'>
            <h3 className='text-3xl md:text-3xl text-gray-600 font-bold'>Plan your next Room</h3>
            <p className='text-2xl py-6'>World's leading chain of hotels and homes</p>
            <p className='pb-6'>Get ready to book room More Destinations. More Ease. More Affordable.next we can achieve the our huge dream like The World's Fastest Growing Hotel Chain.We have available all types of rooms with different amenities and locations so book your slots</p>
            <div >
                <button onClick={()=>router.push('/room')} className='border-black rounded-full border py-2 hover:bg-black hover:text-white px-3 mr-4 hover:shadow-xl'>View More</button>
                <button onClick={()=>router.push('/room')} className='bg-black bg-sky-600 rounded hover:bg-sky-800 py-2 px-3 xs:mt-4 text-white border-black hover:shadow-xl '>Book Now</button>
            </div>
        </div>
    </div>
  )
}

export default Plan