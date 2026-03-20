import { useEffect, useState } from 'react'
import '../styles/animations.css'

const COLORS = ['#7C3AED', '#25D366', '#FCD34D', '#EF4444', '#3B82F6', '#F97316', '#EC4899']

function generatePieces(count = 60) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360,
  }))
}

export default function ConfettiEffect({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (active) {
      setPieces(generatePieces(70))
    } else {
      setPieces([])
    }
  }, [active])

  if (!active || pieces.length === 0) return null

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 300,
      borderRadius: 'inherit',
    }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}
