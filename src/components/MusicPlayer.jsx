import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMusic, FiPause, FiPlay, FiChevronDown } from 'react-icons/fi'
import { content } from '../data/content'

const audioBase = `${process.env.PUBLIC_URL}/Audio`

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  const stopAudio = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setIsPlaying(false)
    setProgress(0)
  }, [])

  const playSong = useCallback((index) => {
    stopAudio()
    const song = content.songs[index]
    if (!song.file) return

    const audio = new Audio(`${audioBase}/${encodeURIComponent(song.file)}`)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => {
      audio.play().catch(() => {})
    })

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    })

    audio.addEventListener('ended', () => {
      stopAudio()
    })

    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))

    audio.load()
  }, [stopAudio])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopAudio()
    } else {
      playSong(currentSong)
    }
  }, [isPlaying, currentSong, playSong, stopAudio])

  const changeSong = (index) => {
    setCurrentSong(index)
    if (isPlaying) playSong(index)
  }

  const changeSongRef = useRef(changeSong)
  changeSongRef.current = changeSong

  useEffect(() => {
    const handler = (e) => {
      changeSongRef.current(e.detail)
      setIsOpen(true)
    }
    window.addEventListener('music-play-song', handler)
    return () => window.removeEventListener('music-play-song', handler)
  }, [])

  useEffect(() => {
    return () => stopAudio()
  }, [stopAudio])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass hover:shadow-xl hover:shadow-purple-500/20 flex items-center justify-center transition-all duration-300 group"
        aria-label="Music player"
      >
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-5">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-full"
                animate={{ height: [5, 18 - i * 3, 5] }}
                transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        ) : (
          <FiMusic className="text-white text-xl group-hover:scale-110 transition-transform" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-72 glass rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Music Player</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <FiPause className="text-white text-xs" /> : <FiPlay className="text-white text-xs" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <FiChevronDown />
                </button>
              </div>
            </div>

            {isPlaying && (
              <div className="mb-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {content.songs.map((song, i) => (
                <button
                  key={i}
                  onClick={() => changeSong(i)}
                  className={`w-full text-left p-2 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    currentSong === i
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  <span className="text-lg">{song.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{song.title}</p>
                    <p className="text-xs text-white/50 truncate">{song.artist}</p>
                  </div>
                  {currentSong === i && isPlaying && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-pink-400"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-white/40 text-center">
                {isPlaying
                  ? `Now Playing: ${content.songs[currentSong].title}`
                  : 'Tap play to start'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
