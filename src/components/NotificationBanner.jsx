import '../styles/animations.css'

export default function NotificationBanner({ title, message, visible }) {
  if (!visible) return null

  return (
    <div
      className="notification-enter"
      style={{
        position: 'absolute',
        top: '60px',
        left: '12px',
        right: '12px',
        background: 'rgba(31, 44, 52, 0.97)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 200,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* WhatsApp icon */}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '10px',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        💬
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#E9EDEF', marginBottom: '2px' }}>
          {title}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#8696A0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {message}
        </div>
      </div>

      <div style={{ fontSize: '10px', color: '#8696A0', flexShrink: 0 }}>now</div>
    </div>
  )
}
