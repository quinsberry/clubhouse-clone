import axios from 'axios'

const Axios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true,
})

Axios.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        config.headers.Authorization = window.localStorage.getItem('token')
    }
    return config
})

export { Axios }
