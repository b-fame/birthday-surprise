import { motion } from 'framer-motion'
import { FiMusic, FiPlay } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import InteractiveBackground from '../components/InteractiveBackground'
import { content } from '../data/content'

export default function MusicSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const playSong = (index) => {
    window.dispatchEvent(new CustomEvent('music-play-song', { detail: index }))
  }

  return (
    <section id="music" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #24243e, #0f0c29)' }}>
      <InteractiveBackground colors={['rgba(168,85,247,0.06)', 'rgba(59,130,246,0.06)', 'rgba(244,63,94,0.06)']} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FiMusic className="text-blue-400 text-2xl" />
            <h2 className="text-3xl md:text-5xl font-display text-white">
              Songs <span className="text-gradient">for You</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A playlist that reminds me of you
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.songs.map((song, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => playSong(i)}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-lg group-hover:shadow-purple-500/30 transition-shadow">
                  <FiPlay className="text-sm ml-0.5" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{song.title}</p>
                  <p className="text-white/40 text-sm">{song.artist}</p>
                </div>
                <span className="text-xl">{song.emoji}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-8"
        >
          Each song tells a story of our beautiful friendship 🎵
        </motion.p>
      </div>
    </section>
  )
}
