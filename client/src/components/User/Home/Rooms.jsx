import Link from 'next/link'
import React from 'react'

function Rooms() {
  return (
<section className='container mx-atuo md:px-20 py-16 '>
    <div className='grid lg:grid-cols-2 sm:mx-12 xs:ml-24  '>
      <div className="item">
       <h1 className='font-bold text-4xl py-12 text-center'> Laxuary Rooms</h1> 
       <div className='flex flex-col gap-6 '>
        {/* post */}
        <div className='flex gap-5 '>
            <div className="image flex flex-col justify-start">
                <Link href='#' >
                    <img  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" width={300} height={250}
                    className='rounded  '
                    />
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
            <div className='title'>
            <Link href='#'  className='text-xl font-bold text-gray-800 hover:text-gray-500'>
                A Laxuary room with full details you can check
            </Link>
            <p className='text-gray-500 py-3'>
            A Laxuary room with full details you can check A Laxuary room with full details you can check
            A Laxuary room with full details you c
            </p>
        </div>
            </div>
        </div>
       </div>
    </div>
    

    {/* secondd card */}
    <div className="item">
       <h1 className='font-bold text-4xl py-12 text-center'> Laxuary Rooms</h1> 
       <div className='flex flex-col gap-6 '>
        {/* post */}
        <div className='flex gap-5 '>
            <div className="image flex flex-col justify-start">
                <Link href='#' >
                    <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" width={300} height={250}
                    className='rounded '
                    />
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
            <div className='title'>
            <Link href='#'  className='text-xl font-bold text-gray-800 hover:text-gray-500'>
                A Laxuary room with full details you can check
            </Link>
            <p className='text-gray-500 py-3'>
            A Laxuary room with full details you can check A Laxuary room with full details you can check
            A Laxuary room with full details you can c
            </p>
        </div>
            </div>
        </div>
       </div>
    </div>


    <div className="item">
       <h1 className='font-bold text-4xl py-12 text-center'> Laxuary Rooms</h1> 
       <div className='flex flex-col gap-6 '>
        {/* post */}
        <div className='flex gap-5 '>
            <div className="image flex flex-col justify-start">
                <Link href='#' >
                    <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" width={300} height={250}
                    className='rounded '
                    />
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
            <div className='title'>
            <Link href='#'  className='text-xl font-bold text-gray-800 hover:text-gray-500'>
                A Laxuary room with full details you can check
            </Link>
            <p className='text-gray-500 py-3'>
            A Laxuary room with full details you can check A Laxuary room with full details you can check
            A Laxuary room with full details you can ch
            </p>
        </div>
            </div>
        </div>
       </div>
    </div>


    <div className="item">
       <h1 className='font-bold text-4xl py-12 text-center'> Laxuary Rooms</h1> 
       <div className='flex flex-col gap-6 '>
        {/* post */}
        <div className='flex gap-5 '>
            <div className="image flex flex-col justify-start">
                <Link href='#' >
                    <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" width={300} height={250}
                    className='rounded '
                    />
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
            <div className='title'>
            <Link href='#'  className='text-xl font-bold text-gray-800 hover:text-gray-500'>
                A Laxuary room with full details you can check
            </Link>
            <p className='text-gray-500 py-3'>
            A Laxuary room with full details you can check A Laxuary room with full details you can check
            A Laxuary room with full details you can check A 
            </p>
        </div>
            </div>
        </div>
       </div>
    </div>
     
    </div>
    

</section>
  )
}

export default Rooms