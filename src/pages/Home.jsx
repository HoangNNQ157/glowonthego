import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import services
import CharmService from '../services/charm.service';
import ProductService from '../services/product.service';

// Remove unused imports
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const slogans = [
  { icon: "/images/Star.png", text: "Courage" },
  { icon: "/images/Star.png", text: "Stay Positive" },
  { icon: "/images/Star.png", text: "Keep Going" },
  { icon: "/images/Star.png", text: "See The Good" },
  { icon: "/images/Star.png", text: "Trust" },
];

const Home = () => {
  // Remove unused settings
  // const sloganSliderSettings = { /* ... */ };

  const [charmBestSellers, setCharmBestSellers] = useState([]);
  const [shopTheLookProducts, setShopTheLookProducts] = useState([]);
  const [loadingCharms, setLoadingCharms] = useState(true);
  const [errorCharms, setErrorCharms] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchCharmBestSellers = async () => {
      try {
        setLoadingCharms(true);
        setErrorCharms(null);
        const response = await CharmService.getAllCharms();
        console.log("Fetched all charms for best sellers:", response.data);
        setCharmBestSellers(response.data || []);
      } catch (error) {
        console.error("Error fetching charms:", error);
        setErrorCharms(error.message || 'Failed to fetch charms');
        setCharmBestSellers([]);
      } finally {
        setLoadingCharms(false);
      }
    };

    fetchCharmBestSellers();
  }, []);

  useEffect(() => {
    const fetchShopTheLookProducts = async () => {
      try {
        setLoadingProducts(true);
        setErrorProducts(null);
        const response = await CharmService.getAllCharms();
        console.log("Fetched all charms for shop the look:", response.data);

        // Take the first 3 charms
        const firstThreeItems = (response.data || []).slice(0, 3);
        setShopTheLookProducts(firstThreeItems);

      } catch (error) {
        console.error("Error fetching charms for shop the look:", error);
        setErrorProducts(error.message || 'Failed to fetch items for shop the look');
        setShopTheLookProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchShopTheLookProducts();
  }, []);

  // Duplicate slogans for continuous scroll effect
  const duplicatedSlogans = [...slogans, ...slogans, ...slogans];

  return (
    <div className="home">
      {/* Banner */}
      <div className="home__banner">
        <img src="/images/banner__home.png" alt="Banner" />
      </div>

      {/* Best Sellers */}
      <section className="home__best-sellers">
        <div className="flex-grow container mx-auto px-4 py-8">
        <h2 className="home__section-title">Best Sellers</h2>
        {loadingCharms ? (
          <div>Loading charms...</div>
        ) : errorCharms ? (
          <div style={{ color: 'red' }}>{errorCharms}</div>
        ) : charmBestSellers.length === 0 ? (
          <div>No charms available for best sellers.</div>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {charmBestSellers.map((item) => (
              <SwiperSlide key={item.id} className="best-seller-card-slide">
                <Link to={`/charm/${item.id}`} style={{ textDecoration: 'none' }}>
                  <div className={`best-seller-card`}>
                    <div className="best-seller-card__image-container">
                      <img src={item.image} alt={item.charmName} />
                      <button className="best-seller-card__add-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="best-seller-card__info">
                      <div className="best-seller-card__name">{item.charmName}</div>
                      <div className="best-seller-card__price">{item.price.toLocaleString('vi-VN')}₫</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        </div>
      </section>

      {/* Slogan Icons */}
      <div className="home__slogan-row">
        {duplicatedSlogans.map((s, idx) => (
          <div className="home__slogan-item" key={idx}>
            <img src={s.icon} alt={s.text} />
            <span>{s.text}</span>
          </div>
        ))}
      </div>

      {/* Shop The Look */}
      <section className="home__shop-look">
        <div className="home__shop-look-img">
          <img src="/images/bg.png" alt="Shop The Look" />
          <button className="home__shop-now-btn">SHOP NOW</button>
        </div>
        <div className="home__shop-look-list">
          <h3>Shop The Look</h3>
          {loadingProducts ? (
            <div>Loading items...</div>
          ) : errorProducts ? (
            <div style={{ color: 'red' }}>{errorProducts}</div>
          ) : shopTheLookProducts.length === 0 ? (
            <div>No items available for shop the look.</div>
          ) : (
            shopTheLookProducts.map((item) => (
              <Link to={`/charm/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                <div className="shop-look-card">
                  <img src={item.image} alt={item.charmName} className="shop-look-card__img" />
                  <div>
                    <div className="shop-look-card__name">{item.charmName}</div>
                    <div className="shop-look-card__price">{item.price.toLocaleString('vi-VN')}₫</div>
                    <button className="shop-look-card__add">ADD TO CART</button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Your Story Section */}
      <section className="home__your-story">
        <div className="container home__your-story-content">
          <div className="home__your-story-image">
            {/* Image goes here */}
            <img src="/images/bg_pink.png" alt="Your Story" />
          </div>
          <div className="home__your-story-text">
            <h2 className="home__your-story-title">Your Bracelet, Your Story, Your Moment.</h2>
            <p className="home__your-story-description">A message can be a reminder, encouragement, or simply a pleasant surprise for customer.</p>
            <button className="home__your-story-button">LEARN MORE ABOUT US</button>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="home__categories">
        <div className="home__categories-carousel">
          <Link to="/new-trending" className="home__categories-card">
            <img src="/images/bg__1.png" alt="New & Trending" className="home__categories-image" />
            <div className="home__categories-info">
              <h3 className="home__categories-title">New & Trending</h3>
              <button className="home__categories-button">SHOP NOW</button>
            </div>
          </Link>
          <Link to="/custom#custom__radio-image-section" className="home__categories-card">
            <img src="/images/bg__2.png" alt="Create Your Own" className="home__categories-image" />
            <div className="home__categories-info">
              <h3 className="home__categories-title">Create Your Own</h3>
              <button className="home__categories-button">SHOP NOW</button>
            </div>
          </Link>
          <Link to="/charm" className="home__categories-card">
            <img src="/images/bg__3.png" alt="Charms" className="home__categories-image" />
            <div className="home__categories-info">
              <h3 className="home__categories-title">Charms</h3>
              <button className="home__categories-button">SHOP NOW</button>
            </div>
          </Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="home__how-it-works">
        <div className="container home__how-it-works-container">
          <div className="home__how-it-works-background-left">
            <h2 className="home__how-it-works-title">How it Works</h2>
          </div>
          <div className="home__how-it-works-content-right">
            <div className="home__how-it-works-cards">
              {/* Wear Card */}
              <div className="home__how-it-works-card home__how-it-works-card--wear">
                <div className="home__how-it-works-card-icon">
                  <img src="/images/anh_1.png" alt="Wear Icon" />
                </div>
                <h4 className="home__how-it-works-card-title">Wear</h4>
                <p className="home__how-it-works-card-description">Wearing a personalized bracelet adds a unique touch to your style and self-expression.</p>
              </div>
              {/* Connect Card */}
              <div className="home__how-it-works-card home__how-it-works-card--connect">
                <div className="home__how-it-works-card-icon">
                  <img src="/images/anh_2.png" alt="Connect Icon" />
                </div>
                <h4 className="home__how-it-works-card-title">Connect</h4>
                <p className="home__how-it-works-card-description">A QR code bracelet helps you connect with memories, loved ones, and communities.</p>
              </div>
              {/* Live Card */}
              <div className="home__how-it-works-card home__how-it-works-card--live">
                <div className="home__how-it-works-card-icon">
                  <img src="/images/anh_4.png" alt="Live Icon" />
                </div>
                <h4 className="home__how-it-works-card-title">Live</h4>
                <p className="home__how-it-works-card-description">Live every moment with a bracelet that tells your story.</p>
              </div>
              {/* Give Card */}
              <div className="home__how-it-works-card home__how-it-works-card--give">
                <div className="home__how-it-works-card-icon">
                  <img src="/images/anh_3.png" alt="Give Icon" />
                </div>
                <h4 className="home__how-it-works-card-title">Give</h4>
                <p className="home__how-it-works-card-description">Giving a personalized bracelet is a thoughtful way to celebrate special moments.</p>
              </div>
            </div>
            <button className="home__how-it-works-learn-more-button">Learn More</button>
          </div>
        </div>
      </section>

      {/* A Little About Our Products Section */}
      <section className="home__about-products">
        <div className="container">
          <h2 className="home__about-products-title">A Little About Our Products</h2>
          <div className="home__about-products-content">
            <div className="home__about-products-item">
              <div className="home__about-products-image">
                {/* Image 1 */}
                <img src="/images/product__1.png" alt="Built on Kindness" />
              </div>
              <div className="home__about-products-text">
                <h3 className="home__about-products-item-title">Built on Kindness</h3>
                <p className="home__about-products-item-description">Our bracelets are made to be worn, loved and shared—bringing self-love and kindness to each person they touch.</p>
              </div>
            </div>
            <div className="home__about-products-item">
              <div className="home__about-products-image">
                {/* Image 2 */}
                <img src="/images/product__2.png" alt="Lifetime Warranty" />
              </div>
              <div className="home__about-products-text">
                <h3 className="home__about-products-item-title">Lifetime Warranty</h3>
                <p className="home__about-products-item-description">Glowonthego offers a Limited Lifetime Warranty on our products. Simply ensure your bracelet is connected and send us a picture of the damaged item.</p>
              </div>
            </div>
          </div>
          {/* Horizontal Divider */}
          <div className="home__about-products-divider"></div>
          {/* Navigation Arrows */}
          <div className="home__about-products-navigation">
            <div className="home__about-products-arrow home__about-products-arrow--prev">{'<' /* Placeholder for icon */}</div>
            <div className="home__about-products-arrow home__about-products-arrow--next">{'>' /* Placeholder for icon */}</div>
          </div>
        </div>
      </section>

      {/* Visit Store Section */}
      <section className="home__visit-store">
        <div className="home__visit-store-background">
          {/* Background image will be set in CSS */}
        </div>
        <div className="home__visit-store-content">
          <div className="home__visit-store-card">
            <h3 className="home__visit-store-title">Visit a Glow on<br />the flow<br />store near you!</h3>
            <p className="home__visit-store-description">Get to know where our stores are located!</p>
            <button className="home__visit-store-button">OUR STORES</button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="home__instagram">
        <div className="container">
          <div className="home__instagram-header">
            <h2 className="home__instagram-title">@Glowontheflow</h2>
            <p className="home__instagram-subtitle">Shop our Instal!</p>
          </div>
          <div className="home__instagram-photos">
            {/* Placeholder images */}
            <img src="/images/insta_1.png" alt="Instagram Photo 1" className="home__instagram-photo" />
            <img src="/images/insta_2.png" alt="Instagram Photo 2" className="home__instagram-photo" />
            <img src="/images/insta_3.png" alt="Instagram Photo 3" className="home__instagram-photo" />
            <img src="/images/insta_4.png" alt="Instagram Photo 4" className="home__instagram-photo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 