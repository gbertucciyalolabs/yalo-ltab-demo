import { useState } from 'react'
import '../styles/animations.css'

const SEGMENTS = [
  { label: '50 pts', color: '#7C3AED' },
  { label: 'Free Pack', color: '#25D366' },
  { label: '10% Off', color: '#F97316' },
  { label: '100 pts', color: '#EF4444' },
  { label: 'PKR 50', color: '#3B82F6' },
  { label: '25 pts', color: '#FCD34D' },
  { label: 'Try Again', color: '#8B5CF6' },
  { label: '75 pts', color: '#EC4899' },
]

const SIZE = 120
const CENTER = SIZE / 2
const RADIUS = SIZE / 2 - 8
const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS.length

function polarToCartesian(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle - Math.PI / 2),
    y: cy + r * Math.sin(angle - Math.PI / 2),
  }
}

export default function LuckyWheel() {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [won, setWon] = useState(null)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setWon(null)
    const spinDeg = 1440 + Math.floor(Math.random() * 360)
    const newRotation = rotation + spinDeg
    setRotation(newRotation)
    setTimeout(() => {
      setSpinning(false)
      const segIdx = Math.floor(((360 - (newRotation % 360)) / 360) * SEGMENTS.length) % SEGMENTS.length
      setWon(SEGMENTS[segIdx].label)
    }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {/* Wheel */}
      <div style={{ position: 'relative' }}>
        {/* Pointer */}
        <div style={{
          position: 'absolute',
          top: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '16px solid #FCD34D',
          zIndex: 10,
        }} />

        <svg
          width={SIZE}
          height={SIZE}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          }}
        >
          {SEGMENTS.map((seg, i) => {
            const startAngle = i * SEGMENT_ANGLE
            const endAngle = (i + 1) * SEGMENT_ANGLE
            const start = polarToCartesian(CENTER, CENTER, RADIUS, startAngle)
            const end = polarToCartesian(CENTER, CENTER, RADIUS, endAngle)
            const mid = polarToCartesian(CENTER, CENTER, RADIUS * 0.65, startAngle + SEGMENT_ANGLE / 2)
            const largeArc = SEGMENT_ANGLE > Math.PI ? 1 : 0

            return (
              <g key={i}>
                <path
                  d={`M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`}
                  fill={seg.color}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
                <text
                  x={mid.x}
                  y={mid.y}
                  fill="white"
                  fontSize="7"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${(startAngle + SEGMENT_ANGLE / 2) * (180 / Math.PI)}, ${mid.x}, ${mid.y})`}
                >
                  {seg.label}
                </text>
              </g>
            )
          })}
          {/* Center circle */}
          <circle cx={CENTER} cy={CENTER} r={10} fill="white" />
          <circle cx={CENTER} cy={CENTER} r={6} fill="#7C3AED" />
        </svg>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={spinning}
        style={{
          padding: '6px 16px',
          background: spinning ? '#4B5563' : '#FCD34D',
          color: spinning ? 'white' : '#111827',
          border: 'none',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          cursor: spinning ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {spinning ? '🎡 Spinning...' : '🎡 Spin!'}
      </button>

      {won && (
        <div style={{
          background: '#FCD34D',
          color: '#111827',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          animation: 'messageSlideIn 0.3s ease-out',
        }}>
          🎉 You won: {won}!
        </div>
      )}
    </div>
  )
}
