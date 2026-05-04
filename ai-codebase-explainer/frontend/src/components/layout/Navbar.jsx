import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { Terminal, LayoutDashboard, MessageSquare, LogOut, Menu, X, GitBranch } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = user
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/analyzer', label: 'Analyze', icon: Terminal },
        { to: '/chat', label: 'Chat', icon: MessageSquare },
      ]
    : [
        { to: '/login', label: 'Sign in', icon: null },
        { to: '/signup', label: 'Get started', icon: null, primary: true },
      ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className={`glass rounded-full px-5 py-3 flex items-center gap-6 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-2">
          <div className="w-6 h-6 rounded-md bg-warm-accent/20 border border-warm-accent/30 flex items-center justify-center">
            <GitBranch size={12} className="text-warm-accent" />
          </div>
          <span className="font-mono text-sm font-semibold text-white hidden sm:block">codeXplain</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                link.primary
                  ? 'bg-warm-400 text-white hover:bg-warm-600  hover:opacity-100' 
                  : location.pathname === link.to
                  ? 'bg-white/10 text-white'
                  : 'text-gh-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon && <link.icon size={13} />}
              {link.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-gh-muted hover:text-gh-red hover:bg-white/5 transition-all duration-200 ml-1"
            >
              <LogOut size={13} />
              <span className="hidden sm:block">Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gh-muted hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute top-16 left-4 right-4 rounded-2xl p-4 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  link.primary
                    ? 'bg-warm-400 text-white hover:bg-warm-600  hover:opacity-100'
                    : 'text-warm-accent hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon && <link.icon size={14} />}
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gh-muted hover:text-gh-red hover:bg-white/5 transition-all text-left"
              >
                <LogOut size={14} /> Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
