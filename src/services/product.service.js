import axiosInstance from './axios.config';

const ProductService = {
    // Bracelet APIs
    getAllProducts: async (params = {}) => {
        const response = await axiosInstance.get('/bracelete', { params });
        return response.data;
    },

    getProductById: async (id) => {
        const response = await axiosInstance.get(`/bracelete/${id}`);
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await axiosInstance.post('/bracelete', productData);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await axiosInstance.put(`/bracelete/${id}`, productData);
        return response.data;
    },

    patchProduct: async (id, productData) => {
        const response = await axiosInstance.patch(`/bracelete/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await axiosInstance.delete(`/bracelete/${id}`);
        return response.data;
    },

    getProductsByCategory: async (categoryId) => {
        const response = await axiosInstance.get(`/bracelete/category/${categoryId}`);
        return response.data;
    },

    searchProducts: async (searchParams = {}) => {
        const response = await axiosInstance.get('/bracelete/search', { params: searchParams });
        return response.data;
    },

    getStockById: async (id) => {
        const response = await axiosInstance.get(`/bracelete/${id}/stock`);
        return response.data;
    },

    getBraceletInventory: async () => {
        const response = await axiosInstance.get('/bracelet-inventory');
        return response;
    },

    addBraceletStock: async (id, quantity) => {
        const response = await axiosInstance.post(`/bracelet-inventory/${id}/add-stock`, { quantity });
        return response.data;
    },

    addBraceleteQuantity: async (id, quantity) => {
        const response = await axiosInstance.post(`/bracelete/${id}/add-quantity`, quantity, {
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        });
        return response.data;
    },

    updateBraceleteQuantity: async (id, quantity) => {
        const response = await axiosInstance.put(`/bracelete/${id}/quantity?quantity=${quantity}&isAddition=false`, null, { params: { quantity, isAddition: false }, headers: { 'Content-Type': null } });
        return response.data;
    },

    // Charm APIs are in charm.service.js
};

export default ProductService; 