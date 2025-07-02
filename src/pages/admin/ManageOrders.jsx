import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderService from '../../services/order.service';
import AuthService from '../../services/auth.service';
import DeliveryService from '../../services/delivery.service';
import './ManageMaterial.scss';

const DEFAULT_SHIPPERS = [
  { id: 1, name: 'Nguyễn Văn A' },
  { id: 2, name: 'Trần Thị B' },
  { id: 3, name: 'Lê Văn C' },
];

const deliveryStatusOptions = [
  { value: 0, label: 'Đã chuẩn bị' },
  { value: 1, label: 'Đang giao' },
  { value: 2, label: 'Đã giao' },
  { value: 3, label: 'Giao thất bại' },
  { value: 4, label: 'Đã hủy' },
];

const paymentStatusOptions = [
  { value: 0, label: 'Chưa thanh toán' },
  { value: 1, label: 'Đã thanh toán' },
  { value: 2, label: 'Thanh toán thất bại' },
];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shippers, setShippers] = useState([]);
  const [assigning, setAssigning] = useState({});
  const [localDeliveryStatus, setLocalDeliveryStatus] = useState({});
  const [localPaymentStatus, setLocalPaymentStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Thêm phân trang
  const itemsPerPage = 10;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderService.getAllOrders();
      const sortedOrders = (res || []).sort((a, b) => {
        const aPriority = (a.deliveryStatus === 2 || a.paymentStatus === 1) ? 1 : 0;
        const bPriority = (b.deliveryStatus === 2 || b.paymentStatus === 1) ? 1 : 0;
        return bPriority - aPriority;
      });
      setOrders(sortedOrders);

      const deliveryMap = {};
      const paymentMap = {};
      (res || []).forEach(order => {
        deliveryMap[order.id] = Number(order.deliveryStatus ?? 0);
        paymentMap[order.id] = Number(order.paymentStatus ?? 0);
      });
      setLocalDeliveryStatus(deliveryMap);
      setLocalPaymentStatus(paymentMap);
    } catch {
      toast.error('Không thể tải đơn hàng');
    }
    setLoading(false);
  };

  const fetchShippers = async () => {
    try {
      const res = await AuthService.getAllUsers();
      if (Array.isArray(res) && res.length > 0) {
        const shipperAccounts = res
          .filter(user => user.role === 4)
          .map(user => ({ id: user.id, name: user.fullname || user.userName }));
        setShippers(shipperAccounts);
      } else {
        setShippers(DEFAULT_SHIPPERS);
      }
    } catch {
      setShippers(DEFAULT_SHIPPERS);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchShippers();
  }, []);

  const handleAssignShipper = async (orderId, shipperId) => {
    setAssigning(a => ({ ...a, [orderId]: true }));
    try {
      await DeliveryService.createAndAssignDelivery(shipperId, [orderId]);
      toast.success('Đã gán đơn cho shipper!');
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, shipperId } : order
        )
      );
      setLocalDeliveryStatus(prev => ({ ...prev, [orderId]: 0 }));
      setLocalPaymentStatus(prev => ({ ...prev, [orderId]: 0 }));
    } catch {
      toast.error('Không thể gán đơn!');
    }
    setAssigning(a => ({ ...a, [orderId]: false }));
  };

  const handleUpdateDeliveryStatus = async (orderId, deliveryStatus) => {
    setAssigning(a => ({ ...a, [orderId]: true }));
    const paymentStatus = localPaymentStatus[orderId] ?? 0;
    try {
      await DeliveryService.updateDeliveryStatus(orderId, {
        deliveryStatus,
        paymentStatus,
      });
      toast.success('Cập nhật trạng thái giao hàng thành công!');
      setLocalDeliveryStatus(prev => ({ ...prev, [orderId]: deliveryStatus }));
    } catch {
      toast.error('Không thể cập nhật trạng thái giao hàng!');
    }
    setAssigning(a => ({ ...a, [orderId]: false }));
  };

  const handleUpdatePaymentStatus = async (orderId, paymentStatus) => {
    setAssigning(a => ({ ...a, [orderId]: true }));
    const deliveryStatus = localDeliveryStatus[orderId] ?? 0;
    try {
      await DeliveryService.updateDeliveryStatus(orderId, {
        deliveryStatus,
        paymentStatus,
      });
      toast.success('Cập nhật trạng thái thanh toán thành công!');
      setLocalPaymentStatus(prev => ({ ...prev, [orderId]: paymentStatus }));
    } catch {
      toast.error('Không thể cập nhật trạng thái thanh toán!');
    }
    setAssigning(a => ({ ...a, [orderId]: false }));
  };

  const handleDelete = async id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn này?')) return;
    try {
      await OrderService.deleteOrder(id);
      toast.success('Đã xóa đơn!');
      fetchOrders();
    } catch {
      toast.error('Không thể xóa đơn!');
    }
  };

  const handleDetail = order => setSelectedOrder(order);

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="manage-material-container">
      <h1>Order List</h1>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th>Thành tiền</th>
                <th>Thanh toán</th>
                <th>Sản phẩm</th>
                <th>Shipper</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.address}</td>
                  <td>{order.phoneNumber}</td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(order.totalAmount)}
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <ul className="order-items-list">
                      {order.cartItemRequests.map((item, idx) => (
                        <li key={idx}>
                          <span className="order-item-label">ID:</span> {item.productId} &nbsp;
                          <span className="order-item-label">SL:</span> {item.quantity} &nbsp;
                          <span className="order-item-label">Loại:</span> {item.productType === 1 ? 'Charm' : 'Bracelet'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <select
                      value={order.shipperId || ''}
                      onChange={e => handleAssignShipper(order.id, e.target.value)}
                      disabled={assigning[order.id]}
                    >
                      <option value="">Chọn shipper</option>
                      {shippers.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <select
                        value={localDeliveryStatus[order.id] ?? 0}
                        onChange={e => handleUpdateDeliveryStatus(order.id, Number(e.target.value))}
                        disabled={assigning[order.id]}
                      >
                        {deliveryStatusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={localPaymentStatus[order.id] ?? 0}
                        onChange={e => handleUpdatePaymentStatus(order.id, Number(e.target.value))}
                        disabled={assigning[order.id]}
                      >
                        {paymentStatusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn edit" onClick={() => handleDetail(order)}>
                        Chi tiết
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(order.id)}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentOrders.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center' }}>
                    Không có đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀ Trước
              </button>
              <span style={{ margin: '0 10px' }}>
                Trang {currentPage} / {totalPages}
              </span>
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau ▶
              </button>
            </div>
          )}

        </>
      )}

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <div className="order-detail-info">
              <div><b>Tên:</b> {selectedOrder.userName}</div>
              <div><b>Địa chỉ:</b> {selectedOrder.address}</div>
              <div><b>SĐT:</b> {selectedOrder.phoneNumber}</div>
              <div><b>Thời Gian:</b> {new Date(selectedOrder.orderDate).toLocaleString('vi-VN')}</div>
              <div><b>Ghi chú:</b> {selectedOrder.note}</div>
              <div><b>Thanh toán:</b> {selectedOrder.paymentMethod}</div>
              <div><b>Giá:</b> {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(selectedOrder.totalAmount)}</div>
              <div><b>Giảm giá:</b> {selectedOrder.amountDiscount}</div>
              <div><b>Vận Chuyển:</b> {
                deliveryStatusOptions.find(d => d.value === selectedOrder.deliveryStatus)?.label ?? 'Không xác định'
              }</div>
              <div><b>Sản phẩm:</b>
                <ul className="order-items-list">
                  {selectedOrder.cartItemRequests.map((item, idx) => (
                    <li key={idx}>
                      <span className="order-item-label">ID:</span> {item.productId} &nbsp;
                      <span className="order-item-label">SL:</span> {item.quantity} &nbsp;
                      <span className="order-item-label">Loại:</span> {item.productType === 1 ? 'Charm' : 'Bracelet'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="cancel-btn" onClick={() => setSelectedOrder(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
