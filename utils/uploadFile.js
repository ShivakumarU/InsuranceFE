import api from "../lib/axios";


export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await api.post('/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log("Uploaded file path:", res.data.filePath);
        return res.data.filePath;
    } catch (err) {
        console.error("File upload failed", err);
        throw err;
    }
};