import React, { useContext } from 'react'
import Context from '../../utils/Context'

const Dashboard = () => {
  const { session, setSession } = useContext(Context)

  console.log(session)
  return (
    <div>
      <h1>Dahboard</h1>
    </div>
  )
}

export default Dashboard
