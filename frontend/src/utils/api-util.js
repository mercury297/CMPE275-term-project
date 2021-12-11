import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 60000,
})

API.interceptors.request.use(
    request =>  {
        if (request.url !== '/auth/login') {
            const token = localStorage.getItem('POS_MATE_TOKEN')
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
)

API.interceptors.response.use(
    response => {
        if ([401, 403].includes(response.status)) {
            if (window.location.pathname !== '/login') {
                window.location.replace('/login')
            }
        }
        return response;
    },
    error => {
        if ([401, 403].includes(error?.response?.status)) {
            if (window.location.pathname !== '/login') {
                window.location.replace('/login')
            }
        }
        return Promise.reject(error);
    }
)

export default API;
