import { pujaData } from '../data/pujaData'
import { X } from 'lucide-react'

export default function AboutModal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content fade-in">
        <span className="close" onClick={onClose}><X size={30} /></span>
        <h2 style={{ color: 'var(--gold)', textAlign: 'center' }}>About Durga Puja 2025</h2>
        <h3>History & Lore</h3>
        <p>{pujaData.about.history}</p>
        <h3>Rituals to Revel In</h3>
        <p>{pujaData.about.rituals}</p>
        <h3>2025 Trends</h3>
        <p>{pujaData.about.trends}</p>
        <button onClick={onClose} className="glow">Back to Pandals</button>
      </div>
    </div>
  )
}