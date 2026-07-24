import { motion } from 'framer-motion'
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

export default function BirthdayMessage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            <h2 className="text-3xl md:text-4xl font-display text-white">
              A Letter for <span className="text-gradient">{content.name}</span>
            </h2>
          </div>

          <div className="space-y-6">
            <AnimatedText delay={0.2}>
              <span className="font-script text-2xl text-pink-300">
                {content.letter.salutation}
              </span>
            </AnimatedText>

            {content.letter.body.split('\n\n').map((paragraph, i) => (
              <AnimatedText key={i} delay={0.3 + i * 0.2}>
                {paragraph}
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
              </motion.span>
            </AnimatedText>
          </div>
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
            <p className="text-xl md:text-2xl font-script text-white/80 italic leading-relaxed">
              &ldquo;{content.letter.quote}&rdquo;
            </p>
            {content.letter.quoteAuthor && (
              <p className="mt-4 text-white/50 text-sm">&mdash; {content.letter.quoteAuthor}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
