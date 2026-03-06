import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

const EMOJI_OPTIONS = ['📚', '🏋️', '🧘', '💧', '🍎', '🛌', '✍️', '🎯', '🚶', '💊', '🧹', '🎸']

export const AddHabitForm = ({ onAdd }) => {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🎯')

  const handleSubmit = () => {
    if (!name.trim()) return
    onAdd(name.trim(), emoji)
    setName('')
    setEmoji('🎯')
  }

  return (
    <div className="space-y-6">

      {/* Habit name */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {t.habitName}
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t.habitPlaceholder}
          className="w-full bg-gray-800 border border-gray-700 focus:border-violet-500 text-white rounded-xl px-4 py-3 outline-none transition-colors placeholder-gray-600"
        />
      </div>

      {/* Emoji picker */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {t.pickEmoji}
        </label>
        <div className="grid grid-cols-6 gap-2">
          {EMOJI_OPTIONS.map(e => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`text-2xl p-2 rounded-xl border transition-all
                ${emoji === e
                  ? 'border-violet-500 bg-violet-500/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
        <span className="text-2xl">{emoji}</span>
        <span className="text-white font-medium">{name || t.yourHabitName}</span>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!name.trim()}
        className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold transition-colors"
      >
        {t.addHabit}
      </button>

    </div>
  )
}