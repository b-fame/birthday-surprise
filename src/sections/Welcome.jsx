import { motion } from 'framer-motion'
import { FiChevronDown, FiHeart } from 'react-icons/fi'
import { useTypewriter } from '../hooks/useTypewriter'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

export default function Welcome() {

  const typedText = useTypewriter([
    "Preparing something special for you! 🎉",
    'Everything is coming together ✨',
    "Your day is almost here! 🎈",
    "Getting ready to celebrate you 🌟",
  ], 60, 35, 2500)

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="welcome"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0f0c29 100%)',
      }}
    >
      <InteractiveBackground
        colors={['rgba(244,63,94,0.12)', 'rgba(168,85,247,0.1)', 'rgba(59,130,246,0.08)']}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 20%, rgba(244,63,94,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse at 20% 20%, rgba(244,63,94,0.12) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="text-6xl sm:text-7xl md:text-9xl mb-6 md:mb-8 drop-shadow-2xl"
        >
          🎂
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-3 md:mb-4"
        >
          <span className="text-gradient">Getting Ready</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-script text-white/90 mb-4 md:mb-6"
        >
          {content.welcome.title}, <span className="text-gradient-gold">{content.name}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-3 md:mb-4 font-light px-2"
        >
          {content.welcome.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="h-7 md:h-8 text-base sm:text-lg md:text-xl text-pink-300 font-script mb-6 md:mb-8"
        >
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-4 md:h-5 bg-pink-400 ml-1 align-middle"
          />
        </motion.div>

        <motion.button
          onClick={() => scrollTo('#message')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group position-relative d-inline-flex align-items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white fw-semibold text-base md:text-lg shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300"
          data-bs-toggle="tooltip"
          data-bs-title="Click to start!"
        >
          <FiHeart className="group-hover:scale-110 transition-transform" />
          See What's Being Prepared
          <span className="position-absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="mt-12 md:mt-16"
        >
          <button
            onClick={() => scrollTo('#message')}
            className="text-white/40 hover:text-white/60 transition-colors animate-bounce"
          >
            <FiChevronDown className="w-5 h-5 md:w-6 md:h-6 mx-auto" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
