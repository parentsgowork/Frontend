import axios from "axios";

const pythonAPI = axios.create({
    baseURL: import.meta.env.REACT_APP_PYTHON_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default pythonAPI;