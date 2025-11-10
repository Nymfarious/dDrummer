import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Runner from './Runner'

function RootRouter() {
  const path = window.location.pathname || '/'
  if (path.startsWith('/runner')) return <Runner />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
)
