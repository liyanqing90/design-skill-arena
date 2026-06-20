"use client"

import React, { useState } from "react"
import { Sparkles, Palette, PenTool, Layout, Droplets, ChevronRight } from "lucide-react"

export default function VisualTaste() {
  const [selected, setSelected] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGen = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const variations = [
    { name: "Ethereal Aura", gradient: "from-[#FDFBF7] to-[#E5DCC5]" },
    { name: "Midnight Velvet", gradient: "from-[#2C2C2A] to-[#1A1A18]" },
    { name: "Terracotta Dream", gradient: "from-[#C7A79D] to-[#8C7A54]" }
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-serif text-[#111] selection:bg-[#E5DCC5] flex flex-col">
      <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-10 z-50 mix-blend-difference text-white">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-light tracking-widest uppercase">MUSE</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-sans tracking-widest uppercase opacity-70">Gemini 3.1 Pro</span>
            <span className="text-[10px] font-sans tracking-widest uppercase opacity-50">visual + taste</span>
          </div>
        </div>
        <button className="text-sm font-sans uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
          Export Canvas
        </button>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Visual Preview Fullscreen */}
        <section className={`flex-1 relative flex items-center justify-center transition-colors duration-1000 bg-gradient-to-br ${variations[selected].gradient}`}>
          {isGenerating ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-xl z-20">
              <div className={`w-32 h-32 border border-current rounded-full animate-[spin_4s_linear_infinite] flex items-center justify-center ${selected === 1 ? 'text-white/20' : 'text-black/20'}`}>
                <div className={`w-24 h-24 border border-current rounded-full animate-[spin_3s_linear_infinite_reverse]`}/>
              </div>
            </div>
          ) : null}

          <div className={`z-10 text-center p-12 transition-all duration-1000 ${isGenerating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${selected === 1 ? 'text-[#FDFBF7]' : 'text-[#2C2C2A]'}`}>
            <h2 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 leading-none">
              {selected === 0 ? "Soft Light." : selected === 1 ? "Deep Space." : "Warm Earth."}
            </h2>
            <p className="max-w-md mx-auto font-sans text-sm tracking-widest uppercase opacity-60 mb-12 leading-relaxed">
              Elevate your brand presence with visually stunning, emotionally resonant digital experiences.
            </p>
            <button className={`px-10 py-4 font-sans text-xs tracking-[0.2em] uppercase border transition-all hover:bg-current hover:text-black ${selected === 1 ? 'border-white/30 text-white hover:text-black' : 'border-black/30 text-black hover:text-white'}`}>
              Discover More
            </button>
          </div>

          {/* Floating Data Points */}
          <div className={`absolute bottom-12 left-12 font-sans text-[10px] uppercase tracking-widest space-y-2 ${selected === 1 ? 'text-white/50' : 'text-black/50'}`}>
            <div className="flex gap-4"><span>Est. Reach</span><span className="font-medium">3.2M</span></div>
            <div className="flex gap-4"><span>Resonance</span><span className="font-medium">94%</span></div>
          </div>
        </section>

        {/* Artistic Control Panel */}
        <section className="w-full md:w-[420px] bg-white border-l border-black/5 flex flex-col z-30 shadow-2xl">
          <div className="p-10 flex-1 flex flex-col gap-12 overflow-y-auto">
            <div>
              <h3 className="text-xs font-sans text-black/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><PenTool size={14}/> Prompt</h3>
              <textarea 
                className="w-full text-xl md:text-2xl font-light bg-transparent border-none outline-none resize-none placeholder:text-black/20 text-[#2C2C2A] h-32"
                placeholder="Paint a picture..."
                defaultValue="A serene, minimalist landing page for a boutique skincare brand."
              />
            </div>

            <div className="space-y-8 font-sans">
              <div>
                <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Palette size={14}/> Atmosphere</h3>
                <div className="space-y-2">
                  {variations.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(i)}
                      className={`w-full text-left px-6 py-4 border transition-all ${selected === i ? 'border-black bg-black/5' : 'border-black/10 hover:border-black/30'}`}
                    >
                      <span className="text-sm tracking-widest uppercase">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Layout size={14}/> Structure</h3>
                <select className="w-full p-4 border border-black/10 text-sm tracking-widest uppercase bg-transparent outline-none focus:border-black transition-colors appearance-none">
                  <option>Hero Centric</option>
                  <option>Split Screen</option>
                  <option>Asymmetric</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-10 bg-[#FAFAFA] border-t border-black/5">
            <button 
              onClick={handleGen}
              className="w-full py-5 bg-black text-white font-sans text-xs tracking-[0.2em] uppercase flex items-center justify-between px-8 hover:bg-[#2C2C2A] transition-colors"
            >
              <span>Render Vision</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
