import '../styles/animations.css'

const BARS = [6, 14, 8, 18, 10, 16, 6, 20, 12, 18, 8, 14, 6, 10, 16, 8, 20, 12, 6, 14]

export default function VoiceBubble({ duration = '0:12', caption, timestamp = '2:34 PM', lang = 'en' }) {
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f
  const resolvedCaption = t(caption)
  const isUrduCaption = lang === 'ur'

  return (
    <div className="wa-bubble-wrapper outgoing message-enter">
      <div className="wa-bubble outgoing" style={{ minWidth: '200px' }}>
        {/* Voice message UI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: resolvedCaption ? '8px' : '0' }}>
          {/* Play button */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, cursor: 'pointer', fontSize: '14px',
          }}>
            ▶
          </div>

          {/* Waveform */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '28px' }}>
            {BARS.map((h, i) => (
              <div
                key={i}
                className="waveform-bar"
                style={{ '--max-height': `${h}px`, height: '4px', animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>

          {/* Duration */}
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
            {duration}
          </span>
        </div>

        {/* Caption (transcription) */}
        {resolvedCaption && (
          <div
            className={isUrduCaption ? 'urdu-text' : ''}
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.85)',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingTop: '6px',
              marginTop: '2px',
              direction: isUrduCaption ? 'rtl' : 'ltr',
            }}
          >
            {resolvedCaption}
          </div>
        )}

        <div className="wa-bubble-meta">
          <span className="wa-bubble-time">{timestamp}</span>
          <span className="wa-bubble-checks">✓✓</span>
        </div>
      </div>
    </div>
  )
}
