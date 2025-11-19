import { useEffect, useState } from 'react'

export default function Admin(){
  const [auth, setAuth] = useState(null)
  const [clubName, setClubName] = useState('')
  const [clubDesc, setClubDesc] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [message, setMessage] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if(saved){ setAuth(JSON.parse(saved)) }
  }, [])

  const createClub = async (e) => {
    e.preventDefault()
    setMessage('')
    try{
      const res = await fetch(`${baseUrl}/api/clubs?token=${encodeURIComponent(auth?.token || '')}` , {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name: clubName, description: clubDesc })
      })
      if(!res.ok){
        const d = await res.json().catch(()=>({detail:'Failed'}))
        throw new Error(d.detail || 'Failed to create club')
      }
      setClubName(''); setClubDesc('')
      setMessage('Club created')
    }catch(err){ setMessage(err.message) }
  }

  const createEvent = async (e) => {
    e.preventDefault()
    setMessage('')
    try{
      const res = await fetch(`${baseUrl}/api/events?token=${encodeURIComponent(auth?.token || '')}` , {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ title: eventTitle, description: eventDesc, date: new Date(eventDate).toISOString() })
      })
      if(!res.ok){
        const d = await res.json().catch(()=>({detail:'Failed'}))
        throw new Error(d.detail || 'Failed to create event')
      }
      setEventTitle(''); setEventDesc(''); setEventDate('')
      setMessage('Event created')
    }catch(err){ setMessage(err.message) }
  }

  if(!auth){
    return (
      <div className="min-h-screen grid place-items-center text-white">Please login to continue.</div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-white text-2xl font-semibold mb-6">Admin Panel</h1>
        {message && <div className="mb-4 text-blue-200">{message}</div>}

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={createClub} className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 space-y-3">
            <h2 className="text-white font-medium mb-2">Create Club</h2>
            <input placeholder="Club name" value={clubName} onChange={e=>setClubName(e.target.value)} required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            <textarea placeholder="Description" value={clubDesc} onChange={e=>setClubDesc(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">Add Club</button>
          </form>

          <form onSubmit={createEvent} className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 space-y-3">
            <h2 className="text-white font-medium mb-2">Create Event</h2>
            <input placeholder="Event title" value={eventTitle} onChange={e=>setEventTitle(e.target.value)} required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            <textarea placeholder="Description" value={eventDesc} onChange={e=>setEventDesc(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            <input type="datetime-local" value={eventDate} onChange={e=>setEventDate(e.target.value)} required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  )
}
