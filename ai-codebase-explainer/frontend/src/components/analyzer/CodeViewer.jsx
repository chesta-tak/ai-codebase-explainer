import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Cpu, FileCode } from 'lucide-react'

const EXT_LANG_MAP = {
  js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
  py: 'python', go: 'go', rs: 'rust', java: 'java',
  json: 'json', md: 'markdown', css: 'css', html: 'html',
  sh: 'bash', bash: 'bash', yml: 'yaml', yaml: 'yaml',
  xml: 'xml', sql: 'sql', rb: 'ruby', php: 'php',
}

function getLanguage(filename) {
  const ext = filename?.split('.').pop()?.toLowerCase()
  return EXT_LANG_MAP[ext] || 'text'
}

export default function CodeViewer({ file, code, loading, onExplain, explaining }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!file && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-14 h-14 rounded-2xl bg-gh-surface border border-gh-border flex items-center justify-center mb-4">
          <FileCode size={22} className="text-gh-muted" />
        </div>
        <p className="text-gh-muted text-sm">Select a file from the explorer to view its contents</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b border-gh-border flex items-center justify-between">
          <div className="h-4 w-48 shimmer rounded" />
        </div>
        <div className="flex-1 p-6 space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-4 shimmer rounded"
              style={{ width: `${40 + Math.random() * 50}%` }}
            />
          ))}
        </div>
      </div>
    )
  }

  const lang = getLanguage(file?.name)

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-gh-border bg-gh-surface/30 px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white bg-gh-accent/10 px-2 py-0.5 rounded border border-gh-accent/20">
            {file?.name}
          </span>
          <span className="text-xs font-mono text-gh-muted">{lang}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onExplain}
            disabled={explaining}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gh-accent/10 border border-gh-accent/30 text-gh-accent hover:bg-gh-accent/20 text-xs font-mono transition-all disabled:opacity-60"
          >
            {explaining ? (
              <div className="w-3 h-3 border border-gh-accent border-t-transparent rounded-full animate-spin" />
            ) : (
              <Cpu size={11} />
            )}
            {explaining ? 'Explaining...' : 'Explain this'}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gh-border hover:border-gh-accent/40 text-gh-muted hover:text-white text-xs font-mono transition-all"
          >
            {copied ? <Check size={11} className="text-gh-green" /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={lang}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.8rem',
            lineHeight: '1.6',
            minHeight: '100%',
          }}
          lineNumberStyle={{ color: '#30363d', minWidth: '2.5rem' }}
        >
          {code || ''}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
