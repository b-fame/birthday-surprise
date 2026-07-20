import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiX } from 'react-icons/fi'
import { toPng } from 'html2canvas'
import jsPDF from 'jspdf'

export default function DownloadCard() {
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(false)

  const downloadPDF = async () => {
    setLoading(true)
    try {
      const element = document.querySelector('#birthday-message') || document.querySelector('#welcome')
      if (!element) return

      const canvas = await toPng(element, { backgroundColor: '#0f0c29' })
      const pdf = new jsPDF('portrait', 'px', [canvas.width, canvas.height])
      pdf.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('birthday-card-viii.pdf')
    } catch (err) {
      console.error('Download failed:', err)
    }
    setLoading(false)
    setShowOptions(false)
  }

  const downloadImage = async () => {
    setLoading(true)
    try {
      const element = document.querySelector('#birthday-message') || document.querySelector('#welcome')
      if (!element) return

      const canvas = await toPng(element, { backgroundColor: '#0f0c29' })
      const link = document.createElement('a')
      link.download = 'birthday-card-viii.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
    }
    setLoading(false)
    setShowOptions(false)
  }

  return (
    <>
      <button
        onClick={() => setShowOptions(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full glass hover:shadow-xl hover:shadow-pink-500/20 flex items-center justify-center transition-all duration-300 group"
        aria-label="Download card"
      >
        <FiDownload className="text-white text-xl group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {showOptions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowOptions(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass-dark rounded-2xl p-6 w-80 shadow-2xl"
            >
              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white"
              >
                <FiX />
              </button>
              <h3 className="text-white font-semibold text-lg mb-4">Download Birthday Card</h3>
              <div className="space-y-3">
                <button
                  onClick={downloadImage}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Download as Image'}
                </button>
                <button
                  onClick={downloadPDF}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl glass text-white font-medium hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Download as PDF'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
