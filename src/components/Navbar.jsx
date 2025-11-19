import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState({ token: null, name: '', email: '', is_admin: false })

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      setAuth(JSON.parse(saved))
    }
  }, [])

  const logout = async () => {
    try {
      const saved = localStorage.getItem('auth')
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const token = saved ? JSON.parse(saved).token : null
      await fetch(`${baseUrl}/api/logout?token=${encodeURIComponent(token || '')}`, { method: 'POST' })
    } catch {}
    localStorage.removeItem('auth')
    setAuth({ token: null, name: '', email: '', is_admin: false })
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 bg-slate-900/70 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-lg">
          College Clubs
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className="text-blue-200 hover:text-white text-sm">Home</Link>
          {auth?.token ? (
            <>
              <span className="text-blue-300 text-sm hidden sm:inline">Hi, {auth.name}</span>
              <button onClick={logout} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded">Login</Link>
              <Link to="/register" className="text-blue-200 hover:text-white text-sm">New Registration</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
