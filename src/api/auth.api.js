import apiClient from "./index.api.js";

const checkAuth = async() =>{
    try {
        const response = await apiClient.get("/auth/check-auth");
        return response.data;
    } catch (error) {
        return {
            success:false,
            message : error.response?.data?.message || "You are not logedIn"
        }
    }
}

export {checkAuth}

