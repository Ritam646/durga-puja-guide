import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { pujaData } from '../data/pujaData'
import { useState, useEffect } from 'react'

const mapStyle = { width: '100%', height: '100%' }
const center = { lat: 22.5726, lng: 88.3639 }

export default function GoogleMapComponent() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    // Pulse zoom on load
    const timer = setTimeout(() => {}, 1000); // Integrate with map events if needed
  }, [])

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={12} className="glow">
        {pujaData.pandals.map(p => (
          <Marker 
            key={p.id} 
            position={p.location} 
            onClick={() => setSelected(p)}
            title={p.name}
            icon={{  // Custom glowing icon
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="12" fill="gold" opacity="0.8"/></svg>'),
              scaledSize: { width: 32, height: 32 }
            }}
          />
        ))}
        {selected && (
          <InfoWindow position={selected.location} onCloseClick={() => setSelected(null)}>
            <div style={{ background: 'linear-gradient(var(--gold), var(--red))', padding: '10px', borderRadius: '10px', animation: 'glow 1s infinite' }}>
              <h3>{selected.name}</h3>
              <p>{selected.highlight}</p>
              <p><strong>Metro:</strong> {selected.metro}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}