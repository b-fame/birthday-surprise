import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiHeart, FiPlay } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
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
    setTilt({ x: y * -12, y: x * 12 })
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
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
      >
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  )
}

export default function MemoriesGallery() {
  const [selected, setSelected] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const videoRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const openLightbox = (memory) => setSelected(memory)
  const closeLightbox = () => { setSelected(null); setSelectedVideo(null) }

  const openVideo = (video) => setSelectedVideo(video)

  const navigate = (direction) => {
    const idx = content.memories.findIndex((m) => m.id === selected.id)
    const next = idx + direction
    if (next >= 0 && next < content.memories.length) {
      setSelected(content.memories[next])
    }
  }

  return (
    <section id="memories" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #16213e, #0f3460)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FiCamera className="text-pink-400 text-2xl" />
            <h2 className="text-3xl md:text-5xl font-display text-white">
              Our <span className="text-gradient">Memories</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every moment with you is a treasure I hold close to my heart
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 hover-lift">
          {content.memories.map((memory, i) => (
            <motion.button
              key={memory.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => openLightbox(memory)}
              className="group text-left outline-none block w-full break-inside-avoid"
            >
              <TiltCard className="w-full">
                <div className="relative w-full">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full object-cover rounded-2xl"
                    style={{ minHeight: '300px', maxHeight: '500px' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 z-20">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center backdrop-blur-md">
                      <FiHeart className="text-pink-300 text-sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-left">
                    <span className="text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm inline-block mb-2">
                      {memory.date}
                    </span>
                    <h3 className="text-white font-semibold text-xl drop-shadow-lg">{memory.title}</h3>
                    <p className="text-white/80 text-sm mt-1 drop-shadow-md line-clamp-2">{memory.caption}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.button>
          ))}
        </div>

        {content.videos && content.videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-2xl md:text-3xl font-display text-white text-center mb-8">
              Precious <span className="text-gradient-gold">Moments</span> on Video 🎥
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {content.videos.map((video, i) => (
                <motion.button
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openVideo(video)}
                  className="group relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                >
                  <TiltCard className="w-full">
                    <div className="relative aspect-video w-full">
                      <video
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full glass flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                          <FiPlay className="text-white text-3xl ml-1.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-medium text-lg">{video.title}</p>
                        <p className="text-white/60 text-sm">{video.caption}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="relative max-w-4xl w-full glass-dark rounded-3xl p-3 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <FiX />
                </button>

                <div className="rounded-2xl overflow-hidden mb-4 relative">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full max-h-[70vh] object-contain bg-black/40"
                  />
                </div>

                <div className="px-4 pb-2 text-center">
                  <h3 className="text-white text-2xl font-display mb-1">{selected.title}</h3>
                  <span className="text-xs text-white/40 bg-white/10 px-3 py-1 rounded-full inline-block mb-2">{selected.date}</span>
                  <p className="text-white/70">{selected.caption}</p>
                </div>

                <div className="flex justify-center gap-4 mt-2 pb-2">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="relative max-w-4xl w-full glass-dark rounded-3xl p-3 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <FiX />
                </button>
                <video
                  ref={videoRef}
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  className="w-full rounded-2xl"
                  style={{ maxHeight: '75vh' }}
                />
                <div className="mt-4 pb-2 text-center">
                  <p className="text-white font-medium text-lg">{selectedVideo.title}</p>
                  <p className="text-white/60 text-sm">{selectedVideo.caption}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
