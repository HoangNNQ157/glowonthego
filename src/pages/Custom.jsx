import { useState, useEffect } from 'react';
import './Custom.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import CharmService from '../services/charm.service';
import ProductService from '../services/product.service';
import CategoryService from '../services/category.service';
import ImageService from '../services/image.service';
import { Link, useLocation } from 'react-router-dom';

// Helper component for star rating (simple placeholder)
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? "#D99FCA" : "none"}
        stroke={i < rating ? "#D99FCA" : "#D99FCA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: '15px', height: '15px', marginRight: '2px' }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    );
  }
  return <div style={{ display: 'flex', alignItems: 'center' }}>{stars}</div>;
};

const Custom = () => {
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [charmProducts, setCharmProducts] = useState([]);
  const [loadingCharms, setLoadingCharms] = useState(true);
  const [errorCharms, setErrorCharms] = useState(null);
  const [youMayAlsoLikeProducts, setYouMayAlsoLikeProducts] = useState([]);
  const [loadingYouMayLike, setLoadingYouMayLike] = useState(true);
  const [errorYouMayLike, setErrorYouMayLike] = useState(null);

  // GIF Upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedGifUrl, setUploadedGifUrl] = useState('');

  // Filter states
  const [filterCategory, setFilterCategory] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterSortBy, setFilterSortBy] = useState('nameAsc'); // Default sort
  const [charmCategories, setCharmCategories] = useState([]);

  // Temporary filter state for popup
  const [tempFilter, setTempFilter] = useState({
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'nameAsc',
  });

  const location = useLocation();

  const toggleFilterPopup = () => {
    // When opening the popup, sync tempFilter with current applied filters
    if (!isFilterPopupOpen) {
      setTempFilter({
        category: filterCategory,
        color: filterColor,
        minPrice: filterMinPrice,
        maxPrice: filterMaxPrice,
        sortBy: filterSortBy,
      });
    }
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  const fetchCharmProducts = async () => {
    setLoadingCharms(true);
    setErrorCharms(null);
    try {
      const searchParams = {
        categoryId: filterCategory || undefined,
        color: filterColor || undefined,
        minPrice: filterMinPrice ? parseFloat(filterMinPrice) : undefined,
        maxPrice: filterMaxPrice ? parseFloat(filterMaxPrice) : undefined,
        sortBy: filterSortBy,
      };
      const response = await CharmService.searchCharms(searchParams);
      console.log("Fetched charms with filters:", response.data);
      setCharmProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching charm products with filters:", error);
      setErrorCharms(error.message || 'Failed to fetch charm products');
      setCharmProducts([]);
    } finally {
      setLoadingCharms(false);
    }
  };

  const fetchCharmCategories = async () => {
    try {
      const response = await CategoryService.getAllCharmCategories();
      setCharmCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching charm categories:", error);
      setCharmCategories([]);
    }
  };

  useEffect(() => {
    fetchCharmProducts();
  }, [filterCategory, filterColor, filterMinPrice, filterMaxPrice, filterSortBy]); // Now dependent on applied filters

  useEffect(() => {
    fetchCharmCategories();
  }, []);

  useEffect(() => {
    const fetchYouMayAlsoLikeProducts = async () => {
      try {
        setLoadingYouMayLike(true);
        setErrorYouMayLike(null);
        const response = await ProductService.getAllProducts();
        console.log("Fetched all products for You May Also Like:", response);
        setYouMayAlsoLikeProducts(response || []);
      } catch (error) {
        console.error("Error fetching You May Also Like products:", error);
        setErrorYouMayLike(error.message || 'Failed to fetch recommended products');
        setYouMayAlsoLikeProducts([]);
      } finally {
        setLoadingYouMayLike(false);
      }
    };

    fetchYouMayAlsoLikeProducts();
  }, []);

  useEffect(() => {
    // Scroll to section if hash exists
    const { hash } = location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.querySelector(`.${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  // Handlers for filter changes
  const handleTempFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setFilterCategory(tempFilter.category);
    setFilterColor(tempFilter.color);
    setFilterMinPrice(tempFilter.minPrice);
    setFilterMaxPrice(tempFilter.maxPrice);
    setFilterSortBy(tempFilter.sortBy);
    toggleFilterPopup(); // Close the popup
  };

  const handleClearFilters = () => {
    // Reset temporary filters to initial state
    setTempFilter({
      category: '',
      color: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'nameAsc',
    });
    // Reset applied filters to initial state (this will trigger re-fetch)
    setFilterCategory('');
    setFilterColor('');
    setFilterMinPrice('');
    setFilterMaxPrice('');
    setFilterSortBy('nameAsc');
    toggleFilterPopup(); // Close the popup
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError(null); // Clear any previous upload errors
    }
  };

  // Swiper settings for You May Also Like section
  const youMayAlsoLikeSwiperSettings = {
    slidesPerView: 'auto', // Allow multiple slides per view
    spaceBetween: 16, // Space between slides (adjust as needed)
    freeMode: true, // Enable free scrolling
    // If you want pagination, add: pagination: { clickable: true },
    // If you want navigation, add: navigation: true, modules: [Navigation],
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      setUploadError('Vui lòng chọn một file để tải lên.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadedGifUrl('');

    try {
      let folderName = "";
      if (selectedFile.type === 'image/gif') {
        folderName = "gifs";
      } else if (selectedFile.type.startsWith('image/')) {
        folderName = "images";
      } else {
        setUploadError('Định dạng file không được hỗ trợ. Vui lòng chọn GIF, JPG, hoặc PNG.');
        setUploading(false);
        return;
      }

      const response = await ImageService.uploadFile(selectedFile, folderName);
      setUploadedGifUrl(response.fileUrl);
      alert('Tải lên file thành công!');
    } catch (error) {
      console.error('Lỗi khi tải lên file:', error);
      setUploadError(error.message || 'Không thể tải lên file. Vui lòng thử lại.');
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="custom">
      {/* Filter Popup */}
      {isFilterPopupOpen && (
        <div className="filter-popup">
          <div className="filter-popup__overlay" onClick={toggleFilterPopup}></div>
          <div className="filter-popup__content">
            <div className="filter-popup__header">
              <h2>Bộ lọc Charm</h2>
              <button className="filter-popup__close" onClick={toggleFilterPopup}>×</button>
            </div>

            <div className="filter-popup__body">
              <div className="filter-group">
                <label htmlFor="tempCategory">Danh mục</label>
                <select
                  id="tempCategory"
                  name="category"
                  value={tempFilter.category}
                  onChange={handleTempFilterChange}
                >
                  <option value="">Tất cả</option>
                  {charmCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="tempColor">Màu sắc</label>
                <input
                  type="text"
                  id="tempColor"
                  name="color"
                  value={tempFilter.color}
                  onChange={handleTempFilterChange}
                  placeholder="Ví dụ: Vàng, Bạc"
                />
              </div>

              <div className="filter-group price-range">
                <label>Giá</label>
                <input
                  type="number"
                  name="minPrice"
                  value={tempFilter.minPrice}
                  onChange={handleTempFilterChange}
                  placeholder="Từ"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={tempFilter.maxPrice}
                  onChange={handleTempFilterChange}
                  placeholder="Đến"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="tempSortBy">Sắp xếp theo</label>
                <select
                  id="tempSortBy"
                  name="sortBy"
                  value={tempFilter.sortBy}
                  onChange={handleTempFilterChange}
                >
                  <option value="nameAsc">Tên (A-Z)</option>
                  <option value="nameDesc">Tên (Z-A)</option>
                  <option value="priceAsc">Giá (Thấp-Cao)</option>
                  <option value="priceDesc">Giá (Cao-Thấp)</option>
                </select>
              </div>
            </div>

            <div className="filter-popup__footer">
              <button className="btn-clear" onClick={handleClearFilters}>Xóa bộ lọc</button>
              <button className="btn-apply" onClick={handleApplyFilters}>Áp dụng</button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Section */}
      <div className="custom__banner">
        <img src="/images/bg_custom.png" alt="Custom Banner" /> {/* Placeholder image */}
        <div className="custom__banner-overlay">
          <h1>Custom</h1>
          <p>You pick it, we create it.</p>
        </div>
      </div>

      {/* Category/Content Section */}
      <section className="custom__content-section">
        <div className="container">
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                      <img src="/images/logo.svg" alt="Logo" className="custom__logo" /> 
            </div>{/* Logo */}
          <h3 className="custom__category">CATEGORY</h3>
          <h2 className="custom__qr-content-title">CUSTOM QR CONTENT</h2>
        </div>
      </section>

      {/* Radio/Image Section */}
      <section className="custom__radio-image-section">
        {/* GIF Upload Section - Now main content of radio-image-section */}
        <div className="container custom__gif-upload-content-wrapper"> {/* Add a wrapper for centering */} 
          <h2>Tải lên File Tùy chỉnh của bạn</h2>
          <div className="custom__upload-area">
            <input
              type="file"
              accept=".gif, .jpeg, .jpg, .png"
              onChange={handleFileChange}
              id="gifUploadInput"
              className="custom__upload-input"
            />
            <label htmlFor="gifUploadInput" className="custom__upload-label">
              {selectedFile ? selectedFile.name : 'Chọn file GIF/Ảnh...'}
            </label>
            <button
              onClick={handleUploadFile}
              disabled={!selectedFile || uploading}
              className="custom__upload-button"
            >
              {uploading ? 'Đang tải lên...' : 'Tải lên File'}
            </button>
          </div>
          {uploadError && <p className="custom__upload-error">{uploadError}</p>}
          {uploadedGifUrl && (
            <div className="custom__uploaded-gif-preview">
              <p>File đã tải lên:</p>
              <img src={uploadedGifUrl} alt="Uploaded File" />
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="custom__products-section">
        <div className="container">
          <div className="custom__filter-sort">
            <button className="custom__filter-sort-button" onClick={toggleFilterPopup}>FILTER & SORT</button>
          </div>
          
          {loadingCharms ? (
            <div className="custom__loading">Loading charms...</div>
          ) : errorCharms ? (
            <div className="custom__error">{errorCharms}</div>
          ) : (
            <div className="custom__products-grid">
              {charmProducts.length === 0 ? (
                <div className="custom__no-products">No charms available</div>
              ) : (
                charmProducts.map((product) => (
                  <Link 
                    to={`/charm/${product.id}`}
                    key={product.id}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="custom__product-card">
                      <div className="custom__product-image-container">
                        <img src={product.image} alt={product.charmName} className="custom__product-image" />
                        <button className="custom__add-button">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </button>
                      </div>
                      <div className="custom__product-info">
                        <div className="custom__product-name">{product.charmName}</div>
                        <div className="custom__product-price">{product.price.toLocaleString('vi-VN')}₫</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Load More and You May Also Like Section */}
      <section className="custom__you-may-also-like-section">
        <div className="container">
          <div className="custom__viewed-products-info">
            You've Viewed 48 of 52 Products
          </div>
          <div className="custom__load-more">
            <button className="custom__load-more-button">LOAD MORE</button>
          </div>

          <h2 className="custom__you-may-also-like-title">YOU MAY ALSO LIKE</h2>

          {/* Swiper for You May Also Like */}
          {loadingYouMayLike ? (
            <div>Loading recommended products...</div>
          ) : errorYouMayLike ? (
            <div style={{ color: 'red' }}>{errorYouMayLike}</div>
          ) : youMayAlsoLikeProducts.length === 0 ? (
            <div>No recommended products available.</div>
          ) : (
            <Swiper {...youMayAlsoLikeSwiperSettings}>
              {youMayAlsoLikeProducts.map((product) => (
                <SwiperSlide key={product.id} style={{ width: 260 }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <div className="related-product-item">
                      <div className="related-product-img-wrap">
                        <img src={product.image} alt={product.braceleteName} />
                        <button className="related-product-add-btn">+</button>
                      </div>
                      <div className="related-product-name">{product.braceleteName}</div>
                      <div className="related-product-price">{product.price.toLocaleString('vi-VN')}₫</div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Existing basic structure, keep if needed, or remove */}
          {/* <div className="container">
            <h1>Custom Page</h1>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Custom; 