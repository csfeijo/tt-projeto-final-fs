import axios from 'axios'

const api = axios.create({
  baseURL: 'https://1606117-nodejs-tt.vercel.app',
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
  },
})

export default api
