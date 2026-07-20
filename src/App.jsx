import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'
import FloatingHearts from './components/FloatingHearts'
import Particles from './components/Particles'
import Sparkles from './components/Sparkles'
import MusicPlayer from './components/MusicPlayer'
import CustomCursor from './components/CustomCursor'
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

export default function App() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen />

      {showContent && (
        <div className="relative min-h-screen text-white overflow-x-hidden custom-scrollbar" style={{ backgroundColor: '#0f0c29' }}>
          <Navigation />
          <ThemeToggle />
          <CustomCursor />
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
    </>
  )
}
