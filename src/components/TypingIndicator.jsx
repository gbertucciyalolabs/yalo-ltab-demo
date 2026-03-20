import '../styles/animations.css'

export default function TypingIndicator() {
  return (
    <div className="wa-bubble-wrapper incoming message-enter">
      <div className="wa-bubble incoming" style={{ padding: '10px 14px', minWidth: 'auto' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '16px' }}>
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  )
}
