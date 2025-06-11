import axiosInstance from './axios.config';

const InventoryService = {
    // BraceletInventory APIs
    getBraceletInventoryById: async (id) => {
        const response = await axiosInstance.get(`/bracelet-inventory/${id}`);
        return response.data;
    },

    getAllBraceletInventory: async (params = {}) => {
        const response = await axiosInstance.get('/bracelet-inventory', { params });
        return response.data;
    },

    addBraceletStock: async (id, stockData) => { // Assuming stockData contains the quantity to add
        const response = await axiosInstance.post(`/bracelet-inventory/${id}/add-stock`, stockData);
        return response.data;
    },

    // CharmInventory APIs
    getAllCharmInventory: async (params = {}) => {
        const response = await axiosInstance.get('/charm-inventory', { params });
        return response.data;
    },

    getCharmInventoryByCharmId: async (charmId) => {
        const response = await axiosInstance.get(`/charm-inventory/charm/${charmId}`);
        return response.data;
    },

    addCharmInventoryStock: async (stockData) => { // Assuming stockData contains charmId and quantity to add
         // API endpoint is POST /charm-inventory/add-stock (no ID in path)
        const response = await axiosInstance.post('/charm-inventory/add-stock', stockData);
        return response.data;
    }
};

export default InventoryService; 