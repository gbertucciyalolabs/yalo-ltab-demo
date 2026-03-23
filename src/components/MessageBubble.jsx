import '../styles/whatsapp.css'
import '../styles/animations.css'

function renderContent(content) {
  // Bold text with **
  return content.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

export default function MessageBubble({
  sender,
  content,
  timestamp = '2:34 PM',
  hasButton,
  buttonText,
  hasButtons,
  buttons = [],
  isUrdu = false,
  isButton = false,
  isSuccess = false,
  cardType,
  lang = 'en',
}) {
  const isBot = sender === 'bot'
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f

  const resolvedContent = t(content)
  const resolvedButtonText = t(buttonText)
  // buttons can be { en: [...], ur: [...] } or a plain array
  const resolvedButtons = Array.isArray(buttons)
    ? buttons
    : (typeof buttons === 'object' && buttons !== null ? (buttons[lang] ?? buttons.en ?? []) : [])

  const isUrduContent = lang === 'ur' || isUrdu

  return (
    <div className={`wa-bubble-wrapper message-enter ${isBot ? 'incoming' : 'outgoing'}`}>
      <div
        className={`wa-bubble ${isBot ? 'incoming' : 'outgoing'}`}
        style={isSuccess ? { borderLeft: '3px solid #25D366', paddingLeft: '10px' } : {}}
      >
        {isButton ? (
          <span style={{ color: '#53BDEB', fontWeight: 600 }}>{resolvedContent}</span>
        ) : isUrduContent ? (
          <span className="urdu-message">{resolvedContent}</span>
        ) : (
          <span>{renderContent(resolvedContent || '')}</span>
        )}

        {hasButton && (
          <div className="wa-action-btn">{resolvedButtonText}</div>
        )}

        {hasButtons && resolvedButtons.length > 0 && (
          <div className="wa-buttons-row">
            {resolvedButtons.map((btn, i) => (
              <div key={i} className="wa-btn">{btn}</div>
            ))}
          </div>
        )}

        <div className="wa-bubble-meta">
          <span className="wa-bubble-time">{timestamp}</span>
          {!isBot && <span className="wa-bubble-checks">✓✓</span>}
        </div>
      </div>
    </div>
  )
}
