import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: add token to headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or sessionStorage or cookie
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
