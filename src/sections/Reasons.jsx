import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

export default function Reasons() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="reasons" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #1a1a2e, #302b63)' }}>
      <InteractiveBackground colors={['rgba(244,63,94,0.06)', 'rgba(168,85,247,0.06)', 'rgba(251,191,36,0.06)']} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FiStar className="text-yellow-400 text-2xl" />
            <h2 className="text-3xl md:text-5xl font-display text-white">
              Why You&apos;re <span className="text-gradient">Amazing</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Just a few of the million reasons you&apos;re incredible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 text-2xl shadow-lg`}>
                  {reason.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{reason.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
