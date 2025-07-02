import axios from 'axios';

// Create axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        // Removed default Content-Type and Accept headers
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user && user.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
        }

        // Explicitly remove Content-Type header for GET requests or requests with no data
        if (config.method === 'get' || config.data === null || config.data === undefined) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred:', error.response.data);
            }
        } else if (error.request) {
            console.error('No response received from server');
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 