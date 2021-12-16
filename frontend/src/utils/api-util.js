import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 60000,
})


export default API;
