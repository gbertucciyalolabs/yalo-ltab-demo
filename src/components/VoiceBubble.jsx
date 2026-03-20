import '../styles/animations.css'

const BARS = [6, 14, 8, 18, 10, 16, 6, 20, 12, 18, 8, 14, 6, 10, 16, 8, 20, 12, 6, 14]

export default function VoiceBubble({ duration = '0:12', caption, timestamp = '2:34 PM' }) {
  return (
    <div className="wa-bubble-wrapper outgoing message-enter">
      <div className="wa-bubble outgoing" style={{ minWidth: '200px' }}>
        {/* Voice message UI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: caption ? '8px' : '0' }}>
          {/* Play button */}
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            cursor: 'pointer',
            fontSize: '14px',
          }}>
            ▶
          </div>

          {/* Waveform */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '28px' }}>
            {BARS.map((h, i) => (
              <div
                key={i}
                className="waveform-bar"
                style={{
                  '--max-height': `${h}px`,
                  height: '4px',
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Duration */}
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
            {duration}
          </span>
        </div>

        {/* Urdu caption */}
        {caption && (
          <div
            className="urdu-text"
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.85)',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingTop: '6px',
              marginTop: '2px',
            }}
          >
            {caption}
          </div>
        )}

        {/* Meta */}
        <div className="wa-bubble-meta">
          <span className="wa-bubble-time">{timestamp}</span>
          <span className="wa-bubble-checks">✓✓</span>
        </div>
      </div>
    </div>
  )
}
