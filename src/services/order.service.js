import axiosInstance from './axios.config';

const OrderService = {
    // Cart APIs
    checkout: async (checkoutData) => { // POST /cart/checkout
        const response = await axiosInstance.post('/cart/checkout', checkoutData);
        return response.data;
    },

    // Delivery APIs
    // POST /Delivery - API description unclear, creating a generic createDelivery assuming it's for initiating a delivery
    createDelivery: async (deliveryData) => {
         const response = await axiosInstance.post('/Delivery', deliveryData);
         return response.data;
    },

    updateDeliveryStatus: async (orderId, updateData) => { // PUT /Delivery/{orderId}
        const response = await axiosInstance.put(`/Delivery/${orderId}`, updateData);
        return response.data;
    },

    createAndAssignDelivery: async (userId, assignmentData) => { // POST /Delivery/create-and-assign-delivery/{userId}
        const response = await axiosInstance.post(`/Delivery/create-and-assign-delivery/${userId}`, assignmentData);
        return response.data;
    },

    // Order APIs
    getOrderByOrderId: async (orderId) => { // GET /Order/get-order-by-orderId/{orderId}
        const response = await axiosInstance.get(`/Order/get-order-by-orderId/${orderId}`);
        return response.data;
    },

    getAllOrders: async (params = {}) => { // GET /Order/get-orders
        const response = await axiosInstance.get('/Order/get-orders', { params });
        return response.data;
    },

    getOrdersByUser: async (userId, params = {}) => { // GET /Order/get-orders-by-user/{userId}
        const response = await axiosInstance.get(`/Order/get-orders-by-user/${userId}`, { params });
        return response.data;
    },

    getRevenueByPeriod: async (params = {}) => { // GET /Order/get-revenue-by-period
        const response = await axiosInstance.get('/Order/get-revenue-by-period', { params }); // Assuming period is passed as query params
        return response.data;
    },

    getOrders: async () => {
        const response = await axiosInstance.get('/Order/get-orders');
        return response.data;
    },

    getOrdersByUserId: async (userId) => {
        const response = await axiosInstance.get(`/Order/get-orders-by-user/${userId}`);
        return response.data;
    },
};

export default OrderService; 