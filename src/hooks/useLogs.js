import { useState } from 'react'
import { getItem, setItem } from '../utils/storage'

export const useLogs = () => {
    const [logs, setLogs] = useState(() => getItem('logs', []))

    const today = new Date().toISOString().split('T')[0]

    const completeHabit = (habitId) => {
        const alreadyLogged = logs.find(
            l => l.habitId === habitId && l.date === today
        )
        if (alreadyLogged) return

        const newLog = { habitId, date: today, completed: true }
        const updated = [...logs, newLog]
        setLogs(updated)
        setItem('logs', updated)
    }

    const isCompletedToday = (habitId) => {
        return logs.some(l => l.habitId === habitId && l.date === today)
    }

    const getStreak = (allHabits) => {
        if (allHabits.length === 0) return 0
      
        let streak = 0
        let date = new Date()
      
        const todayStr = date.toISOString().split('T')[0]
        const allDoneToday = allHabits.every(h =>
          logs.some(l => l.habitId === h.id && l.date === todayStr)
        )
        if (!allDoneToday) {
          date.setDate(date.getDate() - 1)
        }
      
        while (true) {
          const dateStr = date.toISOString().split('T')[0]
      
          const allDone = allHabits.every(h =>
            logs.some(l => l.habitId === h.id && l.date === dateStr)
          )
      
          if (!allDone) break
      
          streak++
          date.setDate(date.getDate() - 1)
        }
      
        return streak
      }

      const getLast7Days = () => {
        const days = []
        for (let i = 6; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          days.push(date.toISOString().split('T')[0])
        }
        return days
      }
      
      const getDayStatus = (dateStr, allHabits) => {
        if (allHabits.length === 0) return 'empty'
        const completed = allHabits.filter(h =>
          logs.some(l => l.habitId === h.id && l.date === dateStr)
        )
        if (completed.length === 0) return 'none'
        if (completed.length === allHabits.length) return 'full'
        return 'partial'
      }


    return { logs, completeHabit, isCompletedToday, getStreak, getLast7Days, getDayStatus }
}