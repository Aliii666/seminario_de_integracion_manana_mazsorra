// src/02useEffect/WindowSize.tsx

import { useState, useEffect } from 'react'

interface WindowDimensions {
  width:  number
  height: number
}

export default function WindowSize() {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width:  window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width:  window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <p style={{ fontFamily: 'monospace', fontSize: 14, color: '#374151' }}>
      Ventana: {dimensions.width} × {dimensions.height} px
    </p>
  )
}
