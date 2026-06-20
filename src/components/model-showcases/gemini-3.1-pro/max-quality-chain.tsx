"use client"

import React, { useState } from "react"
import { Hexagon, Maximize2, Zap, Layout, MonitorSmartphone, Code2, ArrowUpRight, BarChart } from "lucide-react"

export default function MaxQualityChain() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop")
  const [loading, setLoading] = useState(false)
  const [variation, setVariation] = useState(0)

  const fireGeneration = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2500)
  }

  const variations = [
    { title: "Spatial Dynamic", focus: "Immersive 3D/Z-axis design", score: 99 },
    { title: "Neo-Brutalist", focus: "High contrast, explicit borders", score: 96 },
    { title: "Editorial Fluid", focus: "Magazine style typography", score: 98 }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans flex flex-col">
      {/* Supreme Quality Header */}
      <header className="h-20 px-8 flex items-center justify-between bg-black/50 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Hexagon size={32} className="text-[#38BDF8]" strokeWidth={1.5} />
            <div className="absolute inset-0 blur-md bg-[#38BDF8]/30 rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl tracking-tight leading-none mb-1 text-white">Muse Max Quality</h1>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Gemini 3.1 Pro</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#38BDF8] border border-[#38BDF8]/30 px-1 rounded-sm bg-[#38BDF8]/10">design + ux pro + guide + impeccable</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
            <button 
              onClick={() => setDevice("desktop")}
              className={`p-2 rounded-md transition-all ${device === "desktop" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white"}`}
            >
              <Maximize2 size={16} />
            </button>
            <button 
              onClick={() => setDevice("mobile")}
              className={`p-2 rounded-md transition-all ${device === "mobile" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white"}`}
            >
              <MonitorSmartphone size={16} />
            </button>
          </div>
          <button className="h-10 px-6 font-semibold text-sm bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2">
            Release to Production <ArrowUpRight size={16}/>
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Control Center */}
        <aside className="w-[420px] bg-[#0A0A0A] border-r border-white/10 flex flex-col z-10 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="p-8 border-b border-white/10 relative z-10">
            <h2 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6 flex items-center gap-2">
              <Layout size={14} /> Global Directive
            </h2>
            <textarea 
              className="w-full h-32 bg-transparent border border-white/10 rounded-xl p-4 text-white text-sm font-medium focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] outline-none resize-none transition-all placeholder:text-white/20"
              placeholder="State the absolute goal..."
              defaultValue="Launch the ultimate VR headset landing page. Needs to feel like stepping into another dimension."
            />
            
            <button 
              onClick={fireGeneration}
              className="w-full mt-6 py-4 bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-white font-bold text-sm tracking-wider uppercase rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap size={18} fill="currentColor" />}
              Synthesize Perfection
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 relative z-10">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6 flex items-center gap-2">
              <Code2 size={14} /> Top Tier Architectures
            </h3>
            <div className="space-y-4">
              {variations.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setVariation(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    variation === i 
                    ? 'bg-white/10 border-[#38BDF8] ring-1 ring-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{v.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${variation === i ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'bg-white/10 text-white/40'}`}>
                      {v.score}/100
                    </span>
                  </div>
                  <p className="text-xs text-white/50">{v.focus}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* The Master Canvas */}
        <section className="flex-1 bg-[#111] p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10 flex flex-col items-center w-full max-w-6xl h-full ${loading ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-0'}`}>
            
            {/* Device Wrapper */}
            <div className={`flex-1 w-full relative transition-all duration-700 ease-out flex justify-center ${device === 'mobile' ? 'max-w-[400px]' : 'max-w-full'}`}>
              
              <div className={`w-full h-full relative overflow-hidden bg-black shadow-2xl border ${device === 'mobile' ? 'rounded-[3rem] border-neutral-800' : 'rounded-2xl border-white/10'}`}>
                
                {/* Mobile Notch */}
                {device === "mobile" && (
                  <div className="absolute top-0 inset-x-0 h-8 flex justify-center z-50">
                    <div className="w-32 h-6 bg-neutral-900 rounded-b-xl" />
                  </div>
                )}

                {/* Content Render based on variation */}
                <div className="w-full h-full flex flex-col relative">
                  {variation === 0 && (
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-neutral-950 text-white p-12 text-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-[10s]" />
                      <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto border-2 border-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-md">
                          <Hexagon className="text-[#38BDF8]" size={32} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Reality,<br/>Redefined.</h1>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full font-bold hover:bg-white hover:text-black transition-all">
                          Enter The Void
                        </button>
                      </div>
                    </div>
                  )}

                  {variation === 1 && (
                    <div className="flex-1 bg-[#D4D4D4] text-black border-[12px] border-black flex flex-col relative">
                      <div className="border-b-4 border-black p-4 md:p-8 flex justify-between items-center bg-[#E5E5E5]">
                        <h1 className="font-black text-3xl md:text-5xl uppercase tracking-tighter">Vision.01</h1>
                        <div className="w-12 h-12 bg-[#FF3E00] rounded-full border-4 border-black" />
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8 mix-blend-exclusion text-white">BRUTAL<br/>REALITY</h2>
                        <button className="px-12 py-6 bg-black text-white font-black text-xl uppercase tracking-widest hover:bg-[#FF3E00] transition-colors border-4 border-transparent hover:border-black">
                          Pre-Order
                        </button>
                      </div>
                    </div>
                  )}

                  {variation === 2 && (
                    <div className="flex-1 bg-[#FAF9F6] text-[#2C2C2C] flex flex-col p-8 md:p-16">
                      <nav className="flex justify-between items-start mb-24">
                        <div className="font-serif italic text-2xl">L&apos;Espace</div>
                        <div className="text-xs uppercase tracking-[0.3em]">Issue N° 01</div>
                      </nav>
                      <div className="max-w-2xl mx-auto text-center">
                        <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.1] mb-8">
                          The new dimension of human experience.
                        </h1>
                        <p className="font-sans text-sm tracking-widest uppercase text-neutral-500 mb-12">
                          Immersive spatial computing designed for the discerning eye.
                        </p>
                        <button className="border-b border-black pb-1 font-sans text-sm tracking-[0.2em] uppercase hover:opacity-50 transition-opacity">
                          Discover the collection
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Supreme Metrics Card */}
            <div className={`w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mt-8 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-700 delay-300 ${loading ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8]"><BarChart size={24}/></div>
                <div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Max Quality Score</div>
                  <div className="text-2xl font-black text-white">99.8%</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400"><Zap size={24}/></div>
                <div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Performance (LCP)</div>
                  <div className="text-2xl font-black text-white">0.8s</div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center justify-end">
                <div className="text-right">
                  <div className="text-sm font-medium text-white/70 mb-2">Ready for deployment to global CDN.</div>
                  <div className="text-[10px] font-mono text-[#38BDF8]">All 144 Impeccable Quality checks passed.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
