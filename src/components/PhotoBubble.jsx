import '../styles/animations.css'

function ShelfPhoto({ label, caption }) {
  return (
    <div style={{
      width: '200px', height: '132px',
      background: 'linear-gradient(160deg, #1a2d40 0%, #0d1e30 100%)',
      borderRadius: '6px', overflow: 'hidden', position: 'relative',
    }}>
      <svg width="200" height="132" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Shelf lines */}
        {[42, 84, 110].map((y, i) => (
          <rect key={i} x="0" y={y} width="200" height="2" fill="rgba(255,255,255,0.12)" />
        ))}
        {/* Row 1 — beverages */}
        {[
          { x: 4, y: 14, w: 22, h: 26, c: '#1565C0' },
          { x: 28, y: 14, w: 22, h: 26, c: '#1565C0' },
          { x: 52, y: 18, w: 20, h: 22, c: '#D32F2F' },
          { x: 74, y: 12, w: 22, h: 28, c: '#2E7D32' },
          { x: 98, y: 14, w: 22, h: 26, c: '#1565C0' },
          { x: 122, y: 18, w: 20, h: 22, c: '#F57F17' },
          { x: 144, y: 14, w: 22, h: 26, c: '#1565C0' },
          { x: 168, y: 18, w: 28, h: 22, c: '#4A148C' },
        ].map((r, i) => (
          <rect key={`r1-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} rx="2" fill={r.c} opacity="0.82" />
        ))}
        {/* Row 2 — snacks */}
        {[
          { x: 4, y: 52, w: 30, h: 28, c: '#F9A825' },
          { x: 36, y: 52, w: 30, h: 28, c: '#E65100' },
          { x: 68, y: 52, w: 30, h: 28, c: '#F9A825' },
          { x: 100, y: 52, w: 30, h: 28, c: '#AD1457' },
          { x: 132, y: 52, w: 30, h: 28, c: '#E65100' },
          { x: 164, y: 52, w: 32, h: 28, c: '#F9A825' },
        ].map((r, i) => (
          <rect key={`r2-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} rx="2" fill={r.c} opacity="0.82" />
        ))}
        {/* Row 3 — bottles */}
        {[
          { x: 4, y: 88, w: 38, h: 20, c: '#1B5E20' },
          { x: 46, y: 88, w: 38, h: 20, c: '#1B5E20' },
          { x: 88, y: 88, w: 36, h: 20, c: '#37474F' },
          { x: 128, y: 88, w: 38, h: 20, c: '#BF360C' },
          { x: 168, y: 88, w: 28, h: 20, c: '#1565C0' },
        ].map((r, i) => (
          <rect key={`r3-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} rx="2" fill={r.c} opacity="0.82" />
        ))}
      </svg>

      {/* Live indicator */}
      <div style={{
        position: 'absolute', top: '6px', right: '6px',
        fontSize: '8px', color: 'rgba(255,255,255,0.9)',
        background: 'rgba(200,0,0,0.75)', padding: '1px 5px',
        borderRadius: '3px', fontWeight: 800, letterSpacing: '0.5px',
      }}>
        ● REC
      </div>

      {/* Label overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '20px 8px 6px',
      }}>
        <div style={{ fontSize: '11px', color: 'white', fontWeight: 700 }}>{label}</div>
        {caption && (
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', marginTop: '1px' }}>{caption}</div>
        )}
      </div>
    </div>
  )
}

export default function PhotoBubble({ items = [], mode, label, caption, timestamp = '2:35 PM', lang = 'en' }) {
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f

  if (mode === 'camera') {
    return (
      <div className="wa-bubble-wrapper outgoing message-enter">
        <div className="wa-bubble outgoing" style={{ padding: '4px', maxWidth: '220px' }}>
          <ShelfPhoto label={t(label)} caption={t(caption)} />
          <div className="wa-bubble-meta" style={{ padding: '2px 4px 2px 4px' }}>
            <span className="wa-bubble-time">{timestamp}</span>
            <span className="wa-bubble-checks">✓✓</span>
          </div>
        </div>
      </div>
    )
  }

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
