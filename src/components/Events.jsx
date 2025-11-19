import { useEffect, useState } from 'react'

export default function Events(){
  const [events, setEvents] = useState([])

  const load = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/api/events`)
    setEvents(await res.json())
  }

  useEffect(() => { load() }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(e => (
          <div key={e.id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-medium">{e.title}</h3>
            <p className="text-blue-200 text-sm mt-1">{e.description || 'No description'}</p>
            <p className="text-blue-300 text-xs mt-2">{new Date(e.date).toLocaleString()}</p>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-blue-300">No events yet.</div>
        )}
      </div>
    </section>
  )
}
