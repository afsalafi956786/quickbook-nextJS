
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { popularAmenities,getCategories,getType } from '@/config/userEndpoints';
import { useDispatch } from 'react-redux';
import { rooms } from "@/store/rooms";
function SideBar() {
    let dispach=useDispatch()

  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj={
        Ac:data.get('Ac'),
        powerBackup:data.get('PowerBackup') ,
        attchedBathroom:data.get('attachedBathroom') ,
        Tv:data.get('TV'),
        FireExtinguisher:data.get('FireExtinguisher'),
        wifi:data.get('wifi') 
    }
    if(obj.Ac || obj.powerBackup || obj.attchedBathroom || obj.Tv || obj.FireExtinguisher || obj.wifi){
        const data=await popularAmenities(obj,{'usertoken':localStorage.getItem('usertoken')})
        dispach(rooms(data.amenities))
        // console.log(data.amenities);
    }else{
        toast.error(`OOPS! Select any one field`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }
    }

    async function Topcategories(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let obj={
            deluxe:data.get('DeluxeRoom'),
            laxuary:data.get('laxuary'),
            familyRoom:data.get('familyRoom'),
            noramlRoom:data.get('normalRoom'),
            classic:data.get('classic'),
        }
        if(obj.deluxe || obj.laxuary || obj.familyRoom || obj.noramlRoom || obj.classic){
            const category=await getCategories(obj,{'usertoken':localStorage.getItem('usertoken')})
            dispach(rooms(category.categories))

        }else{
            toast.error(`OOPS! Select any one field`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
        }
        
    }

  async function propertyType (e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let obj={
        Hotel:data.get('Hotel'),
        Resort:data.get('Resort'),
        HomeStay:data.get('HomeStay'),
    }
     if(obj.Hotel || obj.Resort || obj.HomeStay){
        const property=await getType(obj,{'usertoken':localStorage.getItem('usertoken')})
        dispach(rooms(property.type))
     }else{
        toast.error(`OOPS! Select any one field`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
     }

   }
  return (
    <>
               
            <div className=' sm:hidden xs:hidden h-[60%] mt-24   xl:lg:md:block  lg:w-[35%] ml-12 border px-4 pb-6 shadow rounded overflow-hidden  shadow-lg'>
            <ToastContainer />
                <div className='divide-y divide-gray-200 space-y-5 border-l-0'>
                    <form onSubmit={handleSubmit}>
                    <div>
                        <h3 className='tex-xl text-gray-700 uppercase font-medium'>Popular Amenities</h3>
                        <div className='space-y-2 pt-5'>
                            <div className='flex items-center'>
                                <input type='checkbox' name='Ac' id='amenities' value='Ac' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>AC</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities' name='PowerBackup' value='Power backup' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Power backup</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities' value='Attached bathroom' name='attachedBathroom' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Attached bathroom</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' value='TV' name='TV'  className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>TV</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' value='Fire extinguisher'  name='FireExtinguisher' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Fire extinguisher</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities' value='Wifi' name='wifi' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Wifi</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                               <button type='submit' className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>

                        </div>
                    </div>
                    </form>

                    <div className='pt-4'>
                        <h3 className='tex-xl text-gray-700 uppercase font-medium'>Top Categories</h3>
                        <form onSubmit={Topcategories} >
                        <div className='space-y-2 pt-5'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' value='deluxe' name='DeluxeRoom' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Deluxe</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities '  value='laxuary' name='laxuary'  className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Laxuary</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities '  value='familyroom' name='familyRoom'  className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Family Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities '  value='normalroom' name='normalRoom'  className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>normal Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities '  value='classic' name='classic'  className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Classic</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                               <button type='submit' className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                            </div>
                        </div>
                        </form>
                    </div>


                  

                    <div className='pt-4'>
                        <h3 className='tex-xl text-gray-700 uppercase font-medium'>Property type</h3>
                        <form onSubmit={propertyType}>
                        <div className='space-y-2 pt-5'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities' value='Hotel' name='Hotel' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Hotels</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' value='Home stay' name='HomeStay' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Home stays</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities 'value='Resort' name='Resort' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Resort</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            
                            <div className='flex items-center'>
                               <button type='submit' className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                               
                            </div>

                        </div>
                        </form>
                    </div>


                </div>

            </div>

        

    </>
  )
}

export default SideBar