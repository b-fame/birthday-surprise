import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

function useCursorPosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY, clientX: e.clientX, clientY: e.clientY })
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return { pos, visible, clicking }
}

function Trail({ x, y, id, onComplete }) {
  const colors = ['#f43f5e', '#a855f7', '#3b82f6', '#fbbf24', '#ec4899']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const size = 3 + Math.random() * 5

  return (
    <motion.div
      className="fixed pointer-events-none z-[59] rounded-full"
      style={{ width: size, height: size, backgroundColor: color }}
      initial={{ x: x - size / 2, y: y - size / 2, opacity: 0.8, scale: 0 }}
      animate={{ opacity: 0, scale: 1.5, y: y - size / 2 - 20 - Math.random() * 20 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 + Math.random() * 0.4, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    />
  )
}

export default function CustomCursor() {
  const { pos, visible, clicking } = useCursorPosition()
  const [trails, setTrails] = useState([])
  const trailId = useRef(0)
  const lastTrail = useRef(0)

  useEffect(() => {
    if (!visible || clicking) return
    const now = Date.now()
    if (now - lastTrail.current < 60) return
    lastTrail.current = now
    const id = trailId.current++
    setTrails((prev) => [...prev.slice(-8), { id, x: pos.x, y: pos.y }])
  }, [pos, visible, clicking])

  const removeTrail = useCallback((id) => {
    setTrails((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const ringScale = clicking ? 1.6 : 1
  const dotScale = clicking ? 0.6 : 1

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[61]" style={{ cursor: 'none' }} />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[62]"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: ringScale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.3 }}
      >
        <div
          className="w-10 h-10 rounded-full border-2"
          style={{
            borderColor: 'rgba(168, 85, 247, 0.6)',
            boxShadow: '0 0 12px rgba(168, 85, 247, 0.3), inset 0 0 12px rgba(168, 85, 247, 0.1)',
            background: 'rgba(168, 85, 247, 0.06)',
          }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[63]"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: dotScale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 20, mass: 0.2 }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
            boxShadow: '0 0 10px rgba(244, 63, 94, 0.6)',
          }}
        />
      </motion.div>
      {trails.map((t) => (
        <Trail key={t.id} x={t.x} y={t.y} id={t.id} onComplete={() => removeTrail(t.id)} />
      ))}
    </>
  )
}
