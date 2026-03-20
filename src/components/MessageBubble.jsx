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
}) {
  const isBot = sender === 'bot'
  const isUser = sender === 'user'

  return (
    <div className={`wa-bubble-wrapper message-enter ${isBot ? 'incoming' : 'outgoing'}`}>
      <div
        className={`wa-bubble ${isBot ? 'incoming' : 'outgoing'}`}
        style={isSuccess ? { borderLeft: '3px solid #25D366', paddingLeft: '10px' } : {}}
      >
        {isButton ? (
          <span style={{ color: '#53BDEB', fontWeight: 600 }}>{content}</span>
        ) : isUrdu ? (
          <span className="urdu-text">{content}</span>
        ) : (
          <span>{renderContent(content)}</span>
        )}

        {hasButton && (
          <div className="wa-action-btn">{buttonText}</div>
        )}

        {hasButtons && buttons.length > 0 && (
          <div className="wa-buttons-row">
            {buttons.map((btn, i) => (
              <div key={i} className="wa-btn">{btn}</div>
            ))}
          </div>
        )}

        <div className="wa-bubble-meta">
          <span className="wa-bubble-time">{timestamp}</span>
          {isUser && <span className="wa-bubble-checks">✓✓</span>}
        </div>
      </div>
    </div>
  )
}
