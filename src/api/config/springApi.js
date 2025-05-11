import axios from "axios";

const springAPI = axios.create({
    baseURL: import.meta.env.REACT_APP_SPRING_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default springAPI;