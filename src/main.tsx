import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import './locale/i18n.ts'
import AppProvider from './providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
