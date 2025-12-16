import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// biome-ignore lint/style/noNonNullAssertion: it's mandatory in TS
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)