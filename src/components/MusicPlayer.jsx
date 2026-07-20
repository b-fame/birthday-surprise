import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMusic, FiPause, FiPlay, FiChevronDown } from 'react-icons/fi'

const songVideos = [
  { id: '5-pGieBUPmo', title: 'Close Friend', artist: 'Maxwell Gold Records', emoji: '🎵' },
  { id: '2Vv-BfVoq4g', title: 'Perfect', artist: 'Ed Sheeran', emoji: '🎵' },
  { id: 'UqyT8IEB3Pg', title: 'Count On Me', artist: 'Bruno Mars', emoji: '🎶' },
  { id: 'JgM9eBy3_Ug', title: "You've Got a Friend", artist: 'Carole King', emoji: '🎵' },
  { id: 'mWN1D0UApGY', title: 'Best Friend', artist: 'Jason Mraz', emoji: '🎶' },
  { id: '1TO48Cnl66w', title: 'Thank You', artist: 'Dido', emoji: '🎵' },
  { id: 'G5ZqD1lOB0', title: "I'll Be There", artist: 'The Jackson 5', emoji: '🎶' },
]

let youtubeReady = false
let readyCallbacks = []

function onYouTubeReady() {
  youtubeReady = true
  readyCallbacks.forEach((cb) => cb())
  readyCallbacks = []
}

function waitForYouTube() {
  return new Promise((resolve) => {
    if (youtubeReady) return resolve()
    readyCallbacks.push(resolve)
  })
}

if (typeof window !== 'undefined' && !window.__ytInjected) {
  window.__ytInjected = true
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const first = document.getElementsByTagName('script')[0]
  first.parentNode.insertBefore(tag, first)
  window.onYouTubeIframeAPIReady = onYouTubeReady
}

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [progress, setProgress] = useState(0)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  const stopAudio = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (playerRef.current && playerRef.current.destroy) {
      try { playerRef.current.stopVideo(); playerRef.current.destroy() } catch (e) {}
    }
    playerRef.current = null
    setIsPlaying(false)
    setProgress(0)
  }, [])

  const playSong = useCallback(async (index) => {
    stopAudio()
    const video = songVideos[index]

    await waitForYouTube()

    const div = document.createElement('div')
    div.id = 'youtube-player-container'
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(div)
    }

    const player = new window.YT.Player(div.id, {
      height: '0',
      width: '0',
      videoId: video.id,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (e) => {
          e.target.playVideo()
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true)
            const duration = e.target.getDuration()
            intervalRef.current = setInterval(() => {
              try {
                const current = e.target.getCurrentTime()
                setProgress((current / duration) * 100)
              } catch (err) {}
            }, 1000)
          }
          if (e.data === window.YT.PlayerState.ENDED) {
            stopAudio()
          }
        },
      },
    })
    playerRef.current = player
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

  useEffect(() => {
    return () => stopAudio()
  }, [stopAudio])

  return (
    <>
      <div ref={containerRef} className="hidden" />

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
              {songVideos.map((video, i) => (
                <button
                  key={i}
                  onClick={() => changeSong(i)}
                  className={`w-full text-left p-2 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    currentSong === i
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  <span className="text-lg">{video.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{video.title}</p>
                    <p className="text-xs text-white/50 truncate">{video.artist}</p>
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
                  ? `Now Playing: ${songVideos[currentSong].title}`
                  : 'Tap play to start'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
