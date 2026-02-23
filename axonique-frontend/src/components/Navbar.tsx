// SCRUM-15 — Navigation Bar
// Global navigation menu visible on all pages

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/catalog' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="navbar" aria-label="Main navigation">
        {/* Logo */}
        <button className="navbar__logo" onClick={() => handleNav('/')} aria-label="AXO — Go to homepage">
          AXO
        </button>

        {/* Desktop Links */}
        <ul className="navbar__links" role="list">
          {links.map((link) => (
            <li key={link.path}>
              <button
                className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                onClick={() => handleNav(link.path)}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button className="navbar__signin" onClick={() => alert('Sign in coming soon')}>
            Sign In
          </button>

          <button
            className="navbar__cart"
            onClick={() => handleNav('/cart')}
            aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          >
            🛒 Cart
            <span className="navbar__cart-badge" aria-hidden="true">
              {totalItems}
            </span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <button
            key={link.path}
            className={`navbar__mobile-link${isActive(link.path) ? ' navbar__mobile-link--active' : ''}`}
            onClick={() => handleNav(link.path)}
          >
            {link.label}
          </button>
        ))}
        <button className="navbar__mobile-link" onClick={() => handleNav('/cart')}>
          Cart ({totalItems})
        </button>
      </div>
    </>
  );
}
