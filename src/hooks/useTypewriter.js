import { useState, useEffect } from 'react'

export function useTypewriter(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    let timeout

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, typingSpeed)
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      }, deletingSpeed)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex(prev => (prev + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}
