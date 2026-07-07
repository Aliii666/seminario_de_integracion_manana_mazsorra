// src/components/VideoPlayer.tsx
import React, { useRef, useState } from 'react'

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  function handlePause() {
    videoRef.current?.pause()
    setIsPlaying(false)
  }

  function handleFastForward() {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  function handleRewind() {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 400,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Reproductor de Video (Video Element Ref)
      </h3>

      <video
        ref={videoRef}
        width="100%"
        style={{ borderRadius: 8, backgroundColor: '#000' }}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={handleRewind} style={controlBtnStyle}>
          ⏪ -10s
        </button>
        {isPlaying ? (
          <button onClick={handlePause} style={{ ...controlBtnStyle, backgroundColor: '#f59e0b', color: '#fff' }}>
            ⏸ Pausar
          </button>
        ) : (
          <button onClick={handlePlay} style={{ ...controlBtnStyle, backgroundColor: '#22c55e', color: '#fff' }}>
            ▶ Reproducir
          </button>
        )}
        <button onClick={handleFastForward} style={controlBtnStyle}>
          ⏩ +10s
        </button>
      </div>
    </div>
  )
}

const controlBtnStyle = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  color: '#374151',
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
  outline: 'none',
}
