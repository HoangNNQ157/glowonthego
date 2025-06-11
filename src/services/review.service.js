import axiosInstance from './axios.config';

const ReviewService = {
    // Review APIs
    getReviewById: async (id) => { // GET /Review/{id}
        const response = await axiosInstance.get(`/Review/${id}`);
        return response.data;
    },

    deleteReview: async (id) => { // DELETE /Review/{id}
        const response = await axiosInstance.delete(`/Review/${id}`);
        return response.data;
    },

    // API description is "Xem full review của user", but endpoint is GET /Review
    // Assuming this endpoint gets all reviews (maybe with pagination/filters)
    getAllReviews: async () => { // GET /Review
        const response = await axiosInstance.get('/Review');
        return response.data;
    },

    createReview: async (reviewData) => { // POST /Review (User review after purchasing)
        // reviewData should contain: { productId, isCharm, rating, comment }
        const response = await axiosInstance.post('/Review', reviewData);
        return response.data;
    },

    getReviewsByProductId: async (productId) => { // GET /Review/product/{productId}
        const response = await axiosInstance.get(`/Review/product/${productId}`);
        return response.data;
    },

    getReviewsByUserId: async (userId) => { // GET /Review/user/{userId}
        const response = await axiosInstance.get(`/Review/user/${userId}`);
        return response.data;
    },

    getProductRating: async (productId) => { // GET /Review/product/{productId}/rating (Xem đánh giá sao)
        const response = await axiosInstance.get(`/Review/product/${productId}/rating`);
        return response.data; // Assuming this returns the average rating
    },

    // API description is "Xem số lượng đã mua", endpoint is GET /Review/product/{productId}/count
    // Assuming this counts reviews or perhaps purchases related to reviews.
    getProductReviewCount: async (productId) => { // GET /Review/product/{productId}/count
        const response = await axiosInstance.get(`/Review/product/${productId}/count`);
        return response.data; // Assuming this returns a count
    },
};

export default ReviewService; 