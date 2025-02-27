import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemeProvider } from './ContextAPI/MemeContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <MemeProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </MemeProvider>
)
