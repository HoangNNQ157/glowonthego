import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ThemeService from '../../services/theme.service';
import './ManageMaterial.scss';

const ManageTheme = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: null, themeName: '', description: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState({ name: '', desc: '' });
  const [showModal, setShowModal] = useState(false);

  // Search filter
  const filtered = themes.filter(theme =>
    theme.themeName.toLowerCase().includes(search.name.toLowerCase()) &&
    theme.description.toLowerCase().includes(search.desc.toLowerCase())
  );

  const handleSearchChange = e => setSearch(s => ({ ...s, [e.target.name]: e.target.value }));

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const res = await ThemeService.getAllThemes();
      setThemes(res?.data || []);
    } catch {
      toast.error('Không thể tải theme');
    }
    setLoading(false);
  };

  useEffect(() => { fetchThemes(); }, []);

  const openModal = (theme = null) => {
    if (theme) {
      setForm(theme);
      setIsEdit(true);
    } else {
      setForm({ id: null, themeName: '', description: '' });
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
        await ThemeService.updateTheme(form.id, form);
        toast.success('Cập nhật thành công!');
      } else {
        await ThemeService.createTheme(form);
        toast.success('Thêm mới thành công!');
      }
      setShowModal(false);
      fetchThemes();
    } catch {
      toast.error('Lỗi thao tác!');
    }
  };

  const handleEdit = theme => openModal(theme);

  const handleDelete = id => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await ThemeService.deleteTheme(deleteId);
      toast.success('Đã xóa!');
      fetchThemes();
    } catch {
      toast.error('Không thể xóa!');
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="manage-material-container">
      <h1>Quản lý Theme</h1>
      <div className="material-header">
        <div className="search-row">
          <input name="name" value={search.name} onChange={handleSearchChange} placeholder="Tên theme" />
          <input name="desc" value={search.desc} onChange={handleSearchChange} placeholder="Mô tả" />
        </div>
        <button className="add-btn" onClick={()=>openModal()}>Thêm mới</button>
      </div>
      {loading ? <div>Đang tải...</div> : (
        <table>
          <thead><tr><th>ID</th><th>Tên</th><th>Mô tả</th><th>Thao tác</th></tr></thead>
          <tbody>
            {filtered.map(theme => (
              <tr key={theme.id}>
                <td>{theme.id}</td><td>{theme.themeName}</td><td>{theme.description}</td>
                <td>
                  <div className="action-group">
                    <button className="action-btn edit" onClick={()=>handleEdit(theme)}>Sửa</button>
                    <button className="action-btn delete" onClick={()=>handleDelete(theme.id)}>Xóa</button>
                  </div>
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
            <h2>{isEdit ? 'Cập nhật' : 'Thêm mới'} theme</h2>
            <form onSubmit={handleSubmit}>
              <input name="themeName" value={form.themeName} onChange={handleFormChange} placeholder="Tên theme" required />
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
export default ManageTheme; 