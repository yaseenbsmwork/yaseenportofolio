import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/approutes'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <div className="min-h-screen bg-background w-full cursor-none">
      <CustomCursor />
      <AppRoutes />
    </div>
  )
}

export default App;
