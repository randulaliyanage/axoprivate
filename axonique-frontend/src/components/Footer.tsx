// Footer — displays brand policies from API and social links
import { useState, useEffect } from 'react';
import type { BrandProfile } from '../types';
import './Footer.css';

const API = ''+(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080')+'';

export default function Footer() {
  const [brand, setBrand] = useState<BrandProfile | null>(null);

  useEffect(() => {
    fetch(`${API}/api/brand`)
      .then(r => r.json())
      .then(d => setBrand(d.data || null))
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__logo">AXO</span>
          <p className="footer__tagline">Premium streetwear for the bold.</p>
          {brand?.mission && (
            <p className="footer__mission">{brand.mission}</p>
          )}
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Shop</h4>
          <ul>
            <li><a href="/catalog">All Products</a></li>
            <li><a href="/catalog/collection/ascension">Ascension</a></li>
            <li><a href="/catalog/collection/night-crawler">Night Crawler</a></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Help</h4>
          <ul>
            {brand?.policies ? (
              <li>
                <details>
                  <summary>Store Policies</summary>
                  <p className="footer__policies">{brand.policies}</p>
                </details>
              </li>
            ) : (
              <>
                <li><a href="mailto:support@axonique.store">Contact Us</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Returns</a></li>
              </>
            )}
          </ul>
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Operations</h4>
          <ul>
            <li><a href="/staff/signin">Staff Portal</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} AXO Nique. All rights reserved.</p>
      </div>
    </footer>
  );
}
