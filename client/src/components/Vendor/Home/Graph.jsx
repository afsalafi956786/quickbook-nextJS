import React from 'react'
import { CChart } from '@coreui/react-chartjs'



function Graph({monthlySalary}) {
 

  return (
    <>
<CChart
  type="line"
  className='mb-8'
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Septembe','October','November','December'],
    datasets: [
      {
        label: 'Total Revenue',
        backgroundColor: '#f87979',
        // data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
        data:monthlySalary?.monthSalary,
      },
    ],
  }}
  labels="months"
/>
    </>
  )
}

export default Graph