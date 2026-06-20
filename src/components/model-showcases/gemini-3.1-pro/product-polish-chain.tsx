"use client"

import React, { useState } from "react"
import { Layers, Puzzle, CheckCircle2, Copy, Eye, Zap, LayoutTemplate, Play, Activity } from "lucide-react"

export default function ProductPolishChain() {
  const [activeTab, setActiveTab] = useState("components")
  const [loading, setLoading] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)

  const handleBuild = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const variants = [
    { name: "Enterprise Default", desc: "High density, clear hierarchy, accessible colors." },
    { name: "Consumer Playful", desc: "Softer radius, vibrant primary colors, micro-interactions." },
    { name: "Minimalist SaaS", desc: "Monochrome palette, generous whitespace, sharp typography." }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
              <Puzzle size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">Muse Product Polish</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-neutral-100 text-neutral-600 border border-neutral-200">Gemini 3.1 Pro</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">frontend-app-builder</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">shadcn</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">interface-guide</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">impeccable</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold border border-neutral-200 rounded-md bg-white hover:bg-neutral-50 transition-colors shadow-sm">
            Export Theme
          </button>
          <button className="px-4 py-2 text-sm font-semibold bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors shadow-md">
            Publish System
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Config Panel */}
        <div className="w-80 bg-white border-r border-neutral-200 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="p-5 border-b border-neutral-100">
             <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-4">
               <Layers size={14} /> System Parameters
             </h2>
             <textarea 
               className="w-full h-24 bg-neutral-50 border border-neutral-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
               placeholder="Describe the product requirements..."
               defaultValue="A comprehensive dashboard for managing financial portfolios. Needs to feel secure and professional."
             />
             <button 
               onClick={handleBuild}
               className="w-full mt-4 py-2.5 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
             >
               {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play size={16} fill="currentColor" />}
               Compile Components
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 bg-neutral-50">
             <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Design Language</h3>
             <div className="space-y-3">
               {variants.map((v, i) => (
                 <button
                   key={i}
                   onClick={() => setSelectedVariant(i)}
                   className={`w-full text-left p-4 rounded-lg border transition-all ${selectedVariant === i ? 'bg-white border-blue-500 ring-1 ring-blue-500 shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'}`}
                 >
                   <div className="flex items-center justify-between mb-1.5">
                     <span className="font-semibold text-sm">{v.name}</span>
                     {selectedVariant === i && <CheckCircle2 size={16} className="text-blue-500" />}
                   </div>
                   <p className="text-xs text-neutral-500 leading-relaxed">{v.desc}</p>
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-100">
          <div className="h-14 border-b border-neutral-200 bg-white/50 backdrop-blur px-6 flex items-center gap-6">
            <button 
              onClick={() => setActiveTab("components")}
              className={`text-sm font-semibold py-4 border-b-2 transition-colors ${activeTab === "components" ? "border-blue-600 text-blue-600" : "border-transparent text-neutral-500 hover:text-neutral-900"}`}
            >
              Component Library
            </button>
            <button 
              onClick={() => setActiveTab("layout")}
              className={`text-sm font-semibold py-4 border-b-2 transition-colors ${activeTab === "layout" ? "border-blue-600 text-blue-600" : "border-transparent text-neutral-500 hover:text-neutral-900"}`}
            >
              Assembled Layout
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
            {loading ? (
               <div className="flex-1 w-full flex flex-col items-center justify-center">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-neutral-200 flex items-center justify-center mb-6">
                   <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                 </div>
                 <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Enforcing strict guidelines...</p>
               </div>
            ) : (
              <div className="w-full max-w-5xl transition-all duration-500">
                {activeTab === "components" ? (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Component Showcases */}
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Buttons & Actions</h3>
                      <div className="flex flex-wrap gap-4 items-center">
                        <button className={`px-4 py-2 font-medium text-sm transition-all ${selectedVariant === 0 ? 'bg-blue-600 text-white rounded' : selectedVariant === 1 ? 'bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-500/20' : 'bg-black text-white rounded-none'}`}>Primary Action</button>
                        <button className={`px-4 py-2 font-medium text-sm border transition-all ${selectedVariant === 0 ? 'border-neutral-300 rounded hover:bg-neutral-50' : selectedVariant === 1 ? 'border-indigo-200 text-indigo-600 rounded-full hover:bg-indigo-50' : 'border-black text-black rounded-none hover:bg-neutral-100'}`}>Secondary</button>
                        <button className="px-4 py-2 font-medium text-sm text-neutral-500 hover:underline">Ghost</button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Form Inputs</h3>
                      <div className="space-y-4">
                        <input type="text" placeholder="Email address" className={`w-full p-2.5 text-sm outline-none transition-all ${selectedVariant === 0 ? 'border border-neutral-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500' : selectedVariant === 1 ? 'border-2 border-neutral-100 rounded-xl bg-neutral-50 focus:border-indigo-500 focus:bg-white' : 'border-b border-black rounded-none focus:border-b-2 bg-transparent'}`} />
                        <select className={`w-full p-2.5 text-sm outline-none transition-all ${selectedVariant === 0 ? 'border border-neutral-300 rounded focus:border-blue-500' : selectedVariant === 1 ? 'border-2 border-neutral-100 rounded-xl bg-neutral-50 focus:border-indigo-500' : 'border-b border-black rounded-none bg-transparent'}`}>
                           <option>Select an option...</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm col-span-2">
                      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Data Display (Cards)</h3>
                      <div className={`p-6 transition-all ${selectedVariant === 0 ? 'border border-neutral-200 rounded-lg shadow-sm bg-white' : selectedVariant === 1 ? 'border-none rounded-2xl shadow-xl shadow-indigo-100 bg-white' : 'border-2 border-black rounded-none bg-white'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-sm text-neutral-500 mb-1">Total Balance</div>
                            <div className={`text-3xl font-bold ${selectedVariant === 2 ? 'font-serif' : 'font-sans'}`}>$124,592.00</div>
                          </div>
                          <div className={`px-2.5 py-1 text-xs font-bold flex items-center gap-1 ${selectedVariant === 0 ? 'bg-green-100 text-green-700 rounded' : selectedVariant === 1 ? 'bg-emerald-100 text-emerald-600 rounded-full' : 'border border-black'}`}>
                            +12.5%
                          </div>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                          <div className={`h-full w-2/3 ${selectedVariant === 0 ? 'bg-blue-600' : selectedVariant === 1 ? 'bg-indigo-500' : 'bg-black'}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`w-full aspect-[16/10] overflow-hidden flex flex-col transition-all ${selectedVariant === 0 ? 'bg-neutral-50 border border-neutral-200 rounded-lg shadow-md' : selectedVariant === 1 ? 'bg-[#F8FAFC] rounded-[2rem] shadow-2xl shadow-indigo-900/10 border border-white' : 'bg-white border-4 border-black rounded-none'}`}>
                    <div className={`h-16 px-8 flex items-center justify-between ${selectedVariant === 0 ? 'bg-white border-b border-neutral-200' : selectedVariant === 1 ? 'bg-white/50 backdrop-blur-md' : 'border-b-4 border-black'}`}>
                       <div className="font-bold text-lg">PortfolioApp</div>
                       <div className="flex gap-6 text-sm font-medium text-neutral-600">
                         <span className={selectedVariant === 2 ? 'border-b-2 border-black pb-1' : ''}>Dashboard</span>
                         <span>Investments</span>
                         <span>Settings</span>
                       </div>
                    </div>
                    <div className="flex-1 p-8 grid grid-cols-3 gap-8">
                       <div className="col-span-2 space-y-8">
                         <div className={`p-8 ${selectedVariant === 0 ? 'bg-white border border-neutral-200 rounded-lg' : selectedVariant === 1 ? 'bg-white rounded-2xl shadow-sm border border-indigo-50' : 'border-2 border-black p-6'}`}>
                            <h2 className="text-xl font-bold mb-6">Performance Overview</h2>
                            <div className="h-48 bg-neutral-100 rounded flex items-end px-4 gap-2">
                              {/* Mock Chart */}
                              {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                                <div key={i} className={`flex-1 transition-all ${selectedVariant === 0 ? 'bg-blue-100 rounded-t-sm' : selectedVariant === 1 ? 'bg-indigo-100 rounded-t-xl' : 'bg-neutral-200 border-x border-t border-black'}`} style={{ height: `${h}%` }}>
                                  <div className={`w-full h-1 ${selectedVariant === 0 ? 'bg-blue-600' : selectedVariant === 1 ? 'bg-indigo-500' : 'bg-black'}`} />
                                </div>
                              ))}
                            </div>
                         </div>
                       </div>
                       <div className="space-y-6">
                         <div className={`p-6 ${selectedVariant === 0 ? 'bg-white border border-neutral-200 rounded-lg' : selectedVariant === 1 ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg' : 'bg-black text-white border-2 border-black'}`}>
                           <div className={`text-sm mb-2 ${selectedVariant === 1 ? 'text-indigo-100' : 'text-neutral-400'}`}>Available Cash</div>
                           <div className="text-4xl font-bold">$42,000</div>
                           <button className={`mt-6 w-full py-2.5 text-sm font-bold transition-all ${selectedVariant === 0 ? 'bg-neutral-100 text-neutral-900 rounded hover:bg-neutral-200' : selectedVariant === 1 ? 'bg-white text-indigo-600 rounded-xl shadow-sm' : 'bg-white text-black border border-white hover:bg-neutral-200'}`}>
                             Transfer Funds
                           </button>
                         </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
