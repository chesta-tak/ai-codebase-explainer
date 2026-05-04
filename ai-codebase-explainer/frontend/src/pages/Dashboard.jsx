import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LandingBackground from '../components/layout/LandingBackground'
import Navbar from '../components/layout/Navbar'
import {
  GitBranch, Plus, Star, Clock, Terminal,
  MessageSquare, RefreshCw, Folder, AlertCircle
} from 'lucide-react'

const stagger = { visible: { transition: { staggerChildren: 0.07 } } }
const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }

function SkeletonCard() {
  return (
    <div className="p-5 rounded-xl border border-gh-border bg-gh-surface/30 animate-pulse">
      <div className="h-4 w-48 shimmer rounded mb-3" />
      <div className="h-3 w-full shimmer rounded mb-2" />
      <div className="h-3 w-32 shimmer rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-20 shimmer rounded-full" />
        <div className="h-6 w-16 shimmer rounded-full" />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/repo/history')
      setHistory(data)
    } catch (err) {
      setError('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-dark-950">
      <LandingBackground meshOpacity={0.4} orbOpacity={0.9} />
      <Navbar />

      <main className="relative max-w-5xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="font-mono text-gh-muted ">dashboard</h1>
            <h1 className="text-2xl font-bold text-white">
              Good to see you, <span className="text-blue-400">{user?.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-gh-muted text-sm mt-1">
              {history.length} {history.length === 1 ? 'repository' : 'repositories'} analyzed
            </p>
          </div>
          <Link
            to="/analyzer"
            className="btn-primary flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus size={15} /> New Analysis
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { label: 'Total Repos', value: history.length },
            { label: 'Technologies', value: [...new Set(history.flatMap(h => h.analysis?.technologies || []))].length },
            { label: 'This Month', value: history.filter(h => new Date(h.repository?.analyzedAt) > new Date(Date.now() - 30 * 86400000)).length },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-gh-border bg-gh-surface/30 text-center">
              <p className="text-2xl font-bold text-white font-mono">{s.value}</p>
              <p className="text-gh-muted text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Repo list */}
        {error && (
          <div className="flex items-center gap-2 text-gh-red text-sm mb-6">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-14 h-14 rounded-2xl bg-gh-surface border border-gh-border flex items-center justify-center mx-auto mb-4">
              <Folder size={22} className="text-gh-muted" />
            </div>
            <h3 className="text-white font-semibold mb-2">No repositories yet</h3>
            <p className="text-gh-muted text-sm mb-6">Analyze your first GitHub repository to get started.</p>
            <Link to="/analyzer" className="btn-primary inline-flex items-center gap-2">
              <Plus size={14} /> Analyze a repo
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid gap-4"
          >
            {history.map(({ repository, analysis }) => (
              <motion.div
                key={repository._id}
                variants={fadeUp}
                className="group p-5 rounded-xl border border-gh-border hover:border-gh-accent/40 bg-gh-surface/30 hover:bg-gh-surface/50 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <GitBranch size={14} className="text-gh-accent flex-shrink-0" />
                      <h3 className="text-white font-semibold text-sm truncate">
                        {repository.owner}/{repository.repoName}
                      </h3>
                      {repository.language && (
                        <span className="px-2 py-0.5 rounded-full bg-gh-accent/10 text-gh-accent text-xs font-mono flex-shrink-0">
                          {repository.language}
                        </span>
                      )}
                    </div>
                    {analysis?.summary && (
                      <p className="text-gh-muted text-sm leading-relaxed line-clamp-2 mb-3">
                        {analysis.summary}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gh-muted">
                      <span className="flex items-center gap-1">
                        <Star size={11} className="text-gh-orange" />
                        {repository.stars?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {formatDate(repository.analyzedAt)}
                      </span>
                      {analysis?.technologies?.slice(0, 4).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-gh-border/50 text-gh-muted font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/chat/${repository._id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gh-border hover:border-gh-accent/40 text-gh-muted hover:text-gh-accent text-xs transition-all"
                    >
                      <MessageSquare size={12} /> Chat
                    </Link>
                    <Link
                      to={`/analyzer/${repository._id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gh-accent/10 border border-gh-accent/30 text-gh-accent hover:bg-gh-accent/20 text-xs transition-all"
                    >
                      <Terminal size={12} /> Open
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
