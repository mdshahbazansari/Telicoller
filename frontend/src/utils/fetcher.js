import axios from 'axios'
axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default fetcher
