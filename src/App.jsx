import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/approutes'

function App() {
  return (
    <div className="min-h-screen bg-background w-full">
      <AppRoutes />
    </div>
  )
}

export default App;
