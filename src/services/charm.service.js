import axiosInstance from './axios.config';

class CharmService {
    getAllCharms(params = {}) {
        return axiosInstance.get('/Charm', { params });
    }

    getCharmById(id) {
        return axiosInstance.get(`/Charm/${id}`);
    }

    createCharm(data) {
        return axiosInstance.post('/Charm', data);
    }

    updateCharm(id, data) {
        return axiosInstance.put(`/Charm/${id}`, data);
    }

    deleteCharm(id) {
        return axiosInstance.delete(`/Charm/${id}`);
    }

    uploadCharmGif(gifData) {
        return axiosInstance.post('/Charm/upload-gif', gifData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    getCharmStockById(id) {
        return axiosInstance.get(`/Charm/${id}/stock`);
    }

    getCharmInventory(params = {}) {
        return axiosInstance.get('/charm-inventory', { params });
    }

    addCharmStock(id, quantity) {
        return axiosInstance.post(`/charm-inventory/${id}/add-stock`, { quantity });
    }

    addCharmQuantity(id, quantity) {
        return axiosInstance.post(`/Charm/${id}/add-stock`, quantity, {
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        });
    }

    updateCharmQuantity(id, quantity) {
        return axiosInstance.put(`/Charm/${id}/quantity`, null, { params: { quantity, isAddition: false } });
    }

    searchCharms(searchParams = {}) {
        return axiosInstance.get('/Charm/search', { params: searchParams });
    }

    // You can add other methods here for specific charm operations (e.g., getCharmById)
}

export default new CharmService(); 