import React from 'react'
// import ArticleIcon from '@mui/icons-material/Article';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Dashboard() {
  return (
    <div className=''>
        <h1 className='lg:md:mt-4 lg:md:-ml-1 sm:ml-24 xs:ml-16'>hai board</h1>
        <div className='flex justify-evenly  mt-12 lg:flex-row lg:flex-row flex-col md:space-y-3 xs:space-y-3 sm:items-center xs:items-center'>
      
    
    <div className='border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]'>
        <div className=' justify-end flex  '>
           <CircularProgressbar className='' value='434' text='30%'/>
        </div>
        <div className='ml-8'>
          <h4 className=''>Users</h4>
             </div>
             <div className='py-10 -ml-16'>
                  <span className='text-lg font-semibold'>total:233</span>
             </div>
          
       
    </div>

    <div className='border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]'>
        <div className=' justify-end flex  '>
           <CircularProgressbar className='' value='434' text='30%'/>
        </div>
        <div className='ml-8'>
          <h4 className=''>Revenue</h4>
             </div>
             <div className='py-10 -ml-16'>
                  <span className='text-lg font-semibold'>total:233</span>
             </div>
          
       
    </div>


    <div className='border bg-sky-100 shadow-lg flex lg:mt-3 lg:md:w-[30%] h-[7rem] xs:w-[70%]    rounded relative cursor-pointer p-[1rem]'>
        <div className=' justify-end flex  '>
           <CircularProgressbar className='' value='434' text='30%'/>
        </div>
        <div className='ml-8'>
          <h4 className=''>Properties</h4>
             </div>
             <div className='py-10 -ml-16'>
                  <span className='text-lg font-semibold'>total:233</span>
             </div>
          
       
    </div>

    </div>
    
   
    </div>
  )
}

export default Dashboard
