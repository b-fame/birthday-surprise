import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMessageSquare } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import Confetti from '../components/Confetti'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

export default function WishesWall() {
  const [opened, setOpened] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const openCard = (i) => {
    setOpened(i)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <section id="wishes" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #302b63, #24243e)' }}>
      <InteractiveBackground colors={['rgba(244,63,94,0.06)', 'rgba(168,85,247,0.06)', 'rgba(251,191,36,0.06)']} />
      <Confetti active={showConfetti} count={60} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FiMessageSquare className="text-pink-400 text-2xl" />
            <h2 className="text-3xl md:text-5xl font-display text-white">
              <span className="text-gradient-gold">Wishes</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Messages from the heart, just for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.wishes.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <motion.button
                onClick={() => openCard(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full text-left glass rounded-2xl p-6 transition-all duration-500 ${
                  opened === i
                    ? 'shadow-xl shadow-pink-500/20 border border-pink-500/20'
                    : 'hover:shadow-lg hover:shadow-purple-500/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{wish.emoji}</span>
                  <h3 className="text-white font-semibold">{wish.name}</h3>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={opened === i ? { height: 'auto', opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10">
                    {wish.message}
                  </p>
                </motion.div>

                {opened !== i && (
                  <p className="text-white/30 text-sm fst-italic">Tap to open 💌</p>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
