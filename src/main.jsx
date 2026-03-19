import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.jsx'

// Registra el Service Worker para que las actualizaciones PWA se apliquen automáticamente
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
)