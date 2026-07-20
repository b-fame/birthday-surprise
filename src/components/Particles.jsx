import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Particles({ count = 30 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 10,
      size: 2 + Math.random() * 4,
      colors: ['bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-yellow-400', 'bg-rose-400'],
    })), [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.colors[Math.floor(Math.random() * p.colors.length)]}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 20, -10, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.8, 0.5, 0.7, 0.2],
            scale: [1, 1.5, 0.8, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
