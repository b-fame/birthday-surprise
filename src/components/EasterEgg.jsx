import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const easterEggs = [
  { keys: 'bfame', message: '💖 Bfame says: You are amazing! 💖' },
  { keys: 'vii', message: '✨ Viii is the star of the show! ✨' },
  { keys: 'love', message: '❤️ Love you to the moon and back! ❤️' },
  { keys: 'happy', message: '🎉 HAPPY BIRTHDAY! 🎉' },
  { keys: 'secret', message: '🤫 You found a secret message!' },
]

export default function EasterEgg() {
  const [showMessage, setShowMessage] = useState(null)
  const bufferRef = useRef([])

  const handleKeyDown = useCallback((e) => {
    const next = [...bufferRef.current, e.key.toLowerCase()].slice(-10)
    bufferRef.current = next
    const match = easterEggs.find((egg) => next.join('').includes(egg.keys))
    if (match) {
      setShowMessage(match.message)
      setTimeout(() => setShowMessage(null), 4000)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-dark rounded-2xl px-6 py-4 shadow-2xl"
        >
          <p className="text-white font-medium text-lg whitespace-nowrap">{showMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
