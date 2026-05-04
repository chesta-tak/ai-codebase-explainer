import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { ArrowRight, Github, Sparkles, Layers, MessageCircle, BarChart3, ChevronDown, GitBranch, GitPullRequest, FileCode2, CheckCircle2 } from 'lucide-react'

function AnimatedMainHeading() {
  const lines = [
    { text: 'Understand', accent: false, italic: false },
    { text: 'Any Codebase', accent: true, italic: false },
  ]

  return (
    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-display font-bold leading-[0.95] tracking-[-0.04em]">
      {lines.map((line, lineIndex) => (
        <span key={line.text} className="block overflow-hidden">
          <motion.span
            initial={{ y: '112%', opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.9,
              delay: 0.18 + lineIndex * 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={[
              'inline-block will-change-transform',
              line.accent ? 'bg-gradient-to-r from-warm-400 via-warm-500 to-amber-500 bg-clip-text text-transparent' : 'text-white',
              line.italic ? 'font-body italic font-medium tracking-[-0.02em]' : '',
            ].join(' ')}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

function FloatingOrb({ className, delay = 0, duration = 20 }) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function HeroDepthStack() {
  return (
    <div className="relative h-[24rem] w-full max-w-[38rem] lg:h-[32rem]" style={{ perspective: '1400px' }}>
      <motion.div
        className="absolute left-[8%] top-[10%] h-[74%] w-[62%] rounded-[2rem] border border-white/8 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl"
        animate={{ y: [0, -12, 0], rotate: [-5, -2, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotateX(14deg) rotateY(-18deg) translateZ(20px)' }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_78%_70%,rgba(230,126,60,0.14),transparent_36%)]" />
        <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90">
            <Github size={16} />
            <span className="text-sm font-semibold tracking-wide">vercel / next.js</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
            <GitBranch size={12} />
            main
          </div>
        </div>
        <div className="absolute left-6 right-6 top-16 h-px bg-white/10" />
        <div className="absolute left-6 right-8 top-24 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3">
            <FileCode2 size={16} className="text-warm-400" />
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-32 rounded-full bg-white/12" />
              <div className="mt-2 h-2 w-20 rounded-full bg-white/8" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">app</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <GitPullRequest size={16} className="text-sky-300" />
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-40 rounded-full bg-white/12" />
              <div className="mt-2 h-2 w-24 rounded-full bg-white/8" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">pr</span>
          </div>
          <div className="rounded-[1.4rem] border border-white/8 bg-[linear-gradient(135deg,rgba(230,126,60,0.18),rgba(255,255,255,0.03))] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                Checks passing
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">ci</span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[...Array(10)].map((_, idx) => (
                <div key={idx} className={`h-3 rounded-full ${idx % 3 === 0 ? 'bg-emerald-300/50' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[2%] top-[20%] h-[58%] w-[42%] rounded-[1.8rem] border border-warm-500/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_26px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl"
        animate={{ y: [0, 14, 0], rotate: [6, 3, 6] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotateX(12deg) rotateY(18deg) translateZ(80px)' }}
      >
        <div className="absolute inset-0 rounded-[1.8rem] bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_50%_68%,rgba(230,126,60,0.16),transparent_34%)]" />
        <div className="absolute inset-x-7 top-8 h-[54%] rounded-[1.45rem] border border-white/8 bg-dark-900/60">
          <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/50">
            <span>commit graph</span>
            <span>activity</span>
          </div>
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(68,215,255,0.95),rgba(68,215,255,0.18)_42%,transparent_72%)] shadow-[0_0_30px_rgba(68,215,255,0.35)]" />
          <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-white/12" />
          <div className="absolute top-6 bottom-6 left-1/2 w-px -translate-x-1/2 bg-white/12" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
            {[32, 52, 24, 58, 42].map((height, idx) => (
              <span key={idx} className="w-4 rounded-t-full bg-gradient-to-t from-warm-500/55 to-amber-300/70" style={{ height }} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-7 left-7 right-7 flex gap-3">
          <div className="flex h-12 flex-1 items-center gap-2 rounded-2xl bg-white/8 px-3 text-sm text-white/65">
            <GitBranch size={14} className="text-warm-400" />
            feature/ai-onboarding
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-500/20 text-warm-300">
            <Github size={16} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[20%] top-[2%] h-28 w-28 rounded-[1.8rem] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))] shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        animate={{ y: [0, -14, 0], rotate: [-10, -5, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotateX(18deg) rotateY(-16deg) translateZ(110px)' }}
      />

      <motion.div
        className="absolute left-[24%] top-[16%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(230,126,60,0.14),transparent_70%)] blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[12%] bottom-[6%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(74,215,255,0.16),transparent_70%)] blur-3xl"
        animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12, rotateX: 5, rotateY: 5, transition: { duration: 0.3 } }}
      className="group relative h-full"
      style={{ transformStyle: 'preserve-3d' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="glass-dark rounded-2xl p-8 h-full border border-dark-700/50 hover:border-warm-500/30 transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-500/5 via-transparent to-sage-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative w-16 h-16 mb-6" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-warm-500 to-warm-600 rounded-2xl blur-md opacity-50"
            animate={isHovered ? { scale: 1.1, opacity: 0.7 } : { scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-750 rounded-2xl flex items-center justify-center border border-warm-500/20"
            animate={isHovered ? { rotateY: 12, rotateX: -5 } : { rotateY: 0, rotateX: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          >
            <Icon size={28} className="text-warm-400 group-hover:text-warm-300 transition-colors duration-300" strokeWidth={1.5} />
          </motion.div>
        </div>

        <h3 className="text-2xl font-display font-semibold text-slate-100 mb-3 relative z-10">
          {title}
        </h3>
        <p className="text-slate-400 font-body leading-relaxed relative z-10">
          {description}
        </p>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-500 via-warm-400 to-sage-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Sparkles,
      title: 'Intelligent Analysis',
      description: 'AI-powered code comprehension that understands context, patterns, and architecture at a deeper level.',
    },
    {
      icon: MessageCircle,
      title: 'Natural Conversations',
      description: 'Ask questions about your codebase in plain language and get detailed, contextual answers.',
    },
    {
      icon: Layers,
      title: 'Deep Insights',
      description: 'Uncover architectural patterns, dependencies, and optimization opportunities automatically.',
    },
    {
      icon: BarChart3,
      title: 'Visual Mapping',
      description: 'See your codebase structure, relationships, and complexity visualized clearly.',
    },
  ]

  const howItWorks = [
    {
      number: '01',
      title: 'Connect Repository',
      description: 'Link any public GitHub repository or paste a codebase URL to begin.',
    },
    {
      number: '02',
      title: 'AI Processing',
      description: 'Our advanced AI analyzes structure, patterns, dependencies, and documentation.',
    },
    {
      number: '03',
      title: 'Explore & Learn',
      description: 'Navigate insights, ask questions, and understand your codebase deeply.',
    },
  ]

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb
          className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-br from-warm-500/12 to-warm-600/5 rounded-full blur-3xl"
          delay={0}
          duration={25}
        />
        <FloatingOrb
          className="absolute bottom-20 right-[15%] w-80 h-80 bg-gradient-to-br from-sage-500/10 to-warm-400/5 rounded-full blur-3xl"
          delay={5}
          duration={30}
        />
        <FloatingOrb
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-amber-500/6 to-warm-500/8 rounded-full blur-3xl"
          delay={10}
          duration={35}
        />
      </div>

      <div className="fixed inset-0 gradient-mesh opacity-45 pointer-events-none" />
      <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none mix-blend-soft-light" />

      <Navbar />

      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(255,227,128,0.08),transparent_18%),radial-gradient(circle_at_72%_30%,rgba(240,137,96,0.08),transparent_20%)]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-[86rem] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="relative w-full max-w-[39rem]">
            <div className="pointer-events-none absolute -left-2 top-10 bottom-10 hidden w-px bg-gradient-to-b from-transparent via-warm-500/40 to-transparent lg:block" />
            <div className="pointer-events-none absolute -left-16 top-20 hidden h-48 w-48 rounded-full bg-warm-500/7 blur-3xl lg:block" />
            <div className="pointer-events-none absolute right-6 top-24 h-36 w-36 rounded-full bg-amber-400/5 blur-3xl" />
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="mb-6 flex justify-start">
                <div className="glass-dark px-5 py-2.5 rounded-full border border-warm-500/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-warm-400/10 to-transparent shimmer" />
                  <p className="text-warm-400 text-xs font-medium tracking-[0.22em] uppercase relative z-10">
                    AI-Powered Code Understanding
                  </p>
                </div>
              </div>

              <AnimatedMainHeading />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[31rem] font-body text-[1.08rem] leading-8 text-white/72"
            >
              Navigate complex code with confidence. Our AI transforms repositories into clear,
              comprehensible insights instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.button
                onClick={() => navigate('/analyzer')}
                className="btn-primary-3d inline-flex items-center justify-center gap-2 text-base px-6 py-3 rounded-lg font-semibold relative overflow-hidden group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warm-500 to-warm-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-warm-400 to-warm-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-dark-950">Start Analyzing</span>
                <ArrowRight size={18} strokeWidth={2} className="relative z-10 text-dark-950" />
              </motion.button>

              <motion.button
                onClick={() => navigate('/chat')}
                className="glass-dark inline-flex items-center justify-center gap-2 text-base px-6 py-3 rounded-lg font-semibold border border-warm-500/25 text-slate-200 hover:border-warm-500/45 hover:bg-warm-500/5 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={18} strokeWidth={2} />
                  Try AI Chat
                </motion.button>
              </motion.div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroDepthStack />
          </div>
        </div>
      </section>

      <motion.div
        animate={{
          y: [0, 12, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-warm-400/30 blur-xl" />
          <ChevronDown size={32} className="text-warm-400 relative" strokeWidth={1.5} />
        </div>
      </motion.div>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-warm-400 font-semibold uppercase tracking-wider text-sm px-4 py-2 rounded-full border border-warm-500/30 bg-warm-500/5">
                Features
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-100 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-body">
              Everything you need to decode, understand, and master complex codebases
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={idx * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-warm-400 font-semibold uppercase tracking-wider text-sm px-4 py-2 rounded-full border border-warm-500/30 bg-warm-500/5">
                Process
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-100 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-400 font-body">
              Three simple steps to deep code understanding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="glass-dark rounded-2xl p-8 border border-dark-700/50 hover:border-warm-500/30 transition-all duration-500 relative overflow-hidden">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br from-warm-500/20 to-amber-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-7xl font-display font-bold bg-gradient-to-br from-warm-400 to-amber-500 bg-clip-text text-transparent leading-none relative">
                      {item.number}
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-slate-100 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 font-body leading-relaxed">
                    {item.description}
                  </p>

                  <div className="absolute inset-0 bg-gradient-to-br from-warm-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {idx < howItWorks.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-warm-500/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.5, duration: 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark rounded-3xl p-12 md:p-16 border border-warm-500/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warm-500/10 via-transparent to-sage-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -inset-1 bg-gradient-to-r from-warm-500/20 via-warm-400/10 to-sage-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100 mb-6">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-warm-400 to-amber-500 bg-clip-text text-transparent">
                  Code Understanding?
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-body">
                Join developers worldwide who are already using codeXplain to navigate
                complex codebases with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/signup')}
                  className="btn-primary-3d inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl font-semibold relative overflow-hidden group/btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-warm-500 to-warm-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-warm-400 to-warm-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-dark-950">Get Started Free</span>
                  <ArrowRight size={20} strokeWidth={2} className="relative z-10 text-dark-950" />
                </motion.button>

                <motion.button
                  onClick={() => navigate('/analyzer')}
                  className="glass-dark inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl font-semibold border border-warm-500/30 text-slate-200 hover:border-warm-500/50 hover:bg-warm-500/5 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github size={20} strokeWidth={2} />
                  Try with GitHub
                </motion.button>
              </div>

              <p className="text-slate-500 text-sm mt-8 font-body">
                No credit card required • Start analyzing in seconds
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
