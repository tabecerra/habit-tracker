import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    title: "Today's Habits",
    done: "Done",
    completed: "Completed",
    noHabits: "No habits yet. Add your first one!",
    confirmQ1: "Did you complete",
    confirmQ2: "Are you sure?",
    confirmSub: "Just making sure you really did it!",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    cancel: "Cancel",
    delete: "Delete",
    deleteQ: "Delete",
    deleteWarning: "This will remove the habit and all its history forever.",
    newHabit: "New Habit",
    habitName: "Habit name",
    habitPlaceholder: "e.g. Read 30 minutes",
    pickEmoji: "Pick an emoji",
    preview: "Preview",
    addHabit: "Add Habit",
    history: "History",
    back: "Back",
    of: "of",
    comingSoon: "Coming soon...",
    yourHabitName: "Your habit name",
  },
  es: {
    title: "Hábitos de Hoy",
    done: "Listo",
    completed: "Completados",
    noHabits: "Sin hábitos aún. ¡Agregá el primero!",
    confirmQ1: "¿Completaste",
    confirmQ2: "¿Estás seguro?",
    confirmSub: "¡Solo asegurándonos que lo hiciste!",
    yes: "Sí",
    no: "No",
    confirm: "Confirmar",
    cancel: "Cancelar",
    delete: "Eliminar",
    deleteQ: "¿Eliminar",
    deleteWarning: "Esto eliminará el hábito y todo su historial para siempre.",
    newHabit: "Nuevo Hábito",
    habitName: "Nombre del hábito",
    habitPlaceholder: "ej. Leer 30 minutos",
    pickEmoji: "Elegí un emoji",
    preview: "Vista previa",
    addHabit: "Agregar Hábito",
    history: "Historial",
    back: "Volver",
    of: "de",
    comingSoon: "Próximamente...",
    yourHabitName: "Nombre de tu hábito",
  }
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const toggleLang = () => {
    const next = lang === 'en' ? 'es' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)