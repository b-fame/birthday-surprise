import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-20 right-4 sm:right-6 z-40 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <FiMoon className="text-blue-300" /> : <FiSun className="text-yellow-400" />}
      </motion.div>
    </button>
  )
}
