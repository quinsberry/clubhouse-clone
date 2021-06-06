import axios from 'axios'

export const BASE_URL = 'http://localhost:3001'
const Axios = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
})

export { Axios }
