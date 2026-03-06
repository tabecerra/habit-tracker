import { useHabits } from '../hooks/useHabits'
import { useLogs } from '../hooks/useLogs'
import { useLang } from '../context/LanguageContext'
import { ArrowLeft, Flame } from 'lucide-react'
import { StreakBadge } from '../components/StreakBadge'

const DAY_LABELS = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
}

export const History = ({ onBack }) => {
  const { habits } = useHabits()
  const { getLast7Days, getDayStatus, getStreak } = useLogs()
  const { t, lang } = useLang()

  const streak = getStreak(habits)
  const last7 = getLast7Days()

  const getDayColor = (status) => {
    if (status === 'full')    return 'bg-violet-500 border-violet-400'
    if (status === 'partial') return 'bg-yellow-500/40 border-yellow-500'
    if (status === 'none')    return 'bg-gray-800 border-gray-700'
    return 'bg-gray-800 border-gray-700 opacity-30'
  }

  const getDayEmoji = (status) => {
    if (status === 'full')    return '✅'
    if (status === 'partial') return '🔶'
    if (status === 'none')    return '❌'
    return ''
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-white">{t.history}</h1>
      </div>

      {/* Streak card */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">Current streak</p>
          <div className="flex items-center gap-2">
            <Flame size={28} className="text-orange-400" />
            <span className="text-4xl font-bold text-white">{streak}</span>
            <span className="text-gray-400 text-lg">days</span>
          </div>
        </div>
        <StreakBadge streak={streak} />
      </div>

      {/* Last 7 days */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">
          Last 7 days
        </p>
        <div className="grid grid-cols-7 gap-2">
          {last7.map(dateStr => {
            const status = getDayStatus(dateStr, habits)
            const dayName = DAY_LABELS[lang][new Date(dateStr + 'T00:00:00').getDay()]
            const dayNum = new Date(dateStr + 'T00:00:00').getDate()
            const isToday = dateStr === new Date().toISOString().split('T')[0]

            return (
              <div key={dateStr} className="flex flex-col items-center gap-1">
                <span className={`text-xs ${isToday ? 'text-violet-400 font-bold' : 'text-gray-500'}`}>
                  {dayName}
                </span>
                <div className={`w-full aspect-square rounded-xl border-2 flex items-center justify-center text-sm transition-all ${getDayColor(status)}`}>
                  {getDayEmoji(status)}
                </div>
                <span className={`text-xs ${isToday ? 'text-violet-400 font-bold' : 'text-gray-600'}`}>
                  {dayNum}
                </span>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 flex-wrap">
          {[
            { color: 'bg-violet-500', label: 'All done' },
            { color: 'bg-yellow-500/40', label: 'Partial' },
            { color: 'bg-gray-800 border border-gray-700', label: 'Missed' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${item.color}`} />
              <span className="text-gray-500 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per habit breakdown */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">
          This week per habit
        </p>
        {habits.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No habits yet</p>
        ) : (
          <div className="space-y-4">
            {habits.map(habit => {
              const doneCount = last7.filter(dateStr =>
                getDayStatus(dateStr, [habit]) === 'full'
              ).length

              const percentage = Math.round((doneCount / 7) * 100)

              return (
                <div key={habit.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">
                      {habit.emoji} {habit.name}
                    </span>
                    <span className="text-gray-400 text-xs">{doneCount}/7</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}