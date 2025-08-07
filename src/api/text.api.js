import apiClient from "./index.api.js";

const storeTextAPI = async (content) => {
    const response  = await apiClient.post('/text/store',{content})
   // console.log("Response = ",response.data)
    return response.data;
}

const receiveTextAPI = async (uniqueCode) => {
    const response = await apiClient.get(`/text/fetch/${uniqueCode}`)
    return response.data;
}

export {storeTextAPI,receiveTextAPI}