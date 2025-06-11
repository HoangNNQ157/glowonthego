import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharmService from '../../services/charm.service';

import './CharmDetail.scss'; // We'll create this SCSS file later

const CharmDetail = () => {
  const { id } = useParams(); // Get the Charm ID from the URL
  const navigate = useNavigate();
  const [charm, setCharm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle QR code download
  const handleDownloadQR = () => {
    if (charm && charm.qrImage) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${charm.qrImage}`;
      link.download = `QR_Charm_${charm.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const fetchCharmDetails = async () => {
      try {
        setLoading(true);
        const data = await CharmService.getCharmById(id);
        setCharm(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching charm details:', err);
        setError('Không thể tải chi tiết Charm.' + (err.response?.data?.message || ''));
        setCharm(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharmDetails();
  }, [id]); // Re-fetch if ID changes

  if (loading) {
    return <div className="charm-detail-container">Đang tải chi tiết Charm...</div>;
  }

  if (error) {
    return <div className="charm-detail-container error-message">{error}</div>;
  }

  if (!charm) {
    return <div className="charm-detail-container no-data">Không tìm thấy thông tin Charm.</div>;
  }

  return (
    <div className="charm-detail-container">
      <h1>Chi tiết Charm: {charm.charmName}</h1>
      <div className="charm-detail-card">
        <div className="charm-detail-image-container">
          <img src={charm.image} alt={charm.charmName} className="charm-detail-image" />
        </div>
        <div className="charm-detail-info">
          <p><strong>ID:</strong> {charm.id}</p>
          <p><strong>Tên Charm:</strong> {charm.charmName}</p>
          <p><strong>Mô tả:</strong> {charm.description}</p>
          <p><strong>Giá:</strong> {charm.price?.toLocaleString('vi-VN')}đ</p>
          <p><strong>Trạng thái:</strong> <span className={`status ${charm.isActive ? 'active' : 'inactive'}`}>{charm.isActive ? 'Active' : 'Inactive'}</span></p>
          <p><strong>Có thể tùy chỉnh:</strong> {charm.isCustomizable ? 'Có' : 'Không'}</p>
          <p><strong>QR từ GIF:</strong> {charm.isQRFromGif ? 'Có' : 'Không'}</p>
          {charm.isQRFromGif && <p><strong>Tin nhắn QR:</strong> {charm.qrMessage}</p>}
          <p><strong>Số lượng:</strong> {charm.quantity}</p>
          {charm.qrImage && (
            <div className="charm-detail-qr-image-container">
              <strong>Hình ảnh QR:</strong>
              <img src={`data:image/png;base64,${charm.qrImage}`} alt="QR Code" className="charm-detail-qr-image" />
              <button className="download-qr-button" onClick={handleDownloadQR}>Tải xuống QR</button>
            </div>
          )}
          <p><strong>Danh mục Charm:</strong> {charm.charmCategory?.categoryName || 'N/A'}</p>
          <button className="back-button" onClick={() => navigate(-1)}>Quay lại</button>
        </div>
      </div>
    </div>
  );
};

export default CharmDetail; 