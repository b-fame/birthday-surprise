import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Sparkles({ count = 8 }) {
  const sparkles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
    })), [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width={s.size * 3} height={s.size * 3} viewBox="0 0 24 24" fill="#fbbf24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
