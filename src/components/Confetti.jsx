import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const colors = ['#f43f5e', '#a855f7', '#3b82f6', '#f59e0b', '#ec4899', '#22d3ee', '#34d399', '#fb923c']

export default function Confetti({ active = false, count = 80 }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }
    const newPieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 8,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      shape: Math.random() > 0.5 ? 'square' : 'circle',
    }))
    setPieces(newPieces)
  }, [active, count])

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed pointer-events-none z-50"
          style={{ left: `${piece.x}%` }}
          initial={{ top: `${piece.y}%`, opacity: 1, rotate: 0 }}
          animate={{
            top: '110%',
            opacity: [1, 1, 0],
            rotate: piece.rotation * 3,
            x: [0, (Math.random() - 0.5) * 150],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        >
          <div
            className={`${piece.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              boxShadow: `0 0 6px ${piece.color}`,
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
