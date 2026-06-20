"use client"

import React, { useState } from "react"
import { ShieldCheck, Crosshair, ArrowRight, Save, LayoutTemplate, Activity, BarChart3 } from "lucide-react"

export default function StandardImpeccable() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [selectedOpt, setSelectedOpt] = useState("a")

  const handleExecute = () => {
    setStatus("loading")
    setTimeout(() => setStatus("success"), 1800)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center shadow-inner">
             <ShieldCheck className="text-white" size={18} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">Muse Engine</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-1.5 rounded">Gemini 3.1 Pro</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-1.5 rounded">frontend-app-builder + impeccable</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-2 transition-colors">
            <Save size={16} /> Save State
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 rounded-lg transition-colors">
            Deploy Campaign
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Config Panel */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Crosshair size={16} className="text-indigo-600" /> Objective Params
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Campaign Input</label>
              <textarea 
                className="w-full h-28 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none transition-all"
                placeholder="Enter campaign directives..."
                defaultValue="B2B SaaS launch for enterprise security software."
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Audience Segment</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500">
                  <option>CISO & IT Directors</option>
                  <option>DevSecOps Teams</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Layout Archetype</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500">
                  <option>Data-heavy Dashboard</option>
                  <option>Trust-building Landing</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleExecute}
              className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {status === "loading" ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight size={16} />}
              {status === "loading" ? "Processing..." : "Generate Output"}
            </button>
          </div>

          <div className="p-5 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
              <span>System Status</span>
              {status === "success" ? <span className="text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Ready</span> : <span>Idle</span>}
            </div>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          {/* Output Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-lg shadow-sm">
              {[
                { id: "a", name: "Variant A (High Trust)" },
                { id: "b", name: "Variant B (Feature Led)" },
                { id: "c", name: "Variant C (Direct ROI)" }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOpt(opt.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${selectedOpt === opt.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <LayoutTemplate size={16} /> Desktop Viewport
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex-1 relative min-h-[500px]">
            {status === "loading" && (
              <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                </div>
                <div className="text-sm font-bold text-slate-700">Rendering high-fidelity preview...</div>
              </div>
            )}
            
            <div className="absolute top-0 inset-x-0 h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
            </div>

            <div className="w-full h-full pt-10 flex flex-col items-center justify-center p-12 text-center bg-slate-50 relative overflow-hidden">
              {/* Abstract decorative graphic */}
              <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-2xl">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-sm">
                  <ShieldCheck className="text-indigo-600" size={32} />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
                  {selectedOpt === "a" ? "Unbreakable Enterprise Security." : selectedOpt === "b" ? "Advanced Threat Detection." : "Secure Your ROI."}
                </h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                  Deploy military-grade encryption across your entire infrastructure in minutes, not months. Trusted by Fortune 500 companies.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                    Request Demo
                  </button>
                  <button className="px-8 py-4 bg-white text-slate-800 rounded-xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                    View Architecture
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Footer */}
          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Conversion Prediction</div>
                <div className="text-2xl font-black text-slate-900">{selectedOpt === "a" ? "8.4%" : selectedOpt === "b" ? "7.1%" : "9.2%"}</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Activity size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Engagement Score</div>
                <div className="text-2xl font-black text-slate-900">{selectedOpt === "a" ? "92" : selectedOpt === "b" ? "88" : "95"} <span className="text-sm font-medium text-slate-500">/100</span></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Target Match</div>
                <div className="text-2xl font-black text-slate-900">High</div>
              </div>
              <button className="text-indigo-600 text-sm font-bold hover:underline">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
