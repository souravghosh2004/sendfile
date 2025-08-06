import axios from "axios";

const apiClient = axios.create({
    baseURL:"https://sendfile-backend.onrender.com/api/v1/",
    timeout: 240000,
    withCredentials: true,
})

export default apiClient;