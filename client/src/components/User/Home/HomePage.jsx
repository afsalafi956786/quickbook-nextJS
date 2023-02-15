import React from 'react'
import Image from 'next/image'

function HomePage() {
  return (
   <>

<div className=" flex items-center justify-center px-12 mt-8">
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2  gap-4 p-5 ">

        <div className="flex justify-center bg-black ml-4 rounded-xl mt-8">
    <img className=" w-full h-96  object-cover  rounded-xl" src="https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg" alt="" />
</div>

<div className="flex justify-center bg-black ml-4 rounded-xl mt-8">
    <img className=" w-full h-96  object-cover  rounded-xl" src="https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg" alt="" />
</div>
        </div>
    </div>
   


   </>
  )
}

export default HomePage