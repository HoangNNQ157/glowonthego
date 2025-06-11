import './ProductDetail.scss'; // May need a new CSS file later
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import CharmService from '../services/charm.service'; // Use CharmService
import CartService from '../services/cart.service'; // Import CartService
import { toast } from 'react-toastify'; // Import toast
import ReviewService from '../services/review.service';
import AuthService from '../services/auth.service';

// PAIRS_WELL_WITH can be kept or removed/updated as needed for Charms
const PAIRS_WELL_WITH = [
  {
    name: 'Grace',
    price: '429.000₫',
    image: '/images/charm__large.png',
  },
  {
    name: 'Bow Charm',
    price: '109.000₫',
    image: '/images/charm__large.png',
  },
  {
    name: 'Custom Tiny Words Bracelet',
    price: '429.000₫',
    image: '/images/charm__large.png',
  },
  {
    name: 'You Can',
    price: '399.000₫',
    image: '/images/charm__large.png',
  },
];

const CharmDetail = () => { // Renamed component
  const { id } = useParams();
  const [charmDetail, setCharmDetail] = useState(null); // Renamed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedCharms, setRelatedCharms] = useState([]); // Renamed state
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Add state for selected quantity
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    const fetchCharmDetail = async () => { // Renamed function
      try {
        setLoading(true);
        setError(null);

        const detailResponse = await CharmService.getCharmById(id); // Use CharmService
        console.log("Fetched charm detail data:", detailResponse.data);

        if (detailResponse.data) {
          setCharmDetail(detailResponse.data); // Use CharmService data
          // Now fetch related Charms
          fetchRelatedCharms(detailResponse.data); // Pass charm data
        } else {
          setError('Charm data is empty');
          setCharmDetail(null);
        }

      } catch (err) {
        setError(err.message || 'Failed to fetch charm detail'); // Update error message
        console.error("Error fetching charm detail:", err);
        setCharmDetail(null);
        setRelatedCharms([]); // Clear related charms on detail fetch error
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedCharms = async (currentCharm) => { // Renamed function and parameter
      try {
        const relatedItemsResponse = await CharmService.getAllCharms(); // Use CharmService
        console.log("Fetched all charms for related:", relatedItemsResponse.data);

        // Filter out the current charm from the related items, add safety check
        const filteredRelated = (relatedItemsResponse.data || []).filter(item => item.id !== currentCharm.id);
        setRelatedCharms(filteredRelated);

      } catch (err) {
        console.error("Error fetching related charms:", err); // Update error message
        setRelatedCharms([]); // Ensure relatedCharms is always an array
      }
    };

    fetchCharmDetail();

  }, [id]); // isCharm dependency removed

  const handleAddToCart = () => {
    if (charmDetail) {
      const cartItem = {
        productId: charmDetail.id,
        productType: 2,
        quantity: selectedQuantity, // Use the selected quantity
      };
      CartService.addItem(cartItem);
      toast.success(`${charmDetail.charmName} đã được thêm vào giỏ hàng!`);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await ReviewService.createReview({ productId: charmDetail.id, rating, comment });
      toast.success('Gửi đánh giá thành công!');
      setRating(5);
      setComment('');
    } catch {
      toast.error('Gửi đánh giá thất bại!');
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div style={{ padding: 40 }}>Loading charm...</div>; // Update loading message
  }

  if (error) {
    return <div style={{ padding: 40, color: 'red' }}>Error loading charm: {error}</div>; // Update error message
  }

  if (!charmDetail) { // Check charmDetail
    return <div style={{ padding: 40 }}>Charm not found.</div>; // Update not found message
  }

  return (
    <div className="product-detail"> {/* Class name can be updated if new CSS is created */}
      <div className="container">
        <div className="product-detail__breadcrumb">
          <Link to="/new-trending">SHOP ALL</Link> / CHARMS / {charmDetail.charmName.toUpperCase()} {/* Update breadcrumb */}
        </div>
        <div className="product-detail__main">
          <div className="product-detail__gallery">
            <div className="product-detail__image">
              <img src={charmDetail.image} alt={charmDetail.charmName} /> {/* Use charmDetail properties */}
              <button className="product-detail__slider-next"></button>
            </div>
          </div>
          <div className="product-detail__info">
            <h1 className="product-detail__title">{charmDetail.charmName}</h1> {/* Use charmDetail properties */}
            <div className="product-detail__price">From <span>{charmDetail.price.toLocaleString('vi-VN')}₫</span></div> {/* Use charmDetail properties */}
            <div className="product-detail__size-row">
              <span>Size</span>
              <div className="product-detail__sizes">
                <button className="active">{charmDetail.size}</button> {/* Use charmDetail properties */}
              </div>
              <a href="#" className="product-detail__find-size">Find your size</a>
            </div>
            <div className="product-detail__qty-row">
              <button onClick={() => setSelectedQuantity(prev => Math.max(1, prev - 1))}>-</button>
              <span>{selectedQuantity}</span>
              <button onClick={() => setSelectedQuantity(prev => prev + 1)}>+</button>
              <button className="product-detail__customize-btn" onClick={handleAddToCart}>Thêm Vào Giỏ Hàng</button>
            </div>
            <div className="product-detail__desc-block">
              <div className="product-detail__desc-title">Description</div>
              <div className="product-detail__desc-content">
                {charmDetail.description}
              </div>
            </div>
            <div className="product-detail__expand-block">
              <div className="product-detail__expand-title">Specifications</div>
            </div>
            <div className="product-detail__expand-block">
              <div className="product-detail__expand-title">Size Guide</div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail__pairs-well-with"> {/* Section can be updated for Charms */}
        <div className="pairs-well-with__left">
          <div className="pairs-well-with__bg">
            <span>Pairs Well With</span>
          </div>
        </div>
        <div className="pairs-well-with__right">
          {PAIRS_WELL_WITH.map((item, idx) => (
            <div className="pairs-well-with__item" key={idx}> {/* Items here are hardcoded, can be updated */}
              <div className="pairs-well-with__img-wrap">
                <img src={item.image} alt={item.name} />
                <button className="pairs-well-with__add-btn">+</button>
              </div>
              <div className="pairs-well-with__name">{item.name}</div>
              <div className="pairs-well-with__price">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="related-products-section"> {/* Class name can be updated */}
        <h2 className="related-products-title">Related Charms</h2> {/* Update title */}
        <div className="related-products-list-swiper"> {/* Class name can be updated */}
          <Swiper
            spaceBetween={24}
            slidesPerView={'auto'}
            style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: 12 }}
          >
            {(relatedCharms || []).map((item) => (
              <SwiperSlide key={item.id} style={{ width: 260 }}>
                <Link 
                  to={`/charm/${item.id}`} // Link to CharmDetail
                  style={{ textDecoration: 'none' }}
                >
                  <div className="related-product-item"> {/* Class name can be updated */}
                    <div className="related-product-img-wrap"> {/* Class name can be updated */}
                      <img src={item.image} alt={item.charmName} /> {/* Use item.charmName */}
                      <button className="related-product-add-btn">+</button> {/* Class name can be updated */}
                    </div>
                    <div className="related-product-name">{item.charmName}</div> {/* Use item.charmName */}
                    <div className="related-product-price">{item.price.toLocaleString('vi-VN')}₫</div> {/* Use item.price */}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {isAuthenticated && (
        <div className="review-form-section">
          <h3>Đánh giá sản phẩm</h3>
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <label>Chọn số sao:
              <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[1,2,3,4,5].map(star => <option key={star} value={star}>{star}</option>)}
              </select>
            </label>
            <label>Bình luận:
              <textarea value={comment} onChange={e => setComment(e.target.value)} required rows={3} />
            </label>
            <button type="submit" disabled={submitting} className="review-submit-btn">Gửi đánh giá</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CharmDetail; // Export CharmDetail 