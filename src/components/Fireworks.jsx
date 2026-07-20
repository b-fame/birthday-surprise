import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const colors = ['#f43f5e', '#a855f7', '#3b82f6', '#f59e0b', '#ec4899', '#22d3ee', '#34d399']

function createExplosion(x, y) {
  const particles = []
  const count = 20 + Math.floor(Math.random() * 15)
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const velocity = 80 + Math.random() * 120
    particles.push({
      id: `${Date.now()}-${i}`,
      x: x + Math.cos(angle) * velocity,
      y: y + Math.sin(angle) * velocity,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 3 + Math.random() * 4,
      delay: Math.random() * 0.1,
    })
  }
  return particles
}

export default function Fireworks({ active = false }) {
  const [explosions, setExplosions] = useState([])

  const launch = useCallback(() => {
    const x = 10 + Math.random() * 80
    const y = 10 + Math.random() * 50
    const particles = createExplosion(x, y)
    setExplosions(prev => [...prev, ...particles])
  }, [])

  useEffect(() => {
    if (!active) {
      setExplosions([])
      return
    }
    const interval = setInterval(() => {
      launch()
    }, 800 + Math.random() * 1200)
    launch()
    return () => clearInterval(interval)
  }, [active, launch])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {explosions.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 2, 0], opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 + Math.random() * 0.5, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
