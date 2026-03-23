import '../styles/animations.css'

const LOCK_NOTIF_TEXT = {
  en: "Hey! 👋 You left 3 items worth PKR 10,080 in your cart. Complete now and get FREE delivery! 🚚",
  ur: "ہیلو! 👋 آپ کی ٹوکری میں PKR 10,080 کے 3 آئٹمز ہیں۔ ابھی مکمل کریں اور مفت ڈیلیوری پائیں! 🚚",
}

const SWIPE_HINT = { en: '⬆ Swipe to open', ur: '⬆ کھولنے کے لیے سوائپ کریں' }

export default function LockScreen({ showNotification = false, showTimeSkip = false, lang = 'en' }) {
  return (
    <div style={{
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(160deg, #0d1b2a 0%, #1a2e4a 45%, #0a1628 100%)',
      borderRadius: '0 0 40px 40px',
      overflow: 'hidden',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      userSelect: 'none',
    }}>
      {/* Ambient glow layers */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 25%, rgba(100, 180, 255, 0.07) 0%, transparent 55%), radial-gradient(ellipse at 70% 75%, rgba(124, 58, 237, 0.09) 0%, transparent 55%)',
      }} />

      {/* Clock */}
      <div style={{ marginTop: '64px', textAlign: 'center', zIndex: 1 }}>
        <div style={{
          fontSize: '68px',
          fontWeight: 200,
          letterSpacing: '-2px',
          color: 'white',
          textShadow: '0 2px 24px rgba(255,255,255,0.15)',
          lineHeight: 1,
        }}>
          9:41
        </div>
        <div style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.75)',
          marginTop: '6px',
          fontWeight: 400,
        }}>
          {lang === 'ur' ? 'پیر، 23 مارچ' : 'Monday, March 23'}
        </div>
      </div>

      {/* Lock icon */}
      <div style={{ fontSize: '22px', marginTop: '20px', opacity: 0.5, zIndex: 1 }}>🔒</div>

      {/* Notification card */}
      {showNotification && (
        <div className="lock-notif-enter" style={{
          position: 'absolute',
          top: '52%',
          left: '14px',
          right: '14px',
          transform: 'translateY(-50%)',
          background: 'rgba(40, 55, 75, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '12px 14px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          zIndex: 2,
        }}>
          {/* WhatsApp icon */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: '#25D366', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '18px', flexShrink: 0,
          }}>
            💬
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                WhatsApp
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>now</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'white', marginBottom: '3px' }}>
              LTAB PepsiCo 🤖
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              direction: lang === 'ur' ? 'rtl' : 'ltr',
              fontFamily: lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : 'inherit',
            }}>
              {LOCK_NOTIF_TEXT[lang]}
            </div>
          </div>
        </div>
      )}

      {/* Time-skip overlay */}
      {showTimeSkip && (
        <div className="fade-in" style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '20px 32px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <div className="clock-spin" style={{ fontSize: '36px', marginBottom: '10px', display: 'inline-block' }}>⏰</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
              {lang === 'ur' ? '30 منٹ بعد...' : '30 minutes later...'}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
              {lang === 'ur' ? 'AI نے ادھوری ٹوکری کا پتہ لگا لیا' : 'AI detects abandoned cart'}
            </div>
          </div>
        </div>
      )}

      {/* Swipe hint */}
      <div style={{
        position: 'absolute',
        bottom: '18px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.35)',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '0.3px',
      }}>
        {SWIPE_HINT[lang] || SWIPE_HINT.en}
      </div>
    </div>
  )
}
