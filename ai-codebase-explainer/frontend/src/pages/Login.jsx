import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import LandingBackground from '../components/layout/LandingBackground'
import { GitBranch, Eye, EyeOff, ArrowRight, Github } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative isolate min-h-screen bg-dark-950 flex items-center justify-center px-4 overflow-hidden">
      <LandingBackground meshOpacity={0.38} orbOpacity={0.9} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gh-accent/20 border border-gh-accent/30 flex items-center justify-center">
            <GitBranch size={14} className="text-gh-accent" />
          </div>
          <span className="font-mono font-bold text-white">codeXplain</span>
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-gh-muted text-sm mb-7">Sign in to your account</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-lg bg-gh-red/10 border border-gh-red/30 text-gh-red text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* GitHub OAuth */}
          <a
            href="http://localhost:5000/api/auth/github"
            className="w-full btn-ghost py-3 flex items-center justify-center gap-2 border border-gh-border hover:bg-gh-surface/50 transition-colors rounded-lg font-medium mb-6"
          >
            <Github size={16} />
            Sign in with GitHub
          </a>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gh-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gh-surface text-gh-muted">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gh-muted mb-1.5">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gh-muted mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gh-muted hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight size={14} /></>
              )}
            </button>
          </form>

          <p className="text-center text-gh-muted text-sm mt-6">
            No account?{' '}
            <Link to="/signup" className="text-gh-accent hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
