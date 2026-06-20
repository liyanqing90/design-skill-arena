"use client"

import React, { useState } from "react"
import { Grid, Eye, Cpu, Zap, Download, LineChart, Code2 } from "lucide-react"

export default function DesignUxPro() {
  const [activeLayout, setActiveLayout] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSynthesize = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const layouts = [
    { name: "Split Modular", logic: "Z-Pattern scanning, high info density", score: 94 },
    { name: "Hero Centric", logic: "F-Pattern scanning, emotional impact", score: 88 },
    { name: "Progressive Discl.", logic: "Sequential reveal, lower cognitive load", score: 91 }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] font-mono flex flex-col">
      <header className="h-14 border-b border-[#DEE2E6] bg-white px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-[#495057]">
            <Grid size={20} className="text-[#339AF0]" /> MUSE_SYS
          </div>
          <div className="h-4 w-px bg-[#DEE2E6]" />
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-[#F1F3F5] text-[#868E96] text-[10px] uppercase font-bold tracking-widest rounded">Gemini 3.1 Pro</span>
            <span className="px-2 py-0.5 bg-[#E7F5FF] text-[#228BE6] text-[10px] uppercase font-bold tracking-widest rounded">design + ux pro</span>
          </div>
        </div>
        <div className="flex gap-2 text-[#495057]">
          <button className="h-8 px-3 rounded flex items-center gap-2 hover:bg-[#F1F3F5] text-xs font-semibold transition-colors">
            <Code2 size={14} /> View Schema
          </button>
          <button className="h-8 px-3 rounded flex items-center gap-2 bg-[#339AF0] hover:bg-[#228BE6] text-white text-xs font-semibold transition-colors">
            <Download size={14} /> Export Logic
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Wireframe Configurator */}
        <section className="w-[380px] bg-white border-r border-[#DEE2E6] flex flex-col shadow-[4px_0_12px_rgba(0,0,0,0.02)] z-10">
          <div className="p-6 border-b border-[#DEE2E6]">
            <h2 className="text-xs font-bold text-[#ADB5BD] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu size={14} /> Logic Parameters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#495057] mb-2">Intent Definition</label>
                <textarea 
                  className="w-full h-24 p-3 bg-[#F8F9FA] border border-[#DEE2E6] rounded-md text-sm focus:border-[#339AF0] focus:ring-1 focus:ring-[#339AF0] outline-none resize-none transition-all placeholder-[#ADB5BD]"
                  placeholder="Define UX goals..."
                  defaultValue="Maximize conversion for the new enterprise tier."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#495057] mb-2">Cognitive Load</label>
                  <select className="w-full p-2 bg-[#F8F9FA] border border-[#DEE2E6] rounded-md text-xs outline-none">
                    <option>Optimized (Low)</option>
                    <option>Standard (Med)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#495057] mb-2">Accessibility</label>
                  <select className="w-full p-2 bg-[#F8F9FA] border border-[#DEE2E6] rounded-md text-xs outline-none">
                    <option>WCAG AAA</option>
                    <option>WCAG AA</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSynthesize}
                className="w-full py-3 bg-[#212529] hover:bg-[#343A40] text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Zap size={14} className="animate-pulse text-[#339AF0]" /> : <Zap size={14} />}
                Synthesize Layouts
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
            <h3 className="text-xs font-bold text-[#ADB5BD] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Grid size={14} /> Structural Variants
            </h3>
            <div className="space-y-3">
              {layouts.map((layout, i) => (
                <button
                  key={i}
                  onClick={() => setActiveLayout(i)}
                  className={`w-full text-left p-4 rounded-md border transition-all ${activeLayout === i ? 'bg-white border-[#339AF0] shadow-[0_2px_8px_rgba(51,154,240,0.15)]' : 'bg-white border-[#DEE2E6] hover:border-[#ADB5BD]'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#495057]">{layout.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activeLayout === i ? 'bg-[#E7F5FF] text-[#228BE6]' : 'bg-[#F1F3F5] text-[#868E96]'}`}>v1.{i}</span>
                  </div>
                  <p className="text-xs text-[#868E96] mb-3">{layout.logic}</p>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Eye size={12} className={activeLayout === i ? 'text-[#339AF0]' : 'text-[#ADB5BD]'} /> Usability Score: {layout.score}/100
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blueprint Canvas */}
        <section className="flex-1 flex flex-col items-center justify-center p-8 bg-[#E9ECEF] relative overflow-hidden">
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#dee2e6_1px,transparent_1px),linear-gradient(to_bottom,#dee2e6_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50 pointer-events-none" />

          {loading && (
            <div className="absolute inset-0 bg-[#E9ECEF]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-[#DEE2E6] border-t-[#339AF0] rounded-full animate-spin mb-4" />
              <div className="text-sm font-bold text-[#495057] tracking-widest uppercase">Calculating Coordinates</div>
            </div>
          )}

          <div className="relative w-full max-w-4xl bg-white border-2 border-[#CED4DA] shadow-2xl rounded-lg overflow-hidden flex flex-col transition-all duration-500">
            {/* Browser/Window Header */}
            <div className="h-8 border-b-2 border-[#CED4DA] bg-[#F8F9FA] flex items-center px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-[#CED4DA]" />
                <div className="w-3 h-3 rounded-full border-2 border-[#CED4DA]" />
                <div className="w-3 h-3 rounded-full border-2 border-[#CED4DA]" />
              </div>
            </div>

            {/* Wireframe Mockup Based on Active Layout */}
            <div className="flex-1 p-8 grid gap-6" style={{
              gridTemplateColumns: activeLayout === 0 ? '1fr 1fr' : activeLayout === 1 ? '1fr' : '1fr',
              minHeight: '500px'
            }}>
              {activeLayout === 0 && (
                <>
                  <div className="space-y-6 flex flex-col justify-center">
                    <div className="w-3/4 h-12 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                    <div className="w-full h-4 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                    <div className="w-5/6 h-4 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                    <div className="w-1/2 h-10 bg-[#339AF0]/10 border-2 border-[#339AF0] rounded mt-4" />
                  </div>
                  <div className="bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded-lg flex items-center justify-center text-[#ADB5BD] font-bold">
                    [Media Container]
                  </div>
                </>
              )}
              {activeLayout === 1 && (
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-full h-64 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded-lg mb-8 flex items-center justify-center text-[#ADB5BD] font-bold">
                    [Hero Media Container]
                  </div>
                  <div className="w-2/3 h-12 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded mx-auto" />
                  <div className="w-1/2 h-4 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded mx-auto" />
                  <div className="w-1/3 h-12 bg-[#339AF0]/10 border-2 border-[#339AF0] rounded mx-auto mt-4" />
                </div>
              )}
              {activeLayout === 2 && (
                <div className="space-y-8 p-12">
                  <div className="w-1/2 h-16 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                  <div className="grid grid-cols-3 gap-6 mt-12">
                    <div className="h-32 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                    <div className="h-32 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                    <div className="h-32 bg-[#E9ECEF] border-2 border-dashed border-[#CED4DA] rounded" />
                  </div>
                </div>
              )}
            </div>

            {/* UX Metric Footer */}
            <div className="h-16 bg-[#F8F9FA] border-t-2 border-[#CED4DA] flex items-center px-8 gap-8">
              <div className="flex items-center gap-3">
                <LineChart size={16} className="text-[#339AF0]" />
                <span className="text-xs font-bold text-[#495057]">Est. Conversion: <span className="text-[#339AF0]">{activeLayout === 0 ? '4.8%' : activeLayout === 1 ? '5.2%' : '4.5%'}</span></span>
              </div>
              <div className="w-px h-6 bg-[#DEE2E6]" />
              <div className="text-xs font-bold text-[#495057]">Fitts&apos; Law Index: Optimal</div>
              <div className="w-px h-6 bg-[#DEE2E6]" />
              <div className="text-xs font-bold text-[#495057]">Visual Hierarchy: Clear</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
