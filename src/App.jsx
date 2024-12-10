import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserNav from './components/header/UserNav'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <UserNav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  )
}

export default App
