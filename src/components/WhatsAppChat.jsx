import { useEffect, useRef } from 'react'
import '../styles/whatsapp.css'
import '../styles/animations.css'
import MessageBubble from './MessageBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'
import VoiceBubble from './VoiceBubble.jsx'
import PhotoBubble from './PhotoBubble.jsx'
import RichCard from './RichCard.jsx'
import NpsBubble from './NpsBubble.jsx'
import NotificationBanner from './NotificationBanner.jsx'

const TIMESTAMPS = ['2:31 PM', '2:32 PM', '2:33 PM', '2:34 PM', '2:35 PM', '2:36 PM', '2:37 PM', '2:38 PM', '2:39 PM', '2:40 PM', '2:41 PM', '2:42 PM']

export default function WhatsAppChat({ visibleSteps = [], showTyping = false, notification = null }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleSteps, showTyping])

  const renderStep = (step, index) => {
    const ts = TIMESTAMPS[index % TIMESTAMPS.length]

    if (step.type === 'typing') return null // handled by showTyping

    if (step.type === 'voice') {
      return (
        <VoiceBubble
          key={step.id}
          duration={step.content?.duration}
          caption={step.content?.caption}
          timestamp={ts}
        />
      )
    }

    if (step.type === 'photo') {
      return (
        <PhotoBubble
          key={step.id}
          items={step.content?.items || []}
          timestamp={ts}
        />
      )
    }

    if (step.type === 'rich-card') {
      return (
        <RichCard
          key={step.id}
          content={step.content}
          timestamp={ts}
        />
      )
    }

    if (step.type === 'nps') {
      return (
        <NpsBubble
          key={step.id}
          content={step.content}
          timestamp={ts}
        />
      )
    }

    if (step.type === 'message') {
      return (
        <MessageBubble
          key={step.id}
          sender={step.sender}
          content={step.content}
          timestamp={ts}
          hasButton={step.hasButton}
          buttonText={step.buttonText}
          hasButtons={step.hasButtons}
          buttons={step.buttons}
          isUrdu={step.isUrdu}
          isButton={step.isButton}
          isSuccess={step.isSuccess}
        />
      )
    }

    // For transition steps that carry a message
    if (step.type === 'transition' && step.message) {
      return (
        <MessageBubble
          key={step.id}
          sender={step.message.sender}
          content={step.message.content}
          timestamp={ts}
          hasButton={step.message.hasButton}
          buttonText={step.message.buttonText}
          hasButtons={step.message.hasButtons}
          buttons={step.message.buttons}
        />
      )
    }

    // Step 10 in abandoned cart — show both user message and bot response
    if (step.then) {
      return [
        <MessageBubble
          key={step.id}
          sender={step.sender}
          content={step.content}
          timestamp={ts}
          isButton={step.isButton}
        />,
        <MessageBubble
          key={`${step.id}-then`}
          sender={step.then.sender}
          content={step.then.content}
          timestamp={TIMESTAMPS[(index + 1) % TIMESTAMPS.length]}
          isSuccess={step.then.isSuccess}
        />,
      ]
    }

    return null
  }

  return (
    <div className="whatsapp-container">
      {/* Header */}
      <div className="wa-header">
        <div className="wa-header-avatar">Y</div>
        <div className="wa-header-info">
          <div className="wa-header-name">LTAB PepsiCo 🤖</div>
          <div className="wa-header-status">● online</div>
        </div>
        <div className="wa-header-actions">
          <span className="wa-header-icon">📹</span>
          <span className="wa-header-icon">📞</span>
          <span className="wa-header-icon">⋮</span>
        </div>
      </div>

      {/* Notification banner */}
      <div style={{ position: 'relative' }}>
        {notification && (
          <NotificationBanner
            title={notification.title}
            message={notification.message}
            visible={!!notification}
          />
        )}
      </div>

      {/* Chat area */}
      <div className="wa-chat-area">
        <div className="wa-date-divider">
          <span>Today</span>
        </div>

        {visibleSteps.map((step, i) => renderStep(step, i))}

        {showTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="wa-input-bar">
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>😊</span>
        <div className="wa-input" style={{ pointerEvents: 'none' }}>
          <span style={{ color: '#8696A0', fontSize: '13px' }}>Message</span>
        </div>
        <span style={{ fontSize: '20px', cursor: 'pointer', color: '#8696A0' }}>📎</span>
        <span style={{ fontSize: '20px', cursor: 'pointer', color: '#8696A0' }}>📷</span>
        <div className="wa-send-btn">🎤</div>
      </div>
    </div>
  )
}
