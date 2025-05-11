import axios from "axios";

const springApi = axios.create({
    baseURL: import.meta.env.VITE_SPRING_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default springApi;