import React, { useContext } from 'react'
import Context from '../../utils/Context'
import { Bar, Doughnut } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card } from 'antd'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const { session, setSession } = useContext(Context)

  const callData = {
    labels: ['Total Customer', 'Colled', 'Waiting', 'Not Recive'],
    datasets: [
      {
        label: 'Calls Overview',
        data: [250, 180, 20, 50],
        backgroundColor: ['blue', 'green', 'red', 'orange'],
      },
    ],
  }

  const satisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [
      {
        label: 'Customer Feedback',
        data: [40, 35, 15, 10],
        backgroundColor: ['green', 'blue', 'gray', 'red'],
      },
    ],
  }

  console.log(session)
  return (
    <div>
      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-bold mb-4'>Telecaller Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {[
            { title: 'Total Calls', value: 250 },
            { title: 'Received Calls', value: 180 },
            { title: 'Waiting Calls', value: 20 },
            { title: 'Follow-ups', value: 50 },
          ].map((item, index) => (
            <Card key={index} className='p-6 text-center shadow-lg rounded-2xl'>
              <h5 className='text-lg font-semibold'>{item.title}</h5>
              <h3 className='text-2xl font-bold text-blue-600'>{item.value}</h3>
            </Card>
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
          <Card className='p-6 shadow-lg rounded-2xl'>
            <h5 className='text-lg font-semibold mb-2'>
              Call Performance Reports
            </h5>
            <Bar data={callData} />
          </Card>
          <Card className='p-6 shadow-lg rounded-2xl'>
            <h5 className='text-lg font-semibold mb-2'>
              Customer Satisfaction Ratings
            </h5>
            <Doughnut data={satisfactionData} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
