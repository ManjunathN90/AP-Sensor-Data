import axios from 'axios';

export const request = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
})

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "content-type": "application/json",
    }
})

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return error;
    }
)