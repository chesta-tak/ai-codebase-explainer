// import { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import api from '../utils/api'
// import Navbar from '../components/layout/Navbar'
// import FileTree from '../components/analyzer/FileTree'
// import CodeViewer from '../components/analyzer/CodeViewer'
// import AIPanel from '../components/analyzer/AIPanel'
// import { GitBranch, Search, AlertCircle, MessageSquare, ChevronLeft } from 'lucide-react'
// import bgImage from '../assets/bg-pic.png'

// export default function Analyzer() {
//   const { repoId } = useParams()

//   const [url, setUrl] = useState('')
//   const [analyzing, setAnalyzing] = useState(false)
//   const [error, setError] = useState('')
//   const [repoData, setRepoData] = useState(null)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [fileCode, setFileCode] = useState('')
//   const [fileLoading, setFileLoading] = useState(false)
//   const [explanation, setExplanation] = useState('')
//   const [explaining, setExplaining] = useState(false)
//   const [showInput, setShowInput] = useState(!repoId)
//   const [leftOpen] = useState(true)
//   const [rightOpen] = useState(true)

//   const backgroundStyle = {
//     backgroundImage: `url(${bgImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//   }

//   useEffect(() => {
//     if (repoId) loadExistingRepo(repoId)
//   }, [repoId])

//   const loadExistingRepo = async (id) => {
//     setAnalyzing(true)
//     setError('')
//     try {
//       const { data } = await api.get(`/repo/${id}`)
//       setRepoData(data)
//       setShowInput(false)
//     } catch {
//       setError('Failed to load repository')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleAnalyze = async (e) => {
//     e.preventDefault()
//     if (!url.trim()) return

//     setError('')
//     setAnalyzing(true)
//     setRepoData(null)
//     setSelectedFile(null)
//     setFileCode('')
//     setExplanation('')

//     try {
//       const { data } = await api.post('/repo/analyze', { repoUrl: url.trim() })
//       setRepoData(data)
//       setShowInput(false)
//     } catch (err) {
//       setError(err.response?.data?.message || 'Analysis failed. Check the URL and try again.')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleFileSelect = async (file) => {
//     if (file.size > 100000) {
//       setFileCode('// File too large to display (>100KB)')
//       setSelectedFile(file)
//       return
//     }

//     setSelectedFile(file)
//     setFileCode('')
//     setExplanation('')
//     setFileLoading(true)

//     try {
//       const { owner, repoName } = repoData.repository
//       const { data } = await api.post('/repo/explain-code', {
//         owner,
//         repo: repoName,
//         filePath: file.path,
//       })
//       setFileCode(data.code || '')
//     } catch {
//       setFileCode('// Could not load file content')
//     } finally {
//       setFileLoading(false)
//     }
//   }

//   const handleExplain = async () => {
//     if (!selectedFile || !fileCode || explaining) return

//     setExplaining(true)
//     setExplanation('')

//     try {
//       const { owner, repoName } = repoData.repository
//       const { data } = await api.post('/repo/explain-code', {
//         owner,
//         repo: repoName,
//         filePath: selectedFile.path,
//       })
//       setExplanation(data.explanation || '')
//     } catch {
//       setExplanation('Failed to generate explanation.')
//     } finally {
//       setExplaining(false)
//     }
//   }

//   if (showInput || (!repoId && !repoData)) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <div className="fixed inset-0 -z-10" style={backgroundStyle} />
//         <div className="fixed inset-0 -z-10 bg-black/55" />

//         <Navbar />

//         <div className="flex-1 flex items-center justify-center px-4 pt-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-full max-w-xl"
//           >
//             <div className="mb-8 text-center">
//               <p className="font-mono text-gh-muted text-sm mb-2">// analyze</p>
//               <h1 className="text-2xl font-bold text-white">Enter a GitHub repository URL</h1>
//               <p className="text-gh-muted text-sm mt-2">Any public repository works. We&apos;ll fetch the code and generate an AI breakdown.</p>
//             </div>

//             <form onSubmit={handleAnalyze} className="space-y-4">
//               <div className="relative">
//                 <GitBranch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gh-muted" />
//                 <input
//                   type="url"
//                   className="input-field pl-10 py-4 text-sm"
//                   placeholder="https://github.com/owner/repository"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   required
//                 />
//               </div>

//               {error && (
//                 <div className="flex items-center gap-2 text-gh-red text-sm">
//                   <AlertCircle size={14} /> {error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={analyzing}
//                 className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
//               >
//                 {analyzing ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Analyzing repository...
//                   </>
//                 ) : (
//                   <>
//                     <Search size={15} /> Analyze Repository
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="mt-4 p-3 rounded-lg bg-gh-surface/50 border border-gh-border">
//               <p className="text-gh-muted text-xs font-mono text-center">
//                 Try: <span className="text-gh-accent">https://github.com/vercel/next.js</span>
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     )
//   }

//   if (analyzing) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-5">
//         <div className="fixed inset-0 -z-10" style={backgroundStyle} />
//         <div className="fixed inset-0 -z-10 bg-black/60" />
//         <div
//           className="fixed inset-0 pointer-events-none"
//           style={{
//             ...backgroundStyle,
//             opacity: 0.15,
//           }}
//         />

//         <div className="w-10 h-10 border-2 border-gh-accent border-t-transparent rounded-full animate-spin" />
//         <div className="text-center">
//           <p className="text-white font-semibold">Analyzing repository...</p>
//           <p className="text-gh-muted text-sm mt-1 font-mono">Gemini is reading the codebase</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="h-screen bg-transparent flex flex-col overflow-hidden relative z-10">
//       <div className="fixed inset-0 -z-10" style={backgroundStyle} />
//       <div className="fixed inset-0 -z-10 bg-black/45" />

//       <Navbar />

//       <div className="flex-shrink-0 mt-[72px] border-b border-gh-border bg-gh-surface/50 px-4 py-2 flex items-center justify-between gap-4">
//         <div className="flex items-center gap-3 min-w-0">
//           <Link to="/dashboard" className="text-gh-muted hover:text-white transition-colors flex-shrink-0">
//             <ChevronLeft size={16} />
//           </Link>

//           <div className="flex items-center gap-2 min-w-0">
//             <GitBranch size={13} className="text-gh-accent flex-shrink-0" />
//             <span className="font-mono text-sm text-white truncate">
//               {repoData?.repository?.owner}/{repoData?.repository?.repoName}
//             </span>
//             {repoData?.analysis?.cached && (
//               <span className="px-2 py-0.5 rounded-full bg-gh-green/10 border border-gh-green/30 text-gh-green text-xs font-mono flex-shrink-0">
//                 cached
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => {
//               setShowInput(true)
//               setRepoData(null)
//             }}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gh-border text-gh-muted hover:text-white text-xs transition-all"
//           >
//             <Search size={11} /> New
//           </button>

//           <Link
//             to={`/chat/${repoData?.repository?._id}`}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gh-accent/10 border border-gh-accent/30 text-gh-accent hover:bg-gh-accent/20 text-xs transition-all"
//           >
//             <MessageSquare size={11} /> Chat
//           </Link>
//         </div>
//       </div>

//       <div className="flex-1 flex overflow-hidden">
//         <div className={`flex-shrink-0 border-r border-gh-border bg-gh-surface/20 overflow-y-auto transition-all duration-300 ${leftOpen ? 'w-56 lg:w-64' : 'w-0'}`}>
//           {leftOpen && repoData?.fileStructure && (
//             <FileTree
//               tree={repoData.fileStructure}
//               onFileSelect={handleFileSelect}
//               selectedFile={selectedFile}
//             />
//           )}
//         </div>

//         <div className="flex-1 overflow-hidden bg-gh-bg/75 backdrop-blur-sm">
//           <CodeViewer
//             file={selectedFile}
//             code={fileCode}
//             loading={fileLoading}
//             onExplain={handleExplain}
//             explaining={explaining}
//           />
//         </div>

//         <div className={`flex-shrink-0 border-l border-gh-border bg-gh-surface/20 overflow-hidden transition-all duration-300 ${rightOpen ? 'w-72 lg:w-96' : 'w-0'}`}>
//           {rightOpen && (
//             <AIPanel
//               analysis={repoData?.analysis}
//               explanation={explanation}
//               explaining={explaining}
//               loading={analyzing}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
// import { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import api from '../utils/api'
// import Navbar from '../components/layout/Navbar'
// import LandingBackground from '../components/layout/LandingBackground'
// import FileTree from '../components/analyzer/FileTree'
// import CodeViewer from '../components/analyzer/CodeViewer'
// import AIPanel from '../components/analyzer/AIPanel'
// import { GitBranch, Search, AlertCircle, MessageSquare, ChevronLeft } from 'lucide-react'

// export default function Analyzer() {
//   const { repoId } = useParams()

//   const [url, setUrl] = useState('')
//   const [analyzing, setAnalyzing] = useState(false)
//   const [error, setError] = useState('')
//   const [repoData, setRepoData] = useState(null)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [fileCode, setFileCode] = useState('')
//   const [fileLoading, setFileLoading] = useState(false)
//   const [explanation, setExplanation] = useState('')
//   const [explaining, setExplaining] = useState(false)
//   const [showInput, setShowInput] = useState(!repoId)
//   const [leftOpen] = useState(true)
//   const [rightOpen] = useState(true)

//   useEffect(() => {
//     if (repoId) loadExistingRepo(repoId)
//   }, [repoId])

//   const loadExistingRepo = async (id) => {
//     setAnalyzing(true)
//     setError('')
//     try {
//       const { data } = await api.get(`/repo/${id}`)
//       setRepoData(data)
//       setShowInput(false)
//     } catch {
//       setError('Failed to load repository')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleAnalyze = async (e) => {
//     e.preventDefault()
//     if (!url.trim()) return

//     setError('')
//     setAnalyzing(true)
//     setRepoData(null)
//     setSelectedFile(null)
//     setFileCode('')
//     setExplanation('')

//     try {
//       const { data } = await api.post('/repo/analyze', { repoUrl: url.trim() })
//       setRepoData(data)
//       setShowInput(false)
//     } catch (err) {
//       setError(err.response?.data?.message || 'Analysis failed. Check the URL and try again.')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleFileSelect = async (file) => {
//     if (file.size > 100000) {
//       setFileCode('// File too large to display (>100KB)')
//       setSelectedFile(file)
//       return
//     }

//     setSelectedFile(file)
//     setFileCode('')
//     setExplanation('')
//     setFileLoading(true)

//     try {
//       const { owner, repoName } = repoData.repository
//       const { data } = await api.post('/repo/explain-code', {
//         owner,
//         repo: repoName,
//         filePath: file.path,
//       })
//       setFileCode(data.code || '')
//     } catch {
//       setFileCode('// Could not load file content')
//     } finally {
//       setFileLoading(false)
//     }
//   }

//   const handleExplain = async () => {
//     if (!selectedFile || !fileCode || explaining) return

//     setExplaining(true)
//     setExplanation('')

//     try {
//       const { owner, repoName } = repoData.repository
//       const { data } = await api.post('/repo/explain-code', {
//         owner,
//         repo: repoName,
//         filePath: selectedFile.path,
//       })
//       setExplanation(data.explanation || '')
//     } catch {
//       setExplanation('Failed to generate explanation.')
//     } finally {
//       setExplaining(false)
//     }
//   }

//   if (showInput || (!repoId && !repoData)) {
//     return (
//       <div className="min-h-screen flex flex-col bg-dark-950 overflow-hidden">
//         <Navbar />

//         {/* Two Column Layout */}
//         <div className="flex-1 flex items-center justify-center px-4 lg:px-8 pt-20 pb-12">
//           <div className="w-full max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
//               {/* LEFT COLUMN - Text Content & Form */}
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//                 className="space-y-8 z-10"
//               >
//                 {/* Header */}
//                 <div className="space-y-4">
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2, duration: 0.6 }}
//                   >
//                     <p className="font-mono text-warm-400 text-sm mb-3 tracking-wider">
//                       // REPOSITORY ANALYZER
//                     </p>
//                     <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
//                       <span className="text-white">Let's analyze</span>
//                       <br />
//                       <span className="text-gradient">your code</span>
//                     </h1>
//                   </motion.div>

//                   <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.6 }}
//                     className="text-slate-300 text-lg leading-relaxed max-w-lg"
//                   >
//                     Paste any public GitHub repository URL and get AI-powered insights, 
//                     explanations, and deep analysis of your codebase.
//                   </motion.p>
//                 </div>

//                 {/* Form */}
//                 <motion.form
//                   onSubmit={handleAnalyze}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4, duration: 0.6 }}
//                   className="space-y-5"
//                 >
//                   <div className="space-y-3">
//                     <label className="block text-sm font-medium text-slate-300 font-mono">
//                       GitHub Repository URL
//                     </label>
//                     <div className="relative group">
//                       <GitBranch 
//                         size={18} 
//                         className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-400 transition-all group-focus-within:text-warm-500" 
//                       />
//                       <input
//                         type="url"
//                         className="w-full pl-12 pr-4 py-4 rounded-xl text-base bg-dark-800/60 border-2 border-dark-600 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:bg-dark-800 focus:border-warm-500/50 focus:shadow-glow-sm backdrop-blur-sm"
//                         placeholder="https://github.com/owner/repository"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
//                     >
//                       <AlertCircle size={16} />
//                       <span>{error}</span>
//                     </motion.div>
//                   )}

//                   <button
//                     type="submit"
//                     disabled={analyzing}
//                     className="w-full btn-primary-3d btn-primary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed group"
//                   >
//                     {analyzing ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
//                         <span className="font-semibold">Analyzing repository...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Search size={18} className="group-hover:rotate-12 transition-transform" />
//                         <span className="font-semibold">Analyze Repository</span>
//                       </>
//                     )}
//                   </button>
//                 </motion.form>

//                 {/* Example */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.6, duration: 0.6 }}
//                   className="glass-card rounded-xl p-4 border-warm-500/10"
//                 >
//                   <p className="text-slate-400 text-sm font-mono">
//                     <span className="text-slate-500">Try example:</span>{' '}
//                     <button
//                       onClick={() => setUrl('https://github.com/vercel/next.js')}
//                       className="text-warm-400 hover:text-warm-300 transition-colors underline decoration-dotted"
//                     >
//                       vercel/next.js
//                     </button>
//                   </p>
//                 </motion.div>
//               </motion.div>

//               {/* RIGHT COLUMN - 3D Robot */}
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//                 className="relative h-[500px] lg:h-[600px] hidden lg:block"
//               >
//                 {/* Ambient Glow */}
//                 <div className="absolute inset-0 bg-gradient-radial from-warm-500/10 via-transparent to-transparent blur-3xl" />
                
//                 {/* Robot Container */}
//                 <div className="relative h-full flex items-center justify-center">
//                   <Robot3D />
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         {/* Background Elements */}
//         <div className="fixed inset-0 -z-10 gradient-mesh opacity-40" />
//         <div className="fixed inset-0 -z-10 bg-dark-950" />
//       </div>
//     )
//   }

//   if (analyzing) {
//     return (
//       <div className="relative isolate min-h-screen flex flex-col items-center justify-center gap-5 overflow-hidden bg-dark-950">
//         <LandingBackground meshOpacity={0.32} orbOpacity={0.8} />
//         <div className="w-12 h-12 border-3 border-warm-500 border-t-transparent rounded-full animate-spin" />
//         <div className="text-center">
//           <p className="text-white font-semibold text-lg">Analyzing repository...</p>
//           <p className="text-slate-400 text-sm mt-2 font-mono">AI is reading the codebase</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative isolate h-screen bg-dark-950 flex flex-col overflow-hidden">
//       <LandingBackground meshOpacity={0.28} orbOpacity={0.75} />

//       <Navbar />

//       <div className="flex-shrink-0 mt-[72px] border-b border-gh-border bg-dark-950 px-4 py-2 flex items-center justify-between gap-4">
//         <div className="flex items-center gap-3 min-w-0">
//           <Link to="/dashboard" className="text-gh-muted hover:text-white transition-colors flex-shrink-0">
//             <ChevronLeft size={16} />
//           </Link>

//           <div className="flex items-center gap-2 min-w-0">
//             <GitBranch size={13} className="text-warm-accent flex-shrink-0" />
//             <span className="font-mono text-sm text-white truncate">
//               {repoData?.repository?.owner}/{repoData?.repository?.repoName}
//             </span>
//             {repoData?.analysis?.cached && (
//               <span className="px-2 py-0.5 rounded-full bg-gh-green/10 border border-gh-green/30 text-gh-green text-xs font-mono flex-shrink-0">
//                 cached
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => {
//               setShowInput(true)
//               setRepoData(null)
//             }}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gh-border text-gh-muted hover:text-white text-xs transition-all"
//           >
//             <Search size={11} /> New
//           </button>

//           <Link
//             to={`/chat/${repoData?.repository?._id}`}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gh-accent/10 border border-gh-accent/30 text-gh-accent hover:bg-gh-accent/20 text-xs transition-all"
//           >
//             <MessageSquare size={11} /> Chat
//           </Link>
//         </div>
//       </div>

//       <div className="flex-1 flex overflow-hidden">
//         <div className={`flex-shrink-0 border-r border-gh-border bg-gh-surface/20 overflow-y-auto transition-all duration-300 ${leftOpen ? 'w-56 lg:w-64' : 'w-0'}`}>
//           {leftOpen && repoData?.fileStructure && (
//             <FileTree
//               tree={repoData.fileStructure}
//               onFileSelect={handleFileSelect}
//               selectedFile={selectedFile}
//             />
//           )}
//         </div>

//         <div className="flex-1 overflow-hidden bg-gh-bg/75 backdrop-blur-sm">
//           <CodeViewer
//             file={selectedFile}
//             code={fileCode}
//             loading={fileLoading}
//             onExplain={handleExplain}
//             explaining={explaining}
//           />
//         </div>

//         <div className={`flex-shrink-0 border-l border-gh-border bg-gh-surface/20 overflow-hidden transition-all duration-300 ${rightOpen ? 'w-72 lg:w-96' : 'w-0'}`}>
//           {rightOpen && (
//             <AIPanel
//               analysis={repoData?.analysis}
//               explanation={explanation}
//               explaining={explaining}
//               loading={analyzing}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// // 3D Robot Component
// function Robot3D() {
//   return (
//     <motion.div
//       animate={{
//         y: [0, -15, 0],
//         rotate: [0, 2, 0, -2, 0],
//       }}
//       transition={{
//         y: {
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut"
//         },
//         rotate: {
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }
//       }}
//       className="relative"
//       style={{ transformStyle: 'preserve-3d' }}
//     >
//       <svg
//         width="400"
//         height="450"
//         viewBox="0 0 400 450"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="drop-shadow-2xl"
//       >
//         {/* Robot Body Shadow */}
//         <ellipse
//           cx="200"
//           cy="420"
//           rx="80"
//           ry="15"
//           fill="url(#shadowGradient)"
//           opacity="0.3"
//         />

//         {/* Main Body */}
//         <g className="robot-body">
//           {/* Body Base */}
//           <motion.rect
//             x="140"
//             y="200"
//             width="120"
//             height="140"
//             rx="20"
//             fill="url(#bodyGradient)"
//             stroke="#e67e3c"
//             strokeWidth="3"
//             animate={{
//               scaleY: [1, 1.02, 1],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
          
//           {/* Body Highlight */}
//           <rect
//             x="150"
//             y="210"
//             width="100"
//             height="60"
//             rx="10"
//             fill="url(#highlightGradient)"
//             opacity="0.3"
//           />

//           {/* Chest Panel */}
//           <rect
//             x="165"
//             y="240"
//             width="70"
//             height="50"
//             rx="8"
//             fill="#1a1f26"
//             stroke="#f49d5d"
//             strokeWidth="2"
//           />

//           {/* Heart Light */}
//           <motion.circle
//             cx="200"
//             cy="265"
//             r="8"
//             fill="#f49d5d"
//             animate={{
//               opacity: [0.5, 1, 0.5],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//           <circle
//             cx="200"
//             cy="265"
//             r="12"
//             fill="#f49d5d"
//             opacity="0.2"
//           />
//         </g>

//         {/* Head */}
//         <g className="robot-head">
//           <motion.g
//             animate={{
//               rotate: [-3, 3, -3],
//               y: [0, -5, 0]
//             }}
//             transition={{
//               rotate: {
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               },
//               y: {
//                 duration: 2.5,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }
//             }}
//             style={{ transformOrigin: '200px 150px' }}
//           >
//             {/* Head Base */}
//             <rect
//               x="150"
//               y="120"
//               width="100"
//               height="80"
//               rx="15"
//               fill="url(#headGradient)"
//               stroke="#e67e3c"
//               strokeWidth="3"
//             />

//             {/* Antenna */}
//             <motion.g
//               animate={{
//                 rotate: [-10, 10, -10]
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               style={{ transformOrigin: '200px 120px' }}
//             >
//               <line
//                 x1="200"
//                 y1="120"
//                 x2="200"
//                 y2="90"
//                 stroke="#f49d5d"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//               />
//               <motion.circle
//                 cx="200"
//                 cy="85"
//                 r="6"
//                 fill="#f8c55f"
//                 animate={{
//                   opacity: [0.6, 1, 0.6],
//                 }}
//                 transition={{
//                   duration: 1,
//                   repeat: Infinity,
//                 }}
//               />
//               <circle
//                 cx="200"
//                 cy="85"
//                 r="10"
//                 fill="#f8c55f"
//                 opacity="0.3"
//               />
//             </motion.g>

//             {/* Eyes */}
//             <motion.g
//               animate={{
//                 scaleX: [1, 0.1, 1],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//               }}
//             >
//               <circle cx="175" cy="155" r="10" fill="#0a0d12" />
//               <circle cx="225" cy="155" r="10" fill="#0a0d12" />
//               <circle cx="175" cy="155" r="6" fill="#58a6ff" />
//               <circle cx="225" cy="155" r="6" fill="#58a6ff" />
//               <circle cx="177" cy="153" r="3" fill="white" />
//               <circle cx="227" cy="153" r="3" fill="white" />
//             </motion.g>

//             {/* Smile */}
//             <motion.path
//               d="M 175 175 Q 200 185 225 175"
//               stroke="#e67e3c"
//               strokeWidth="3"
//               strokeLinecap="round"
//               fill="none"
//               animate={{
//                 d: [
//                   "M 175 175 Q 200 185 225 175",
//                   "M 175 175 Q 200 188 225 175",
//                   "M 175 175 Q 200 185 225 175"
//                 ]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             />
//           </motion.g>
//         </g>

//         {/* Left Arm - Pointing */}
//         <g className="robot-arm-left">
//           <motion.g
//             animate={{
//               rotate: [-15, -5, -15],
//             }}
//             transition={{
//               duration: 2.5,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             style={{ transformOrigin: '140px 220px' }}
//           >
//             {/* Upper Arm */}
//             <rect
//               x="100"
//               y="215"
//               width="40"
//               height="60"
//               rx="12"
//               fill="url(#armGradient)"
//               stroke="#e67e3c"
//               strokeWidth="2"
//             />
            
//             {/* Forearm */}
//             <motion.g
//               animate={{
//                 rotate: [-20, -40, -20],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               style={{ transformOrigin: '120px 275px' }}
//             >
//               <rect
//                 x="85"
//                 y="270"
//                 width="35"
//                 height="70"
//                 rx="10"
//                 fill="url(#armGradient)"
//                 stroke="#e67e3c"
//                 strokeWidth="2"
//               />

//               {/* Hand - Pointing Gesture */}
//               <motion.g
//                 animate={{
//                   x: [-5, 5, -5],
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               >
//                 {/* Palm */}
//                 <ellipse
//                   cx="100"
//                   cy="350"
//                   rx="15"
//                   ry="18"
//                   fill="url(#handGradient)"
//                   stroke="#e67e3c"
//                   strokeWidth="2"
//                 />
                
//                 {/* Pointing Finger */}
//                 <rect
//                   x="75"
//                   y="345"
//                   width="25"
//                   height="10"
//                   rx="5"
//                   fill="#f49d5d"
//                   stroke="#e67e3c"
//                   strokeWidth="2"
//                 />
                
//                 {/* Pointing Indicator - Arrow Effect */}
//                 <motion.path
//                   d="M 70 350 L 55 350 L 60 345 M 55 350 L 60 355"
//                   stroke="#f8c55f"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                   animate={{
//                     x: [-10, 0, -10],
//                     opacity: [0.3, 1, 0.3],
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 />
//               </motion.g>
//             </motion.g>
//           </motion.g>
//         </g>

//         {/* Right Arm */}
//         <g className="robot-arm-right">
//           <motion.g
//             animate={{
//               rotate: [15, 5, 15],
//             }}
//             transition={{
//               duration: 2.8,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             style={{ transformOrigin: '260px 220px' }}
//           >
//             <rect
//               x="260"
//               y="215"
//               width="40"
//               height="60"
//               rx="12"
//               fill="url(#armGradient)"
//               stroke="#e67e3c"
//               strokeWidth="2"
//             />

//             <motion.g
//               animate={{
//                 rotate: [20, 10, 20],
//               }}
//               transition={{
//                 duration: 2.5,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               style={{ transformOrigin: '280px 275px' }}
//             >
//               <rect
//                 x="280"
//                 y="270"
//                 width="35"
//                 height="70"
//                 rx="10"
//                 fill="url(#armGradient)"
//                 stroke="#e67e3c"
//                 strokeWidth="2"
//               />

//               <ellipse
//                 cx="297"
//                 cy="350"
//                 rx="15"
//                 ry="18"
//                 fill="url(#handGradient)"
//                 stroke="#e67e3c"
//                 strokeWidth="2"
//               />
//             </motion.g>
//           </motion.g>
//         </g>

//         {/* Legs */}
//         <g className="robot-legs">
//           {/* Left Leg */}
//           <rect
//             x="160"
//             y="340"
//             width="30"
//             height="60"
//             rx="8"
//             fill="url(#legGradient)"
//             stroke="#e67e3c"
//             strokeWidth="2"
//           />
//           <rect
//             x="155"
//             y="395"
//             width="35"
//             height="20"
//             rx="10"
//             fill="#f49d5d"
//             stroke="#e67e3c"
//             strokeWidth="2"
//           />

//           {/* Right Leg */}
//           <rect
//             x="210"
//             y="340"
//             width="30"
//             height="60"
//             rx="8"
//             fill="url(#legGradient)"
//             stroke="#e67e3c"
//             strokeWidth="2"
//           />
//           <rect
//             x="205"
//             y="395"
//             width="35"
//             height="20"
//             rx="10"
//             fill="#f49d5d"
//             stroke="#e67e3c"
//             strokeWidth="2"
//           />
//         </g>

//         {/* Speech Bubble */}
//         <motion.g
//           initial={{ opacity: 0, scale: 0.8, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{
//             delay: 1,
//             duration: 0.6,
//             ease: [0.16, 1, 0.3, 1]
//           }}
//         >
//           <motion.g
//             animate={{
//               y: [-2, 2, -2],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             {/* Bubble */}
//             <rect
//               x="270"
//               y="100"
//               width="110"
//               height="60"
//               rx="12"
//               fill="url(#bubbleGradient)"
//               stroke="#f49d5d"
//               strokeWidth="2"
//             />
            
//             {/* Bubble Tail */}
//             <path
//               d="M 270 140 L 255 145 L 270 150"
//               fill="url(#bubbleGradient)"
//               stroke="#f49d5d"
//               strokeWidth="2"
//             />

//             {/* Text */}
//             <text
//               x="325"
//               y="125"
//               textAnchor="middle"
//               fill="#f8c55f"
//               fontSize="14"
//               fontWeight="bold"
//               fontFamily="monospace"
//             >
//               Enter URL
//             </text>
//             <text
//               x="325"
//               y="145"
//               textAnchor="middle"
//               fill="#e67e3c"
//               fontSize="11"
//               fontFamily="monospace"
//             >
//               please! →
//             </text>
//           </motion.g>
//         </motion.g>

//         {/* Gradients */}
//         <defs>
//           <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#2f3640" />
//             <stop offset="100%" stopColor="#1a1f26" />
//           </linearGradient>

//           <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#3d4553" />
//             <stop offset="100%" stopColor="#252b36" />
//           </linearGradient>

//           <linearGradient id="armGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#2f3640" />
//             <stop offset="100%" stopColor="#1f252e" />
//           </linearGradient>

//           <linearGradient id="legGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#252b36" />
//             <stop offset="100%" stopColor="#1a1f26" />
//           </linearGradient>

//           <linearGradient id="handGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#f49d5d" />
//             <stop offset="100%" stopColor="#e67e3c" />
//           </linearGradient>

//           <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#ffffff" />
//             <stop offset="100%" stopColor="transparent" />
//           </linearGradient>

//           <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#1f252e" />
//             <stop offset="100%" stopColor="#14181f" />
//           </linearGradient>

//           <radialGradient id="shadowGradient">
//             <stop offset="0%" stopColor="#0a0d12" stopOpacity="0.5" />
//             <stop offset="100%" stopColor="#0a0d12" stopOpacity="0" />
//           </radialGradient>
//         </defs>
//       </svg>
//     </motion.div>
//   )
// }


import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../utils/api'
import Navbar from '../components/layout/Navbar'
import FileTree from '../components/analyzer/FileTree'
import CodeViewer from '../components/analyzer/CodeViewer'
import AIPanel from '../components/analyzer/AIPanel'
import { GitBranch, Search, AlertCircle, MessageSquare, ChevronLeft } from 'lucide-react'

export default function Analyzer() {
  const { repoId } = useParams()

  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [repoData, setRepoData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileCode, setFileCode] = useState('')
  const [fileLoading, setFileLoading] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [explaining, setExplaining] = useState(false)
  const [showInput, setShowInput] = useState(!repoId)
  const [leftOpen] = useState(true)
  const [rightOpen] = useState(true)

  useEffect(() => {
    if (repoId) loadExistingRepo(repoId)
  }, [repoId])

  const loadExistingRepo = async (id) => {
    setAnalyzing(true)
    setError('')
    try {
      const { data } = await api.get(`/repo/${id}`)
      setRepoData(data)
      setShowInput(false)
    } catch {
      setError('Failed to load repository')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!url.trim()) return

    setError('')
    setAnalyzing(true)
    setRepoData(null)
    setSelectedFile(null)
    setFileCode('')
    setExplanation('')

    try {
      const { data } = await api.post('/repo/analyze', { repoUrl: url.trim() })
      setRepoData(data)
      setShowInput(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Check the URL and try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFileSelect = async (file) => {
    if (file.size > 100000) {
      setFileCode('// File too large to display (>100KB)')
      setSelectedFile(file)
      return
    }

    setSelectedFile(file)
    setFileCode('')
    setExplanation('')
    setFileLoading(true)

    try {
      const { owner, repoName } = repoData.repository
      const { data } = await api.post('/repo/explain-code', {
        owner,
        repo: repoName,
        filePath: file.path,
      })
      setFileCode(data.code || '')
    } catch {
      setFileCode('// Could not load file content')
    } finally {
      setFileLoading(false)
    }
  }

  const handleExplain = async () => {
    if (!selectedFile || !fileCode || explaining) return

    setExplaining(true)
    setExplanation('')

    try {
      const { owner, repoName } = repoData.repository
      const { data } = await api.post('/repo/explain-code', {
        owner,
        repo: repoName,
        filePath: selectedFile.path,
      })
      setExplanation(data.explanation || '')
    } catch {
      setExplanation('Failed to generate explanation.')
    } finally {
      setExplaining(false)
    }
  }

  if (showInput || (!repoId && !repoData)) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-950 overflow-hidden relative">
        <Navbar />

        {/* Two Column Layout */}
        <div className="flex-1 flex items-center justify-center px-4 lg:px-8 pt-20 pb-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* LEFT COLUMN - Text Content & Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 z-10"
              >
                {/* Header */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <p className="font-mono text-warm-400 text-sm mb-3 tracking-wider">
                      // REPOSITORY ANALYZER
                    </p>
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                      <span className="text-white">Let's analyze</span>
                      <br />
                      <span className="text-gradient">your code</span>
                    </h1>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-slate-300 text-lg leading-relaxed max-w-lg"
                  >
                    Paste any public GitHub repository URL and get AI-powered insights, 
                    explanations, and deep analysis of your codebase.
                  </motion.p>
                </div>

                {/* Form */}
                <motion.form
                  onSubmit={handleAnalyze}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-300 font-mono">
                      GitHub Repository URL
                    </label>
                    <div className="relative group">
                      <GitBranch 
                        size={18} 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-400 transition-all group-focus-within:text-warm-500" 
                      />
                      <input
                        type="url"
                        className="w-full pl-12 pr-4 py-4 rounded-xl text-base bg-dark-800/60 border-2 border-dark-600 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:bg-dark-800 focus:border-warm-500/50 focus:shadow-glow-sm backdrop-blur-sm"
                        placeholder="https://github.com/owner/repository"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                    >
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={analyzing}
                    className="w-full btn-primary-3d btn-primary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                        <span className="font-semibold">Analyzing repository...</span>
                      </>
                    ) : (
                      <>
                        <Search size={18} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-semibold">Analyze Repository</span>
                      </>
                    )}
                  </button>
                </motion.form>

                {/* Example */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="glass-card rounded-xl p-4 border-warm-500/10"
                >
                  <p className="text-slate-400 text-sm font-mono">
                    <span className="text-slate-500">Try example:</span>{' '}
                    <button
                      type="button"
                      onClick={() => setUrl('https://github.com/vercel/next.js')}
                      className="text-warm-400 hover:text-warm-300 transition-colors underline decoration-dotted"
                    >
                      vercel/next.js
                    </button>
                  </p>
                </motion.div>
              </motion.div>

              {/* RIGHT COLUMN - 3D Robot */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative h-[500px] lg:h-[600px] hidden lg:block"
              >
                <Robot3D />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 gradient-mesh opacity-40" />
        <div className="fixed inset-0 -z-10 bg-dark-950" />
      </div>
    )
  }

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-dark-950">
        <div className="fixed inset-0 -z-10 gradient-mesh opacity-30" />
        
        <div className="w-12 h-12 border-3 border-warm-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-white font-semibold text-lg">Analyzing repository...</p>
          <p className="text-slate-400 text-sm mt-2 font-mono">AI is reading the codebase</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden relative z-10">
      <div className="fixed inset-0 -z-10 gradient-mesh opacity-20" />

      <Navbar />

      <div className="flex-shrink-0 mt-[72px] border-b border-gh-border bg-gh-surface/50 px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/dashboard" className="text-gh-muted hover:text-white transition-colors flex-shrink-0">
            <ChevronLeft size={16} />
          </Link>

          <div className="flex items-center gap-2 min-w-0">
            <GitBranch size={13} className="text-gh-accent flex-shrink-0" />
            <span className="font-mono text-sm text-white truncate">
              {repoData?.repository?.owner}/{repoData?.repository?.repoName}
            </span>
            {repoData?.analysis?.cached && (
              <span className="px-2 py-0.5 rounded-full bg-gh-green/10 border border-gh-green/30 text-gh-green text-xs font-mono flex-shrink-0">
                cached
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowInput(true)
              setRepoData(null)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gh-border text-gh-muted hover:text-white text-xs transition-all"
          >
            <Search size={11} /> New
          </button>

          <Link
            to={`/chat/${repoData?.repository?._id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gh-accent/10 border border-gh-accent/30 text-gh-accent hover:bg-gh-accent/20 text-xs transition-all"
          >
            <MessageSquare size={11} /> Chat
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className={`flex-shrink-0 border-r border-gh-border bg-gh-surface/20 overflow-y-auto transition-all duration-300 ${leftOpen ? 'w-56 lg:w-64' : 'w-0'}`}>
          {leftOpen && repoData?.fileStructure && (
            <FileTree
              tree={repoData.fileStructure}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          )}
        </div>

        <div className="flex-1 overflow-hidden bg-gh-bg/75 backdrop-blur-sm">
          <CodeViewer
            file={selectedFile}
            code={fileCode}
            loading={fileLoading}
            onExplain={handleExplain}
            explaining={explaining}
          />
        </div>

        <div className={`flex-shrink-0 border-l border-gh-border bg-gh-surface/20 overflow-hidden transition-all duration-300 ${rightOpen ? 'w-72 lg:w-96' : 'w-0'}`}>
          {rightOpen && (
            <AIPanel
              analysis={repoData?.analysis}
              explanation={explanation}
              explaining={explaining}
              loading={analyzing}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// 3D Robot Component with Hover Animation
function Robot3D() {
  const robotRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const rotateY = ((e.clientX - centerX) / rect.width) * 30
        const rotateX = -((e.clientY - centerY) / rect.height) * 20
        
        setRotation({ x: rotateX, y: rotateY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={robotRef} className="relative h-full w-full flex items-center justify-center perspective-1000">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-96 h-96 rounded-full bg-gradient-radial from-warm-500/20 via-warm-500/10 to-transparent blur-3xl"
        />
      </div>

      {/* Robot Container with 3D Transform */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Robot Image - Replace this src with your robot PNG */}
        <motion.img
          src="https://static.vecteezy.com/system/resources/previews/056/221/469/non_2x/cute-3d-robot-model-futuristic-friendly-metallic-design-free-png.png"
          alt="3D Robot"
          className="w-[400px] h-[450px] object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(230, 126, 60, 0.3))',
          }}
        />

        {/* Pointing Arrow Indicator */}
        <motion.div
          className="absolute left-8 top-1/2 -translate-y-1/2"
          animate={{
            x: [-10, 0, -10],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M 45 30 L 15 30 M 20 24 L 15 30 L 20 36"
              stroke="#f8c55f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 8px rgba(248, 197, 95, 0.6))"
            />
          </svg>
        </motion.div>

        {/* Glowing Particles Around Robot */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-warm-400"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-4px',
              marginTop: '-4px',
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 8) * 120],
              y: [0, Math.sin((i * Math.PI * 2) / 8) * 120],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="absolute top-16 right-12"
      >
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Bubble */}
          <div className="relative px-6 py-3 rounded-2xl glass-card border-warm-500/30">
            <p className="text-warm-400 font-bold text-sm font-mono whitespace-nowrap">
              Enter your URL! →
            </p>
          </div>
          
          {/* Bubble Tail */}
          <div 
            className="absolute -bottom-2 left-8 w-4 h-4 rotate-45 glass-card border-l-0 border-t-0 border-warm-500/30"
          />
        </motion.div>
      </motion.div>

      {/* Floor Shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-8 rounded-full blur-xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}