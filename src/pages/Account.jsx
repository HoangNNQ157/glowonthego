import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../services/auth.service';
import OrderService from '../services/order.service';
import ReviewModal from '../components/ReviewModal';
import './Account.scss'; // Import the new Account.scss

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [productToReview, setProductToReview] = useState(null);

  // State for editing user profile
  const [isEditing, setIsEditing] = useState(false);
  const [editFullname, setEditFullname] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');

  const fetchUserAndOrders = async () => {
    try {
      // Fetch user data
      const currentUser = await AuthService.getCurrentUser();
      console.log('Current User from AuthService:', currentUser);

      if (!currentUser) {
        navigate('/register');
        return;
      }
      
      // Fetch full user details using the userId from currentUser
      const fullUserDetails = await AuthService.getUserById(currentUser.userId);
      console.log('Full user details from API:', fullUserDetails);

      setUser(fullUserDetails); // Set user state with fetched detailed data

      // Initialize edit states with current user data
      setEditFullname(fullUserDetails.fullname || '');
      setEditEmail(fullUserDetails.email || '');
      setEditPhoneNumber(fullUserDetails.phoneNumber || '');

      // Fetch orders
      const fetchedOrders = await OrderService.getOrdersByUserId(currentUser.userId);
      console.log('Fetched orders:', fetchedOrders);
      setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Check if it's a 404 error for orders, indicating no orders found
      if (error.response && error.response.status === 404 && error.config.url.includes('/Order/get-orders-by-user')) {
        console.log("No orders found for this user (404 response).");
        setOrders([]); // Set orders to empty array
        setErrorOrders(null); // Clear any previous error
      } else {
        // For other errors, set the error message
        setErrorOrders(error.message || 'Failed to fetch data');
      }
    } finally {
      setLoading(false);
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchUserAndOrders();
  }, [navigate]);

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullname') {
      setEditFullname(value);
    } else if (name === 'email') {
      setEditEmail(value);
    } else if (name === 'phoneNumber') {
      setEditPhoneNumber(value);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true); // Show loading while saving
      const updatedFields = {};
      if (editFullname !== user.fullname) {
        updatedFields.fullname = editFullname;
      }
      if (editEmail !== user.email) {
        updatedFields.email = editEmail;
      }
      if (editPhoneNumber !== user.phoneNumber) {
        updatedFields.phoneNumber = editPhoneNumber;
      }

      if (Object.keys(updatedFields).length === 0) {
        console.log("No changes detected. Exiting save.");
        toast.info("Không có thay đổi nào để lưu."); // Inform user if no changes
        setIsEditing(false); // Exit edit mode if no changes
        setLoading(false);
        return;
      }
      
      const response = await AuthService.updateUserProfile(user.id, updatedFields);
      console.log('Profile updated successfully:', response);
      setUser(response); // Update local user state with response from API
      toast.success('Cập nhật thông tin thành công!'); // Success notification
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Cập nhật thông tin thất bại!'); // Error notification
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert changes and exit edit mode
    setEditFullname(user.fullname || '');
    setEditEmail(user.email || '');
    setEditPhoneNumber(user.phoneNumber || '');
    setIsEditing(false);
  };

  const handleReviewClick = (product) => {
    setProductToReview(product);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setProductToReview(null);
  };

  const handleReviewSubmitSuccess = () => {
    handleCloseReviewModal();
    fetchUserAndOrders(); // Refresh orders to reflect potential review status (if applicable)
  };

  if (loading) {
    return <div className="account-page">Loading user data...</div>;
  }

  if (!user) {
      // This block is less likely to be reached now due to the redirect,
      // but remains as a fallback or if redirect is removed.
      return (
        <div className="login-page"> {/* Reusing login page layout/styles */}
          <div className="login-container"> {/* Reusing login container styles */}
            <h1 className="login-title">Access Denied</h1>
            <p className="login-subtitle">Please log in to view your account information.</p>
            <div className="login-signup-text">
              <Link to="/login">Go to Login Page</Link>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="account-page"> {/* Changed from login-page */}
      <div className="account-container"> {/* Changed from login-container */}
        <h1 className="account-title">Account Information</h1>{/* Changed from login-title */}
        <div className="account-info">
          <p><strong>Username:</strong> {user.userName}</p>
          {isEditing ? (
            <>
              <div className="form-group">
                <label htmlFor="editFullname">Full Name:</label>
                <input
                  type="text"
                  id="editFullname"
                  name="fullname"
                  value={editFullname}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="editEmail">Email:</label>
                <input
                  type="email"
                  id="editEmail"
                  name="email"
                  value={editEmail}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="editPhoneNumber">Phone Number:</label>
                <input
                  type="text"
                  id="editPhoneNumber"
                  name="phoneNumber"
                  value={editPhoneNumber}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Full Name:</strong> {user.fullname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            </>
          )}
        </div>

        <div className="account-actions"> {/* Changed class name */}
          {!isEditing ? (
            <button className="account-edit-button" onClick={handleEditClick}>Edit Profile</button>
          ) : (
            <>
              <button className="account-save-button" onClick={handleSave}>Save</button>
              <button className="account-cancel-button" onClick={handleCancel}>Cancel</button>
            </>
          )}
          <button className="account-logout-button" onClick={handleLogout}>Logout</button> {/* Changed class name */}
        </div>

        <h2 className="orders-title">My Orders</h2>
        {loadingOrders ? (
          <div className="loading-orders">Loading orders...</div>
        ) : errorOrders ? (
          <div className="error-orders">Error: {errorOrders}</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">No orders found.</div>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <h3>Order ID: {order.id}</h3>
                <p><strong>Order Date:</strong> {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Total Amount:</strong> {order.totalAmount ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount) : 'N/A'}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Delivery Address:</strong> {order.address}</p>
                <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                <p><strong>Note:</strong> {order.note}</p>
                <h4>Products:</h4>
                <ul className="order-products-list">
                  {order.cartItemRequests.map((item, index) => (
                    <li key={index} className="order-product-item">
                      <span>Product Type: {item.productType === 1 ? 'Bracelet' : 'Charm'}, ID: {item.productId}, Quantity: {item.quantity}</span>
                      <button 
                        className="review-product-btn"
                        onClick={() => handleReviewClick(item)}
                      >
                        Review
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {isReviewModalOpen && (
          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={handleCloseReviewModal}
            product={productToReview}
            onReviewSubmit={handleReviewSubmitSuccess}
          />
        )}

      </div>
    </div>
  );
};

export default Account; 