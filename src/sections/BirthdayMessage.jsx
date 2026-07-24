import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

function AnimatedText({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="text-white/80 leading-relaxed text-lg mb-4"
    >
      {children}
    </motion.p>
  )
}

function FloatingEmoji({ emoji, onDone }) {
  const x = (Math.random() - 0.5) * 200
  return (
    <motion.span
      initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -150, x, scale: 1.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      className="absolute pointer-events-none text-2xl"
      style={{ left: '50%', top: '50%' }}
    >
      {emoji}
    </motion.span>
  )
}

function EmojiButton({ emoji, onClick }) {
  const [burst, setBurst] = useState(false)
  const [particles, setParticles] = useState([])

  const handleClick = () => {
    setBurst(!burst)
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
      scale: 0.5 + Math.random() * 1,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 800)
  }

  return (
    <span className="relative inline-block group">
      <motion.span
        className="inline-block cursor-pointer text-xl"
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleClick}
        animate={burst ? { scale: [1, 1.6, 1], rotate: [0, -15, 15, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {emoji}
        <span className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity scale-150" />
      </motion.span>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute pointer-events-none text-sm"
            style={{ left: '50%', top: '50%' }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {['✨', '🥰', '🌟', '⭐', '💫'][Math.floor(Math.random() * 5)]}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}

export default function BirthdayMessage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [flyingEmojis, setFlyingEmojis] = useState([])

  const addFlyingEmoji = (emoji) => {
    const id = Date.now()
    setFlyingEmojis((prev) => [...prev, { id, emoji }])
    setTimeout(() => {
      setFlyingEmojis((prev) => prev.filter((e) => e.id !== id))
    }, 1200)
  }

  const renderBody = (text) => {
    const emojiRegex = /([🥰✨🌟💫🎉😊❤️💪🌍🌸])/g
    const parts = text.split(emojiRegex)
    return parts.map((part, i) => {
      if (emojiRegex.test(part)) {
        return (
          <EmojiButton key={i} emoji={part} />
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <section id="message" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #1a1a2e, #16213e)' }}>
      <InteractiveBackground colors={['rgba(244,63,94,0.06)', 'rgba(168,85,247,0.06)', 'rgba(59,130,246,0.06)']} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-purple-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

          <div className="flex items-center gap-3 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center cursor-pointer"
              onClick={() => addFlyingEmoji('🥰')}
            >
              <span className="text-white text-lg">🥰</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-display text-white">
              A Letter for <span className="text-gradient">{content.name}</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-2"
              >
                💌
              </motion.span>
            </h2>
          </div>

          <div className="space-y-6 relative">
            <AnimatedText delay={0.2}>
              <span className="font-script text-2xl text-pink-300">
                {content.letter.salutation}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  🌸
                </motion.span>
              </span>
            </AnimatedText>

            {content.letter.body.split('\n\n').map((paragraph, i) => (
              <AnimatedText key={i} delay={0.3 + i * 0.2}>
                {renderBody(paragraph)}
              </AnimatedText>
            ))}

            <AnimatedText delay={0.8}>
              <span className="font-script text-xl text-pink-300">{content.letter.closing}</span>
              <br />
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="font-script text-2xl text-gradient-gold inline-block"
              >
                {content.letter.signature}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  💝
                </motion.span>
              </motion.span>
            </AnimatedText>
          </div>

          <AnimatePresence>
            {flyingEmojis.map((fe) => (
              <FloatingEmoji key={fe.id} emoji={fe.emoji} onDone={() => {}} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.05), rgba(168,85,247,0.05), rgba(59,130,246,0.05))' }} />
          <div className="relative z-10">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-4 block"
            >
              💝
            </motion.span>
            <p className="text-xl md:text-2xl font-script text-white/80 italic leading-relaxed">
              &ldquo;{content.letter.quote}&rdquo;
            </p>
            {content.letter.quoteAuthor && (
              <p className="mt-4 text-white/50 text-sm">&mdash; {content.letter.quoteAuthor}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addFlyingEmoji('🥰')}
              className="mt-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            >
              🥰
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
