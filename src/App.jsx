import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'
import FloatingHearts from './components/FloatingHearts'
import Particles from './components/Particles'
import Sparkles from './components/Sparkles'
import MusicPlayer from './components/MusicPlayer'
import DownloadCard from './components/DownloadCard'
import EasterEgg from './components/EasterEgg'
import Welcome from './sections/Welcome'
import BirthdayMessage from './sections/BirthdayMessage'
import MemoriesGallery from './sections/MemoriesGallery'
import Timeline from './sections/Timeline'
import Reasons from './sections/Reasons'
import WishesWall from './sections/WishesWall'
import MusicSection from './sections/MusicSection'
import CountdownSection from './sections/Countdown'
import Surprise from './sections/Surprise'
import Footer from './sections/Footer'

const emojis = ['✨', '🌟', '💫', '⭐', '🥰', '💖', '🎉', '🌸']

function ClickSparkle({ x, y, id, onDone }) {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]
  const angle = Math.random() * Math.PI * 2
  const dist = 30 + Math.random() * 60
  const tx = Math.cos(angle) * dist
  const ty = Math.sin(angle) * dist

  return (
    <motion.span
      className="fixed pointer-events-none z-[70] text-lg"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 1.2, x: tx, y: ty }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 + Math.random() * 0.3, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    >
      {emoji}
    </motion.span>
  )
}

export default function App() {
  const [showContent, setShowContent] = useState(false)
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random()
    setSparkles((prev) => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }])
  }, [])

  const removeSparkle = useCallback((id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id))
  }, [])

  return (
    <>
      <LoadingScreen />

      {showContent && (
        <div
          className="position-relative min-vh-100 text-white overflow-x-hidden custom-scrollbar"
          style={{ backgroundColor: '#0f0c29' }}
          onClick={handleClick}
        >
          <Navigation />
          <ThemeToggle />
          <FloatingHearts count={12} />
          <Particles count={25} />
          <Sparkles count={6} />
          <MusicPlayer />
          <DownloadCard />
          <EasterEgg />

          <main>
            <Welcome />
            <BirthdayMessage />
            <MemoriesGallery />
            <Timeline />
            <Reasons />
            <WishesWall />
            <MusicSection />
            <CountdownSection />
            <Surprise />
          </main>

          <Footer />
        </div>
      )}

      <AnimatePresence>
        {sparkles.map((s) => (
          <ClickSparkle key={s.id} x={s.x} y={s.y} id={s.id} onDone={() => removeSparkle(s.id)} />
        ))}
      </AnimatePresence>
    </>
  )
}
