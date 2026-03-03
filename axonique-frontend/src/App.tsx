// App.tsx — Route configuration mapping branches to pages
// SCRUM-14: /          → HomePage
// SCRUM-15: Navbar     → all pages
// SCRUM-16: /catalog   → CatalogPage
// SCRUM-17: /product/:id → ProductDetailPage
// SCRUM-18: /cart      → CartPage
// SCRUM-19: Global styles applied throughout

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* SCRUM-15: Navbar is mounted on every page */}
        <Navbar />

        <Routes>
          {/* SCRUM-14 */}
          <Route path="/" element={<HomePage />} />

          {/* SCRUM-16 */}
          <Route path="/catalog" element={<CatalogPage />} />

          {/* SCRUM-17 */}
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* SCRUM-18 */}
          <Route path="/cart" element={<CartPage />} />

          {/* Extra pages */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
