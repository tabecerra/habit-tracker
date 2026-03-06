import { useHabits } from '../hooks/useHabits'
import { AddHabitForm } from '../components/AddHabitForm'
import { useLang } from '../context/LanguageContext'

export const AddHabit = ({ onBack }) => {
  const { t } = useLang()
  const { addHabit } = useHabits()

  const handleAdd = (name, emoji) => {
    addHabit(name, emoji)
    onBack()
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors text-xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold text-white">{t.newHabit}</h1>
      </div>

      <AddHabitForm onAdd={handleAdd} />

    </div>
  )
}