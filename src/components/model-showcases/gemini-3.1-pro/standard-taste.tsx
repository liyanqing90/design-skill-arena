"use client"

import React, { useState } from "react"
import { Play, Sparkles, Filter, Droplet, MoveRight, Download, BarChart2 } from "lucide-react"

export default function StandardTaste() {
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleRun = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2C2A] font-serif flex flex-col md:flex-row">
      {/* Left Elegant Sidebar */}
      <aside className="w-full md:w-[360px] border-r border-[#E8E6E1] bg-white flex flex-col relative z-10 shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-[#E8E6E1]">
          <h1 className="text-2xl font-medium tracking-tight mb-3">L&apos;Atelier Muse</h1>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-[#F4F2EC] text-[#5C5A55] text-xs font-sans tracking-widest uppercase rounded">Gemini 3.1 Pro</span>
            <span className="px-2 py-1 bg-[#E8E2D2] text-[#8C7A54] text-xs font-sans tracking-widest uppercase rounded">standard + taste</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 font-sans">
          <div className="space-y-8">
            <div>
              <label className="block text-sm text-[#8C8A85] uppercase tracking-widest mb-3">Creative Vision</label>
              <textarea 
                className="w-full border-b border-[#E8E6E1] bg-transparent py-2 text-[#2C2C2A] focus:border-[#8C7A54] outline-none transition-colors resize-none h-20 placeholder:text-[#C4C2BC]"
                placeholder="A whisper of elegance..."
                defaultValue="Introducing the new summer linen collection. Light, airy, and sophisticated."
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-sm text-[#8C8A85] uppercase tracking-widest mb-2">
                  <span className="flex items-center gap-2"><Filter size={14}/> Tone</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="border border-[#E8E6E1] rounded px-3 py-2 text-sm text-center hover:bg-[#FDFBF7] transition-colors">Understated</button>
                  <button className="border border-[#8C7A54] bg-[#FDFBF7] rounded px-3 py-2 text-sm text-center text-[#8C7A54]">Editorial</button>
                </div>
              </div>
              
              <div>
                <label className="flex items-center justify-between text-sm text-[#8C8A85] uppercase tracking-widest mb-2">
                  <span className="flex items-center gap-2"><Droplet size={14}/> Palette</span>
                </label>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E5DCC5] border border-[#D5CCB5] cursor-pointer shadow-inner"/>
                  <div className="w-8 h-8 rounded-full bg-[#A5B2A9] border border-[#95A299] cursor-pointer opacity-50 hover:opacity-100 transition-opacity"/>
                  <div className="w-8 h-8 rounded-full bg-[#C7A79D] border border-[#B7978D] cursor-pointer opacity-50 hover:opacity-100 transition-opacity"/>
                </div>
              </div>
            </div>

            <button 
              onClick={handleRun}
              className="w-full py-4 bg-[#2C2C2A] hover:bg-[#1A1A18] text-[#FDFBF7] text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
            >
              {loading ? <div className="w-4 h-4 border-2 border-[#FDFBF7]/30 border-t-[#FDFBF7] rounded-full animate-spin" /> : <Sparkles size={16} />}
              Curate Concepts
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FDFBF7]">
        <header className="h-16 px-8 flex items-center justify-between border-b border-[#E8E6E1] bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {['V1. Editorial', 'V2. Minimal', 'V3. Lifestyle'].map((tab, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(i)}
                className={`text-sm font-sans tracking-wide py-2 border-b-2 transition-all ${activeTab === i ? 'border-[#8C7A54] text-[#8C7A54]' : 'border-transparent text-[#8C8A85] hover:text-[#2C2C2A]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#8C8A85] hover:text-[#2C2C2A] transition-colors"><BarChart2 size={18}/></button>
            <button className="text-[#8C8A85] hover:text-[#2C2C2A] transition-colors"><Download size={18}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 flex items-center justify-center relative">
          {/* Aesthetic background noise/texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="w-full max-w-3xl aspect-[3/4] md:aspect-[16/10] bg-[#E5DCC5] p-8 md:p-16 relative shadow-2xl transition-all duration-1000 ease-in-out">
            {loading && (
              <div className="absolute inset-0 bg-[#FDFBF7]/80 backdrop-blur-md z-10 flex flex-col items-center justify-center">
                <span className="font-serif italic text-xl text-[#8C7A54] animate-pulse">Composing elegance...</span>
              </div>
            )}
            
            <div className={`w-full h-full border border-[#D5CCB5] p-8 flex flex-col justify-between transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A54]">SS/26 Collection</span>
                <span className="text-xs font-sans text-[#5C5A55]">0{activeTab + 1}</span>
              </div>
              
              <div className="max-w-md">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-[#2C2C2A]">
                  {activeTab === 0 ? "The Art of Linen" : activeTab === 1 ? "Pure Intentions" : "Breathe Freely"}
                </h2>
                <p className="font-sans text-sm tracking-wide text-[#5C5A55] mb-8 leading-relaxed">
                  Embrace the warmth of the sun with fabrics that breathe as deeply as you do. A collection curated for the conscious minimalist.
                </p>
                <button className="group flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-[#2C2C2A]">
                  Explore Collection <MoveRight size={14} className="group-hover:translate-x-2 transition-transform"/>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Metrics Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-[#E8E6E1] px-8 py-4 rounded-full shadow-lg flex items-center gap-8 font-sans text-sm z-20">
          <div className="flex flex-col items-center">
            <span className="text-[#8C8A85] text-[10px] uppercase tracking-widest">Resonance</span>
            <span className="font-medium text-[#2C2C2A]">High</span>
          </div>
          <div className="w-px h-6 bg-[#E8E6E1]" />
          <div className="flex flex-col items-center">
            <span className="text-[#8C8A85] text-[10px] uppercase tracking-widest">Est. Conversion</span>
            <span className="font-medium text-[#2C2C2A]">3.2%</span>
          </div>
          <div className="w-px h-6 bg-[#E8E6E1]" />
          <div className="flex flex-col items-center">
            <span className="text-[#8C8A85] text-[10px] uppercase tracking-widest">Brand Lift</span>
            <span className="font-medium text-[#8C7A54]">+18%</span>
          </div>
        </div>
      </main>
    </div>
  )
}
