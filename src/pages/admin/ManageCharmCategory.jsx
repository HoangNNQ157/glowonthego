import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CategoryService from '../../services/category.service';
import './ManageCharmCategory.scss';

const PAGE_SIZE = 7;

const ManageCharmCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ name: '', desc: '' });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, categoryName: '', description: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await CategoryService.getAllCharmCategories();
      setCategories(res || []);
    } catch {
      toast.error('Không thể tải danh mục');
    }
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  // Search filter
  const filtered = categories.filter(cat =>
    cat.categoryName.toLowerCase().includes(search.name.toLowerCase()) &&
    cat.description.toLowerCase().includes(search.desc.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const handleSearchChange = e => setSearch(s => ({ ...s, [e.target.name]: e.target.value }));
  const handleSearch = () => setPage(1);

  const openModal = (cat = null) => {
    if (cat) {
      setForm(cat);
      setIsEdit(true);
    } else {
      setForm({ id: null, categoryName: '', description: '' });
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
        await CategoryService.updateCharmCategory(form.id, form);
        toast.success('Cập nhật thành công!');
      } else {
        await CategoryService.createCharmCategory(form);
        toast.success('Thêm mới thành công!');
      }
      setShowModal(false);
      fetchCategories();
    } catch {
      toast.error('Lỗi thao tác!');
    }
  };

  const handleDelete = id => {
    setDeleteId(id);
    setShowConfirm(true);
  };
  const confirmDelete = async () => {
    try {
      await CategoryService.deleteCharmCategory(deleteId);
      toast.success('Đã xóa!');
      fetchCategories();
    } catch {
      toast.error('Không thể xóa!');
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="manage-charm-category-container">
      <h1>Quản lý Charm Category</h1>
      <div className="category-header">
        <div className="search-row">
          <input name="name" value={search.name} onChange={handleSearchChange} placeholder="Tìm kiếm tên danh mục..." />
          <input name="desc" value={search.desc} onChange={handleSearchChange} placeholder="Tìm kiếm mô tả..." />
        </div>
        <button className="search-btn" onClick={handleSearch}>Tìm kiếm</button>
        <button className="add-btn" onClick={()=>openModal()}>Thêm mới</button>
      </div>
      {loading ? <div>Đang tải...</div> : (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Tên</th><th>Mô tả</th><th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.categoryName}</td>
                <td>{cat.description}</td>
                <td>
                  <button className="action-btn edit" onClick={()=>openModal(cat)}>Sửa</button>
                  <button className="action-btn delete" onClick={()=>handleDelete(cat.id)}>Xóa</button>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={4} style={{textAlign:'center'}}>Không có dữ liệu</td></tr>
            )}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Trước</button>
        <span>Trang {page} / {totalPages}</span>
        <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Sau</button>
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEdit ? 'Cập nhật' : 'Thêm mới'} danh mục</h2>
            <form onSubmit={handleSubmit}>
              <input name="categoryName" value={form.categoryName} onChange={handleFormChange} placeholder="Tên danh mục" required />
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
export default ManageCharmCategory; 