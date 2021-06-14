import axios from 'axios'

export const SERVER_URL = 'http://localhost:3001'
const Axios = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
})

export { Axios }
