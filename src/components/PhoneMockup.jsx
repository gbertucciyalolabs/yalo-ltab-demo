import '../styles/animations.css'

export default function PhoneMockup({ children, transitionState = 'none' }) {
  // transitionState: 'none' | 'exiting' | 'entering'

  return (
    <div
      style={{
        position: 'relative',
        width: '375px',
        height: '812px',
        flexShrink: 0,
      }}
    >
      {/* Phone outer frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50px',
          background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08),
            0 30px 80px rgba(0,0,0,0.7),
            0 10px 30px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.12)
          `,
        }}
      />

      {/* Side buttons */}
      {/* Volume up */}
      <div style={{
        position: 'absolute', left: -4, top: 140, width: 4, height: 30,
        background: '#333', borderRadius: '2px 0 0 2px',
      }} />
      {/* Volume down */}
      <div style={{
        position: 'absolute', left: -4, top: 180, width: 4, height: 30,
        background: '#333', borderRadius: '2px 0 0 2px',
      }} />
      {/* Power button */}
      <div style={{
        position: 'absolute', right: -4, top: 160, width: 4, height: 50,
        background: '#333', borderRadius: '0 2px 2px 0',
      }} />

      {/* Screen area */}
      <div
        style={{
          position: 'absolute',
          inset: '12px',
          borderRadius: '40px',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Status bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '44px',
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 20px 6px',
          backdropFilter: 'blur(10px)',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'white' }}>9:41</span>
          {/* Notch */}
          <div style={{
            position: 'absolute',
            top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '120px', height: '28px',
            background: '#000',
            borderRadius: '0 0 16px 16px',
          }} />
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: 'white' }}>●●●●</span>
            <span style={{ fontSize: '10px', color: 'white' }}>WiFi</span>
            <span style={{ fontSize: '11px', color: 'white', fontWeight: 700 }}>🔋</span>
          </div>
        </div>

        {/* Content with transition */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            paddingTop: '44px',
            className: transitionState === 'exiting' ? 'slide-out-left' : transitionState === 'entering' ? 'slide-in-right' : '',
          }}
          className={transitionState === 'exiting' ? 'slide-out-left' : transitionState === 'entering' ? 'slide-in-right' : ''}
        >
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div style={{
        position: 'absolute',
        bottom: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '4px',
        background: 'rgba(255,255,255,0.4)',
        borderRadius: '2px',
      }} />
    </div>
  )
}
