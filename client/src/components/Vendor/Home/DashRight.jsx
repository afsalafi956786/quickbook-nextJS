import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function DashRight() {
  return (
    <div className='w-[98%] lg:md:h-[45%] bg-gray-50 rounded p-[1rem] gap-[1rem] flex flex-col text-md lg:md:mt-28 xs:mt-12 sm:mt-12'>
      <div className=''>
        <h3>Recent reviews</h3>

      <div className='flex gap-[0.5rem] overflow-hidden'>
        <AccountCircleIcon className='w-[2.5rem] h-[3.5rem] mt-1 text-gray-400'/>
        <div className='noti'>
            <div className='mt-[0.5rem]'>
                <span>Afsal</span>
                <span>This room was very nice and awsome</span>

            </div>

        </div>
      </div>


      <div className='flex gap-[0.5rem] overflow-hidden'>
        <AccountCircleIcon className='w-[2.5rem] h-[3.5rem] mt-1 text-gray-400'/>
        <div className='noti'>
            <div className='mt-[0.5rem]'>
                <span>Afsal</span>
                <span>This room was very nice and awsome</span>

            </div>

        </div>
      </div>
      
      <div className='flex gap-[0.5rem] overflow-hidden'>
        <AccountCircleIcon className='w-[2.5rem] h-[3.5rem] mt-1 text-gray-400'/>
        <div className='noti'>
            <div className='mt-[0.5rem]'>
                <span>Afsal</span>
                <span>This room was very nice and awsome</span>

            </div>

        </div>
      </div>


      <div className='flex gap-[0.5rem] overflow-hidden'>
        <AccountCircleIcon className='w-[2.5rem] h-[3.5rem] mt-1 text-gray-400'/>
        <div className='noti'>
            <div className='mt-[0.5rem]'>
                <span>Afsal</span>
                <span>This room was very nice and awsome</span>

            </div>

        </div>
      </div>

      </div>
    </div>
  )
}

export default DashRight
