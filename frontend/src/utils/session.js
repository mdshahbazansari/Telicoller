import axios from 'axios'
axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

export const session = async () => {
  try {
    const { data } = await axios.get('/api/user/session')
    return data
  } catch (error) {
    throw new Error(error)
  }
}

