import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

function App() {
  const [user, loading] = useAuthState(auth)
  console.log('User state:', user, 'Loading:', loading) // Debug log

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', paddingTop: '50vh' }}>Awakening the Divine...</div>

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App