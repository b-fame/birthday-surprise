import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function VisitorCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('visitorCount')
    const newCount = stored ? parseInt(stored) + 1 : 1
    localStorage.setItem('visitorCount', newCount)
    setCount(newCount)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/60"
    >
      <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span>{count.toLocaleString()} visit{count !== 1 ? 's' : ''}</span>
    </motion.div>
  )
}
