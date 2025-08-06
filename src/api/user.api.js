import apiClient from "./index.api.js";

export const uploadFiles = async (files, onUploadProgress) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  const response = await apiClient.post("/user/upload-files", formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percent);
      }
    }
  });
  return response.data; // Adjust if your backend returns differently
};

export const getFilesByCode = async (uniqueCode) => {
  try {
    const response = await apiClient.get(`/user/fetch-files/${uniqueCode}`);
    // response.data looks like: { success: true, message: "", data: {...} }
    return response.data;
  } catch (error) {
    console.error("Error fetching files by code:", error);
    throw error; // propagate to handle in UI
  }
};
