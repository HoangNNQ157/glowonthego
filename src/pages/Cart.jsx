import { useEffect, useState } from 'react';
import './Cart.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import CartService from '../services/cart.service';
import CharmService from '../services/charm.service';
import axiosInstance from '../services/axios.config'; // Fixed import path

const fetchProductDetails = async (productId) => {
  console.log(`Fetching details for Product ID: ${productId}`);
  try {
    // *** Replace with your actual API call to get product details by ID ***
    const response = await axiosInstance.get(`/bracelete/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product details for ID ${productId}:`, error);
    return null; // Return null or throw error as appropriate
  }
};

const fetchCharmDetails = async (charmId) => {
    console.log(`Fetching details for Charm ID: ${charmId}`);
    try {
      // *** Replace with your actual API call to get charm details by ID ***
      const response = await axiosInstance.get(`/charm/${charmId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch charm details for ID ${charmId}:`, error);
      return null; // Return null or throw error as appropriate
    }
  };

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [youMayAlsoLikeItems, setYouMayAlsoLikeItems] = useState([]);
  // const [handpickedCharms, setHandpickedCharms] = useState([]);

  const loadCartAndCharmsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const cartFromStorage = CartService.getCart();
      console.log('Cart from storage:', cartFromStorage);

      // Update state with raw cart data first to ensure immediate quantity update
      // This temporary state update ensures the quantity is available quickly
      // for the initial render, though the detailed items will overwrite this later.
      setCartItems(cartFromStorage);

      // Fetch detailed info for display
      const detailedCartItems = await Promise.all(cartFromStorage.map(async (cartItem) => {
          let details = null;
          if (cartItem.productType === 1) {
              details = await fetchProductDetails(cartItem.productId);
          } else if (cartItem.productType === 2) {
               details = await fetchCharmDetails(cartItem.productId);
          }
          // Add other product types as needed

          // Correctly merge details and cartItem, prioritizing cart quantity
          return { ...details, ...cartItem };
      }));

      // Update state again with detailed items
      setCartItems(detailedCartItems);

      const allCharmsResponse = await CharmService.getAllCharms();
      const allCharms = allCharmsResponse.data || [];

      setYouMayAlsoLikeItems(allCharms.slice(0, 5));
      // setHandpickedCharms(allCharms.slice(5, 8));

    } catch (err) {
      console.error('Failed to load cart or charm data:', err);
      setError('Failed to load data.');
      setCartItems([]);
      setYouMayAlsoLikeItems([]);
      // setHandpickedCharms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartAndCharmsData();
  }, []);

  const calculateTotal = () => {
      return cartItems.reduce((sum, item) => {
          const priceString = typeof item.price === 'string' ? item.price.replace(/[^\d,.]/g, '').replace(',', '.') : item.price;
          const price = parseFloat(priceString) || 0;
          return sum + (price * (item.quantity || 0));
      }, 0);
  };

  const formatPriceVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };


  const handleUpdateQuantity = async (item, newQuantity) => {
    CartService.updateItemQuantity(item, newQuantity);
    const updatedCart = CartService.getCart();

    // Fetch detailed info for the updated cart
    const detailedCartItems = await Promise.all(updatedCart.map(async (cartItem) => {
        let details = null;
        if (cartItem.productType === 1) {
            details = await fetchProductDetails(cartItem.productId);
        } else if (cartItem.productType === 2) {
             details = await fetchCharmDetails(cartItem.productId);
        }
        // Correctly merge details and cartItem, prioritizing cart quantity
        return { ...details, ...cartItem };
    }));

    // Update state only once with the fully detailed, updated items
    setCartItems(detailedCartItems);
  };

  const handleRemoveItem = async (item) => {
    CartService.removeItem(item);
    const updatedCart = CartService.getCart();
    const detailedCartItems = await Promise.all(updatedCart.map(async (cartItem) => {
        let details = null;
        if (cartItem.productType === 1) {
            details = await fetchProductDetails(cartItem.productId);
        } else if (cartItem.productType === 2) {
             details = await fetchCharmDetails(cartItem.productId);
        }
        return { ...details, ...cartItem }; // Merge details first, then cartItem to prioritize cart quantity
    }));
    setCartItems(detailedCartItems);
  };

  const total = calculateTotal();

  if (loading) {
    return <div className="cart-page">Loading cart...</div>;
  }

  if (error) {
    return <div className="cart-page">Error: {error}</div>;
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <span>Cart ({cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'})</span>
        <button className="cart-header__close">×</button>
      </div>
      <div className="cart-content">
        <div className="cart-left">
          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div className="cart-item" key={`${item.productType}-${item.productId}`}>
                  <div className="cart-item__img"><img src={item.image} alt={item.name} /></div>
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    {/* Display details based on product type */}
                    {item.productType === 1 && (
                      <>
                        {(item.color || item.size) && 
                          <div className="cart-item__variant">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.color && item.size && <span>, </span>}
                            {item.size && <span>Size: {item.size}</span>}
                            <span className="cart-item__price">{formatPriceVND(parseFloat(item.price))}</span>
                          </div>
                        }
                        {/* {item.description && <div className="cart-item__description">{item.description}</div>} */} {/* Description for products if needed */}
                      </>
                    )}
                    {item.productType === 2 && (
                      <>
                         <div className="cart-item__charm-details">
                            {/* Charm details */}
                            <div className="cart-item__charm-name">{item.charmName}</div> {/* Use charmName for charms */}
                            {/* {item.description && <div className="cart-item__charm-description">{item.description}</div>} */}
                            {/* Add other charm specific fields if needed, e.g., QR message */}
                            {/* {item.qrMessage && <div className="cart-item__charm-qr">QR Message: {item.qrMessage}</div>} */}
                             <div className="cart-item__price">{formatPriceVND(parseFloat(item.price))}</div> {/* Price for charms */}
                         </div>
                      </>
                    )}
                    {/*item.variant && <div className="cart-item__variant">{item.variant} <span className="cart-item__price">{formatPriceVND(parseFloat(item.price))}</span></div>*/}
                    {item.word && <div className="cart-item__word"><span>Word: </span>{item.word}</div>}
                    <div className="cart-item__qty-row">
                      <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                      <span>
                        {/* Ensure we display the quantity from the latest state */}
                         {(() => {
                           // Re-adding explicit lookup and console log for debugging
                           const latestItem = cartItems.find(ci => ci.productId === item.productId && ci.productType === item.productType);
                           const quantityToDisplay = latestItem ? latestItem.quantity : (item ? item.quantity : 0);
                           console.log(`Displaying quantity for item ${item.productId} (Type ${item.productType}): ${quantityToDisplay}`);
                           return quantityToDisplay;
                        })()}
                      </span>
                      <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                    </div>
                    {item.note && <div className="cart-item__note">{item.note}</div>}
                    <button onClick={() => handleRemoveItem(item)} className="cart-item__remove">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                        <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2v12zM9 4h6v2H9V4zm1 10v4h1v-4h-1zm3 0v4h1v-4h-1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-top-picks-section">
            <div className="cart-top-picks-title">Top Picks for Your Cart</div>
            <div className="cart-top-picks-list">
              {/* Add recommended products here by fetching data from API */}
            </div>
          </div>
          
          <div className="cart-summary-block">
            <div className="cart-summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>{formatPriceVND(total)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
          </div>
        </div>
        <div className="cart-right">
          <div className="cart-ymal-title">You May Also Like</div>
          <div className="cart-ymal-list">
            <Swiper spaceBetween={24} slidesPerView={'auto'} style={{ maxWidth: '100%', paddingBottom: 12 }}>
              {youMayAlsoLikeItems.map((item) => (
                <SwiperSlide key={item.id} style={{ width: 260 }}>
                  <div className="cart-ymal-item">
                    {item.badge && <div className="cart-ymal-badge">{item.badge}</div>}
                    <div className="cart-ymal-img" style={{ background: '#e0e0e0', borderRadius: 12, height: 180 }}>
                      <img style={{width: "100%"}} src={item.image || '/images/charm__large.png'} alt={item.name} />
                    </div>
                    <div className="cart-ymal-name">{item.name}</div>
                    <div className="cart-ymal-price">{formatPriceVND(item.price)}</div>
                    <div className="cart-ymal-rating">{'★'.repeat(item.rating)} <span>{item.reviews} Reviews</span></div>
                    {/* <button className="cart-ymal-add">ADD TO CART</button> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="cart-footer">
        <button className="cart-checkout-btn" onClick={() => navigate('/checkout')} disabled={cartItems.length === 0}>Đặt Hàng</button>
      </div>
    </div>
  );
} 