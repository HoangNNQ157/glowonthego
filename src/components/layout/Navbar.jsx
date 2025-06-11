import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const primaryNav = [
    { name: 'NEW & TRENDING', href: '/new-trending' },
    { name: 'CUSTOM', href: '/custom' },
    { name: 'CHARMS', href: '/charm' },
  ];

  const secondaryNav = [
    { name: 'THE BEAD BAR EXPERIENCE', href: '/experience' },
    { name: 'DISCOVER', href: '/discover' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header when at the top of the page
      if (currentScrollY <= 0) {
        setIsHeaderVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Only hide header when scrolling down past 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isHeaderVisible ? 'header--visible' : 'header--hidden'}`}>
      <div className="header__container">
        <div className="header__content">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="header__menu-btn"
            aria-label="Toggle menu"
          >
            <span className="header__menu-icon"></span>
          </button>

          {/* Primary Navigation */}
          <nav className="header__nav header__nav--primary">
            <ul className="header__nav-list">
              {primaryNav.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="header__nav-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo */}
          <Link to="/" className="header__logo">
            <img src="/images/logo.svg" alt="Logo" />
          </Link>

          {/* Secondary Navigation */}
          <nav className="header__nav header__nav--secondary">
            <ul className="header__nav-list">
              {secondaryNav.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="header__nav-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="header__icons">
              <Link to="/search" className="header__icon">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4176 16.8333C13.9615 16.8333 16.8343 13.9605 16.8343 10.4167C16.8343 6.87284 13.9615 4 10.4176 4C6.87382 4 4.00098 6.87284 4.00098 10.4167C4.00098 13.9605 6.87382 16.8333 10.4176 16.8333Z" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M16.584 17.75L20.0007 21.1667" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
              </Link>
              <Link to="/account" className="header__icon">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.83398 21.2498C3.33398 19.7498 3.91732 17.8332 6.75065 15.9165" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M14.8343 11.5C15.6676 10.25 15.751 9.58333 15.751 8.75C15.751 6.08333 13.5843 4 11.001 4C8.33431 4 6.25098 6.16667 6.25098 8.75C6.25098 11.0833 7.91764 12.8333 10.1676 13.5C17.3343 15.5833 18.4176 19.6667 18.9176 21.25" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
              </Link>
              <Link to="/cart" className="header__icon">
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.33301 6.33317C5.33301 3.24984 7.33301 1.9165 9.16634 1.9165C10.9997 1.9165 12.9997 3.33317 12.9997 6.33317" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M0.833008 9.9165H17.1663" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M0.832935 10C0.749602 10.1667 1.08294 14.5 2.83294 16.9167C4.7496 19.5833 7.83294 19.1667 9.08294 19.1667" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M17.166 10C17.2493 10.1667 16.916 14.5 15.166 16.9167C13.2493 19.5833 10.166 19.1667 8.91602 19.1667" stroke="black" strokeWidth="1.41667" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 