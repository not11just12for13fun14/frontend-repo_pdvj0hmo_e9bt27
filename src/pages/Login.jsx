import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const res = await fetch(`${baseUrl}/api/login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      })
      if(!res.ok){
        const d = await res.json().catch(()=>({detail:'Login failed'}))
        throw new Error(d.detail || 'Login failed')
      }
      const data = await res.json()
      localStorage.setItem('auth', JSON.stringify(data))
      navigate('/')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md mx-auto px-4 pt-24">
        <h1 className="text-white text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500 text-red-200 text-sm px-3 py-2 rounded">{error}</div>}
          <div>
            <label className="block text-blue-200 text-sm mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-blue-200 text-sm mb-1">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} required type="password" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">Sign in</button>
          <div className="text-blue-300 text-sm text-center">New here? <Link to="/register" className="text-white underline">Create an account</Link></div>
        </form>
      </div>
    </div>
  )
}
