import { useEffect } from 'react'

export default function SpotlightCursor() {
  useEffect(() => {
    const el = document.createElement('div')
    el.className = 'spotlight'
    document.body.appendChild(el)

    const move = (e) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.removeChild(el)
    }
  }, [])

  return null
}
