    import axiosInstance from './axios.config';

const ImageService = {
    uploadFile: async (file, folderName) => {
        const formData = new FormData();
        formData.append('gifFile', file); // Assuming the backend expects the file under 'gifFile' key
        console.log('formData:', formData); // Log formData to inspect
        const response = await axiosInstance.post(`/Image/upload-file?folderName=${folderName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response; // This should contain { "gifUrl": "..." }
    },

    getFile: async (fileName, folderName) => {
        const response = await axiosInstance.get(`/Image/get-file`, {
            params: {
                fileName, // short for fileName: fileName
                folderName, // short for folderName: folderName
            },
        });
        return response;
    },

    getFolderImages: async (folderName) => {
        const response = await axiosInstance.get(`/Image/get-folder-images`, {
            params: {
                folderName,
            },
        });
        // The response body is a JSON string containing gifUrls, so we need to parse it
        return response.data; // Correctly return the data property from the Axios response
    },
};

export default ImageService; 