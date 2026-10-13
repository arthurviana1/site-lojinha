import { useState } from 'react'

export default function Imagem({ src, alt, label, className = '' }) {
  const [falhou, setFalhou] = useState(false)

  return (
    <div className={`image-slot ${className}`}>
      {falhou ? (
        <div className="image-placeholder" role="img" aria-label={alt}><span>{label}</span></div>
      ) : (
        <img src={src} alt={alt} onError={() => setFalhou(true)} />
      )}
    </div>
  )
}