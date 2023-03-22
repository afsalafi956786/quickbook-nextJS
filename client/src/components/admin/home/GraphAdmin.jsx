import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function GraphAdmin({graph}) {
  const updateArray=graph?.totalRevenue?.map((elem)=>elem*0.20);
  

  return (
    <>
    <CChart
      type="bar"
      className='mb-8 w-[80%] ml-8 '
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Septembe','October','November','December'],
        datasets: [
          {
            label: 'Total Revenue',
            backgroundColor: '#f87979',
            // data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
            data:updateArray,
          },
        ],
      }}
      labels="months"
    />
        </>
  )
}

export default GraphAdmin