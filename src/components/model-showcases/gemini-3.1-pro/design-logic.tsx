"use client"

import React, { useState } from "react"
import { LayoutGrid, Type, Image as ImageIcon, Send, History, ChevronRight, Share } from "lucide-react"

export default function DesignLogic() {
  const [activeTab, setActiveTab] = useState("A")
  const [loading, setLoading] = useState(false)
  const [brief, setBrief] = useState("")

  const triggerGen = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <div className="h-screen flex bg-zinc-100 text-zinc-900 font-mono text-sm">
      {/* Left Pane - Logical Structure */}
      <div className="w-1/3 min-w-[400px] border-r border-zinc-300 bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <header className="p-6 border-b border-zinc-200">
          <div className="flex items-baseline justify-between mb-2">
            <h1 className="text-xl font-bold tracking-tight">MUSE://Studio</h1>
            <span className="text-zinc-400">v3.1</span>
          </div>
          <div className="flex gap-2 mb-4">
            <span className="px-2.5 py-1 bg-zinc-900 text-zinc-50 rounded-md text-xs font-semibold uppercase tracking-wider">Gemini 3.1 Pro</span>
            <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-zinc-600 rounded-md text-xs font-medium">frontend-design</span>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Constructing logical layout parameters and design tokens for structured campaign generation.
          </p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Input Module */}
          <section className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase">
              <span>01. Input Definition</span>
              <Type size={14} />
            </div>
            <textarea
              className="w-full h-32 bg-zinc-50 border border-zinc-200 rounded-none p-4 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none resize-none transition-all placeholder:text-zinc-400"
              placeholder="Enter brief parameters..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </section>

          {/* Constraints Module */}
          <section className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase">
              <span>02. Constraints</span>
              <LayoutGrid size={14} />
            </div>
            <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
              <div className="bg-white p-3">
                <label className="block text-xs text-zinc-500 mb-1">Target Ratio</label>
                <select className="w-full bg-transparent outline-none font-medium text-zinc-800">
                  <option>16:9 Landscape</option>
                  <option>9:16 Portrait</option>
                  <option>1:1 Square</option>
                </select>
              </div>
              <div className="bg-white p-3">
                <label className="block text-xs text-zinc-500 mb-1">Color Space</label>
                <select className="w-full bg-transparent outline-none font-medium text-zinc-800">
                  <option>sRGB (Digital)</option>
                  <option>Display P3</option>
                  <option>CMYK (Print)</option>
                </select>
              </div>
              <div className="bg-white p-3">
                <label className="block text-xs text-zinc-500 mb-1">Typography</label>
                <select className="w-full bg-transparent outline-none font-medium text-zinc-800">
                  <option>Geometric Sans</option>
                  <option>Transitional Serif</option>
                </select>
              </div>
              <div className="bg-white p-3">
                <label className="block text-xs text-zinc-500 mb-1">Grid System</label>
                <select className="w-full bg-transparent outline-none font-medium text-zinc-800">
                  <option>12-Column Btm</option>
                  <option>8-pt Modular</option>
                </select>
              </div>
            </div>
          </section>

          {/* Action */}
          <button 
            onClick={triggerGen}
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium flex items-center justify-between px-6 transition-colors active:scale-[0.98]"
          >
            <span>Execute Generation</span>
            {loading ? <span className="w-2 h-2 bg-white rounded-full animate-ping" /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Activity Log */}
        <footer className="p-4 border-t border-zinc-200 bg-zinc-50 h-32 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase mb-3">
            <History size={14} /> Log
          </div>
          <div className="space-y-2 text-xs text-zinc-600 font-mono overflow-y-auto">
            <div className="flex gap-4"><span className="text-zinc-400">10:42:01</span><span>Select variant {activeTab}</span></div>
            <div className="flex gap-4"><span className="text-zinc-400">10:41:15</span><span className="text-green-600">Generation complete [1.2s]</span></div>
            <div className="flex gap-4"><span className="text-zinc-400">10:41:14</span><span>Executing generation...</span></div>
          </div>
        </footer>
      </div>

      {/* Right Pane - Visual Output */}
      <div className="flex-1 flex flex-col bg-zinc-100 p-8">
        {/* Output Header */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-1">Output Canvas</h2>
            <div className="text-zinc-500">Evaluating logical variants</div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors">
              <Share size={14} /> Share Link
            </button>
            <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors">
              Save Source
            </button>
          </div>
        </header>

        {/* Variant Selector */}
        <div className="flex gap-2 mb-6">
          {["A", "B", "C"].map(v => (
            <button
              key={v}
              onClick={() => setActiveTab(v)}
              className={`px-6 py-2 border text-sm transition-all ${activeTab === v ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}
            >
              Variant {v}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white border border-zinc-200 shadow-sm relative overflow-hidden flex flex-col">
          {loading ? (
            <div className="absolute inset-0 bg-zinc-50/80 backdrop-blur flex items-center justify-center z-10">
              <div className="text-zinc-400 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
                <span>Computing layout coordinates...</span>
              </div>
            </div>
          ) : null}

          {/* Wireframe Mockup */}
          <div className="flex-1 p-12 flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className={`w-full max-w-2xl bg-white border-2 border-zinc-900 shadow-[8px_8px_0_0_#18181b] transition-all duration-500 ${activeTab === 'A' ? 'aspect-video' : activeTab === 'B' ? 'aspect-[4/3]' : 'aspect-square max-w-md'}`}>
              <div className="h-10 border-b-2 border-zinc-900 flex items-center px-4 gap-2 bg-zinc-100">
                <div className="w-3 h-3 rounded-full border-2 border-zinc-900" />
                <div className="w-3 h-3 rounded-full border-2 border-zinc-900" />
                <div className="w-3 h-3 rounded-full border-2 border-zinc-900" />
              </div>
              <div className="p-8 flex flex-col h-[calc(100%-40px)]">
                <div className={`border-2 border-zinc-900 border-dashed flex items-center justify-center text-zinc-400 mb-6 ${activeTab === 'A' ? 'h-1/2' : 'h-1/3'}`}>
                  <ImageIcon size={32} />
                </div>
                <div className="space-y-4">
                  <div className={`h-8 bg-zinc-900 w-3/4`} />
                  <div className={`h-4 bg-zinc-200 w-full`} />
                  <div className={`h-4 bg-zinc-200 w-5/6`} />
                  <div className="mt-auto pt-6">
                    <div className="h-10 bg-zinc-900 w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Footer */}
          <div className="h-20 border-t border-zinc-200 bg-zinc-50 flex items-center px-8 gap-12">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Est. Conversion</div>
              <div className="text-lg font-medium">{activeTab === "A" ? "4.2%" : activeTab === "B" ? "3.8%" : "5.1%"}</div>
            </div>
            <div className="w-px h-8 bg-zinc-300" />
            <div>
              <div className="text-xs text-zinc-500 mb-1">Information Density</div>
              <div className="text-lg font-medium">{activeTab === "A" ? "High" : activeTab === "B" ? "Medium" : "Low"}</div>
            </div>
            <div className="w-px h-8 bg-zinc-300" />
            <div>
              <div className="text-xs text-zinc-500 mb-1">Visual Hierarchy</div>
              <div className="text-lg font-medium">Score: {activeTab === "A" ? "92/100" : activeTab === "B" ? "88/100" : "95/100"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
