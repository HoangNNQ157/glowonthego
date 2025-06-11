import axios from './axios.config';

const API_URL = '/theme';

const ThemeService = {
  // Lấy tất cả theme
  getAllThemes: () => axios.get(API_URL),

  // Lấy theme theo id
  getThemeById: (id) => axios.get(`${API_URL}/${id}`),

  // Thêm mới theme
  createTheme: (data) => axios.post(API_URL, data),

  // Cập nhật theme (PUT: cập nhật toàn bộ)
  updateTheme: (id, data) => axios.put(`${API_URL}/${id}`, data),

  // Cập nhật theme (PATCH: cập nhật một phần)
  patchTheme: (id, data) => axios.patch(`${API_URL}/${id}`, data),

  // Xóa theme
  deleteTheme: (id) => axios.delete(`${API_URL}/${id}`),
};

export default ThemeService; 