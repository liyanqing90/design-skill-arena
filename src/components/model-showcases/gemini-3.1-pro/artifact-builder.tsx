"use client"

import React, { useState } from "react"
import { Code2, Play, Download, Settings, Box, BarChart, ExternalLink, ChevronRight, CheckCircle } from "lucide-react"

export default function ArtifactBuilder() {
  const [activeTab, setActiveTab] = useState("preview")
  const [variant, setVariant] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <header className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none mb-1">Muse Artifact Builder</span>
            <div className="flex gap-1.5">
              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 rounded uppercase tracking-wider">Gemini 3.1 Pro</span>
              <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-1.5 rounded uppercase tracking-wider">web-artifacts-builder</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 text-sm font-medium border border-slate-200 rounded bg-white hover:bg-slate-50 flex items-center gap-2 transition-colors">
            <Download size={14} /> Export Code
          </button>
          <button className="h-8 px-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 transition-colors">
            <Play size={14} /> Deploy
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-4">
          <button className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Box size={20} /></button>
          <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-500 flex items-center justify-center"><Settings size={20} /></button>
          <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-500 flex items-center justify-center"><BarChart size={20} /></button>
        </div>

        {/* Configuration Panel */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200 font-semibold text-sm flex items-center justify-between">
            Artifact Configuration
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prompt</label>
              <textarea 
                className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Describe the campaign UI..."
                defaultValue="A sleek dark-mode landing page header for a new smartwatch."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Framework</label>
              <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                <option>React + Tailwind CSS</option>
                <option>Vue + UnoCSS</option>
                <option>Svelte + SCSS</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Device</label>
              <div className="flex rounded-lg overflow-hidden border border-slate-200">
                <button className="flex-1 py-2 text-xs font-medium bg-blue-50 text-blue-600 border-r border-slate-200">Desktop</button>
                <button className="flex-1 py-2 text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100 border-r border-slate-200">Tablet</button>
                <button className="flex-1 py-2 text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100">Mobile</button>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play size={14} fill="currentColor" />}
              {isGenerating ? "Compiling..." : "Build Artifact"}
            </button>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Generation History</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2 bg-white border border-slate-200 rounded cursor-pointer border-blue-500">
                <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500"/> Variant C (v1.2)</div>
                <span className="text-slate-400">Just now</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 bg-white border border-slate-200 rounded cursor-pointer opacity-70">
                <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500"/> Variant B (v1.1)</div>
                <span className="text-slate-400">5m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-100">
          <div className="h-12 border-b border-slate-200 bg-white flex items-center justify-between px-2">
            <div className="flex gap-1">
              <button 
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "preview" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Preview
              </button>
              <button 
                onClick={() => setActiveTab("code")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "code" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"}`}
              >
                <Code2 size={16} /> Code
              </button>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {[0, 1, 2].map(v => (
                <button 
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`w-8 h-6 rounded text-xs font-medium transition-colors ${variant === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  {["A", "B", "C"][v]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-8 flex flex-col items-center">
            {activeTab === "preview" ? (
              <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col relative transition-all">
                {isGenerating && (
                  <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-xl flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                      <span className="text-sm font-medium">Building layout...</span>
                    </div>
                  </div>
                )}
                
                {/* Browser Chrome */}
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 h-6 bg-white rounded-md border border-slate-200 flex items-center px-3 text-xs text-slate-400 font-mono">
                    localhost:3000/campaign/{["a", "b", "c"][variant]}
                  </div>
                </div>

                {/* Simulated Content */}
                <div className={`aspect-video w-full transition-colors duration-500 flex flex-col items-center justify-center p-12 text-center ${
                  variant === 0 ? "bg-slate-900 text-white" : 
                  variant === 1 ? "bg-blue-600 text-white" : 
                  "bg-gradient-to-br from-emerald-400 to-teal-600 text-white"
                }`}>
                  <h1 className="text-4xl font-bold mb-4">
                    {variant === 0 ? "Meet the Series X." : variant === 1 ? "Power on your wrist." : "Design meets technology."}
                  </h1>
                  <p className="text-lg opacity-80 max-w-md mb-8">
                    Discover the next generation of smartwatches. Pre-order now and get 20% off your first purchase.
                  </p>
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold hover:scale-105 transition-transform">
                    Pre-order Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col">
                <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 text-slate-400 text-xs font-mono">
                  components/Hero{["A", "B", "C"][variant]}.tsx
                </div>
                <div className="p-4 font-mono text-sm text-blue-300 whitespace-pre">
                  {`export default function Hero() {
  return (
    <div className="${variant === 0 ? 'bg-slate-900' : variant === 1 ? 'bg-blue-600' : 'bg-gradient-to-br'} text-white">
      <h1>${variant === 0 ? 'Meet the Series X.' : 'Power on your wrist.'}</h1>
      <button>Pre-order Now</button>
    </div>
  )
}`}
                </div>
              </div>
            )}

            {/* Performance Stats */}
            <div className="w-full max-w-4xl mt-6 grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Bundle Size</div>
                <div className="text-lg font-bold">14.2 KB</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">LCP Score</div>
                <div className="text-lg font-bold text-green-600">1.2s</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Est. Conversion</div>
                <div className="text-lg font-bold text-blue-600">{[3.4, 4.1, 2.9][variant]}%</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Preview URL</div>
                  <div className="text-sm font-medium text-blue-600 flex items-center gap-1">muse.app/preview <ExternalLink size={12}/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
