import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { authService } from '../services/authService';
import type { BrandProfile } from '../types';
import './BrandProfilePage.css';

const API = 'http://localhost:8080';

const isValidImageUrl = (url: string) =>
  !url || /\.(png|jpg|jpeg|webp)(\?.*)?$/i.test(url);

export default function BrandProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [logoUrl, setLogoUrl] = useState('');
  const [heroBannerUrl, setHeroBannerUrl] = useState('');
  const [discountBannerText, setDiscountBannerText] = useState('');
  const [discountBannerActive, setDiscountBannerActive] = useState(false);
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [policies, setPolicies] = useState('');

  const headers = { ...authService.getAuthHeader(), 'Content-Type': 'application/json' };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(''), 4000);
  };

  useEffect(() => {
    fetch(`${API}/api/brand`)
      .then(r => r.json())
      .then((d: { data: BrandProfile }) => {
        const p = d.data;
        if (!p) return;
        setLogoUrl(p.logoUrl || '');
        setHeroBannerUrl(p.heroBannerUrl || '');
        setDiscountBannerText(p.discountBannerText || '');
        setDiscountBannerActive(p.discountBannerActive);
        setMission(p.mission || '');
        setVision(p.vision || '');
        setPolicies(p.policies || '');
      })
      .catch(() => showToast('Failed to load brand profile', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/brand`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ logoUrl, heroBannerUrl, discountBannerText, discountBannerActive, mission, vision, policies }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Brand profile updated — changes are now live');
      } else {
        showToast('Save failed', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        {toast && <div className={`admin-toast admin-toast--${toastType}`}>{toast}</div>}
        <div className="admin-content">
          <h1 className="admin-page-title">Brand Profile</h1>
          <p className="admin-page-subtitle">Manage your public brand settings, imagery and copy</p>

          {loading ? (
            <div className="skeleton" style={{ height: 400, borderRadius: 8 }} />
          ) : (
            <div className="bp-sections">
              {/* Visual Assets */}
              <section className="bp-section">
                <h2 className="bp-section-title">🖼️ Visual Assets</h2>
                <div className="bp-grid">
                  <div className="form-group">
                    <label>Logo URL</label>
                    <input
                      value={logoUrl}
                      onChange={e => setLogoUrl(e.target.value)}
                      placeholder="https://...logo.png"
                    />
                    {logoUrl && !isValidImageUrl(logoUrl) && (
                      <span className="bp-warning">⚠️ URL should end in .png, .jpg, .jpeg, or .webp</span>
                    )}
                    {logoUrl && isValidImageUrl(logoUrl) && (
                      <div className="bp-preview">
                        <img src={logoUrl} alt="Logo preview" onError={e => (e.currentTarget.style.display = 'none')} />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Hero Banner URL</label>
                    <input
                      value={heroBannerUrl}
                      onChange={e => setHeroBannerUrl(e.target.value)}
                      placeholder="https://...banner.jpg"
                    />
                    {heroBannerUrl && !isValidImageUrl(heroBannerUrl) && (
                      <span className="bp-warning">⚠️ URL should end in .png, .jpg, .jpeg, or .webp</span>
                    )}
                    {heroBannerUrl && isValidImageUrl(heroBannerUrl) && (
                      <div className="bp-preview bp-preview--banner">
                        <img src={heroBannerUrl} alt="Banner preview" onError={e => (e.currentTarget.style.display = 'none')} />
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Discount Banner */}
              <section className="bp-section">
                <h2 className="bp-section-title">📢 Discount Banner</h2>
                <div className="form-group">
                  <label>Banner Message</label>
                  <input
                    value={discountBannerText}
                    onChange={e => setDiscountBannerText(e.target.value)}
                    placeholder="🔥 Free shipping on orders above LKR 5,000"
                  />
                </div>
                <div className="bp-toggle-row">
                  <span>Banner Active</span>
                  <button
                    className={`bp-toggle ${discountBannerActive ? 'bp-toggle--on' : ''}`}
                    onClick={() => setDiscountBannerActive(!discountBannerActive)}
                    aria-label="Toggle discount banner"
                  >
                    <span className="bp-toggle-knob" />
                  </button>
                  <span className={discountBannerActive ? 'bp-active-label' : 'text-muted'}>
                    {discountBannerActive ? 'Live' : 'Hidden'}
                  </span>
                </div>
                {discountBannerText && discountBannerActive && (
                  <div className="bp-banner-preview">{discountBannerText}</div>
                )}
              </section>

              {/* Brand Copy */}
              <section className="bp-section">
                <h2 className="bp-section-title">✍️ Brand Copy</h2>
                <div className="form-group">
                  <label>Mission <span className="bp-counter">{mission.length}/500</span></label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={mission}
                    onChange={e => setMission(e.target.value)}
                    placeholder="Our mission..."
                  />
                </div>
                <div className="form-group">
                  <label>Vision <span className="bp-counter">{vision.length}/500</span></label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={vision}
                    onChange={e => setVision(e.target.value)}
                    placeholder="Our vision..."
                  />
                </div>
                <div className="form-group">
                  <label>Policies <span className="bp-counter">{policies.length}/2000</span></label>
                  <textarea
                    rows={5}
                    maxLength={2000}
                    value={policies}
                    onChange={e => setPolicies(e.target.value)}
                    placeholder="Return policy, shipping info..."
                  />
                </div>
              </section>

              <div className="bp-save-row">
                <button className="pm-btn pm-btn--primary" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : '💾 Save Brand Profile'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
