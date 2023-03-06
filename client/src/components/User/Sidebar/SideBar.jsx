import React from 'react'

function SideBar() {
  return (
    <>
               
            <div className=' sm:hidden xs:hidden h-[60%] mt-24   xl:lg:md:block  lg:w-[35%] ml-12 border px-4 pb-6 shadow rounded overflow-hidden  shadow-lg'>
    
                <div className='divide-y divide-gray-200 space-y-5 border-l-0'>
                    <div>
                        <h3 className='tex-xl text-gray-700 uppercase font-medium'>Popular Amenities</h3>
                        <div className='space-y-2 pt-5'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>AC</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Power backup</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Attached bathroom</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>TV</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Fire extinguisher</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>AC</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                               <button className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>

                        </div>
                    </div>

                    <div className='pt-4'>
                        <h3 className='tex-xl text-gray-700 uppercase font-medium'>Top Categories Amenities</h3>
                        <div className='space-y-2 pt-5'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Deluxe Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Single Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Family Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Twin Bed Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Family Room</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                               <button className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                            </div>
                        </div>
                    </div>


                    <div className='pt-4'>
                    <h3 className='tex-xl text-gray-700 uppercase font-medium'>Filter price</h3>
                    <div className='mt-4 flex items-center pt-1'>
                        <input type='text' className=' border border-gray-300   py-1 text-gray-500 text-sm shadow-md' placeholder='min'/>
                        <span className=' mx-2 text-gray-500 '>-</span>
                        <input type='text' className=' border border-gray-300 py-1 text-gray-500 text-sm shadow-md' placeholder='max'/>
                    </div>
                    <div className='flex items-center mt-4'>
                               <button className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
          
                    </div>

                    <div className='pt-4'>
                        <h3 className='tex-xl text-gray-700 uppercase font-medium'>Property type</h3>
                        <div className='space-y-2 pt-5'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Hotels</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' id='amenities ' className='text-sky-600 focus:ring-0 rounded-sm cursor-pointer'/>
                                <label className='text-gray-600 ml-3 cursor-pointer'>Home stays</label>
                                <div className='ml-auto text-gray-600 text-sm'>(15)</div>
                            </div>
                            <div className='flex items-center'>
                               <button className='bg-sky-600 p-1 font-extrabold rounded text-white px-4 hover:bg-sky-800'>Filter</button>
                               
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        

    </>
  )
}

export default SideBar