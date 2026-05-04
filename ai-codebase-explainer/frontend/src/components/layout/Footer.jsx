import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_26px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">codeXplain</h3>
            <p className="text-slate-400 text-sm">
              AI-powered codebase analysis
            </p>
          </div>
          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/analyzer" className="hover:text-indigo-400 transition">Analyzer</a></li>
              <li><a href="/chat" className="hover:text-indigo-400 transition">AI Chat</a></li>
              <li><a href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-indigo-400 transition">Home</a></li>
              <li><a href="/signup" className="hover:text-indigo-400 transition">Sign Up</a></li>
              <li><a href="/login" className="hover:text-indigo-400 transition">Log In</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className=" pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm text-center ">
              © {currentYear} codeXplain. All rights reserved.
          
            </p>
            <p className="text-slate-400 text-sm mt-4 md:mt-0">
              Crafted for clarity
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
