"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Save, Download, MapPin, Eye, MousePointerClick, TrendingUp,
  BookOpen, Users, Radio, Palette, Layout, Lightbulb, CheckCircle2, XCircle, Loader2, ChevronDown
} from "lucide-react";

const AUDIENCES = ["Relocating professionals", "Expat communities", "Corporate HR teams", "Language school partners"];
const CHANNELS = ["Relocation services", "Expat forums", "Corporate L&D platforms", "Airport digital"];
const TONES = ["Practical", "Encouraging", "Culturally aware", "Structured"];
const STYLES = ["Journey illustration", "Cultural pattern", "Progress indicator", "Real scenario"];
const JOURNEY = ["Awareness", "Interest", "Consideration", "Trial", "Advocacy"];
const WIREFRAME_ZONES = [
  { id: 1, label: "Hero", x: "50%", y: "12%", rationale: "Immediate value proposition for relocating professionals" },
  { id: 2, label: "Value Prop", x: "22%", y: "38%", rationale: "3-step fluency promise with time estimates" },
  { id: 3, label: "Social Proof", x: "78%", y: "38%", rationale: "Testimonials from similar relocation stories" },
  { id: 4, label: "CTA", x: "50%", y: "65%", rationale: "Low-friction start: 'Find your level in 2 min'" },
  { id: 5, label: "Footer", x: "50%", y: "88%", rationale: "Trust badges and language availability" },
];
const CONCEPTS = [
  { id: "A", title: "Day One", tagline: "Speak enough to belong by day one.", reach: 720, ctr: 4.4, conv: 3.6,
    research: "Relocating professionals report highest anxiety in the first 72 hours. Day-one fluency reduces perceived isolation by 40%." },
  { id: "B", title: "Fluency Path", tagline: "A clear path from tourist to teammate.", reach: 680, ctr: 4.0, conv: 3.9,
    research: "Structured progression maps increase course completion by 2.3x among adult learners with full-time jobs." },
  { id: "C", title: "Local Code", tagline: "Learn the phrases the textbook skips.", reach: 790, ctr: 4.7, conv: 3.3,
    research: "Colloquial-first learning improves real-world comprehension scores by 31% vs. grammar-first approaches." },
];
const HEURISTICS = [
  { label: "Visibility", score: 88 },
  { label: "Consistency", score: 76 },
  { label: "Error prevention", score: 82 },
  { label: "Flexibility", score: 70 },
  { label: "Aesthetic", score: 91 },
];

const Dropdown = ({ label, helper, value, onChange, options, icon: Icon }: {
  label: string; helper: string; value: string; onChange: (v: string) => void; options: string[]; icon: React.ElementType;
}) => (
  <div>
    <div className="flex items-center gap-1.5 mb-1">
      <Icon className="w-3.5 h-3.5 text-purple-600" />
      <label className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-medium">{label}</label>
    </div>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <p className="text-[10px] text-gray-400 mt-1">{helper}</p>
  </div>
);

export default function DesignUxPro() {
  const [brief, setBrief] = useState("Design a research-informed campaign for Muse launching a language learning app aimed at professionals relocating internationally who need practical fluency fast.");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [concept, setConcept] = useState("A");
  const [activeStage, setActiveStage] = useState(2);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [log, setLog] = useState<string[]>(["Campaign workspace initialized", "Research context loaded"]);
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = CONCEPTS.find((c) => c.id === concept)!;
  const addLog = useCallback((m: string) => setLog((p) => [m, ...p].slice(0, 5)), []);

  const handleGenerate = () => {
    setGenState("loading");
    addLog("Generating research-informed concepts...");
    genTimer.current = setTimeout(() => {
      if (brief.length >= 16) {
        setGenState("success");
        addLog("Campaign generated successfully");
      } else {
        setGenState("error");
        addLog("Brief too short — minimum 16 characters");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-600" />
            <h1 className="text-lg font-bold text-gray-900">Research-Informed Studio</h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-semibold rounded tracking-wide">Qwen 3.7 Max</span>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-semibold rounded tracking-wide">frontend-design + ui-ux-pro-max</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addLog("Campaign saved")} className="gap-1.5"><Save className="w-3.5 h-3.5" />Save</Button>
          <Button size="sm" variant="outline" onClick={() => addLog("Exported to PDF")} className="gap-1.5"><Download className="w-3.5 h-3.5" />Export</Button>
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"} className={cn("gap-1.5", genState === "success" ? "bg-green-600 hover:bg-green-700" : genState === "error" ? "bg-rose-600 hover:bg-rose-700" : "bg-purple-600 hover:bg-purple-700")}>
            {genState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : genState === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> : genState === "error" ? <XCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            Generate
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Study Design Panel */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600 mb-3">Study Design</h2>
            <div className="space-y-4">
              <Dropdown label="Audience" helper="Primary target segment for relocation context" value={audience} onChange={setAudience} options={AUDIENCES} icon={Users} />
              <Dropdown label="Channel" helper="Distribution touchpoint in the journey" value={channel} onChange={setChannel} options={CHANNELS} icon={Radio} />
              <Dropdown label="Tone" helper="Voice that matches audience mindset" value={tone} onChange={setTone} options={TONES} icon={BookOpen} />
              <Dropdown label="Style" helper="Visual language for the campaign assets" value={style} onChange={setStyle} options={STYLES} icon={Palette} />
            </div>
          </div>
          {/* Brief */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Campaign Brief</h3>
            </div>
            <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4}
              className="w-full text-sm border border-gray-200 rounded-lg p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
            <div className="flex gap-2 mt-2">
              <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[9px] rounded border border-amber-200">Research context</span>
              <span className="px-1.5 py-0.5 bg-teal-50 text-teal-700 text-[9px] rounded border border-teal-200">Persona-anchored</span>
            </div>
          </div>
          {/* Activity Log */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-2">Activity Log</h3>
            <ul className="space-y-1.5">
              {log.map((entry, i) => (
                <li key={i} className={cn("text-xs py-1 px-2 rounded", i === 0 ? "bg-purple-50 text-purple-800 font-medium" : "text-gray-500")}>{entry}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-6">
          {/* Journey Map + Wireframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Journey Map */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-4">Journey Map</h3>
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {JOURNEY.map((stage, i) => (
                  <React.Fragment key={stage}>
                    <button onClick={() => setActiveStage(i)}
                      className={cn("flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all",
                        i === activeStage ? "bg-purple-600 text-white animate-pulse shadow-lg shadow-purple-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                      {stage}
                    </button>
                    {i < JOURNEY.length - 1 && <div className="w-4 h-px bg-gray-300 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3">Active stage: <span className="text-purple-700 font-medium">{JOURNEY[activeStage]}</span> — campaign touchpoints mapped for this phase.</p>
            </div>

            {/* Annotated Wireframe */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-4">Wireframe Preview</h3>
              <div className="relative w-full h-44 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                {WIREFRAME_ZONES.map((z) => (
                  <div key={z.id} onMouseEnter={() => setHoveredZone(z.id)} onMouseLeave={() => setHoveredZone(null)}
                    className="absolute cursor-pointer group" style={{ left: z.x, top: z.y, transform: "translate(-50%,-50%)" }}>
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                      hoveredZone === z.id ? "bg-purple-600 text-white scale-125" : "bg-white border-2 border-purple-300 text-purple-700")}>{z.id}</div>
                    {hoveredZone === z.id && (
                      <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl">
                        <span className="font-bold">{z.label}:</span> {z.rationale}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Creative Preview */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Creative Preview — Concept {concept}</h3>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-teal-50">
              <div className="p-8 md:p-12 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-purple-500 mb-2">Campaign Hero</p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">{selected.title}</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto">{selected.tagline}</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">{tone}</span>
                  <span className="px-3 py-1 bg-teal-600 text-white text-xs rounded-full">{style}</span>
                  <span className="px-3 py-1 bg-amber-600 text-white text-xs rounded-full">{channel}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-full text-sm font-medium shadow-lg shadow-purple-200">
                  <MousePointerClick className="w-4 h-4" /> Start your journey
                </div>
              </div>
            </div>
          </div>

          {/* Concepts + Heuristics + Persona */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Concept Switcher */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-3">Concepts</h3>
              <div className="space-y-2">
                {CONCEPTS.map((c) => (
                  <button key={c.id} onClick={() => { setConcept(c.id); addLog(`Switched to Concept ${c.id}`); }}
                    className={cn("w-full text-left p-3 rounded-lg border transition-all",
                      concept === c.id ? "border-purple-400 bg-purple-50 shadow-sm" : "border-gray-200 hover:border-gray-300")}>
                    <div className="flex items-center gap-2">
                      <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                        concept === c.id ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600")}>{c.id}</span>
                      <span className="text-sm font-semibold text-gray-900">{c.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-8">{c.tagline}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Heuristic Evaluation */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-3">Heuristic Evaluation</h3>
              <div className="space-y-3">
                {HEURISTICS.map((h) => (
                  <div key={h.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-600">{h.label}</span>
                      <span className="font-semibold text-gray-900">{h.score}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", h.score >= 85 ? "bg-teal-500" : h.score >= 75 ? "bg-amber-500" : "bg-rose-500")}
                        style={{ width: `${h.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Findings */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-3">Research Finding</h3>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-900 leading-relaxed">{selected.research}</p>
              </div>
              <div className="mt-3">
                <Lightbulb className="w-4 h-4 text-amber-500 mb-1" />
                <p className="text-[10px] text-gray-500">Finding applies to Concept {concept} with current audience selection.</p>
              </div>
            </div>
          </div>

          {/* Metrics + Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-4">Projected Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: "Reach", value: selected.reach, max: 1000, unit: "K", color: "bg-purple-500", icon: Eye },
                  { label: "CTR", value: selected.ctr, max: 6, unit: "%", color: "bg-teal-500", icon: MousePointerClick },
                  { label: "Conversion", value: selected.conv, max: 6, unit: "%", color: "bg-rose-500", icon: TrendingUp },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600 flex items-center gap-1"><m.icon className="w-3.5 h-3.5" />{m.label}</span>
                      <span className="text-sm font-bold text-gray-900 tabular-nums">{m.value}{m.unit}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-500", m.color)} style={{ width: `${(m.value / m.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-4">Activity Timeline</h3>
              <div className="relative pl-4 border-l-2 border-purple-200 space-y-3">
                {log.slice(0, 5).map((entry, i) => (
                  <div key={i} className="relative">
                    <div className={cn("absolute -left-[21px] w-3 h-3 rounded-full border-2 border-white",
                      i === 0 ? "bg-purple-600" : "bg-gray-300")} />
                    <p className={cn("text-xs", i === 0 ? "text-purple-800 font-medium" : "text-gray-500")}>{entry}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
