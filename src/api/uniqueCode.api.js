import apiClient from "./index.api.js";

const getAllUniqueCodesDetails = async () =>{
    try {
        const response  = await apiClient.get("/uniqueCode/code-details");
        console.log("getAllUniqueCodesDetails = ",response.data)
        return response.data;
    } catch (err) {
         console.log("getAllUniqueCodesDetails error = ",err.response.data );
         return err.response.data;
    }
}

export {getAllUniqueCodesDetails}