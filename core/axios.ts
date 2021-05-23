import axios from 'axios'

export const BASE_URL = 'http://localhost:3001'
const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

Axios.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        config.headers.Authorization = window.localStorage.getItem('token')
    }
    return config
})

export { Axios }
