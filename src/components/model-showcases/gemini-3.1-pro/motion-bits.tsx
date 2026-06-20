"use client"

import React, { useState } from "react"
import { Wind, MousePointerClick, Zap, RefreshCw, Send, CheckCircle2 } from "lucide-react"

export default function MotionBits() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeIdea, setActiveIdea] = useState(0)

  const handleGen = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const ideas = [
    { title: "Spring Reveal", reach: "2.1M", conversion: "4.8%" },
    { title: "Staggered Fade", reach: "1.8M", conversion: "3.9%" },
    { title: "Inertia Scroll", reach: "2.5M", conversion: "5.2%" }
  ]

  return (
    <div className="min-h-screen bg-[#0E0E11] text-white font-sans overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0E0E11]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <Wind className="text-emerald-400" />
          <span className="font-bold text-lg tracking-tight">Muse <span className="text-white/40">Motion</span></span>
          <div className="flex gap-2 ml-4">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-white/10 text-white">Gemini 3.1 Pro</span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400">react-bits</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:scale-105 transition-transform">
          Export Animation
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Floating Controls Overlay */}
        <div className="absolute top-24 left-6 w-80 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-2xl p-6 z-20 flex flex-col gap-6 shadow-2xl">
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">Motion Brief</h3>
            <textarea 
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-emerald-500 transition-colors resize-none h-24"
              placeholder="Describe the animation feeling..."
              defaultValue="Smooth, bouncy entry for the product hero."
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-widest">Easing Curve</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-white/10 border border-white/20 rounded-lg p-2 text-xs font-medium hover:bg-white/20 transition-colors">spring(0.5, 0.8)</button>
              <button className="bg-transparent border border-white/10 rounded-lg p-2 text-xs font-medium text-white/50 hover:text-white transition-colors">easeOut(cubic)</button>
            </div>
          </div>

          <button 
            onClick={handleGen}
            className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
          >
            {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
            Compute Keyframes
          </button>
        </div>

        {/* Dynamic Canvas */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0E0E11] via-[#1a1a24] to-[#0E0E11]">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm bg-black/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Animated Component Preview */}
          <div className={`relative z-10 p-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl w-[600px] text-center transform transition-all duration-1000 ${isGenerating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-2xl mx-auto mb-8 shadow-[0_0_40px_rgba(52,211,153,0.3)] rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer flex items-center justify-center">
               <MousePointerClick className="text-black w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">
              {ideas[activeIdea].title}
            </h1>
            <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
              Fluid physics-based animations that feel natural and highly responsive to user interaction.
            </p>
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Interact With Me
            </button>
          </div>
        </div>

        {/* Right Panel - Variations & Stats */}
        <div className="w-80 border-l border-white/10 bg-[#0E0E11] p-6 flex flex-col gap-8 z-20">
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">Motion Variants</h3>
            <div className="space-y-3">
              {ideas.map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdea(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${activeIdea === idx ? 'bg-emerald-500/10 border-emerald-500/50 scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{idea.title}</span>
                    {activeIdea === idx && <CheckCircle2 size={16} className="text-emerald-400" />}
                  </div>
                  <div className="text-xs text-white/40">Spring • Stiffness 120</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">Impact Prediction</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Engagement Lift</span>
                  <span className="text-emerald-400 font-bold">+24%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full"><div className="h-full bg-emerald-400 rounded-full w-3/4" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Est. Reach</div>
                  <div className="text-xl font-light">{ideas[activeIdea].reach}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Conversion</div>
                  <div className="text-xl font-light">{ideas[activeIdea].conversion}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
