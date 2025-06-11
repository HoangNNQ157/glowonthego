import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartService from '../services/cart.service';
import AuthService from '../services/auth.service'; // To get the user ID
import axiosInstance from '../services/axios.config'; // To call the checkout API
import { toast } from 'react-toastify';
import './Checkout.scss'; // We will create this file next for styling  

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [formData, setFormData] = useState({
    address: '',
    note: '',
    paymentMethod: '', // You might want a dropdown or radio buttons for this
    phoneNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);


  useEffect(() => {
    // Load cart data
    const items = CartService.getCart();
    if (items.length === 0) {
        // Redirect to cart if empty
        navigate('/cart');
        return;
    }
    setCartItems(items);
    setLoadingCart(false);

    // Load user data to get ID
    const loadUser = async () => {
        setLoadingUser(true);
        const user = await AuthService.getCurrentUser();
        if (!user) {
            // Redirect to login if not logged in
            toast.info('Please log in to complete your order.');
            navigate('/login');
        } else {
            setUserData(user);
            // Populate phone number if available from user data
            if (user.phoneNumber && !formData.phoneNumber) {
                 setFormData(prev => ({ ...prev, phoneNumber: user.phoneNumber }));
            }
        }
        setLoadingUser(false);
    };

    loadUser();

  }, [navigate, formData.phoneNumber]); // Add formData.phoneNumber as dependency to avoid infinite loop

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorSubmit(null);

    if (!userData || !userData.userId) {
        setErrorSubmit('User not logged in.');
        setSubmitting(false);
        return;
    }

    if (cartItems.length === 0) {
        setErrorSubmit('Cart is empty.');
        setSubmitting(false);
        return;
    }

    // Construct the order payload
    const orderPayload = {
      userId: userData.userId,
      address: formData.address,
      note: formData.note,
      amountDiscount: 0, // Assuming no discount for now, implement logic if needed
      paymentMethod: formData.paymentMethod,
      phoneNumber: formData.phoneNumber,
      cartItemRequests: cartItems.map(item => ({
          productType: item.productType,
          productId: item.productId,
          quantity: item.quantity,
      }))
    };

    console.log('Order Payload:', orderPayload);

    try {
      const response = await axiosInstance.post('/cart/checkout', orderPayload);
      console.log('Checkout successful:', response.data);

      toast.success('Order placed successfully!');
      CartService.clearCart(); // Clear cart after successful order
      navigate('/order-success'); // Navigate to a success page (create this page)

    } catch (err) {
      console.error('Checkout failed:', err);
      setErrorSubmit(err.response?.data?.message || 'Order failed.');
      toast.error('Order failed!');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCart || loadingUser) {
    return <div className="checkout-page">Loading order information...</div>;
  }

  return (
    <div className="checkout-page"> {/* We will style this */}
        <div className="checkout-container"> {/* We will style this */}
            <h1>Checkout</h1>

            <h2>Cart Summary</h2>
            {/* Display cart items for review (optional but recommended) */}
            <div className="checkout-cart-summary">
                {cartItems.map(item => (
                    <div key={`${item.productType}-${item.productId}`}>
                        {item.name} (x{item.quantity}) - {item.price} {/* Display basic item info, format price if needed */}
                    </div>
                ))}
                 {/* Display total (optional) */}
                {/* <p>Total: {formatPriceVND(calculateTotal())}</p> */}
            </div>

            <h2>Shipping and Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <textarea id="note" name="note" value={formData.note} onChange={handleChange}></textarea>
                </div>

                 <div className="form-group"> {/* Example Payment Method selection */}
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                        <option value="">Select a method</option>
                        <option value="Cash">Cash on Delivery</option>
                        <option value="VNPay">Credit/Debit Card</option>
                        {/* Add other payment methods */}
                    </select>
                </div>

                {errorSubmit && <div className="error-message">{errorSubmit}</div>}

                <button type="submit" disabled={submitting}>
                    {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Checkout; 