import { useMemo } from 'react'
import { motion } from 'framer-motion'

const heartSymbols = ['❤️', '💕', '💗', '💖', '✨', '🌸']

export default function FloatingHearts({ count = 15 }) {
  const hearts = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 12 + Math.random() * 20,
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      startY: 100 + Math.random() * 20,
    })), [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: `-${heart.startY}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0.6, 0.3, 0],
            scale: [0.5, 1.2, 1, 0.8, 0.5],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {heart.symbol}
        </motion.div>
      ))}
    </div>
  )
}
