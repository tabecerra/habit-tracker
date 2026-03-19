import { Flame } from 'lucide-react'

export const StreakBadge = ({ streak }) => {
  if (streak === 0) return null

  const getPanel = () => {
    if (streak >= 30) return 'border-red-500/40 bg-red-500/10'
    if (streak >= 14) return 'border-orange-500/40 bg-orange-500/10'
    if (streak >= 7) return 'border-yellow-500/40 bg-yellow-500/10'
    return 'border-violet-500/40 bg-violet-500/10'
  }

  const getStreakText = () => {
    if (streak >= 30) return 'text-red-400'
    if (streak >= 14) return 'text-orange-400'
    if (streak >= 7) return 'text-yellow-400'
    return 'text-violet-400'
  }

  return (
    <span
      className={`inline-flex flex-col items-center justify-center gap-0.5 rounded-full border p-1.5 w-11 h-11 shrink-0 text-xs font-semibold tabular-nums ${getPanel()}`}
      aria-label={`Streak: ${streak}`}
    >
      <Flame
        className="w-4 h-4 shrink-0 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.45)]"
        fill="currentColor"
        fillOpacity={0.35}
        strokeWidth={2}
        aria-hidden
      />
      <span className={`leading-none ${getStreakText()}`}>{streak}</span>
    </span>
  )
}
