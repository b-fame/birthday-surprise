import { useState, useEffect } from 'react'

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))
  const [isBirthday, setIsBirthday] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate)
      setTimeLeft(remaining)
      if (remaining.total <= 0) {
        setIsBirthday(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return { ...timeLeft, isBirthday }
}

function calculateTimeLeft(targetDate) {
  const difference = new Date(targetDate) - new Date()
  let timeLeft = { total: difference, days: 0, hours: 0, minutes: 0, seconds: 0 }

  if (difference > 0) {
    timeLeft = {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}
