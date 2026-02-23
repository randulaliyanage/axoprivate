// SCRUM-17 — Product Detail Page UI
// Large image, name, price, description, size selection, add-to-cart

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="page">
        <div className="container" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)' }}>Product not found.</p>
          <button className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }} onClick={() => navigate('/catalog')}>
            ← Back to Catalog
          </button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setToast('Please select a size first');
      return;
    }
    addItem(product, selectedSize);
    setToast(`✓ ${product.name} added to cart`);
  };

  return (
    <main className="page">
      <div className="detail-page container">
        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          ← Back
        </button>

        <div className="detail-grid">
          {/* Product image */}
          <div className="detail-img" aria-hidden="true">
            {product.emoji}
          </div>

          {/* Product info */}
          <div className="detail-info">
            <div className="detail-category">{product.category.toUpperCase()}</div>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-price">Rs {product.price.toLocaleString()}</div>
            <p className="detail-desc">{product.desc}</p>

            {/* Size selector */}
            <div className="size-label">Select Size</div>
            <div className="size-grid" role="group" aria-label="Size selection">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' size-btn--selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  aria-label={`Size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Add to cart */}
            <button className="btn btn-primary btn-full" onClick={handleAddToCart}>
              Add to Cart →
            </button>

            {/* Secondary actions */}
            <div className="detail-actions">
              <button className="btn btn-outline btn-sm">♡ Wishlist</button>
              <button className="btn btn-outline btn-sm">⤢ Share</button>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </main>
  );
}
