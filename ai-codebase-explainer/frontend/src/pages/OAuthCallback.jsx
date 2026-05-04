import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LandingBackground from '../components/layout/LandingBackground'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUserState } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const userStr = params.get('user')

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr))
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Update the auth context state
        setUserState(user)

        // Navigate to dashboard
        navigate('/dashboard')
      } catch {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [location, navigate, setUserState])

  return (
    <div className="relative isolate min-h-screen bg-dark-950 flex items-center justify-center overflow-hidden">
      <LandingBackground meshOpacity={0.3} orbOpacity={0.75} />
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-gh-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white font-mono text-sm">Signing you in...</p>
      </div>
    </div>
  )
}
