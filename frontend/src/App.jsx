import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import axios from 'axios'
import ReactGA from 'react-ga4'
import Context from './utils/Context'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AppLayout from './components/app/Layout'
import Dashboard from './components/app/Dashboard'
import Customers from './components/app/Customers'
import Logs from './components/app/Logs'
import AddCustomer from './components/app/AddCustomer'

const TRACKING_ID = 'G-HDGTE70FV3' // Replace with your actual GA4 tracking ID

ReactGA.initialize(TRACKING_ID)

const TrackPageView = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname })
  }, [location])

  return null
}

function App() {
  const [session, setSession] = useState({})
  const [user, setUser] = useState(null)

  const fetchSession = async () => {
    try {
      const { data } = await axios.get('/api/user/session', {
        withCredentials: true,
      })
      setSession(data)

      if (data?.user) {
        setUser(data.user) // Store user info
        trackUserLogin(data.user) // Send login event to GA4
      }
    } catch (error) {
      console.error('Error fetching session:', error)
    }
  }

  const trackUserLogin = (user) => {
    ReactGA.set({ userId: user.id }) // Set user ID for GA4 tracking
    ReactGA.event({
      category: 'User',
      action: 'Login',
      label: 'User Logged In',
      value: 1,
    })

    // Capture organic traffic and source
    ReactGA.send({
      hitType: 'event',
      eventCategory: 'Traffic Source',
      eventAction: 'Organic Traffic',
      eventLabel: document.referrer || 'Direct',
    })
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <Context.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <TrackPageView />
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
