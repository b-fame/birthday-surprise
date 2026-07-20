import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x: y * -10, y: x * 10 })
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full rounded-2xl overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  )
}

function TimelineCard({ item, index, isLeft }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex items-center gap-6 md:gap-8 flex-row"
      style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}
    >
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <TiltCard>
          <div className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
            <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">{item.year}</span>
            <h3 className="text-white font-display text-xl mt-2 mb-1">{item.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl mt-3 block"
            >
              {item.icon}
            </motion.span>
          </div>
        </TiltCard>
      </div>

      <div className="hidden md:flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg shadow-purple-500/30"
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-pink-400/50 via-purple-400/50 to-blue-400/50" />
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #0f3460, #1a1a2e)' }}>
      <InteractiveBackground colors={['rgba(168,85,247,0.06)', 'rgba(59,130,246,0.06)', 'rgba(244,63,94,0.06)']} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FiClock className="text-purple-400 text-2xl" />
            <h2 className="text-3xl md:text-5xl font-display text-white">
              Our <span className="text-gradient-gold">Timeline</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every chapter of our story is beautiful
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.2), transparent)' }} />

          <div className="space-y-8 md:space-y-12">
            {content.timeline.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
