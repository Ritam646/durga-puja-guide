import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import GoogleMapComponent from './GoogleMapComponent'
import Chatbot from './Chatbot'
import AboutModal from './AboutModal'
import { useState } from 'react'
import { LogOut, Info } from 'lucide-react'
import { pujaData } from '../data/pujaData'

export default function Dashboard() {
  const [user] = useAuthState(auth)
  const [showChat, setShowChat] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <>
      <div className="dashboard fade-in">
        <header className="header glow">
          <h1 style={{ fontFamily: 'Dancing Script', fontSize: '2rem' }}>Jai Ma Durga, {user?.displayName}!</h1>
          <div>
            <button onClick={() => setShowAbout(true)}><Info size={20} /> About Pujo</button>
            <button onClick={handleSignOut}><LogOut size={20} /> Sign Out</button>
          </div>
        </header>
        <div className="map-container">
          <GoogleMapComponent />
        </div>
        <button onClick={() => setShowChat(!showChat)} className="glow">
          {showChat ? 'Hide Divine Chat' : 'Summon Chatbot'}
        </button>
        <p style={{ textAlign: 'center', opacity: 0.8 }}>Explore 50+ Pandals – Click Markers for Magic!</p>
      </div>
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showChat && <Chatbot />}
    </>
  )
}