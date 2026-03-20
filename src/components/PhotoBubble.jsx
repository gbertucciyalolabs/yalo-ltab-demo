import '../styles/animations.css'

export default function PhotoBubble({ items = [], timestamp = '2:35 PM' }) {
  return (
    <div className="wa-bubble-wrapper outgoing message-enter">
      <div className="wa-bubble outgoing photo-enter" style={{ padding: '4px 4px 4px 4px', maxWidth: '220px' }}>
        {/* Handwritten list on lined paper */}
        <div style={{
          background: '#FFFDE7',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Paper lines */}
          <svg
            width="100%"
            height={items.length * 32 + 24}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          >
            {Array.from({ length: items.length + 2 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={28 + i * 32}
                x2="100%"
                y2={28 + i * 32}
                stroke="#90CAF9"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />
            ))}
            {/* Red margin line */}
            <line x1="28" y1="0" x2="28" y2="100%" stroke="#EF9A9A" strokeWidth="1" strokeOpacity="0.6" />
          </svg>

          {/* Content */}
          <div style={{ padding: '12px 10px 10px 36px', position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '10px',
              color: '#9E9E9E',
              fontFamily: 'monospace',
              marginBottom: '6px',
              textAlign: 'right',
              paddingRight: '4px',
            }}>
              Shopping List
            </div>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'Segoe Script', 'Comic Sans MS', cursive",
                  fontSize: '12px',
                  color: '#1A237E',
                  lineHeight: '32px',
                  borderBottom: i < items.length - 1 ? 'none' : 'none',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className="wa-bubble-meta" style={{ padding: '2px 4px 2px 4px' }}>
          <span className="wa-bubble-time">{timestamp}</span>
          <span className="wa-bubble-checks">✓✓</span>
        </div>
      </div>
    </div>
  )
}
