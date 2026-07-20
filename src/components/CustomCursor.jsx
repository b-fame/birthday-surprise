import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
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
  }, [visible])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60] mix-blend-difference"
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          scale: clicking ? 0.8 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-6 h-6 rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: clicking ? 1.5 : 1,
          opacity: visible ? 0.3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.8 }}
      >
        <div className="w-2 h-2 rounded-full bg-pink-400" />
      </motion.div>
    </>
  )
}
