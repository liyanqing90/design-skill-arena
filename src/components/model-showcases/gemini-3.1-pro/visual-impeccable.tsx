"use client"

import React, { useState } from "react"
import { Hexagon, Maximize, Zap, Play, CheckCircle2, ArrowUpRight, BarChart, Layers, Palette } from "lucide-react"

export default function VisualImpeccable() {
  const [activeView, setActiveView] = useState(0)
  const [loading, setLoading] = useState(false)

  const executeGen = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2200)
  }

  const views = [
    { title: "Neon Cyber", primary: "#00FF94", bg: "#09090B" },
    { title: "Glass Morph", primary: "#A78BFA", bg: "#F8FAFC" },
    { title: "Dark Matter", primary: "#F43F5E", bg: "#111827" }
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-800">
      <nav className="absolute top-0 inset-x-0 h-20 px-8 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
           <Hexagon className="text-white" size={24} />
           <div className="flex flex-col">
             <span className="font-bold tracking-tighter text-xl leading-none">MUSE</span>
             <div className="flex gap-1.5 mt-1 opacity-70">
               <span className="text-[9px] uppercase tracking-widest border border-white/30 px-1 rounded-sm">Gemini 3.1 Pro</span>
               <span className="text-[9px] uppercase tracking-widest border border-white/30 px-1 rounded-sm">visual + impeccable</span>
             </div>
           </div>
        </div>
        <div className="pointer-events-auto">
          <button className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity">
            Save Asset <ArrowUpRight size={16}/>
          </button>
        </div>
      </nav>

      <main className="h-screen flex flex-col md:flex-row pt-20">
        {/* Left Visual Stage */}
        <section className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
          {/* Dynamic BG */}
          <div className="absolute inset-0 transition-colors duration-1000 ease-out" style={{ backgroundColor: views[activeView].bg }} />
          
          {/* Abstract Shape elements */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 mix-blend-screen transition-colors duration-1000" style={{ backgroundColor: views[activeView].primary }} />
          
          {loading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl z-20 flex flex-col items-center justify-center">
              <Zap className="text-white animate-pulse mb-6" size={48} />
              <div className="text-sm font-bold uppercase tracking-widest text-white/70 animate-bounce">Synthesizing Pixels</div>
            </div>
          )}

          {/* Device Mockup Wrapper */}
          <div className={`relative z-10 w-full max-w-3xl aspect-video rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ${loading ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"/>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"/>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"/>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
               <h1 className={`text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase ${activeView === 1 ? 'text-neutral-900' : 'text-white'}`}>
                 {activeView === 0 ? "The Future is Now." : activeView === 1 ? "Crystal Clear." : "Deep Impact."}
               </h1>
               <button 
                  className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: views[activeView].primary, color: activeView === 1 ? '#fff' : '#000' }}
               >
                 Launch Campaign
               </button>
            </div>
          </div>
        </section>

        {/* Right Command Center */}
        <section className="w-full md:w-[450px] bg-neutral-900 border-l border-white/5 flex flex-col z-30 shadow-2xl">
          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            <div>
               <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2"><Layers size={14}/> Creative Brief</h3>
               <textarea 
                  className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:ring-1 focus:ring-white/40 outline-none resize-none transition-all"
                  placeholder="Input parameters..."
                  defaultValue="High energy product reveal for our new gaming hardware line."
               />
            </div>

            <div>
               <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2"><Palette size={14}/> Aesthetic Variations</h3>
               <div className="grid grid-cols-1 gap-3">
                 {views.map((v, i) => (
                   <button
                     key={i}
                     onClick={() => setActiveView(i)}
                     className={`flex items-center justify-between p-4 rounded-xl border transition-all ${activeView === i ? 'bg-white/10 border-white/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                   >
                     <div className="flex items-center gap-3">
                       <div className="w-4 h-4 rounded-full" style={{ backgroundColor: v.primary }} />
                       <span className="font-semibold text-sm">{v.title}</span>
                     </div>
                     {activeView === i && <CheckCircle2 size={16} className="text-white" />}
                   </button>
                 ))}
               </div>
            </div>

            <div className="bg-black/30 rounded-xl border border-white/5 p-6">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-6 flex items-center gap-2"><BarChart size={14}/> Predictive Performance</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>Aesthetic Score</span>
                    <span style={{ color: views[activeView].primary }}>98/100</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500 w-[98%]" style={{ backgroundColor: views[activeView].primary }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>Est. Conversion</span>
                    <span style={{ color: views[activeView].primary }}>4.5%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500 w-[75%]" style={{ backgroundColor: views[activeView].primary }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-white/5 bg-neutral-950">
            <button 
               onClick={executeGen}
               className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3"
            >
              {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Play size={16} fill="currentColor" />}
              Generate Render
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
