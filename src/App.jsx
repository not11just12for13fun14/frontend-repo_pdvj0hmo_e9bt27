import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Clubs from './components/Clubs'
import Events from './components/Events'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-200">
      <Navbar />
      <Hero />
      <Clubs />
      <Events />
    </div>
  )
}

export default App