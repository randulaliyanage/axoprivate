// App.tsx — Route configuration mapping branches to pages
// SCRUM-14: /          → HomePage
// SCRUM-15: Navbar     → all pages
// SCRUM-16: /catalog   → CatalogPage
// SCRUM-17: /product/:id → ProductDetailPage
// SCRUM-18: /cart      → CartPage
// SCRUM-19: Global styles applied throughout

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <Navbar />

          <Routes>
            
            <Route path="/" element={<HomePage />} />

            
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/collection/:collectionId" element={<CatalogPage />} />

            
            <Route path="/product/:id" element={<ProductDetailPage />} />

            
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping" element={<ShippingPolicyPage />} />
            <Route path="/refund" element={<RefundPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>

          <Footer />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}
