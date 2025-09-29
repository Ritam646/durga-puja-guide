import { pujaData } from '../data/pujaData'
import { useState } from 'react'

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Jai Ma! Ask about 50+ pandals, themes, or tours? 🌟", sender: 'bot' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [lastQuery, setLastQuery] = useState(null)

  const getBestMatch = (query) => {
    const lowerQuery = query.toLowerCase().trim()
    const words = lowerQuery.split(' ')
    let bestMatch = pujaData.faq.find(f => f.q === 'default')
    let highestScore = 0

    pujaData.faq.forEach(faq => {
      const matchScore = words.reduce((score, word) => score + (faq.q.includes(word) ? 1 : 0), 0)
      if (matchScore > highestScore) {
        highestScore = matchScore
        bestMatch = faq
      }
    })

    // Context-aware follow-up
    if (lastQuery && lowerQuery.includes('more') && bestMatch.q === 'default') {
      if (lastQuery.includes('pandals')) return `More pandals near ${lastQuery.split('near ')[1]}: Check map for additional markers! Want metro routes?`
      if (lastQuery.includes('food')) return "More food options: Try jhal muri or luchi-aloo at local stalls. Hungry for more tips?"
    }

    return bestMatch.a
  }

  const send = () => {
    if (!input.trim()) return
    const userMsg = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)
    setLastQuery(input)
    setTimeout(() => {
      const response = getBestMatch(input)
      setMessages(prev => [...prev, { text: response, sender: 'bot' }])
      setTyping(false)
    }, 1000 + Math.random() * 1000) // Smoother typing delay
    setInput('')
  }

  return (
    <div className="chatbot glow">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
        {typing && <div className="message bot">Typing<span>.</span><span style={{ animationDelay: '0.3s' }}>.</span><span style={{ animationDelay: '0.6s' }}>.</span></div>}
      </div>
      <div className="chat-input">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && send()} 
          placeholder="E.g., 'Best pandals near Kalighat' or 'More food'" 
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}