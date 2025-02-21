import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import AppLayout from './components/app/Layout'
import Dashboard from './components/app/Dashboard'
import Customers from './components/app/Customers'
import Logs from './components/app/Logs'
import AddCustomer from './components/app/AddCustomer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Context from './utils/Context'
import ReactGA from 'react-ga4'



function App() {
  const [session, setSession] = useState({})

  ReactGA.initialize([
    {
      trackingId: "your GA measurement id",
      gaOptions: 'hello', // optional
      gtagOptions: 'telicoller', // optional
    },
    {
      trackingId: "your second GA measurement id",
    },
  ]);

  const Session = async () => {
    try {
      const { data } = await axios.get('/api/user/session', {
        withCredentials: true,
      })
      setSession(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    Session()
  }, [])

  return (
    <Context.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/app' element={<AppLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='customers' element={<Customers />} />
            <Route path='addCustomer' element={<AddCustomer />} />
            <Route path='logs' element={<Logs />} />
          </Route>

          <Route path='*' element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
