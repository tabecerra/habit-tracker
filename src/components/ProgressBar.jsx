export const ProgressBar = ({ completed, total }) => {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
  
    const getColor = () => {
      if (percentage === 100) return 'bg-green-500'
      if (percentage >= 50)  return 'bg-violet-500'
      return 'bg-violet-700'
    }
  
    return (
      <div className="w-full space-y-1">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {percentage === 100 && (
          <p className="text-green-400 text-xs font-semibold text-right">
            All done! 🎉
          </p>
        )}
      </div>
    )
  }