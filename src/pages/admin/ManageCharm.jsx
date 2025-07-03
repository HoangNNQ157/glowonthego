import React, { useState, useEffect } from 'react';
import CharmService from '../../services/charm.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './manageCharm.scss';

function ManageCharm() {
  const navigate = useNavigate();
  const [charms, setCharms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    minPrice: '',
    maxPrice: '',
    charmCategoryId: '',
    charmName: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [charmToDeleteId, setCharmToDeleteId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCharms = async () => {
      try {
        setLoading(true);
        const res = await CharmService.getAllCharms(); // Lấy toàn bộ
        setCharms(res?.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching charms:', err);
        setCharms([]);
        setError('Không thể tải danh sách Charm');
      } finally {
        setLoading(false);
      }
    };

    fetchCharms();
  }, []);

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredCharms = charms.filter(charm => {
    const nameMatch = charm.charmName?.toLowerCase().includes(searchParams.charmName.toLowerCase());
    const minMatch = searchParams.minPrice === '' || charm.price >= parseFloat(searchParams.minPrice);
    const maxMatch = searchParams.maxPrice === '' || charm.price <= parseFloat(searchParams.maxPrice);
    const categoryMatch =
      searchParams.charmCategoryId === '' || charm.charmCategoryId === parseInt(searchParams.charmCategoryId);
    return nameMatch && minMatch && maxMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredCharms.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCharms = filteredCharms.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setCharmToDeleteId(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await CharmService.deleteCharm(charmToDeleteId);
      toast.success('Xóa Charm thành công!');
      setCharms(prev => prev.filter(charm => charm.id !== charmToDeleteId));
    } catch (err) {
      console.error('Error deleting charm:', err);
      toast.error('Không thể xóa Charm.');
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
      setCharmToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setCharmToDeleteId(null);
  };

  if (loading) return <div className="loading">Đang tải danh sách Charm...</div>;
  if (error && charms.length === 0) return <div className="error">{error}</div>;

  return (
    <div className="manage-charm-container">
      <h1>Charm List</h1>

      {/* Tìm kiếm */}
      <div className="manage-charm__header">
        <div className="manage-charm__search">
          <div className="search-row">
            <input
              type="text"
              name="charmName"
              placeholder="Tìm tên Charm..."
              value={searchParams.charmName}
              onChange={handleSearchInputChange}
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Giá từ..."
              value={searchParams.minPrice}
              onChange={handleSearchInputChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Giá đến..."
              value={searchParams.maxPrice}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="search-row">
            <input
              type="number"
              name="charmCategoryId"
              placeholder="Mã danh mục Charm..."
              value={searchParams.charmCategoryId}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>

        <button className="add-charm-button" onClick={() => navigate('/admin/add-charm')}>
          Add new charm
        </button>
      </div>

      {/* Bảng hiển thị */}
      <table className="charm-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Charm</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentCharms.map(charm => (
            <tr key={charm.id}>
              <td>{charm.id}</td>
              <td>{charm.charmName}</td>
              <td>{charm.price?.toLocaleString('vi-VN')}đ</td>
              <td>
                <span className={`status ${charm.isActive ? 'active' : 'inactive'}`}>
                  {charm.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn view-details" onClick={() => navigate(`/admin/charm-detail/${charm.id}`)}>
                    Xem chi tiết
                  </button>
                  <button className="action-btn edit" onClick={() => navigate(`/admin/edit-charm/${charm.id}`)}>
                    Sửa
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(charm.id)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {currentCharms.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>Không tìm thấy Charm phù hợp.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="charm-list__pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Trước
          </button>
          <span>Trang {currentPage} / {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Sau
          </button>
        </div>
      )}

      {/* Xác nhận xóa */}
      {showConfirmDialog && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <p>Bạn có chắc chắn muốn xóa Charm này?</p>
            <div className="dialog-actions">
              <button className="confirm-btn" onClick={confirmDelete} disabled={loading}>Có, Xóa</button>
              <button className="cancel-btn" onClick={cancelDelete} disabled={loading}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCharm;
