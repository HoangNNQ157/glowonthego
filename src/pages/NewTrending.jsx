import './NewTrending.scss';
import { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import ProductService from '../services/product.service';
import CharmService from '../services/charm.service';
import CategoryService from '../services/category.service';

const NewTrending = () => {
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [youMayAlsoLikeCharms, setYouMayAlsoLikeCharms] = useState([]);
  const [loadingYouMayLike, setLoadingYouMayLike] = useState(true);
  const [errorYouMayLike, setErrorYouMayLike] = useState(null);

  const [categories, setCategories] = useState([]);
  const [tempFilter, setTempFilter] = useState({
    sortBy: 'nameAsc',
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
  });
  const [filterSortBy, setFilterSortBy] = useState('nameAsc');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);
      const searchParams = {
        sortBy: filterSortBy,
        categoryId: filterCategory || undefined,
        color: filterColor || undefined,
        minPrice: filterMinPrice ? parseFloat(filterMinPrice) : undefined,
        maxPrice: filterMaxPrice ? parseFloat(filterMaxPrice) : undefined,
      };
      const response = await ProductService.searchProducts(searchParams);
      console.log('API response (main products):', response);
      setProducts(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorProducts(error.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, [filterSortBy, filterCategory, filterColor, filterMinPrice, filterMaxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchCharmCategories = async () => {
      try {
        const response = await CategoryService.getAllCharmCategories();
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };
    fetchCharmCategories();
  }, []);

  useEffect(() => {
    const fetchYouMayAlsoLikeCharms = async () => {
      try {
        setLoadingYouMayLike(true);
        setErrorYouMayLike(null);
        const response = await CharmService.getAllCharms();
        console.log("Fetched all charms for You May Also Like:", response.data);
        setYouMayAlsoLikeCharms(response.data || []);
      } catch (error) {
        console.error("Error fetching You May Also Like charms:", error);
        setErrorYouMayLike(error.message || 'Failed to fetch recommended charms');
        setYouMayAlsoLikeCharms([]);
      } finally {
        setLoadingYouMayLike(false);
      }
    };

    fetchYouMayAlsoLikeCharms();
  }, []);

  const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
      <span style={{ color: '#000', fontSize: '1rem' }}>
        {'★'.repeat(rating)}{'☆'.repeat(totalStars - rating)}
      </span>
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setFilterSortBy(tempFilter.sortBy);
    setFilterCategory(tempFilter.category);
    setFilterColor(tempFilter.color);
    setFilterMinPrice(tempFilter.minPrice);
    setFilterMaxPrice(tempFilter.maxPrice);
    setIsFilterPopupOpen(false);
  };

  const handleClearFilters = () => {
    setTempFilter({
      sortBy: 'nameAsc',
      category: '',
      color: '',
      minPrice: '',
      maxPrice: '',
    });
    setFilterSortBy('nameAsc');
    setFilterCategory('');
    setFilterColor('');
    setFilterMinPrice('');
    setFilterMaxPrice('');
    setIsFilterPopupOpen(false);
  };

  const toggleFilterPopup = () => {
    if (!isFilterPopupOpen) {
      // When opening, initialize tempFilter with current applied filters
      setTempFilter({
        sortBy: filterSortBy,
        category: filterCategory,
        color: filterColor,
        minPrice: filterMinPrice,
        maxPrice: filterMaxPrice,
      });
    }
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  return (
    <div className="new-trending">
      {isFilterPopupOpen && (
        <div className="filter-popup">
          <div className="filter-popup__overlay" onClick={toggleFilterPopup}></div>
          <div className="filter-popup__content">
            <div className="filter-popup__header">
              <h2>Bộ lọc sản phẩm</h2>
              <button className="filter-popup__close" onClick={toggleFilterPopup}>×</button>
            </div>

            <div className="filter-popup__body">
              <div className="filter-group">
                <label htmlFor="sortBy">Sắp xếp theo</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={tempFilter.sortBy}
                  onChange={handleFilterChange}
                >
                  <option value="nameAsc">Tên (A-Z)</option>
                  <option value="nameDesc">Tên (Z-A)</option>
                  <option value="priceAsc">Giá (Thấp-Cao)</option>
                  <option value="priceDesc">Giá (Cao-Thấp)</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="category">Danh mục</label>
                <select
                  id="category"
                  name="category"
                  value={tempFilter.category}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="color">Màu sắc</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={tempFilter.color}
                  onChange={handleFilterChange}
                  placeholder="Ví dụ: Vàng, Bạc"
                />
              </div>

              <div className="filter-group price-range">
                <label>Giá</label>
                <input
                  type="number"
                  name="minPrice"
                  value={tempFilter.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Từ"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={tempFilter.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Đến"
                />
              </div>
            </div>
            
            <div className="filter-popup__footer">
              <button className="btn-clear" onClick={handleClearFilters}>Xóa bộ lọc</button>
              <button className="btn-apply" onClick={handleApplyFilters}>Áp dụng</button>
            </div>
          </div>
        </div>
      )}

      <section className="new-trending__header-section">
        <div className="container">
          <h1 className="new-trending__main-title">SHOP ALL / NEW & TRENDING</h1>
          <div className="new-trending__content-row">
            <div className="new-trending__header-left">
              <img src="/images/newtrending_header.png" alt="Shop All" className="new-trending__header-image" />
              <div className="new-trending__header-text-content">
                <p>We're always dreaming up new ways to <a href="#">expand your self-love vocabulary</a>. Check out the latest "self-love" affirmations to add the finishing touch to your style and <a href="#">inspire others</a> every day.</p>
              </div>
            </div>
            <div className="new-trending__header-right">
              <button className="new-trending__filter-btn" onClick={toggleFilterPopup}>FILTER & SORT</button>
            </div>
          </div>
        </div>
      </section>

      <section className="new-trending__products-section">
        <div className="container">
          {loadingProducts ? (
            <div className="new-trending__loading">Đang tải sản phẩm...</div>
          ) : errorProducts ? (
            <div className="new-trending__error">{errorProducts}</div>
          ) : (
            <div className="new-trending__product-grid">
              {products.length === 0 ? (
                <div className="new-trending__no-products">Không tìm thấy sản phẩm nào.</div>
              ) : (
                products.map((product) => (
                  <Link 
                    to={`/product/${product.id}`}
                    key={product.id}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="new-trending__product-item">
                      <span className="new-trending__product-badge">NEW</span>
                      <div className="new-trending__product-image-container">
                        <img src={product.image} alt={product.braceleteName} />
                        <button className="new-trending__product-item__add-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </button>
                      </div>
                      <div className="new-trending__product-item-name">{product.braceleteName}</div>
                      <div className="new-trending__product-item-price">{product.price.toLocaleString('vi-VN')}₫</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <section className="new-trending__loadmore-block">
        <div className="container">
          {/* <div className="new-trending__viewed-info">You've Viewed 48 of 52 Products</div> */}
          <button className="new-trending__loadmore-btn">LOAD MORE</button>
        </div>
      </section>

      <section className="new-trending__you-may-also-like">
        <div className="container">
          <h2 className="new-trending__you-may-also-like-title">YOU MAY ALSO LIKE</h2>
          {loadingYouMayLike ? (
            <div>Đang tải sản phẩm gợi ý...</div>
          ) : errorYouMayLike ? (
            <div style={{ color: 'red' }}>{errorYouMayLike}</div>
          ) : youMayAlsoLikeCharms.length === 0 ? (
            <div>Không có sản phẩm gợi ý nào.</div>
          ) : (
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={16}
              freeMode={true}
              className="mySwiper"
            >
              {youMayAlsoLikeCharms.map((charm) => (
                <SwiperSlide key={charm.id} style={{ width: 260 }}>
                  <Link to={`/charm/${charm.id}`} style={{ textDecoration: 'none' }}>
                    <div className="new-trending__you-may-also-like-item">
                      <div className="new-trending__product-image-container">
                        <img src={charm.image} alt={charm.charmName} />
                        <button className="new-trending__product-item__add-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </button>
                      </div>
                      <h3>{charm.charmName}</h3>
                      <p>{charm.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewTrending;