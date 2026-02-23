// Shared ProductCard component — used in SCRUM-14 (Home) and SCRUM-16 (Catalog)

import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onToast: (msg: string) => void;
}

export default function ProductCard({ product, onToast }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, product.sizes[0]);
    onToast(`✓ ${product.name} added to cart`);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-card" onClick={handleViewDetails} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleViewDetails()}
      aria-label={`View details for ${product.name}`}
    >
      <div className="product-card__img">
        {product.badge && (
          <div className="product-card__badge" aria-label={`Badge: ${product.badge}`}>
            {product.badge}
          </div>
        )}
        <span className="product-card__emoji" aria-hidden="true">
          {product.emoji}
        </span>
        <div className="product-card__overlay" aria-hidden="true" />
      </div>

      <div className="product-card__info">
        <div className="product-card__category">{product.category}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__footer">
          <div className="product-card__price">Rs {product.price.toLocaleString()}</div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleQuickAdd}
            aria-label={`Quick add ${product.name} to cart`}
          >
            Add →
          </button>
        </div>
      </div>
    </div>
  );
}
