import axiosInstance from './axios.config';

const CategoryService = {
    // CharmCategory APIs
    getCharmCategoryById: async (id) => { // GET /CharmCategory/{id}
        const response = await axiosInstance.get(`/CharmCategory/${id}`);
        return response.data;
    },

    updateCharmCategory: async (id, categoryData) => { // PUT /CharmCategory/{id}
        const response = await axiosInstance.put(`/CharmCategory/${id}`, categoryData);
        return response.data;
    },

    deleteCharmCategory: async (id) => { // DELETE /CharmCategory/{id}
        const response = await axiosInstance.delete(`/CharmCategory/${id}`);
        return response.data;
    },

    getAllCharmCategories: async (params = {}) => { // GET /CharmCategory
        const response = await axiosInstance.get('/CharmCategory', { params });
        return response.data;
    },

    createCharmCategory: async (categoryData) => { // POST /CharmCategory
        const response = await axiosInstance.post('/CharmCategory', categoryData);
        return response.data;
    },

    // Material APIs
    getMaterialById: async (id) => { // GET /material/{id}
        const response = await axiosInstance.get(`/material/${id}`);
        return response.data;
    },

    updateMaterial: async (id, materialData) => { // PUT /material/{id}
        const response = await axiosInstance.put(`/material/${id}`, materialData);
        return response.data;
    },

    patchMaterial: async (id, materialData) => { // PATCH /material/{id}
        const response = await axiosInstance.patch(`/material/${id}`, materialData);
        return response.data;
    },

    deleteMaterial: async (id) => { // DELETE /material/{id}
        const response = await axiosInstance.delete(`/material/${id}`);
        return response.data;
    },

    getAllMaterials: async (params = {}) => { // GET /material
        const response = await axiosInstance.get('/material', { params });
        return response.data;
    },

    createMaterial: async (materialData) => { // POST /material
        const response = await axiosInstance.post('/material', materialData);
        return response.data;
    },

    // Theme APIs
    getThemeById: async (id) => { // GET /theme/{id}
        const response = await axiosInstance.get(`/theme/${id}`);
        return response.data;
    },

    updateTheme: async (id, themeData) => { // PUT /theme/{id}
        const response = await axiosInstance.put(`/theme/${id}`, themeData);
        return response.data;
    },

    patchTheme: async (id, themeData) => { // PATCH /theme/{id}
        const response = await axiosInstance.patch(`/theme/${id}`, themeData);
        return response.data;
    },

    deleteTheme: async (id) => { // DELETE /theme/{id}
        const response = await axiosInstance.delete(`/theme/${id}`);
        return response.data;
    },

    getAllThemes: async (params = {}) => { // GET /theme
        const response = await axiosInstance.get('/theme', { params });
        return response.data;
    },

    createTheme: async (themeData) => { // POST /theme
        const response = await axiosInstance.post('/theme', themeData);
        return response.data;
    },
};

export default CategoryService; 