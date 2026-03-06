import { Trash2, CircleCheckIcon } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export const HabitCard = ({ habit, completed, onComplete, onDelete }) => {
  const { t } = useLang()

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-2xl border transition-all
        ${completed
          ? 'bg-gray-800 border-green-500/40 opacity-60'
          : 'bg-gray-800 border-gray-700 hover:border-violet-500/60'
        }`}
    >
      {/* Left side — emoji + name */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{habit.emoji}</span>
        <span className={`text-lg font-medium ${completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {habit.name}
        </span>
      </div>

      {/* Right side — button or checkmark */}
      <div className="flex items-center gap-2">
        {completed ? (
          <span className="text-green-400 text-xl"><CircleCheckIcon /></span>
        ) : (
          <button
            onClick={() => onComplete(habit)}
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {t.done}
          </button>
        )}
        <button
          onClick={() => onDelete(habit)}
          className="text-gray-600 hover:text-red-400 transition-colors text-lg p-1 flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}