import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';

function Footer() {
  return (
    <div className='w-full mt-24 bg-gray-600 text-white py-2 px-2 '>
        <div className='max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-4 border-gray-400 py-8 px-4'>
            <div>
             <h6 className='font-bold uppercase pt-2'>solutions</h6>
             <ul>
                <li className='py-2'>Deluxe</li>
                <li className='py-2'>Deluxe</li>
                <li className='py-2'>Deluxe</li>
                <li className='py-2'>Deluxe</li>
                <li className='py-2'>Deluxe</li>
             </ul>
            </div>

            <div>
                <h6 className='font-bold uppercase pt-2'>Amenities</h6>
                <ul>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                </ul>
            </div>

            <div>
                <h6 className='font-bold uppercase pt-2'>Company</h6>
                <ul>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                    <li className='py-2'>Powre supply</li>
                </ul>
            </div>

            <div className='col-span-2 py-8 md:pt-2'>
                <p className='font-bold uppercase'>subscribe oru new your toube channel and sary with us</p>
                <p className='py-4'>the latest room sand facilyity you can see and do your booking with us and enhoy days</p>
            </div>
        </div>
      
      <div className='flex flex-col max-w-[1400px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-white'>
        <p className='py-4 '>2022 experieces llc,all right reseved</p>
        <div className='flex justify-between sm:-[300px] pt-4 text-2xl p-12 lg:space-x-6 sm:space-x-6 md:space-x-6 '>
        <FacebookIcon />
      <TwitterIcon/>
      <InstagramIcon/>
      <SendIcon />
        </div>
     
      </div>

    </div>
  )
}

export default Footer