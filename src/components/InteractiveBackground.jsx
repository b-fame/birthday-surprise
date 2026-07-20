import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveBackground({ colors = [] }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const defaultColors = [
    'rgba(244,63,94,0.06)',
    'rgba(168,85,247,0.06)',
    'rgba(59,130,246,0.06)',
  ]

  const cols = colors.length ? colors : defaultColors

  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, ${cols[0]} 0%, transparent 60%)`,
            `radial-gradient(600px circle at ${100 - mouse.x}% ${100 - mouse.y}%, ${cols[1]} 0%, transparent 60%)`,
          ],
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(400px circle at ${mouse.x - 10}% ${mouse.y + 10}%, ${cols[2]} 0%, transparent 50%)`,
            `radial-gradient(400px circle at ${mouse.x + 10}% ${mouse.y - 10}%, ${cols[0]} 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </>
  )
}
