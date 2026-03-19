import { useState } from 'react'
import { getItem, setItem } from '../utils/storage'
import { getLocalDateStr } from '../utils/date'
import { v4 as uuidv4 } from 'uuid'

export const useHabits = () => {
    const [habits, setHabits] = useState(getItem('habits', []))

    const addHabit = (name, emoji) => {
        const newHabit = {
            id: uuidv4(),
            name,
            emoji,
            createdAt: getLocalDateStr()
        }
        const updated = [...habits, newHabit]
        setHabits(updated)
        setItem('habits', updated)
    }
    
    const deleteHabit = (id) => {
        const updated = habits.filter(h => h.id !== id)
        setHabits(updated)
        setItem('habits', updated)
    }

    return { habits, addHabit, deleteHabit }
}