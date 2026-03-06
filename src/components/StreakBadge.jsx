export const StreakBadge = ({ streak }) => {
    if (streak === 0) return null
  
    const getColor = () => {
      if (streak >= 30) return 'text-red-400 border-red-500/40 bg-red-500/10'
      if (streak >= 14) return 'text-orange-400 border-orange-500/40 bg-orange-500/10'
      if (streak >= 7)  return 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10'
      return 'text-violet-400 border-violet-500/40 bg-violet-500/10'
    }
  
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getColor()}`}>
        🔥 {streak}
      </span>
    )
  }