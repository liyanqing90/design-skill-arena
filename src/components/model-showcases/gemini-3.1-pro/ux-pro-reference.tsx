"use client"

import React, { useState } from "react"
import { Layers, MousePointer2, Smartphone, Monitor, ChevronDown, Wand2, Eye, LineChart } from "lucide-react"

export default function UxProReference() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop")
  const [flow, setFlow] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans">
      {/* Header */}
      <header className="h-[60px] bg-white/80 backdrop-blur-xl border-b border-[#E5E5EA] sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="font-semibold text-[19px] tracking-tight">Muse <span className="font-normal text-[#86868B]">UX Pro</span></h1>
          <div className="flex items-center gap-2 bg-[#F2F2F7] px-3 py-1.5 rounded-full">
            <span className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wide">Gemini 3.1 Pro</span>
            <div className="w-1 h-1 rounded-full bg-[#D1D1D6]" />
            <span className="text-[11px] font-semibold text-[#0066CC] uppercase tracking-wide">ui-ux-pro-max</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-[#E5E5EA] p-0.5 rounded-lg">
            <button 
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-md transition-all ${device === "desktop" ? "bg-white shadow-sm text-[#1D1D1F]" : "text-[#86868B]"}`}
            >
              <Monitor size={18} />
            </button>
            <button 
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-md transition-all ${device === "mobile" ? "bg-white shadow-sm text-[#1D1D1F]" : "text-[#86868B]"}`}
            >
              <Smartphone size={18} />
            </button>
          </div>
          <button className="bg-[#0066CC] hover:bg-[#005bb5] text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
            Publish Flow
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row h-[calc(100vh-60px)]">
        {/* Left Config Panel */}
        <div className="w-full lg:w-[320px] bg-white border-r border-[#E5E5EA] flex flex-col z-10">
          <div className="p-6 border-b border-[#E5E5EA]">
            <h2 className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider mb-4">User Journey Setup</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-[#1D1D1F] block mb-1.5">Primary Objective</label>
                <div className="relative">
                  <select className="w-full bg-[#F5F5F7] border-none rounded-lg py-2.5 pl-3 pr-10 text-[14px] focus:ring-2 focus:ring-[#0066CC]/30 outline-none appearance-none">
                    <option>Drive App Downloads</option>
                    <option>Lead Generation</option>
                    <option>E-commerce Sale</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B]" size={16} />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#1D1D1F] block mb-1.5">Context & Intent</label>
                <textarea 
                  className="w-full h-24 bg-[#F5F5F7] border-none rounded-lg p-3 text-[14px] focus:ring-2 focus:ring-[#0066CC]/30 outline-none resize-none"
                  placeholder="e.g. User arrives from Instagram ad..."
                  defaultValue="User arrives from Instagram story highlighting our new productivity features."
                />
              </div>
              <button 
                onClick={handleGenerate}
                className="w-full py-2.5 bg-[#1D1D1F] text-white rounded-lg text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#000000] transition-colors"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Wand2 size={16} />}
                Generate UX Flows
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFC]">
            <h2 className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider mb-4">Generated Flows</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <button
                  key={item}
                  onClick={() => setFlow(item)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    flow === item 
                    ? "bg-white border-[#0066CC] shadow-[0_4px_12px_rgba(0,102,204,0.12)]" 
                    : "bg-white border-[#E5E5EA] hover:border-[#C7C7CC]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[14px]">Flow Variant {item}</span>
                    {flow === item && <div className="w-2 h-2 rounded-full bg-[#0066CC]" />}
                  </div>
                  <div className="text-[12px] text-[#86868B] leading-relaxed">
                    {item === 1 ? "Direct CTA approach with social proof." : item === 2 ? "Educational scroll with floating CTA." : "Interactive quiz before conversion."}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-[12px] font-medium text-[#1D1D1F]">
                    <div className="flex items-center gap-1.5"><MousePointer2 size={12} className="text-[#0066CC]"/> {[4.8, 3.2, 5.5][item-1]}% CTR</div>
                    <div className="flex items-center gap-1.5"><Eye size={12} className="text-[#34C759]"/> {[65, 82, 45][item-1]}% Scroll</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Canvas */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex flex-col items-center">
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative ${
            device === "mobile" 
            ? "w-[375px] h-[812px] rounded-[48px] border-[12px] border-[#1D1D1F] shadow-2xl overflow-hidden" 
            : "w-full max-w-5xl aspect-video rounded-2xl border border-[#E5E5EA] shadow-xl overflow-hidden bg-white"
          }`}>
            {loading ? (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#F2F2F7] border-t-[#0066CC] rounded-full animate-spin mb-4" />
                <p className="font-medium text-[#1D1D1F]">Analyzing UX Patterns...</p>
              </div>
            ) : null}
            
            {/* Mock Content inside device frame */}
            <div className={`w-full h-full ${flow === 1 ? 'bg-gradient-to-br from-[#F2F2F7] to-white' : flow === 2 ? 'bg-[#1D1D1F] text-white' : 'bg-[#EBF4FF]'} flex flex-col`}>
              <div className="p-8 md:p-16 flex-1 flex flex-col justify-center">
                <div className={`w-16 h-16 rounded-2xl mb-8 ${flow === 2 ? 'bg-white/10' : 'bg-[#0066CC]/10'} flex items-center justify-center`}>
                  <Layers className={flow === 2 ? 'text-white' : 'text-[#0066CC]'} size={32} />
                </div>
                <h2 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${flow === 2 ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  {flow === 1 ? "Work Smarter." : flow === 2 ? "Pro Performance." : "Discover the Magic."}
                </h2>
                <p className={`text-lg md:text-xl mb-8 max-w-lg ${flow === 2 ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
                  Experience the most intuitive way to manage your tasks. Designed for professionals who demand excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className={`px-6 py-3 rounded-full font-medium text-center ${flow === 2 ? 'bg-white text-[#1D1D1F]' : 'bg-[#1D1D1F] text-white'}`}>
                    Start Free Trial
                  </button>
                  <button className={`px-6 py-3 rounded-full font-medium text-center ${flow === 2 ? 'text-white border border-white/20' : 'text-[#1D1D1F] border border-[#E5E5EA] hover:bg-[#F2F2F7]'}`}>
                    View Pricing
                  </button>
                </div>
              </div>

              {/* Mock UX Heatmap overlay */}
              {device === "desktop" && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-80 h-96 border border-red-500/20 bg-red-500/5 rounded-3xl p-6 hidden lg:flex flex-col justify-end">
                  <div className="w-12 h-12 bg-red-500/50 rounded-full blur-xl absolute bottom-12 left-12 animate-pulse" />
                  <div className="bg-white/90 backdrop-blur text-[11px] font-medium p-2 rounded shadow-sm inline-block border border-red-100 text-red-600">
                    High attention area (78%)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div className="w-full max-w-5xl mt-12 bg-white rounded-2xl border border-[#E5E5EA] p-6 shadow-sm">
            <h3 className="text-[15px] font-semibold mb-6 flex items-center gap-2"><LineChart size={18} className="text-[#0066CC]"/> Usability Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] text-[#86868B]">Task Success Rate</span>
                  <span className="text-[13px] font-semibold text-[#1D1D1F]">{[94, 88, 91][flow-1]}%</span>
                </div>
                <div className="h-1.5 bg-[#F2F2F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#34C759] rounded-full" style={{ width: `${[94, 88, 91][flow-1]}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] text-[#86868B]">Cognitive Load</span>
                  <span className="text-[13px] font-semibold text-[#1D1D1F]">{['Low', 'Medium', 'Low'][flow-1]}</span>
                </div>
                <div className="h-1.5 bg-[#F2F2F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9500] rounded-full" style={{ width: flow === 2 ? '60%' : '30%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] text-[#86868B]">Time on Page</span>
                  <span className="text-[13px] font-semibold text-[#1D1D1F]">{['1m 24s', '2m 10s', '1m 45s'][flow-1]}</span>
                </div>
                <div className="h-1.5 bg-[#F2F2F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0066CC] rounded-full" style={{ width: flow === 2 ? '80%' : '50%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
