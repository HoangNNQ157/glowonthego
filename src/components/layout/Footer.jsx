import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Divider */}
      <div className="footer__divider"></div>

      <div className="footer__content">
        <div className="footer__top">
          <div>
            {/* Email Subscription */}
            <div className="footer__subscribe">
              <div className="footer__subscribe-form-container">
                <div className="footer__subscribe-icon">
                  {/* Email icon SVG/component goes here */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="footer__subscribe-text">Get 10% Off Your First Order</div>
                <div className="footer__subscribe-form">
                  <input type="email" placeholder="Enter Your Email" className="footer__subscribe-input" />
                  <button className="footer__subscribe-button">
                    {/* Arrow icon SVG/component goes here */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* App Download */}
            <div className="footer__app-download">
              <div className="footer__app-title">DOWNLOAD OUR APP!</div>
              <div className="footer__app-links">
                <a href="#" className="footer__app-link">
                  <img src="/images/appstore.jpg" alt="Download on the App Store" />
                </a>
                <a href="#" className="footer__app-link">
                  <img src="/images/ggplay.png" alt="Get it on Google Play" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer__nav">
            <div className="footer__nav-column">
              <h3 className="footer__nav-title">ABOUT</h3>
              <ul className="footer__nav-list">
                <li><Link to="#" className="footer__nav-link">OUR STORY</Link></li>
                <li><Link to="#" className="footer__nav-link">CONNECT YOUR WORD</Link></li>
                <li><Link to="#" className="footer__nav-link">BRAND AMBASSADOR</Link></li>
                <li><Link to="#" className="footer__nav-link">OUR STORES</Link></li>
                <li><Link to="#" className="footer__nav-link">OUR BLOG</Link></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              <h3 className="footer__nav-title">INTERACT</h3>
              <ul className="footer__nav-list">
                <li><Link to="#" className="footer__nav-link">BRAND PARTNERSHIPS</Link></li>
                <li><Link to="#" className="footer__nav-link">WHOLESALE APPLICATION</Link></li>
                <li><Link to="#" className="footer__nav-link">FUNDRAISING</Link></li>
                <li><Link to="#" className="footer__nav-link">EVENTS</Link></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              <h3 className="footer__nav-title">HELP</h3>
              <ul className="footer__nav-list">
                <li><Link to="#" className="footer__nav-link">CONTACT US</Link></li>
                <li><Link to="#" className="footer__nav-link">RETURNS & WARRANTY</Link></li>
                <li><Link to="#" className="footer__nav-link">SIZE GUIDE</Link></li>
                <li><Link to="#" className="footer__nav-link">MY ACCOUNT</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <div className="footer__bottom-nav">
            <div className="footer__bottom-nav-1">
              <Link to="#" className="footer__bottom-link">Privacy Policy</Link>
              <Link to="#" className="footer__bottom-link">Terms & Conditions</Link>
              <Link to="#" className="footer__bottom-link">Accessibility</Link>
            </div>
            <div className="footer__bottom-nav-2"> 
              <Link to="#" className="footer__bottom-link footer__bottom-link--highlight">DISCOVER MORE</Link>
              <Link to="#" className="footer__bottom-link">Shop All Bracelets & Accessories</Link>
              <Link to="/custom" className="footer__bottom-link">Custom Bracelets</Link>
            </div>
            <div className="footer__copyright">
              © {new Date().getFullYear()} Glowontheflow
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 