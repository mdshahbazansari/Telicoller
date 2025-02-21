import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'

export const session = async () => {
  try {
    const { data } = await axios.get('/api/user/session')
    return data
  } catch (error) {
    throw new Error(error)
  }
}

