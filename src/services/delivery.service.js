import axiosInstance from './axios.config';

class DeliveryService {
    getAllShippers() {
        return axiosInstance.get('/Delivery/shippers');
    }

    getShipperById(id) {
        return axiosInstance.get(`/Delivery/shippers/${id}`);
    }

    // API for ADMIN to create and assign delivery to a shipper
    // The request body for this API is application/json-patch+json as per Swagger
    createAndAssignDelivery(userId, orderIds) {
        // The backend expects an object like { "orderIds": [1, 2, 3] }
        return axiosInstance.post(`/Delivery/create-and-assign-delivery/${userId}`, { orderIds: orderIds }, {
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        });
    }

    // API to update delivery status for a specific order
    // (details for request body or query parameters not provided, assuming simple PUT for now)
    updateDeliveryStatus(orderId, statusData) {
        return axiosInstance.put(`/Delivery/${orderId}`, statusData);
    }
}

export default new DeliveryService(); 