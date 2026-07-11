import axios from "axios";

const axiosInstance = 
axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers:{
        "Content-Type": "application/json"
    }
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = "Server error";
        let status = 500;
        let data = null;

        if (error.response) {
            data = error.response.data;
            status = error.response.status;

            if (data?.error) {
                message = data.error;
            } else if (data?.message) {
                message = data.message;
            }
        } else if (error.message) {
            message = error.message;
        }

        const errorData = {
            message,
            status,
            data
        };
        return Promise.reject(errorData);
    }
);
export default axiosInstance;
