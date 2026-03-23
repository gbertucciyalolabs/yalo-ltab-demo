import '../styles/whatsapp.css'
import '../styles/animations.css'

export default function RichCard({ content, timestamp = '2:38 PM', lang = 'en' }) {
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f

  return (
    <div className="wa-bubble-wrapper incoming message-enter">
      <div style={{ maxWidth: '85%' }}>
        <div className="wa-rich-card card-enter">
          <div className="wa-rich-card-header">{t(content.header)}</div>
          <div className="wa-rich-card-body">
            {content.metrics.map((m, i) => (
              <div key={i} className="wa-metric-row">
                <span className="wa-metric-label">{t(m.label)}</span>
                <div style={{ textAlign: 'right' }}>
                  <div className="wa-metric-value">{t(m.value)}</div>
                  {m.change && (
                    <div className={`wa-metric-change ${m.positive ? 'positive' : m.positive === false ? 'negative' : ''}`}>
                      {t(m.change)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {content.tip && (
              <div className="wa-rich-card-tip">{t(content.tip)}</div>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '2px' }}>
          <span style={{ fontSize: '10px', color: '#8696A0' }}>{timestamp}</span>
        </div>
      </div>
    </div>
  )
}
