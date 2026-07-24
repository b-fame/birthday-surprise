import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGift, FiRefreshCw } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import Fireworks from '../components/Fireworks'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

export default function Surprise() {
  const [opened, setOpened] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const surpriseMessage = useMemo(
    () => content.surpriseMessages[Math.floor(Math.random() * content.surpriseMessages.length)],
    []
  )

  const handleOpen = () => {
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      setOpened(true)
      setShowFireworks(true)
    }, 800)
  }

  const handleReset = () => {
    setOpened(false)
    setShowFireworks(false)
  }

  return (
    <section id="surprise" className="relative py-20 md:py-32 min-h-screen flex items-center" style={{ background: 'linear-gradient(180deg, #302b63, #0f0c29)' }}>
      <InteractiveBackground colors={['rgba(168,85,247,0.06)', 'rgba(244,63,94,0.06)', 'rgba(59,130,246,0.06)']} />
      <Fireworks active={showFireworks} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display text-white mb-4">
            A Special <span className="text-gradient-gold">Surprise</span>
          </h2>
          <p className="text-white/50 text-lg">
            Something special is waiting for you...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="gift"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.button
                onClick={handleOpen}
                animate={shaking ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="text-[150px] md:text-[200px]">🎁</div>
                  </motion.div>
                  <div className="absolute -top-4 -right-4">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-3xl"
                    >
                      ✨
                    </motion.span>
                  </div>
                </div>

                <div className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white fw-semibold text-lg shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover-lift">
                  <FiGift className="d-inline me-2" />
                  Open Your Surprise
                </div>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white/30 text-sm mt-6"
              >
                Click the gift box to reveal a special message!
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
              className="glass rounded-3xl p-8 md:p-12 max-w-lg mx-auto shadow-2xl shadow-purple-500/10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
                className="text-6xl mb-6"
              >
                💖
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-2xl md:text-3xl font-display text-white mb-4"
              >
                Surprise! 🎉
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-xl md:text-2xl text-gradient-gold font-script mb-8"
              >
                {surpriseMessage}
              </motion.p>

              <motion.button
                onClick={handleReset}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-all"
              >
                <FiRefreshCw />
                Open Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
