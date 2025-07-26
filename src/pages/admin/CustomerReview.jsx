import React, { useEffect, useState } from 'react';
import ReviewService from '../../services/review.service';
import { toast } from 'react-toastify';
import './CustomerReview.scss';

function CustomerReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await ReviewService.getAllReviews();
      setReviews(res || []);
    } catch {
      toast.error('Không thể tải danh sách review!');
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa review này?')) return;
    try {
      await ReviewService.deleteReview(id);
      toast.success('Xóa review thành công!');
      fetchReviews();
    } catch {
      toast.error('Xóa review thất bại!');
    }
  };

  return (
    <div className="customer-review-page">
      <h1>Customer Review Page</h1>
      {loading ? (
        <p>Đang tải danh sách review...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Loại sản phẩm</th>
              <th>Mã sản phẩm</th>
              <th>Đánh giá</th>
              <th>Bình luận</th>
              <th>Ngày đánh giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rv) => (
              <tr key={rv.id}>
                <td>{rv.user?.fullname || rv.user?.userName}</td>
                <td>{rv.braceletId ? 'Bracelet' : 'Charm'}</td>
                <td>{rv.braceletId || rv.charmId}</td>
                <td>{rv.rating}</td>
                <td>{rv.comment}</td>
                <td>{rv.reviewDate ? new Date(rv.reviewDate).toLocaleString() : 'N/A'}</td>
                <td>
                  <button className="action-btn delete" onClick={() => handleDelete(rv.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerReview; 