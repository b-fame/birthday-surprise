import { motion } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import { useCountdown } from '../hooks/useCountdown'
import Confetti from '../components/Confetti'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

function TimeBlock({ value, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass rounded-2xl p-4 md:p-6 text-center min-w-[80px] md:min-w-[100px]"
    >
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="block text-3xl md:text-5xl font-display font-bold text-gradient"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-white/40 text-xs md:text-sm uppercase tracking-wider mt-1 block">
        {label}
      </span>
    </motion.div>
  )
}

export default function CountdownSection() {
  const { days, hours, minutes, seconds, isBirthday } = useCountdown(content.birthday)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="countdown" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #0f0c29, #302b63)' }}>
      <InteractiveBackground colors={['rgba(244,63,94,0.06)', 'rgba(168,85,247,0.06)', 'rgba(59,130,246,0.06)']} />
      <Confetti active={isBirthday} count={100} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FiClock className="text-pink-400 text-2xl" />
            <h2 className="text-3xl md:text-5xl font-display text-white">
              {isBirthday ? "It's Your Day! 🎉" : 'Countdown to Your Day'}
            </h2>
          </div>

          {!isBirthday && (
            <p className="text-white/50 text-lg mb-12">
              The most wonderful day of the year is almost here
            </p>
          )}
        </motion.div>

        {isBirthday ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
          >
            <div className="text-7xl md:text-9xl mb-6">🎉🎂🎉</div>
            <h3 className="text-4xl md:text-6xl font-display text-gradient-gold mb-4">
              Happy Birthday, {content.name}!
            </h3>
            <p className="text-white/60 text-xl">Today is ALL about YOU!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-3 md:gap-6"
          >
            <TimeBlock value={days} label="Days" />
            <TimeBlock value={hours} label="Hours" />
            <TimeBlock value={minutes} label="Minutes" />
            <TimeBlock value={seconds} label="Seconds" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
