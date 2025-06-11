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

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shippers, setShippers] = useState([]);
  const [assigning, setAssigning] = useState({}); // { [orderId]: boolean }

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderService.getAllOrders();
      setOrders(res || []);
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
    } catch (error) {
      console.error('Error fetching shippers:', error);
      setShippers(DEFAULT_SHIPPERS);
    }
  };

  useEffect(() => { fetchOrders(); fetchShippers(); }, []);

  const handleDetail = order => setSelectedOrder(order);

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

  // Gán đơn hàng cho shipper
  const handleAssignShipper = async (orderId, shipperId) => {
    setAssigning(a => ({ ...a, [orderId]: true }));
    try {
      await DeliveryService.createAndAssignDelivery(shipperId, [orderId]);
      toast.success('Đã gán đơn cho shipper!');
      fetchOrders();
    } catch (error) {
      console.error('Error assigning shipper:', error);
      toast.error('Không thể gán đơn!');
    }
    setAssigning(a => ({ ...a, [orderId]: false }));
  };

  // Cập nhật trạng thái giao hàng và thanh toán
  const handleUpdateDelivery = async (orderId, deliveryStatus, paymentStatus) => {
    setAssigning(a => ({ ...a, [orderId]: true }));
    try {
      await DeliveryService.updateDeliveryStatus(orderId, { deliveryStatus, paymentStatus });
      toast.success('Cập nhật trạng thái thành công!');
      fetchOrders();
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Không thể cập nhật trạng thái!');
    }
    setAssigning(a => ({ ...a, [orderId]: false }));
  };

  return (
    <div className="manage-material-container">
      <h1>Quản lý Đơn hàng</h1>
      {loading ? <div>Đang tải...</div> : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Địa chỉ</th>
              <th>SĐT</th>
              <th>Ghi chú</th>
              <th>Thanh toán</th>
              <th>Sản phẩm</th>
              <th>Shipper</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.note}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <ul className="order-items-list">
                    {order.cartItemRequests.map((item, idx) => (
                      <li key={idx}>
                        <span className="order-item-label">ID:</span> {item.productId} &nbsp;
                        <span className="order-item-label">SL:</span> {item.quantity}
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
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    <select
                      value={order.deliveryStatus || 0}
                      onChange={e => handleUpdateDelivery(order.id, Number(e.target.value), order.paymentStatus || 0)}
                      disabled={assigning[order.id]}
                    >
                      <option value={0}>Chưa giao</option>
                      <option value={1}>Đã giao</option>
                    </select>
                    <select
                      value={order.paymentStatus || 0}
                      onChange={e => handleUpdateDelivery(order.id, order.deliveryStatus || 0, Number(e.target.value))}
                      disabled={assigning[order.id]}
                    >
                      <option value={0}>Chưa thanh toán</option>
                      <option value={1}>Đã thanh toán</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="action-group">
                    <button className="action-btn edit" onClick={()=>handleDetail(order)}>Chi tiết</button>
                    <button className="action-btn delete" onClick={()=>handleDelete(order.id)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={9} style={{textAlign:'center'}}>Không có đơn hàng</td></tr>
            )}
          </tbody>
        </table>
      )}
      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <div className="order-detail-info">
              <div><b>Địa chỉ:</b> {selectedOrder.address}</div>
              <div><b>SĐT:</b> {selectedOrder.phoneNumber}</div>
              <div><b>Ghi chú:</b> {selectedOrder.note}</div>
              <div><b>Thanh toán:</b> {selectedOrder.paymentMethod}</div>
              <div><b>Giảm giá:</b> {selectedOrder.amountDiscount}</div>
              <div><b>Sản phẩm:</b>
                <ul className="order-items-list">
                  {selectedOrder.cartItemRequests.map((item, idx) => (
                    <li key={idx}>
                      <span className="order-item-label">ID:</span> {item.productId} &nbsp;
                      <span className="order-item-label">SL:</span> {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="cancel-btn" onClick={()=>setSelectedOrder(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders; 