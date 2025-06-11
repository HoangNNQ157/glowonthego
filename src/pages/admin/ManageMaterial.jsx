import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MaterialService from '../../services/material.service';
import './ManageMaterial.scss';

const ManageMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: null, materialName: '', description: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState({ name: '', desc: '' });
  const [showModal, setShowModal] = useState(false);

  // Search filter
  const filtered = materials.filter(mat =>
    mat.materialName.toLowerCase().includes(search.name.toLowerCase()) &&
    mat.description.toLowerCase().includes(search.desc.toLowerCase())
  );

  const handleSearchChange = e => setSearch(s => ({ ...s, [e.target.name]: e.target.value }));

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await MaterialService.getAllMaterials();
      setMaterials(res?.data || []);
    } catch {
      toast.error('Không thể tải material');
    }
    setLoading(false);
  };

  useEffect(() => { fetchMaterials(); }, []);

  const openModal = (mat = null) => {
    if (mat) {
      setForm(mat);
      setIsEdit(true);
    } else {
      setForm({ id: null, materialName: '', description: '' });
      setIsEdit(false);
    }
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleFormChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEdit) {
        await MaterialService.updateMaterial(form.id, form);
        toast.success('Cập nhật thành công!');
      } else {
        await MaterialService.createMaterial(form);
        toast.success('Thêm mới thành công!');
      }
      setShowModal(false);
      fetchMaterials();
    } catch {
      toast.error('Lỗi thao tác!');
    }
  };

  const handleEdit = mat => openModal(mat);

  const handleDelete = id => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await MaterialService.deleteMaterial(deleteId);
      toast.success('Đã xóa!');
      fetchMaterials();
    } catch {
      toast.error('Không thể xóa!');
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="manage-material-container">
      <h1>Quản lý Material</h1>
      <div className="material-header">
        <div className="search-row">
          <input name="name" value={search.name} onChange={handleSearchChange} placeholder="Tên material" />
          <input name="desc" value={search.desc} onChange={handleSearchChange} placeholder="Mô tả" />
        </div>
        <button className="add-btn" onClick={()=>openModal()}>Thêm mới</button>
      </div>
      {loading ? <div>Đang tải...</div> : (
        <table>
          <thead><tr><th>ID</th><th>Tên</th><th>Mô tả</th><th>Thao tác</th></tr></thead>
          <tbody>
            {filtered.map(mat => (
              <tr key={mat.id}>
                <td>{mat.id}</td><td>{mat.materialName}</td><td>{mat.description}</td>
                <td>
                  <button className="action-btn edit" onClick={()=>handleEdit(mat)}>Sửa</button>
                  <button className="action-btn delete" onClick={()=>handleDelete(mat.id)}>Xóa</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} style={{textAlign:'center'}}>Không có dữ liệu</td></tr>
            )}
          </tbody>
        </table>
      )}
      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEdit ? 'Cập nhật' : 'Thêm mới'} material</h2>
            <form onSubmit={handleSubmit}>
              <input name="materialName" value={form.materialName} onChange={handleFormChange} placeholder="Tên material" required />
              <input name="description" value={form.description} onChange={handleFormChange} placeholder="Mô tả" />
              <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
              <button type="button" className="cancel-btn" onClick={closeModal}>Hủy</button>
            </form>
          </div>
        </div>
      )}
      {/* Xác nhận xóa */}
      {showConfirm && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <p>Bạn có chắc chắn muốn xóa?</p>
            <div className="dialog-actions">
              <button className="confirm-btn" onClick={confirmDelete}>Có, Xóa</button>
              <button className="cancel-btn" onClick={()=>setShowConfirm(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageMaterial; 