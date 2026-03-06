import { useState } from 'react'
import { Home } from './pages/Home'
import { AddHabit } from './pages/AddHabit'
import { History } from './pages/History'

function App() {
  const [screen, setScreen] = useState('home')

  if (screen === 'add') return <AddHabit onBack={() => setScreen('home')} />
  if (screen === 'history') return <History onBack={() => setScreen('home')} />

  return <Home onNavigate={setScreen} />
}

export default App