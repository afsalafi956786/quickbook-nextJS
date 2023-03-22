
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { vendorReview } from '@/config/venderEndpoints';
import { useState,useEffect } from 'react';
function DashRight() {
  const [review, setReview]=useState([])
  useEffect(()=>{
async function execute(){
const revi =await vendorReview({'vendortoken':localStorage.getItem('vendortoken')})
if(Array.isArray(revi)){
  setReview(revi)
}



    }
     execute()
    
  },[])
  return (
    <div className='w-[98%] lg:md:h-[25%]  bg-gray-50 rounded p-[1rem] gap-[1rem] flex flex-col text-md lg:md:mt-28 xs:mt-12 sm:mt-12'>
      <div className=''>
        <h3>Recent reviews</h3>
     {
       review &&
      review?.map((rev)=>(
         <div key={rev?._id} className='flex gap-[0.5rem] overflow-hidden'>
        <AccountCircleIcon className='w-[2.5rem] h-[3.5rem] mt-1 text-gray-400'/>
        <div className='noti'>
            <div className='mt-[0.5rem]'>
               <span className='text-orange-600'>{ rev?.userId?.name}</span> <span>: </span>
                <span>{rev?.feedback}</span>
            </div>

        </div>
      </div>
      ))
     }
    

      </div>
    </div>
  )
}

export default DashRight
