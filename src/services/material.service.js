import axios from './axios.config';

const API_URL = '/material';

const MaterialService = {
  // Lấy tất cả material
  getAllMaterials: () => axios.get(API_URL),

  // Lấy material theo id
  getMaterialById: (id) => axios.get(`${API_URL}/${id}`),

  // Thêm mới material
  createMaterial: (data) => axios.post(API_URL, data),

  // Cập nhật material (PUT: cập nhật toàn bộ)
  updateMaterial: (id, data) => axios.put(`${API_URL}/${id}`, data),

  // Cập nhật material (PATCH: cập nhật một phần)
  patchMaterial: (id, data) => axios.patch(`${API_URL}/${id}`, data),

  // Xóa material
  deleteMaterial: (id) => axios.delete(`${API_URL}/${id}`),
};

export default MaterialService; 