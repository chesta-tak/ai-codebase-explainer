import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import api from '../utils/api'
import LandingBackground from '../components/layout/LandingBackground'
import Navbar from '../components/layout/Navbar'
import {
  Send, GitBranch, MessageSquare, ChevronLeft,
  Cpu, User, AlertCircle, Plus, Trash2
} from 'lucide-react'

const SUGGESTED = [
  'What is the overall architecture of this project?',
  'How does authentication work in this codebase?',
  'What are the main dependencies and why are they used?',
  'How would I run this project locally?',
  'What design patterns are used in this codebase?',
  'Explain the folder structure and what each part does.',
]

function Message({ msg, isLast }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
        isUser
          ? 'bg-gh-accent/20 border border-gh-accent/30 text-gh-accent'
          : 'bg-gh-surface border border-gh-border text-gh-muted'
      }`}>
        {isUser ? <User size={13} /> : <Cpu size={13} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'bg-gh-accent/10 border border-gh-accent/20 text-white rounded-tr-sm'
          : 'bg-gh-surface border border-gh-border text-white rounded-tl-sm'
      }`}>
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none prose-pre:bg-black/40 prose-pre:border prose-pre:border-gh-border prose-code:text-gh-accent prose-code:bg-gh-accent/10 prose-code:px-1 prose-code:rounded">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3"
    >
      <div className="w-7 h-7 rounded-full bg-gh-surface border border-gh-border flex items-center justify-center flex-shrink-0">
        <Cpu size={13} className="text-gh-muted" />
      </div>
      <div className="bg-gh-surface border border-gh-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gh-muted"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Chat() {
  const { repoId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [repoInfo, setRepoInfo] = useState(null)
  const [repoLoading, setRepoLoading] = useState(!!repoId)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (repoId) fetchRepo()
  }, [repoId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  const fetchRepo = async () => {
    try {
      const { data } = await api.get(`/repo/${repoId}`)
      setRepoInfo(data)
      setMessages([{
        role: 'assistant',
        content: `Hey! I've loaded **${data.repository.owner}/${data.repository.repoName}** and I'm ready to answer your questions.\n\n${data.analysis?.summary || ''}\n\nWhat would you like to know?`,
      }])
    } catch {
      setError('Could not load repository context')
    } finally {
      setRepoLoading(false)
    }
  }

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg || sending) return

    setInput('')
    setError('')
    const updatedMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(updatedMessages)
    setSending(true)

    try {
      const { data } = await api.post('/ai/chat', {
        messages: updatedMessages,
        repoId: repoId || null,
      })
      setMessages([...updatedMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get a response. Try again.')
      setMessages(updatedMessages)
    } finally {
      setSending(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const clearChat = () => {
    setMessages(repoInfo ? [{
      role: 'assistant',
      content: `Chat cleared. I still have context for **${repoInfo.repository.owner}/${repoInfo.repository.repoName}**. Ask me anything!`,
    }] : [])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="relative isolate h-screen bg-dark-950 flex flex-col overflow-hidden">
      <LandingBackground meshOpacity={0.35} orbOpacity={0.8} />
      <Navbar />

      {/* Header */}
      <div className="flex-shrink-0 mt-[72px] border-b border-gh-border bg-gh-surface/50 px-4 py-2.5 flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <Link to={repoId ? `/analyzer/${repoId}` : '/dashboard'} className="text-gh-muted hover:text-white transition-colors flex-shrink-0">
            <ChevronLeft size={16} />
          </Link>
          <div className="w-6 h-6 rounded-lg bg-gh-accent/10 border border-gh-accent/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={12} className="text-gh-accent" />
          </div>
          {repoInfo ? (
            <div className="flex items-center gap-2 min-w-0">
              <GitBranch size={12} className="text-gh-accent flex-shrink-0" />
              <span className="font-mono text-sm text-white truncate">
                {repoInfo.repository.owner}/{repoInfo.repository.repoName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gh-green/10 border border-gh-green/30 text-gh-green text-xs font-mono flex-shrink-0 hidden sm:block">
                context loaded
              </span>
            </div>
          ) : (
            <span className="font-mono text-sm text-white">AI Chat</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gh-border text-gh-muted hover:text-gh-red hover:border-gh-red/40 text-xs transition-all"
            >
              <Trash2 size={11} /> Clear
            </button>
          )}
          {!repoId && (
            <Link
              to="/analyzer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gh-accent/10 border border-gh-accent/30 text-gh-accent hover:bg-gh-accent/20 text-xs transition-all"
            >
              <Plus size={11} /> Load Repo
            </Link>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto relative">
        {repoLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-gh-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : isEmpty ? (
          /* Empty state with suggestions */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full px-4 py-12"
          >
            <div className="w-14 h-14 rounded-2xl bg-gh-surface border border-gh-border flex items-center justify-center mb-5">
              <Cpu size={22} className="text-gh-accent" />
            </div>
            <h2 className="text-white font-semibold text-lg mb-2">Ask about any codebase</h2>
            <p className="text-gh-muted text-sm text-center max-w-sm mb-8">
              {repoId
                ? 'I have full context of this repository. Ask me anything about the code, architecture, or setup.'
                : 'Open a repository first for full context, or ask general coding questions.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left p-3 rounded-xl border border-gh-border hover:border-gh-accent/40 bg-gh-surface/30 hover:bg-gh-surface/60 text-gh-muted hover:text-white text-xs leading-relaxed transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} isLast={i === messages.length - 1} />
              ))}
              {sending && <TypingIndicator key="typing" />}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-gh-red text-sm p-3 rounded-lg bg-gh-red/5 border border-gh-red/20"
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gh-border bg-gh-surface/30 p-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Suggestion chips when chat is active */}
          {messages.length > 0 && messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
              {SUGGESTED.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full border border-gh-border text-gh-muted hover:text-white hover:border-gh-accent/40 text-xs transition-all"
                >
                  {s.length > 40 ? s.slice(0, 40) + '…' : s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={repoId ? "Ask about this repository..." : "Ask a coding question..."}
                rows={1}
                className="w-full bg-gh-surface border border-gh-border rounded-xl px-4 py-3 text-sm text-white placeholder-gh-muted outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent/30 transition-all resize-none font-sans leading-relaxed"
                style={{ minHeight: '48px', maxHeight: '160px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
                }}
                disabled={sending}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || sending}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-gh-accent hover:bg-blue-400 disabled:bg-gh-surface disabled:border disabled:border-gh-border flex items-center justify-center transition-all disabled:cursor-not-allowed active:scale-95"
            >
              {sending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={15} className={input.trim() ? 'text-white' : 'text-gh-muted'} />
              )}
            </button>
          </div>
          <p className="text-gh-muted text-xs mt-2 text-center font-mono">
            Enter to send · Shift+Enter for newline
          </p>
        </div>
      </div>
    </div>
  )
}
