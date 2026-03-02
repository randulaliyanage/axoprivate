import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { items } = useWishlist();

  return (
    <main className="page">
      <section>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Saved Items</div>
            <h1 className="section-title">Wishlist</h1>
          </div>

          {items.length > 0 ? (
            <div className="product-grid" role="list" aria-label="Wishlist items">
              {items.map((p) => (
                <div key={p.id} role="listitem">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="catalog-empty" aria-live="polite">
              <p>Your wishlist is empty.</p>
              <button className="btn btn-primary" onClick={() => navigate('/catalog')}>
                Browse Products →
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
