import { useState } from 'react'
import '../styles/sahulat.css'
import '../styles/animations.css'
import ConfettiEffect from './ConfettiEffect.jsx'
import LuckyWheel from './LuckyWheel.jsx'
import { products } from '../data/products.js'

export default function SahulatApp({
  view = 'browse',       // browse | cart | success
  cartItems = [],
  voucherApplied = false,
  voucherCode = '',
  discount = 0,
  loyaltyPoints = 2450,
  pendingPoints = 0,
  ctaPulsing = false,
  showLuckyWheel = false,
  orderDetails = null,
  showAbandoned = false,
  showTimeSkip = false,
  onAddItem,
}) {
  const [localQtys, setLocalQtys] = useState({})

  const addToLocal = (id) => {
    setLocalQtys(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }
  const removeFromLocal = (id) => {
    setLocalQtys(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }))
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const itemCount = cartItems.length

  if (view === 'success' && orderDetails) {
    return (
      <div className="sahulat-container" style={{ position: 'relative' }}>
        <ConfettiEffect active={true} />
        <div className="sah-header">
          <div className="sah-header-title">
            <h1>Sahulat | ساہولت</h1>
          </div>
        </div>
        <div className="sah-success-screen">
          <div className="sah-success-icon checkmark-pop">✅</div>
          <div className="sah-success-title">Order Confirmed! 🎉</div>
          <div className="sah-success-order">#{orderDetails.orderNumber}</div>
          <div className="sah-success-detail">
            📅 {orderDetails.delivery}<br/>
            🚛 Via LTAB Distributor Hub
          </div>
          <div className="sah-success-points">
            <strong>+{orderDetails.pointsEarned}</strong>
            loyalty points earned!<br/>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>Total: {orderDetails.totalPoints} pts</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sahulat-container" style={{ position: 'relative' }}>
      {showTimeSkip && (
        <div className="sah-time-skip fade-in">
          <div className="sah-time-skip-card">
            <div className="sah-time-skip-icon clock-spin">⏰</div>
            <div className="sah-time-skip-label">30 minutes later...</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sah-header">
        <button className="sah-back-btn">←</button>
        <div className="sah-header-title">
          <h1>Sahulat | ساہولت</h1>
        </div>
        <button className="sah-cart-icon">
          🛒
          {itemCount > 0 && <span className="sah-cart-badge">{itemCount}</span>}
        </button>
      </div>

      {/* Loyalty bar */}
      <div className="sah-loyalty-bar">
        <div className="sah-loyalty-left">
          <span>⭐</span>
          <span>
            <span className="sah-loyalty-points">{loyaltyPoints.toLocaleString()} pts</span>
            {pendingPoints > 0 && (
              <span className="sah-loyalty-pending"> (+{pendingPoints} pending)</span>
            )}
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#8696A0' }}>Sahulat Rewards</span>
      </div>

      <div className="sah-content">
        {/* Cart items if present */}
        {cartItems.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div className="sah-section-title">Your Cart</div>
            {cartItems.map((item, i) => (
              <div key={i} className="sah-cart-item message-enter">
                <div className="sah-cart-item-emoji">
                  {item.name.includes("Lay's") ? '🟡' : item.name.includes('Kurkure') ? '🧡' : item.name.includes('Pepsi') ? '🥤' : item.name.includes('7UP') ? '💚' : item.name.includes('Mountain Dew') ? '🌿' : item.name.includes('Aquafina') ? '💧' : '📦'}
                </div>
                <div className="sah-cart-item-info">
                  <div className="sah-cart-item-name">{item.name}</div>
                  <div className="sah-cart-item-price">PKR {item.price.toLocaleString()} × {item.qty}</div>
                </div>
                <div className="sah-cart-item-qty">
                  <span>×{item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Voucher section */}
        {cartItems.length > 0 && (
          <div className="sah-voucher-section">
            <div className="sah-voucher-label">🏷️ Voucher Code</div>
            <div className="sah-voucher-row">
              <input
                className={`sah-voucher-input ${voucherApplied ? 'applied' : ''}`}
                value={voucherCode || ''}
                readOnly
                placeholder="Enter code..."
              />
              <button className={`sah-voucher-btn ${voucherApplied ? 'applied' : ''}`}>
                {voucherApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>
            {voucherApplied && (
              <div className="sah-voucher-success voucher-success">
                🎉 10% off! You save PKR {discount.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* Lucky Wheel */}
        {showLuckyWheel && (
          <div className="sah-lucky-section fade-in">
            <div className="sah-lucky-title">🎰 Lucky Draw!</div>
            <div className="sah-lucky-desc">Complete your order to spin!</div>
            <LuckyWheel />
          </div>
        )}

        {/* Order summary */}
        {cartItems.length > 0 && (
          <div className="sah-order-summary">
            <div className="sah-section-title">Order Summary</div>
            <div className="sah-summary-row">
              <span className="sah-summary-label">Subtotal</span>
              <span className="sah-summary-value">PKR {cartTotal.toLocaleString()}</span>
            </div>
            <div className="sah-summary-row">
              <span className="sah-summary-label">Delivery</span>
              <span className="sah-summary-value">PKR 150</span>
            </div>
            {voucherApplied && (
              <div className="sah-summary-row">
                <span className="sah-summary-label">Discount (10%)</span>
                <span className="sah-summary-value sah-summary-discount">-PKR {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="sah-summary-divider" />
            <div className="sah-summary-total">
              <span className="sah-summary-total-label">Total</span>
              <span className="sah-summary-total-value">
                PKR {(cartTotal + 150 - (voucherApplied ? discount : 0)).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Product grid (browse mode) */}
        {view === 'browse' && (
          <>
            <div className="sah-section-title">All Products</div>
            <div className="sah-product-grid">
              {products.map((p) => {
                const qty = localQtys[p.id] || 0
                return (
                  <div key={p.id} className="sah-product-card">
                    <div
                      className="sah-product-image"
                      style={{ background: `${p.color}22` }}
                    >
                      <span style={{ fontSize: '32px' }}>{p.emoji}</span>
                    </div>
                    <div className="sah-product-info">
                      <div className="sah-product-name">{p.name}</div>
                      <div className="sah-product-sku">{p.sku}</div>
                      <div className="sah-product-price">PKR {p.pricePerUnit.toLocaleString()}</div>
                      <div className="sah-qty-controls">
                        <button
                          className="sah-qty-btn"
                          onClick={() => removeFromLocal(p.id)}
                          disabled={qty === 0}
                        >−</button>
                        <span className="sah-qty-value">{qty}</span>
                        <button
                          className="sah-qty-btn add"
                          onClick={() => addToLocal(p.id)}
                        >+</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Abandoned indicator */}
      {showAbandoned && (
        <div className="sah-abandon-indicator fade-in">
          <div className="sah-abandon-label">⚠️ User left the app</div>
        </div>
      )}

      {/* Cart bar */}
      <div className="sah-cart-bar">
        <div className="sah-cart-bar-info">
          <div className="sah-cart-bar-count">
            {cartItems.length > 0 ? `${itemCount} items` : 'No items yet'}
          </div>
          <div className="sah-cart-bar-total">
            PKR {cartTotal.toLocaleString()}
          </div>
        </div>
        <button className={`sah-complete-btn ${ctaPulsing ? 'pulsing' : ''}`}>
          {ctaPulsing ? '→ Complete Order' : 'Complete Order'}
        </button>
      </div>
    </div>
  )
}
