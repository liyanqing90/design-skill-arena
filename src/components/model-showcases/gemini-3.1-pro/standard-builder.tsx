"use client"

import React, { useState } from "react"
import { Play, Save, Download, Activity, Users, Target, Palette, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export default function StandardBuilder() {
  const [activeCreative, setActiveCreative] = useState("A")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [brief, setBrief] = useState("")

  const handleGenerate = () => {
    setStatus("loading")
    setTimeout(() => {
      setStatus(Math.random() > 0.8 ? "error" : "success")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col md:flex-row">
      {/* Left Sidebar - Controls */}
      <aside className="w-full md:w-80 bg-white border-r border-neutral-200 p-6 flex flex-col h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight">Muse Studio</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Gemini 3.1 Pro</span>
            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">frontend-app-builder</span>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Brief</label>
            <textarea 
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none resize-none h-32"
              placeholder="Describe your campaign..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2"><Users size={16}/> Target Audience</label>
              <select className="w-full p-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Gen Z Tech Enthusiasts</option>
                <option>Millennial Parents</option>
                <option>Corporate Executives</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2"><Target size={16}/> Channel</label>
              <select className="w-full p-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Instagram Stories</option>
                <option>LinkedIn Feed</option>
                <option>TikTok Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2"><Palette size={16}/> Visual Style</label>
              <select className="w-full p-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Minimalist & Clean</option>
                <option>Bold & Vibrant</option>
                <option>Cyberpunk / Dark</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleGenerate}
            disabled={status === "loading" || !brief}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors focus:ring-4 focus:ring-blue-200 outline-none"
          >
            {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
            Generate Campaign
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-neutral-500">Draft: Summer Launch 2026</span>
            {status === "success" && <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"><CheckCircle2 size={12}/> Generated</span>}
            {status === "error" && <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full"><AlertCircle size={12}/> Failed</span>}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-2 transition-colors focus:ring-2 focus:ring-blue-500 outline-none">
              <Save size={16} /> Save
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 flex items-center gap-2 transition-colors focus:ring-2 focus:ring-neutral-400 outline-none">
              <Download size={16} /> Export
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col xl:flex-row gap-8">
          {/* Preview Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="aspect-video bg-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden relative group">
              {status === "loading" ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                  <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
                  <p className="text-sm font-medium text-neutral-600">Synthesizing creative assets...</p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8 transition-all duration-500">
                  <h2 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight">
                    {activeCreative === "A" && "Unleash Your Potential"}
                    {activeCreative === "B" && "The Future is Now"}
                    {activeCreative === "C" && "Simplicity Redefined"}
                  </h2>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {["A", "B", "C"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveCreative(opt)}
                  className={`flex-1 p-4 rounded-xl border text-left transition-all outline-none focus:ring-2 focus:ring-blue-500 ${activeCreative === opt ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}`}
                >
                  <div className="font-semibold mb-1">Option {opt}</div>
                  <div className="text-xs text-neutral-500">
                    {opt === "A" ? "High impact, vibrant" : opt === "B" ? "Tech-focused, sleek" : "Minimalist, elegant"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Metrics & Activity */}
          <div className="w-full xl:w-80 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Activity size={18}/> Predictive Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Est. Reach</span>
                    <span className="font-medium">
                      {activeCreative === "A" ? "2.4M" : activeCreative === "B" ? "1.8M" : "3.1M"}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: activeCreative === "A" ? "75%" : activeCreative === "B" ? "60%" : "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Predicted CTR</span>
                    <span className="font-medium">
                      {activeCreative === "A" ? "4.2%" : activeCreative === "B" ? "5.8%" : "3.9%"}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: activeCreative === "A" ? "65%" : activeCreative === "B" ? "80%" : "55%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Conversion Rate</span>
                    <span className="font-medium">
                      {activeCreative === "A" ? "1.8%" : activeCreative === "B" ? "2.1%" : "1.5%"}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: activeCreative === "A" ? "70%" : activeCreative === "B" ? "85%" : "50%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex-1">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-neutral-200">
                {[
                  { time: "Just now", text: "Switched to Option " + activeCreative },
                  { time: "2m ago", text: "Generated initial variations" },
                  { time: "5m ago", text: "Updated target audience" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-neutral-300 z-10 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">{act.text}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
