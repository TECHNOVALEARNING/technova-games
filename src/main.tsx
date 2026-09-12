import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Clean up any legacy dark mode class to ensure clean light mode
if (typeof document !== 'undefined') {
  document.documentElement.classList.remove('dark');
  document.body?.classList.remove('dark');
  localStorage.removeItem('technova_theme');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
