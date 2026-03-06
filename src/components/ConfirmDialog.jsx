import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

export const ConfirmDialog = ({ habit, onConfirm, onCancel }) => {
  const { t } = useLang()
  const [step, setStep] = useState(1)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-sm space-y-4">
        {step === 1 ? (
          <>
            <p className="text-white text-xl font-semibold text-center">
              {t.confirmQ1} <span className="text-violet-400">{habit.name}</span>? {habit.emoji}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={onCancel}
                className="flex-1 py-2 rounded-xl border border-gray-600 text-gray-400 hover:bg-gray-700 transition-colors"
              >
                {t.no}
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
              >
                {t.yes}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-white text-xl font-semibold text-center">
              {t.confirmQ2} 🤔
            </p>
            <p className="text-gray-400 text-sm text-center">
              {t.confirmSub}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={onCancel}
                className="flex-1 py-2 rounded-xl border border-gray-600 text-gray-400 hover:bg-gray-700 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors"
              >
                {t.confirm} 
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}