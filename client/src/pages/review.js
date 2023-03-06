import Review from '@/components/User/Home/Review'
import ReviewForm from '@/components/User/Home/ReviewForm'
import HomeNav from '@/components/User/Navbar/HomeNav'
import Newnav from '@/components/User/Navbar/Newnav'
import React from 'react'

function review() {
  return (
    <>

   <HomeNav/>

   <div className='py-8'>
    <Newnav/> 
   </div>
          <div class="min-h-screen flex items-center justify-center">
        <div class="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-5">
      
     <ReviewForm/>
      <Review/>
        </div>
    </div>

  

   
  
    
    
    </>
  )
}

export default review