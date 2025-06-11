import axiosInstance from './axios.config';
import {jwtDecode} from 'jwt-decode';

const AuthService = {
    // Đăng nhập
    login: async (username, password) => {
        const response = await axiosInstance.post('/user/login', { userName: username, password });
        console.log(response.data);
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    // Đăng ký người dùng mới
    register: async (userName, email, password, fullname, phoneNumber) => {
        const response = await axiosInstance.post('/user/register', { 
            userName, 
            email, 
            password,
            fullname,
            phoneNumber
        });
        return response.data;
    },

    // Đăng xuất
    logout: () => {
        localStorage.removeItem('user');
    },

    // Lấy thông tin user hiện tại bằng cách gọi API /api/user/{id}
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                // Ensure user and user.accessToken exist before attempting to decode
                if (user && user.accessToken) {
                    const decodedToken = jwtDecode(user.accessToken);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        AuthService.logout(); // Token expired
                        return null;
                    }
                    return user; // Token valid
                } else {
                    // If user object is malformed or accessToken is missing, log out and return null
                    console.warn("User data or accessToken missing in localStorage. Logging out.");
                    AuthService.logout();
                    return null;
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage or decoding token:", error);
                AuthService.logout();
                return null;
            }
        }
        return null; // No user string in localStorage
    },

    // Kiểm tra xem user đã đăng nhập chưa (kiểm tra token hoặc userId trong local storage)
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Refresh token
    refreshToken: async () => {
        const response = await axiosInstance.post('/user/refresh-token');
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
        }
        return response.data;
    },

    // Lấy thông tin user theo ID
    getUserById: async (id) => {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data;
    },

    // Cập nhật thông tin user theo ID (PUT)
    updateUser: async (id, userData) => {
        const response = await axiosInstance.put(`/user/${id}`, userData);
        return response.data;
    },

    // Cập nhật thông tin user theo ID (PATCH)
    patchUser: async (id, userData) => {
        const response = await axiosInstance.patch(`/user/${id}`, userData);
        return response.data;
    },

    // Xóa user theo ID
    deleteUser: async (id) => {
        const response = await axiosInstance.delete(`/user/${id}`);
        return response.data;
    },

    // Lấy tất cả users
    getAllUsers: async () => {
        const response = await axiosInstance.get('/User');
        return response.data;
    },

    // Tạo tài khoản Staff, Admin, Shipper
    createStaffAdminShipperAccount: async (accountData) => {
        const response = await axiosInstance.post('/user/create-staff-admin-shipper-account', accountData);
        return response.data;
    },

    // Xác nhận email
    confirmEmail: async (token) => {
        const response = await axiosInstance.post('/user/confirm-email', { token });
        return response.data;
    },

    // New method for updating user profile
    updateUserProfile: async (userId, updatedFields) => {
        const patchOperations = [];
        for (const key in updatedFields) {
            if (Object.prototype.hasOwnProperty.call(updatedFields, key)) {
                patchOperations.push({
                    op: "replace",
                    path: `/${key}`,
                    value: updatedFields[key]
                });
            }
        }

        if (patchOperations.length === 0) {
            console.log("No changes to apply.");
            return Promise.resolve(null); // Return a resolved promise if no changes
        }

        const response = await axiosInstance.patch(`/User/${userId}`, patchOperations, {
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        });
        return response.data;
    },
};

export default AuthService; 