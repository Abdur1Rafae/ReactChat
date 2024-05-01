import axios from 'axios';

export const AxiosBase = axios.create({
    baseURL:`http://backend.example.com`
})