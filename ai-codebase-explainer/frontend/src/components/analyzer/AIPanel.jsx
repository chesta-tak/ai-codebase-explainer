import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Cpu, ChevronRight, Package, Layers, Terminal, BookOpen } from 'lucide-react'

const TabBtn = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
      active
        ? 'bg-gh-accent/15 text-gh-accent border border-gh-accent/30'
        : 'text-gh-muted hover:text-white hover:bg-white/5'
    }`}
  >
    {Icon && <Icon size={11} />}
    {children}
  </button>
)

export default function AIPanel({ analysis, explanation, explaining, loading }) {
  const [tab, setTab] = useState('summary')

  if (loading) {
    return (
      <div className="h-full p-5 space-y-4">
        <div className="h-4 w-32 shimmer rounded" />
        <div className="space-y-2">
          {[100, 90, 80, 70, 85].map((w, i) => (
            <div key={i} className="h-3 shimmer rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-14 h-14 rounded-2xl bg-gh-surface border border-gh-border flex items-center justify-center mb-4">
          <Cpu size={22} className="text-gh-muted" />
        </div>
        <p className="text-gh-muted text-sm">AI analysis will appear here after processing</p>
      </div>
    )
  }

  const tabs = [
    { id: 'summary', label: 'Summary', icon: BookOpen },
    { id: 'explain', label: 'File', icon: Cpu },
    { id: 'tech', label: 'Stack', icon: Layers },
    { id: 'setup', label: 'Setup', icon: Terminal },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-3 border-b border-gh-border bg-gh-surface/30">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-5 h-5 rounded bg-gh-accent/10 border border-gh-accent/20 flex items-center justify-center">
            <Cpu size={10} className="text-gh-accent" />
          </div>
          <span className="text-xs font-mono text-gh-muted">AI Panel</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <TabBtn key={t.id} active={tab === t.id} onClick={() => setTab(t.id)} icon={t.icon}>
              {t.label}
            </TabBtn>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {tab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-gh-accent/5 border border-gh-accent/20">
                <p className="text-sm text-white leading-relaxed">{analysis.summary}</p>
              </div>
              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysis.detailedExplanation}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}

          {tab === 'explain' && (
            <motion.div
              key="explain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {explaining ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <div className="w-8 h-8 border-2 border-gh-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-gh-muted text-sm font-mono">AI reading the file...</p>
                </div>
              ) : explanation ? (
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gh-muted text-sm">Click <span className="text-gh-accent font-mono">Explain this</span> on a file to get AI commentary.</p>
                </div>
              )}
            </motion.div>
          )}

          {tab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <div>
                <p className="text-gh-muted text-xs font-mono uppercase tracking-wider mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.technologies?.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-gh-accent/10 border border-gh-accent/20 text-gh-accent text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gh-muted text-xs font-mono uppercase tracking-wider mb-3">Dependencies</p>
                <div className="space-y-1">
                  {analysis.dependencies?.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-gh-muted font-mono">
                      <Package size={11} className="text-gh-orange flex-shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-gh-muted text-xs font-mono uppercase tracking-wider mb-4">Setup Steps</p>
              {analysis.setupSteps?.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-gh-accent/10 border border-gh-accent/30 flex items-center justify-center text-gh-accent text-xs font-mono flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-white leading-relaxed">{step}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
