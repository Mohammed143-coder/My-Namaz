'use client'
import { useState, useEffect } from 'react'
import moment from 'moment-hijri'

export const useHijriDate = () => {
  const [hijriDate, setHijriDate] = useState({
    day: '',
    month: '',
    year: '',
    formatted: ''
  })

  useEffect(() => {
    // Configure moment-hijri
    moment.locale('en')
    
    const updateHijriDate = () => {
      const now = moment()
      
      setHijriDate({
        day: now.format('iD'),
        month: now.format('iMMMM'),
        year: now.format('iYYYY'),
        formatted: now.format('iD iMMMM iYYYY')
      })
    }

    updateHijriDate()
    
    // Update at midnight
    const now = new Date()
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    )
    const msToMidnight = night.getTime() - now.getTime()
    
    const midnightTimer = setTimeout(() => {
      updateHijriDate()
      // Set up daily interval after first midnight
      const dailyInterval = setInterval(updateHijriDate, 24 * 60 * 60 * 1000)
      return () => clearInterval(dailyInterval)
    }, msToMidnight)

    return () => clearTimeout(midnightTimer)
  }, [])

  return hijriDate
}

export default useHijriDate
