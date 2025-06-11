import axiosInstance from './axios.config';

const PaymentService = {
    // Payment APIs
    getPaymentByUserId: async (userId) => { // GET /Payment/get-payment-by-userId/{userId}
        const response = await axiosInstance.get(`/Payment/get-payment-by-userId/${userId}`);
        return response.data;
    },
};

export default PaymentService; 