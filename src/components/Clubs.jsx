import { useEffect, useState } from 'react'

export default function Clubs(){
  const [clubs, setClubs] = useState([])

  const load = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/api/clubs`)
    setClubs(await res.json())
  }

  useEffect(() => { load() }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Clubs</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map(c => (
          <div key={c.id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-medium">{c.name}</h3>
            <p className="text-blue-200 text-sm mt-1">{c.description || 'No description'}</p>
          </div>
        ))}
        {clubs.length === 0 && (
          <div className="text-blue-300">No clubs yet.</div>
        )}
      </div>
    </section>
  )
}
