import { useState } from 'react'
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from 'lucide-react'

const FILE_ICONS = {
  js: { color: 'text-yellow-400', ext: 'JS' },
  jsx: { color: 'text-blue-400', ext: 'JSX' },
  ts: { color: 'text-blue-500', ext: 'TS' },
  tsx: { color: 'text-blue-400', ext: 'TSX' },
  py: { color: 'text-green-400', ext: 'PY' },
  go: { color: 'text-cyan-400', ext: 'GO' },
  rs: { color: 'text-orange-500', ext: 'RS' },
  java: { color: 'text-red-400', ext: 'JAVA' },
  json: { color: 'text-yellow-300', ext: 'JSON' },
  md: { color: 'text-gh-muted', ext: 'MD' },
  css: { color: 'text-blue-400', ext: 'CSS' },
  html: { color: 'text-orange-400', ext: 'HTML' },
  sh: { color: 'text-green-300', ext: 'SH' },
  yml: { color: 'text-red-300', ext: 'YML' },
  yaml: { color: 'text-red-300', ext: 'YAML' },
  env: { color: 'text-yellow-500', ext: 'ENV' },
  default: { color: 'text-gh-muted', ext: 'FILE' },
}

function getFileIcon(name) {
  const ext = name.split('.').pop()?.toLowerCase()
  return FILE_ICONS[ext] || FILE_ICONS.default
}

function FileNode({ node, depth = 0, onFileSelect, selectedFile }) {
  const [open, setOpen] = useState(depth < 2)
  const isDir = node.type === 'dir'
  const icon = isDir ? null : getFileIcon(node.name)
  const isSelected = selectedFile?.path === node.path

  const indent = depth * 12

  if (isDir) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 w-full text-left px-2 py-1 rounded hover:bg-white/5 text-gh-muted hover:text-white transition-colors text-xs group"
          style={{ paddingLeft: `${8 + indent}px` }}
        >
          {open ? <ChevronDown size={12} className="flex-shrink-0" /> : <ChevronRight size={12} className="flex-shrink-0" />}
          {open ? <FolderOpen size={13} className="text-gh-accent flex-shrink-0" /> : <Folder size={13} className="text-gh-accent flex-shrink-0" />}
          <span className="truncate font-mono">{node.name}</span>
        </button>
        {open && node.children && (
          <div>
            {node.children.map((child) => (
              <FileNode
                key={child.path}
                node={child}
                depth={depth + 1}
                onFileSelect={onFileSelect}
                selectedFile={selectedFile}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => onFileSelect(node)}
      className={`flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-xs transition-colors font-mono truncate ${
        isSelected
          ? 'bg-gh-accent/15 text-gh-accent'
          : 'text-gh-muted hover:text-white hover:bg-white/5'
      }`}
      style={{ paddingLeft: `${8 + indent}px` }}
    >
      <FileCode size={12} className={`flex-shrink-0 ${icon.color}`} />
      <span className="truncate">{node.name}</span>
    </button>
  )
}

export default function FileTree({ tree, onFileSelect, selectedFile }) {
  if (!tree || tree.length === 0) {
    return (
      <div className="p-4 text-gh-muted text-xs font-mono">
        No files found
      </div>
    )
  }

  return (
    <div className="py-2">
      <div className="px-3 py-1 mb-1">
        <span className="text-gh-muted text-xs font-mono uppercase tracking-wider">Explorer</span>
      </div>
      {tree.map((node) => (
        <FileNode
          key={node.path}
          node={node}
          depth={0}
          onFileSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  )
}
