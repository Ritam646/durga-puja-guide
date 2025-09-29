import { useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState, useEffect } from 'react'
import { LogIn } from 'lucide-react'
import { pujaData } from '../data/pujaData'

export default function LandingPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    // Generate floating particles
    const particles = document.createElement('div')
    particles.className = 'particles'
    document.body.appendChild(particles)
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 6 + 's'
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's'
      particles.appendChild(particle)
    }
    return () => document.body.removeChild(particles)
  }, [])

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, provider)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      alert('Sign-in failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="landing fade-in">
      <img src="/durga-icon.png" alt="Ma Durga" className="logo" />
      <h1>Shubho Durga Puja 2025</h1>
      <p>Discover 50+ Pandals, Metro Routes, & Chat for Divine Guidance!</p>
      <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Mahalaya Begins: 21st September</p>
      <button onClick={handleSignIn} disabled={loading} className="glow">
        {loading ? 'Entering the Divine Realm...' : <>Enter with Google <LogIn size={20} /></>}
      </button>
      <p style={{ marginTop: '2rem', opacity: 0.8 }}>A UNESCO Heritage Odyssey in Kolkata</p>
    </div>
  )
}