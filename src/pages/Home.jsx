import { useState } from 'react'
import { useHabits } from '../hooks/useHabits'
import { useLogs } from '../hooks/useLogs'
import { HabitCard } from '../components/HabitCard'
import { StreakBadge } from '../components/StreakBadge'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { useLang } from '../context/LanguageContext'
import { ProgressBar } from '../components/ProgressBar'
import { History, Plus } from 'lucide-react'

export const Home = ({ onNavigate }) => {
  const { t, lang, toggleLang } = useLang()
  const { habits, deleteHabit } = useHabits()
  const { isCompletedToday, completeHabit, getStreak } = useLogs()
  const streak = getStreak(habits)
  const [selectedHabit, setSelectedHabit] = useState(null)
  const [habitToDelete, setHabitToDelete] = useState(null)

  const handleConfirm = () => {
    completeHabit(selectedHabit.id)
    setSelectedHabit(null)
  }

  const completed = habits.filter(h => isCompletedToday(h.id))
  const pending = habits.filter(h => !isCompletedToday(h.id))

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 max-w-md mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <ProgressBar completed={completed.length} total={habits.length} />
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t.title}</h1>
          <p className="text-gray-400 mt-1">
            {completed.length} {t.of} {habits.length} {t.done}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StreakBadge streak={streak} />
          <button
            onClick={toggleLang}
            className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 hover:border-violet-500 text-gray-400 hover:text-white transition-all text-xs font-bold flex items-center justify-center"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="w-10 h-10 rounded-full bg-gray-600 hover:bg-violet-500 text-white font-bold text-xl transition-colors flex items-center justify-center"
          >
            <History className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('add')}
            className="w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xl transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Pending habits */}
      <div className="space-y-3">
        {pending.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completed={false}
            onComplete={setSelectedHabit}
            onDelete={setHabitToDelete}
          />
        ))}
      </div>

      {/* Completed habits */}
      {completed.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{t.completed}</p>
          {completed.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={true}
              onComplete={setSelectedHabit}
              onDelete={setHabitToDelete}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {habits.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-5xl mb-4">🌱</p>
          <p className="text-lg">{t.noHabits}</p>
        </div>
      )}

      {/* Confirm dialog */}
      {selectedHabit && (
        <ConfirmDialog
          habit={selectedHabit}
          onConfirm={handleConfirm}
          onCancel={() => setSelectedHabit(null)}
        />
      )}
      {habitToDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-sm space-y-4">
                <p className="text-white text-xl font-semibold text-center">
                    {t.deleteQ} <span className="text-red-400">{habitToDelete.name}</span>? {habitToDelete.emoji}
                </p>
                <p className="text-gray-400 text-sm text-center">
                    {t.deleteWarning}
                </p>
                <div className="flex gap-3">
                    <button
                    onClick={() => setHabitToDelete(null)}
                    className="flex-1 py-2 rounded-xl border border-gray-600 text-gray-400 hover:bg-gray-700 transition-colors"
                    >
                    {t.cancel}
                    </button>
                    <button
                    onClick={() => {
                        deleteHabit(habitToDelete.id)
                        setHabitToDelete(null)
                    }}
                    className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors"
                    >
                    {t.delete}
                    </button>
                </div>
            </div>
        </div>
    )}
    </div>
  )
}