"use client"

import React, { useState } from "react"
import { Grid3X3, Layers, MonitorPlay, Settings, Download, CheckCircle2, Hexagon, ArrowRight } from "lucide-react"

export default function DesignImpeccable() {
  const [selectedView, setSelectedView] = useState("design")
  const [loading, setLoading] = useState(false)
  const [variant, setVariant] = useState(0)

  const processGeneration = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans flex flex-col">
      <header className="h-[72px] border-b border-neutral-200 px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded flex items-center justify-center">
              <Hexagon className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">Muse Studio</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 text-[10px] font-bold uppercase tracking-widest">Gemini 3.1 Pro</span>
            <span className="px-2 py-1 rounded-md bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-widest">design + impeccable</span>
          </div>
        </div>

        <div className="flex bg-neutral-100 p-1 rounded-lg">
          <button 
            onClick={() => setSelectedView("design")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${selectedView === "design" ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            System Design
          </button>
          <button 
            onClick={() => setSelectedView("preview")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${selectedView === "preview" ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Impeccable Preview
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[340px] bg-white border-r border-neutral-200 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Settings size={14} /> Campaign Logic
            </h2>
            <div className="space-y-4">
              <textarea 
                className="w-full h-24 bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none resize-none"
                placeholder="Product brief..."
                defaultValue="Luxury mechanical watch launch. Emphasis on craftsmanship."
              />
              <button 
                onClick={processGeneration}
                className="w-full py-3 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Layers size={16} />}
                Generate System
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Design Variants</h3>
            <div className="space-y-3">
              {['V1. Modern Classic', 'V2. Bold Minimal', 'V3. Heritage'].map((name, i) => (
                <button
                  key={i}
                  onClick={() => setVariant(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${variant === i ? 'bg-white border-rose-200 ring-1 ring-rose-500 shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">{name}</span>
                    {variant === i && <CheckCircle2 size={16} className="text-rose-500" />}
                  </div>
                  <div className="text-xs text-neutral-500">Perfectly balanced grid system.</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-neutral-100 p-8 flex flex-col items-center overflow-y-auto relative">
          {loading && (
            <div className="absolute inset-0 bg-neutral-100/80 backdrop-blur-md z-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mb-4 border border-neutral-200">
                <div className="w-6 h-6 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
              </div>
              <p className="font-bold text-sm tracking-widest uppercase text-neutral-500">Compiling Design Tokens</p>
            </div>
          )}

          <div className="w-full max-w-[1000px] flex-1 flex flex-col">
            {selectedView === "design" ? (
              // System Design View (Wireframe/Tokens)
              <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-neutral-100 bg-neutral-50 flex items-center gap-2 text-neutral-500 text-sm font-bold tracking-widest uppercase">
                  <Grid3X3 size={16} /> Grid Structure & Typography
                </div>
                <div className="flex-1 p-12 grid grid-cols-12 gap-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDAuNWg0ME0wIDM5LjVoNDBNMC41IDB2NDBNMzkuNSAwdjQwIiBzdHJva2U9IiNlN2U1ZTQiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]">
                  <div className="col-span-12 md:col-span-8 bg-neutral-900/5 border-2 border-neutral-900/10 border-dashed rounded-xl flex items-center justify-center p-8">
                     <div className="w-full space-y-4">
                       <div className="h-16 bg-neutral-900 w-3/4 rounded-lg" />
                       <div className="h-4 bg-neutral-300 w-full rounded" />
                       <div className="h-4 bg-neutral-300 w-5/6 rounded" />
                     </div>
                  </div>
                  <div className="col-span-12 md:col-span-4 bg-rose-500/5 border-2 border-rose-500/20 border-dashed rounded-xl flex items-center justify-center">
                    <span className="text-rose-500 font-bold text-sm tracking-widest uppercase text-center p-4">Interactive<br/>Media Area</span>
                  </div>
                  <div className="col-span-4 bg-neutral-900/5 border-2 border-neutral-900/10 border-dashed rounded-xl h-32" />
                  <div className="col-span-4 bg-neutral-900/5 border-2 border-neutral-900/10 border-dashed rounded-xl h-32" />
                  <div className="col-span-4 bg-neutral-900/5 border-2 border-neutral-900/10 border-dashed rounded-xl h-32" />
                </div>
              </div>
            ) : (
              // Impeccable Preview View (High Fidelity)
              <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden flex flex-col relative transition-all duration-700">
                <div className={`absolute inset-0 transition-colors duration-1000 ${variant === 0 ? 'bg-neutral-900 text-white' : variant === 1 ? 'bg-rose-600 text-white' : 'bg-[#E6E1D8] text-neutral-900'}`} />
                <div className="relative z-10 flex-1 flex flex-col">
                  <nav className="h-20 px-10 flex items-center justify-between border-b border-white/10">
                    <div className="font-serif text-2xl tracking-widest uppercase">Chronos</div>
                    <div className="text-xs font-bold tracking-widest uppercase opacity-60">Pre-Order</div>
                  </nav>
                  <div className="flex-1 flex items-center justify-center p-12 text-center">
                    <div className="max-w-3xl">
                      <h1 className="font-serif text-5xl md:text-7xl font-light mb-8 leading-tight">
                        {variant === 0 ? "Time, Perfected." : variant === 1 ? "Bold Engineering." : "A Legacy Begins."}
                      </h1>
                      <p className="font-sans text-sm md:text-base tracking-widest uppercase opacity-70 mb-12 leading-relaxed">
                        Precision crafted for those who value every second. Discover our newest collection of mechanical masterpieces.
                      </p>
                      <button className={`px-10 py-4 text-sm font-bold tracking-widest uppercase transition-transform hover:scale-105 ${variant === 1 ? 'bg-white text-rose-600' : 'bg-black text-white'}`}>
                        View Collection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Stats */}
            <div className="mt-6 flex justify-between bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-6 px-4">
                <div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Conversion</div>
                  <div className="text-lg font-black text-neutral-900">{[4.2, 5.1, 3.8][variant]}%</div>
                </div>
                <div className="w-px h-8 bg-neutral-200" />
                <div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Accessibility</div>
                  <div className="text-lg font-black text-green-600">99/100</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors">
                <Download size={14} /> Export Files
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
