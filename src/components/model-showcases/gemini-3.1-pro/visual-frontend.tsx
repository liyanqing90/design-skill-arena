"use client"

import React, { useState } from "react"
import { Sparkles, ArrowRight, Layers, BarChart3, Settings2, Download, Zap } from "lucide-react"

export default function VisualFrontend() {
  const [selected, setSelected] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const creatives = [
    { title: "Neon Nights", desc: "Dark mode, neon accents, high contrast", cta: "Shop Now" },
    { title: "Organic Flow", desc: "Earthy tones, soft curves, natural", cta: "Discover" },
    { title: "Brutalism", desc: "Raw typography, grid layouts, monochrome", cta: "Enter" }
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-fuchsia-500/30">
      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-blue-600 flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Muse <span className="text-white/50 font-normal">by Gemini 3.1 Pro</span></h1>
            <div className="text-xs text-fuchsia-400 font-medium tracking-wide uppercase">frontend-skill</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowMetrics(!showMetrics)}
            className={`p-2.5 rounded-full border transition-all ${showMetrics ? 'bg-white text-black border-white' : 'border-white/20 hover:bg-white/10'}`}
          >
            <BarChart3 size={18} />
          </button>
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm font-medium">
            <Download size={16} /> Export
          </button>
        </div>
      </nav>

      <main className="pt-20 min-h-screen flex flex-col md:flex-row">
        {/* Main Preview */}
        <section className="flex-1 relative p-6 md:p-12 flex flex-col items-center justify-center min-h-[60vh]">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className={`relative w-full max-w-4xl aspect-[16/9] rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 shadow-2xl ${isGenerating ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-1000 ${
              selected === 0 ? 'from-slate-900 via-fuchsia-900 to-slate-900' :
              selected === 1 ? 'from-stone-800 via-emerald-900 to-stone-900' :
              'from-neutral-950 via-neutral-800 to-neutral-900'
            }`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <h2 className={`font-black tracking-tight mb-6 transition-all duration-500 ${
                  selected === 0 ? 'text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400' :
                  selected === 1 ? 'text-5xl md:text-7xl text-emerald-100 font-serif' :
                  'text-6xl md:text-8xl text-white uppercase tracking-tighter'
                }`}>
                  {creatives[selected].title}
                </h2>
                <button className={`px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md border transition-transform hover:scale-105 ${
                  selected === 0 ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-200' :
                  selected === 1 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200' :
                  'bg-white text-black border-white rounded-none uppercase'
                }`}>
                  {creatives[selected].cta}
                </button>
              </div>
            </div>

            {/* Metrics Overlay */}
            <div className={`absolute top-0 right-0 bottom-0 w-64 bg-black/60 backdrop-blur-xl border-l border-white/10 p-6 transform transition-transform duration-500 ${showMetrics ? 'translate-x-0' : 'translate-x-full'}`}>
              <h3 className="text-white/70 font-semibold mb-6 flex items-center gap-2"><Zap size={16} className="text-yellow-400"/> Performance</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Engagement</div>
                  <div className="text-3xl font-light">{[84, 92, 78][selected]}%</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Est. Conversion</div>
                  <div className="text-3xl font-light">{[3.2, 4.5, 2.8][selected]}%</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Brand Lift</div>
                  <div className="text-3xl font-light">+{[15, 28, 22][selected]}%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Controls Panel */}
        <section className="w-full md:w-96 bg-[#111] border-l border-white/10 p-6 flex flex-col z-10 relative">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white/80 flex items-center gap-2"><Settings2 size={18}/> Campaign Setup</h3>
              </div>
              <textarea 
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none resize-none transition-all"
                placeholder="Target demographic, key message, seasonal context..."
                defaultValue="Promoting our new flagship headphones to audiophiles."
              />
              <div className="grid grid-cols-2 gap-3">
                <select className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/80 outline-none focus:border-fuchsia-500">
                  <option>Instagram</option>
                  <option>Twitter</option>
                </select>
                <select className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/80 outline-none focus:border-fuchsia-500">
                  <option>Gen Z</option>
                  <option>Millennials</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-white/80 flex items-center gap-2"><Layers size={18}/> Variations</h3>
              <div className="space-y-3">
                {creatives.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selected === i ? 'bg-white/10 border-white/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{c.title}</span>
                      {selected === i && <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />}
                    </div>
                    <p className="text-xs text-white/50">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 mt-8 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isGenerating ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <ArrowRight size={20} />}
            {isGenerating ? 'Rendering...' : 'Generate New Concepts'}
          </button>
        </section>
      </main>
    </div>
  )
}
