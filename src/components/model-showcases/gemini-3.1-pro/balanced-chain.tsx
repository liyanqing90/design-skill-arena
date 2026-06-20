"use client"

import React, { useState } from "react"
import { Scale, SlidersHorizontal, Wand2, Activity, Play, Star, Sparkles } from "lucide-react"

export default function BalancedChain() {
  const [activeTab, setActiveTab] = useState("preview")
  const [loading, setLoading] = useState(false)
  const [variant, setVariant] = useState(0)

  const handleGen = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="h-screen bg-[#FDFDFC] text-[#1A1A1A] font-sans flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <header className="h-[68px] border-b border-[#EAEAEA] bg-white px-8 flex items-center justify-between z-50 shadow-sm sticky top-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-inner text-white">
              <Scale size={18} />
            </div>
            <h1 className="font-semibold text-xl tracking-tight">Muse <span className="font-light text-neutral-400">Balanced</span></h1>
          </div>
          <div className="h-5 w-px bg-neutral-200" />
          <div className="flex gap-2">
            <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-600 text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-sm">Gemini 3.1 Pro</span>
            <span className="px-2.5 py-1 bg-violet-50 border border-violet-100 text-violet-700 text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-sm">Balanced Chain</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-semibold border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all text-neutral-600 shadow-sm">Save Preset</button>
          <button className="px-5 py-2 text-sm font-semibold bg-[#1A1A1A] text-white rounded-lg hover:bg-black transition-all shadow-md shadow-black/10 flex items-center gap-2">
            Publish Flow <Play size={14} fill="currentColor"/>
          </button>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* Balanced Configurator */}
        <aside className="w-[380px] bg-white border-r border-[#EAEAEA] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="p-6 border-b border-[#EAEAEA]">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <SlidersHorizontal size={14} /> Campaign Balance
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Campaign Goal</label>
                <textarea 
                  className="w-full h-24 p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none transition-all"
                  placeholder="What are we building?"
                  defaultValue="A balanced landing page for an organic coffee subscription service."
                />
              </div>

              {/* Sliders for balancing Builder vs Taste vs Impeccable */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-500">Functional Utility</span>
                    <span className="text-blue-600">High</span>
                  </div>
                  <input type="range" className="w-full accent-blue-600" defaultValue="80" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-500">Aesthetic Taste</span>
                    <span className="text-rose-500">Elevated</span>
                  </div>
                  <input type="range" className="w-full accent-rose-500" defaultValue="90" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-500">Impeccable Quality</span>
                    <span className="text-violet-600">Maximum</span>
                  </div>
                  <input type="range" className="w-full accent-violet-600" defaultValue="100" />
                </div>
              </div>

              <button 
                onClick={handleGen}
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Wand2 size={16} />}
                Generate Balanced View
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
             <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Output Variants</h3>
             <div className="grid gap-3">
               {[
                 { title: "Harmony", desc: "Perfect mix of utility & beauty" },
                 { title: "Utility+", desc: "Function-first approach" },
                 { title: "Aesthetic+", desc: "Design-first approach" }
               ].map((item, i) => (
                 <button
                   key={i}
                   onClick={() => setVariant(i)}
                   className={`p-4 rounded-xl text-left border transition-all ${variant === i ? 'bg-white border-violet-200 ring-1 ring-violet-500 shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}`}
                 >
                   <div className="flex items-center justify-between mb-1">
                     <span className="font-semibold text-sm">{item.title}</span>
                     {variant === i && <Star size={14} className="text-violet-500" fill="currentColor" />}
                   </div>
                   <p className="text-xs text-neutral-500">{item.desc}</p>
                 </button>
               ))}
             </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-neutral-100 flex flex-col overflow-hidden relative">
          <div className="h-14 border-b border-neutral-200 bg-white/50 backdrop-blur px-6 flex items-center justify-center gap-4">
             <button className="text-sm font-semibold text-violet-600 border-b-2 border-violet-600 py-4">Live Preview</button>
             <button className="text-sm font-semibold text-neutral-500 hover:text-neutral-800 py-4 border-b-2 border-transparent">Metrics & ROI</button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center relative">
            {loading && (
              <div className="absolute inset-0 bg-neutral-100/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center border border-neutral-200">
                  <Sparkles className="text-violet-600 animate-pulse mb-4" size={32} />
                  <p className="font-semibold text-sm">Balancing parameters...</p>
                </div>
              </div>
            )}

            <div className={`w-full max-w-4xl aspect-[16/10] rounded-2xl shadow-2xl overflow-hidden relative transition-all duration-700 bg-white border border-neutral-200 ${loading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
               <div className="absolute top-0 inset-x-0 h-8 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 gap-1.5 z-10">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
               </div>

               <div className={`w-full h-full pt-8 flex flex-col transition-colors duration-1000 ${variant === 0 ? 'bg-[#FAF8F5]' : variant === 1 ? 'bg-white' : 'bg-[#1A1A1A] text-white'}`}>
                 <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                   <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase rounded-full mb-6">Organic Coffee</span>
                   <h1 className={`text-5xl md:text-6xl font-bold tracking-tight mb-6 ${variant === 0 ? 'text-[#2C1810]' : variant === 1 ? 'text-neutral-900' : 'text-white'}`}>
                     {variant === 0 ? "Taste the Earth." : variant === 1 ? "Premium Roasts." : "Dark & Intense."}
                   </h1>
                   <p className={`text-lg max-w-md mx-auto mb-10 ${variant === 2 ? 'text-neutral-400' : 'text-neutral-600'}`}>
                     Ethically sourced, perfectly roasted. Delivered to your door on your schedule.
                   </p>
                   <div className="flex gap-4">
                     <button className={`px-8 py-4 rounded-xl font-bold transition-all ${variant === 2 ? 'bg-white text-black' : 'bg-[#2C1810] text-white'} shadow-xl hover:-translate-y-1`}>
                       Subscribe Now
                     </button>
                   </div>
                 </div>
               </div>
            </div>

            <div className="w-full max-w-4xl mt-8 grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Activity size={18}/></div>
                 <div>
                   <div className="text-xs text-neutral-500 font-medium">Conversion</div>
                   <div className="font-bold text-lg">5.8%</div>
                 </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Star size={18}/></div>
                 <div>
                   <div className="text-xs text-neutral-500 font-medium">Utility Score</div>
                   <div className="font-bold text-lg">94/100</div>
                 </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600"><Sparkles size={18}/></div>
                 <div>
                   <div className="text-xs text-neutral-500 font-medium">Aesthetic Score</div>
                   <div className="font-bold text-lg">98/100</div>
                 </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-center">
                 <button className="text-sm font-bold text-violet-600 hover:text-violet-700">Detailed Report &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
