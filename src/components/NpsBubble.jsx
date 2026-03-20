import { useState } from 'react'
import '../styles/whatsapp.css'
import '../styles/animations.css'

const STARS = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

export default function NpsBubble({ content, timestamp = '2:42 PM' }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="wa-bubble-wrapper incoming message-enter">
      <div className="wa-bubble incoming">
        <span>{content}</span>

        <div className="wa-nps-row">
          {STARS.map((s, i) => (
            <div
              key={i}
              className="wa-nps-btn"
              style={selected === i ? { background: 'rgba(255,193,7,0.35)', borderColor: '#FFC107', transform: 'scale(1.1)' } : {}}
              onClick={() => setSelected(i)}
            >
              {i + 1}★
            </div>
          ))}
        </div>

        {selected !== null && (
          <div style={{
            marginTop: '8px',
            padding: '6px 8px',
            background: 'rgba(37, 211, 102, 0.15)',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#25D366',
            textAlign: 'center',
            fontWeight: 600,
          }}>
            Thank you for your feedback! {STARS[selected]}
          </div>
        )}

        <div className="wa-bubble-meta">
          <span className="wa-bubble-time">{timestamp}</span>
        </div>
      </div>
    </div>
  )
}
