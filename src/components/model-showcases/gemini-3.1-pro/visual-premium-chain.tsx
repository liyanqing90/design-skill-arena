"use client"

import React, { useState } from "react"
import { Diamond, Crown, Check, ArrowRight, PlayCircle, Loader2 } from "lucide-react"

export default function VisualPremiumChain() {
  const [activeConcept, setActiveConcept] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCreate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2500)
  }

  const concepts = [
    { title: "Opulence", theme: "Dark Gold", reach: "4.2M", ctr: "6.8%" },
    { title: "Purity", theme: "Crystal White", reach: "3.8M", ctr: "5.5%" },
    { title: "Avant Garde", theme: "Deep Ruby", reach: "2.9M", ctr: "7.1%" }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Absolute Premium Header */}
      <header className="absolute top-0 inset-x-0 h-24 px-12 flex items-center justify-between z-50 mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto">
          <Diamond className="text-white" size={28} />
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl tracking-[0.2em] uppercase leading-none">Muse</h1>
            <div className="flex gap-2 mt-2 opacity-60">
              <span className="text-[9px] font-sans tracking-widest uppercase border border-white/40 px-1.5 py-0.5 rounded">Gemini 3.1 Pro</span>
              <span className="text-[9px] font-sans tracking-widest uppercase border border-white/40 px-1.5 py-0.5 rounded">visual premium chain</span>
            </div>
          </div>
        </div>
        <button className="pointer-events-auto text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/40 pb-1 hover:border-white transition-colors">
          Export Masterpiece
        </button>
      </header>

      {/* Main Experience Layout */}
      <main className="h-screen flex flex-col md:flex-row pt-24 pb-8 px-8 gap-8">
        {/* The Premium Canvas */}
        <section className="flex-1 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group">
          <div className={`absolute inset-0 transition-colors duration-1000 ${
            activeConcept === 0 ? 'bg-gradient-to-br from-neutral-900 to-black' : 
            activeConcept === 1 ? 'bg-gradient-to-br from-neutral-100 to-white' : 
            'bg-gradient-to-br from-rose-950 to-black'
          }`} />

          {/* Decorative ambient lighting */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 mix-blend-screen transition-colors duration-1000 pointer-events-none ${
            activeConcept === 0 ? 'bg-[#D4AF37]' : activeConcept === 1 ? 'bg-blue-200' : 'bg-rose-500'
          }`} />

          {isGenerating ? (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-20 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-[#D4AF37] mb-6" size={40} />
              <div className="font-serif text-xl tracking-[0.2em] uppercase text-white/80 animate-pulse">Crafting Excellence</div>
            </div>
          ) : null}

          {/* Canvas Content */}
          <div className={`relative z-10 p-12 text-center transition-all duration-1000 ${isGenerating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${activeConcept === 1 ? 'text-black' : 'text-white'}`}>
            <Crown size={32} className={`mx-auto mb-8 ${activeConcept === 0 ? 'text-[#D4AF37]' : activeConcept === 1 ? 'text-neutral-400' : 'text-rose-400'}`} />
            <h2 className="font-serif text-6xl md:text-8xl tracking-tight mb-6 leading-none">
              {activeConcept === 0 ? "Aura." : activeConcept === 1 ? "Lucid." : "Velvet."}
            </h2>
            <p className="max-w-md mx-auto font-sans text-sm tracking-[0.2em] uppercase opacity-70 mb-12 leading-relaxed">
              Uncompromising quality. Designed for the most exclusive audiences in the world.
            </p>
            <button className={`px-12 py-5 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 ${
              activeConcept === 0 ? 'bg-[#D4AF37] text-black hover:bg-[#F3E5AB] shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 
              activeConcept === 1 ? 'bg-black text-white hover:bg-neutral-800' : 
              'bg-rose-500 text-white hover:bg-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
            }`}>
              Experience Now
            </button>
          </div>
        </section>

        {/* Premium Control Panel */}
        <section className="w-full md:w-[400px] flex flex-col gap-6 relative z-10">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex-1 flex flex-col">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6 border-b border-white/10 pb-4">Executive Brief</h3>
            
            <textarea 
              className="w-full h-32 bg-transparent border-none outline-none resize-none font-serif text-xl placeholder:text-white/20 text-white/90"
              placeholder="Describe your premium offering..."
              defaultValue="High-end electric vehicle unveiling. Focus on luxury, silence, and power."
            />

            <div className="mt-8 space-y-6 flex-1">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4 border-b border-white/10 pb-4">Curated Concepts</h3>
              <div className="space-y-4">
                {concepts.map((concept, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveConcept(idx)}
                    className="w-full text-left group flex items-center justify-between"
                  >
                    <div>
                      <div className={`font-serif text-xl transition-colors ${activeConcept === idx ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                        {concept.title}
                      </div>
                      <div className={`text-[10px] tracking-[0.2em] uppercase mt-1 transition-colors ${activeConcept === idx ? 'text-[#D4AF37]' : 'text-white/30'}`}>
                        {concept.theme}
                      </div>
                    </div>
                    {activeConcept === idx && <ArrowRight size={20} className="text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleCreate}
              className="w-full py-5 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 mt-6"
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />}
              Generate Masterpieces
            </button>
          </div>

          {/* Premium Analytics Card */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6 border-b border-white/10 pb-4">Campaign Projections</h3>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/40 mb-2">Est. Conversion</div>
                <div className="font-serif text-4xl text-[#D4AF37]">{concepts[activeConcept].ctr}</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/40 mb-2">Target Reach</div>
                <div className="font-serif text-4xl text-white">{concepts[activeConcept].reach}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
