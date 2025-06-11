import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify';
import './Accounts.scss';

function Accounts() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ id: null, userName: '', fullname: '', email: '', password: '', phoneNumber: '', points: 0, role: '', status: true, confirmEmail: false });
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await AuthService.getAllUsers();
      setUsers(res || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setForm({ id: null, userName: '', fullname: '', email: '', password: '', phoneNumber: '', points: 0, role: '', status: true, confirmEmail: false });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setForm({
      id: user.id,
      userName: user.userName || '',
      fullname: user.fullname || '',
      email: user.email || '',
      password: '',
      phoneNumber: user.phoneNumber || '',
      points: user.points || 0,
      role: user.role || '',
      status: user.status ?? true,
      confirmEmail: user.confirmEmail ?? false,
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDetail = async (id) => {
    try {
      const user = await AuthService.getUserById(id);
      setDetailUser(user);
      setShowDetail(true);
    } catch (e) { console.error(e); setDetailUser(null); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await AuthService.updateUser(form.id, {
          userName: form.userName,
          fullname: form.fullname,
          email: form.email,
          password: form.password || undefined,
          phoneNumber: form.phoneNumber,
          points: form.points,
          role: parseInt(form.role),
          status: form.status,
          confirmEmail: form.confirmEmail,
        });
        toast.success('Cập nhật tài khoản thành công!');
      } else {
        const accountData = {
          userName: form.userName,
          fullname: form.fullname,
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          points: form.points,
          role: parseInt(form.role),
          status: form.status,
          confirmEmail: form.confirmEmail,
        };

        if (form.role === '1' || form.role === '3' || form.role === '4') {
          await AuthService.createStaffAdminShipperAccount(accountData);
        } else {
          await AuthService.register(accountData);
        }
        toast.success('Thêm tài khoản thành công!');
      }
      setShowModal(false);
      fetchUsers();
    } catch (e) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      console.error(e);
    }
  };

  const confirmDelete = async () => {
    try {
      await AuthService.deleteUser(deleteId);
      setShowConfirm(false);
      fetchUsers();
      toast.success('Xóa tài khoản thành công!');
    } catch (e) {
      toast.error('Xóa tài khoản thất bại!');
      console.error(e);
    }
  };

  return (
    <div className="accounts-admin-page">
      <h1 className="admin-title">Quản lý tài khoản</h1>
      <button className="add-btn" onClick={handleAdd}>+ Thêm tài khoản</button>
      {loading ? (
        <p>Đang tải danh sách tài khoản...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Điểm</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Xác nhận email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.points}</td>
                <td>{renderRole(user.role)}</td>
                <td>{user.status ? 'Hoạt động' : 'Ngừng'}</td>
                <td>{user.confirmEmail ? 'Đã xác nhận' : 'Chưa xác nhận'}</td>
                <td>
                  <div className="action-group">
                    <button className="action-btn detail" onClick={() => handleDetail(user.id)}>Chi tiết</button>
                    <button className="action-btn edit" onClick={() => handleEdit(user)}>Sửa</button>
                    <button className="action-btn delete" onClick={() => handleDelete(user.id)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEdit ? 'Sửa tài khoản' : 'Thêm tài khoản'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Tài khoản</label>
                <input value={form.userName} onChange={e => setForm({ ...form, userName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Họ tên</label>
                <input value={form.fullname} onChange={e => setForm({ ...form, fullname: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required={!isEdit} />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Điểm</label>
                <input type="number" value={form.points} onChange={e => setForm({ ...form, points: Number(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Vai trò</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required>
                  <option value="">Chọn vai trò</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Staff</option>
                  <option value="4">Shipper</option>
                </select>
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select name="status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value === 'true' })}>
                  <option value="true">Hoạt động</option>
                  <option value="false">Ngừng</option>
                </select>
              </div>
              <div className="form-group">
                <label>Xác nhận email</label>
                <select name="confirmEmail" value={form.confirmEmail} onChange={e => setForm({ ...form, confirmEmail: e.target.value === 'true' })}>
                  <option value="false">Chưa xác nhận</option>
                  <option value="true">Đã xác nhận</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Lưu</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
            <button className="delete-btn" onClick={confirmDelete}>Xóa</button>
            <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Hủy</button>
          </div>
        </div>
      )}
      {showDetail && detailUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Chi tiết tài khoản</h2>
            <div className="user-detail-info">
              <div><b>ID:</b> {detailUser.id}</div>
              <div><b>Tài khoản:</b> {detailUser.userName}</div>
              <div><b>Họ tên:</b> {detailUser.fullname}</div>
              <div><b>Email:</b> {detailUser.email}</div>
              <div><b>SĐT:</b> {detailUser.phoneNumber}</div>
              <div><b>Điểm:</b> {detailUser.points}</div>
              <div><b>Vai trò:</b> {renderRole(detailUser.role)}</div>
              <div><b>Trạng thái:</b> {detailUser.status ? 'Hoạt động' : 'Ngừng'}</div>
              <div><b>Xác nhận email:</b> {detailUser.confirmEmail ? 'Đã xác nhận' : 'Chưa xác nhận'}</div>
            </div>
            <button className="cancel-btn" onClick={() => setShowDetail(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper để hiển thị tên vai trò
function renderRole(role) {
  switch (role) {
    case 1: return 'Admin';
    case 2: return 'User';
    case 3: return 'Staff';
    case 4: return 'Shipper';
    default: return role;
  }
}

export default Accounts; 