"use client"

import React, { useState } from "react"
import { Wand2, Activity, Save, Share, ChevronDown, Check, ArrowUpRight } from "lucide-react"

export default function ImpeccableFullFlow() {
  const [activeCard, setActiveCard] = useState("concept-1")
  const [loading, setLoading] = useState(false)
  
  const generate = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const concepts = [
    { id: "concept-1", name: "Concept Alpha", theme: "Modern Minimal", ctr: "5.4%", cpa: "$12.40" },
    { id: "concept-2", name: "Concept Beta", theme: "Vibrant Youth", ctr: "6.1%", cpa: "$10.80" },
    { id: "concept-3", name: "Concept Gamma", theme: "Corporate Trust", ctr: "4.2%", cpa: "$15.20" },
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-inner shadow-indigo-400/20">
              <Wand2 className="text-white" size={16} />
            </div>
            <span className="font-semibold text-lg tracking-tight">Muse</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex gap-2">
            <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-md border border-gray-200 shadow-sm">Gemini 3.1 Pro</span>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100 shadow-sm">impeccable</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50">
            <Save size={16} /> Save Draft
          </button>
          <button className="text-sm font-medium bg-[#111] hover:bg-gray-800 text-white transition-all shadow-md shadow-gray-900/10 flex items-center gap-2 px-4 py-2 rounded-lg">
            Export Assets <ArrowUpRight size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
        {/* Left Column: Brief & Generation */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Campaign Brief</h2>
            <p className="text-gray-500 text-sm">Define your objective and audience to generate high-converting creatives.</p>
          </div>

          <div className="space-y-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Product / Service</label>
              <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm" placeholder="e.g. Next-gen AI headphones" defaultValue="Noise-Canceling Wireless Earbuds" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Core Message</label>
              <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none h-24" placeholder="What's the main hook?" defaultValue="Experience pure silence. Battery life that lasts all week." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Audience</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm">
                    <option>Tech Savvy</option>
                    <option>Audiophiles</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Platform</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm">
                    <option>Instagram</option>
                    <option>Google Ads</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <button 
              onClick={generate}
              className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                <>
                  <Wand2 size={18} className="group-hover:rotate-12 transition-transform" /> Generate Variations
                </>
              )}
            </button>
          </div>

          {/* Mini Activity Feed */}
          <div className="px-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} /></div>
                <div>
                  <p className="text-sm text-gray-800">Generated 3 variations</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 mins ago</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 mt-0.5"><Save size={12} /></div>
                <div>
                  <p className="text-sm text-gray-800">Saved brief parameters</p>
                  <p className="text-xs text-gray-500 mt-0.5">15 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output & Preview */}
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {concepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setActiveCard(concept.id)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  activeCard === concept.id 
                  ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-500 shadow-sm' 
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeCard === concept.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {concept.name}
                  </span>
                  {activeCard === concept.id && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">{concept.theme}</div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>CTR: {concept.ctr}</span>
                  <span>CPA: {concept.cpa}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 shadow-inner">
                  <Wand2 className="animate-pulse" size={24} />
                </div>
                <p className="font-medium text-gray-900">Crafting perfection...</p>
              </div>
            )}
            
            <div className="aspect-[16/10] bg-gray-100 flex flex-col p-8 md:p-16 relative overflow-hidden group">
              {/* Decorative elements based on active card */}
              <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transition-colors duration-1000 ${activeCard === 'concept-1' ? 'bg-indigo-200' : activeCard === 'concept-2' ? 'bg-pink-200' : 'bg-blue-200'}`} />
              <div className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transition-colors duration-1000 ${activeCard === 'concept-1' ? 'bg-purple-200' : activeCard === 'concept-2' ? 'bg-orange-200' : 'bg-slate-300'}`} />

              <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
                <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-semibold text-gray-800 mb-6 shadow-sm">
                  {concepts.find(c => c.id === activeCard)?.theme}
                </span>
                <h1 className={`font-bold tracking-tight mb-4 transition-all duration-500 ${activeCard === 'concept-2' ? 'text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500' : 'text-5xl md:text-6xl text-gray-900'}`}>
                  {activeCard === 'concept-1' ? 'Pure Silence.' : activeCard === 'concept-2' ? 'Feel the Beat.' : 'Professional Audio.'}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-lg mb-8">
                  {activeCard === 'concept-1' ? 'Experience the world on your terms with our next-generation noise cancellation technology.' : 'Immerse yourself in studio-quality sound designed for your active lifestyle.'}
                </p>
                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold shadow-xl shadow-gray-900/20 hover:scale-105 transition-transform">
                  Shop Collection
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
              <div className="flex gap-8">
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Predicted CTR</div>
                  <div className="text-xl font-bold text-gray-900">{concepts.find(c => c.id === activeCard)?.ctr} <span className="text-sm font-normal text-green-600 ml-1">↑ 1.2%</span></div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Estimated CPA</div>
                  <div className="text-xl font-bold text-gray-900">{concepts.find(c => c.id === activeCard)?.cpa} <span className="text-sm font-normal text-green-600 ml-1">↓ $0.40</span></div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Audience Match</div>
                  <div className="text-xl font-bold text-gray-900">94%</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                <Activity size={18} /> View Full Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
