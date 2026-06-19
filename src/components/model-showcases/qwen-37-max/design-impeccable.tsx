"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Save, Download, Eye, MousePointerClick, TrendingUp,
  BookOpen, Users, Radio, Palette, Grid3x3, Ruler, CheckCircle2, XCircle, Loader2
} from "lucide-react";

const AUDIENCES = ["Architects", "Interior designers", "Design retailers", "Museum shop buyers"];
const CHANNELS = ["Design trade shows", "Architecture publications", "Showroom installations", "Design awards"];
const TONES = ["Precise", "Authoritative", "Minimal", "Structural"];
const STYLES = ["Technical drawing", "Material sample", "Installation view", "Detail photograph"];
const CONCEPTS = [
  { id: "A", title: "Load Bearing", tagline: "Every shelf carries its own argument.", reach: 560, ctr: 3.3, conv: 3.7,
    spec: { material: "Powder-coated steel", span: "900mm", load: "45kg/module", finish: "Matte black" } },
  { id: "B", title: "Module Count", tagline: "Start with three. Build to thirty.", reach: 620, ctr: 3.6, conv: 3.4,
    spec: { material: "Anodized aluminum", span: "600mm", load: "30kg/module", finish: "Brushed silver" } },
  { id: "C", title: "Wall Logic", tagline: "A wall is just a shelf waiting to be organized.", reach: 510, ctr: 3.0, conv: 4.0,
    spec: { material: "Solid oak + steel", span: "1200mm", load: "60kg/module", finish: "Natural oil" } },
];

const Select = ({ coord, label, value, onChange, options, icon: Icon }: {
  coord: string; label: string; value: string; onChange: (v: string) => void; options: string[]; icon: React.ElementType;
}) => (
  <div>
    <div className="flex items-center gap-1.5 mb-1">
      <span className="text-[9px] font-mono text-red-500">{coord}</span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">{label}</span>
      <Icon className="w-3 h-3 text-neutral-400" />
    </div>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-2.5 py-2 bg-white border border-neutral-200 rounded-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default function DesignImpeccable() {
  const [brief, setBrief] = useState("Architect a precision campaign for Muse launching a modular shelving system aimed at architects and interior designers who demand exact specifications.");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [concept, setConcept] = useState("A");
  const [gridOverlay, setGridOverlay] = useState(false);
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [log, setLog] = useState<string[]>(["Grid workspace initialized", "Specification framework loaded"]);
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = CONCEPTS.find((c) => c.id === concept)!;
  const addLog = useCallback((m: string) => setLog((p) => [m, ...p].slice(0, 5)), []);

  const handleGenerate = () => {
    setGenState("loading");
    addLog("Generating precision campaign...");
    genTimer.current = setTimeout(() => {
      if (brief.length >= 16) { setGenState("success"); addLog("Campaign generated — specification verified"); }
      else { setGenState("error"); addLog("Brief below 16-character minimum"); }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-neutral-200 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1">MUSE / Campaign Architect</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Swiss Grid System</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-none tracking-wider">Qwen 3.7 Max</span>
            <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded-none tracking-wider">frontend-design + impeccable</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addLog("Campaign saved")}
            className="rounded-none gap-1.5 border-neutral-300"><Save className="w-3.5 h-3.5" />Save</Button>
          <Button size="sm" variant="outline" onClick={() => addLog("Exported to spec sheet")}
            className="rounded-none gap-1.5 border-neutral-300"><Download className="w-3.5 h-3.5" />Export</Button>
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"}
            className={cn("rounded-none gap-1.5 relative overflow-hidden",
              genState === "success" ? "bg-green-700 hover:bg-green-800" : genState === "error" ? "bg-rose-700 hover:bg-rose-800" : "bg-red-600 hover:bg-red-700")}>
            {genState === "loading" && <span className="absolute inset-0 bg-red-500 animate-[pulse_0.8s_ease-in-out]" />}
            <span className="relative flex items-center gap-1.5">
              {genState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : genState === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> : genState === "error" ? <XCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              Generate
            </span>
          </Button>
        </div>
      </header>

      {/* 12-Col Grid */}
      <div className="grid grid-cols-12 gap-0 relative">
        {gridOverlay && (
          <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-l border-r border-red-100" />
            ))}
          </div>
        )}

        {/* LEFT: Controls — 4 cols */}
        <aside className="col-span-12 lg:col-span-4 p-4 border-r border-neutral-200 space-y-5 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-900">Controls</h2>
            <button onClick={() => setGridOverlay(!gridOverlay)}
              className={cn("flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] px-2 py-1 border",
                gridOverlay ? "bg-red-600 text-white border-red-600" : "text-neutral-500 border-neutral-200 hover:border-neutral-400")}>
              <Grid3x3 className="w-3 h-3" />Grid
            </button>
          </div>

          {/* Brief */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-mono text-red-500">C1</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">Brief</span>
            </div>
            <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4}
              className="w-full text-sm border border-neutral-200 rounded-none p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-red-400 font-medium bg-neutral-50" />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-neutral-400 tabular-nums">{brief.length} chars</span>
              <span className="text-[9px] text-neutral-400">min 16</span>
            </div>
          </div>

          <Select coord="C3" label="Audience" value={audience} onChange={setAudience} options={AUDIENCES} icon={Users} />
          <Select coord="C4" label="Channel" value={channel} onChange={setChannel} options={CHANNELS} icon={Radio} />
          <Select coord="C5" label="Tone" value={tone} onChange={setTone} options={TONES} icon={BookOpen} />
          <Select coord="C6" label="Style" value={style} onChange={setStyle} options={STYLES} icon={Palette} />

          {/* Activity */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-900 mb-2">Log</h3>
            <ul className="space-y-1">
              {log.map((e, i) => (
                <li key={i} className={cn("text-[11px] py-1 px-2", i === 0 ? "bg-red-50 text-red-800 font-medium" : "text-neutral-500")}>{e}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CENTER: Preview — 5 cols */}
        <section className="col-span-12 lg:col-span-5 p-4 lg:p-6 border-r border-neutral-200 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-900">Preview</h2>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-neutral-400">5/12</span>
              <Ruler className="w-3 h-3 text-neutral-400" />
            </div>
          </div>

          {/* Golden-ratio creative preview */}
          <div className="relative border border-neutral-200 bg-neutral-50 overflow-hidden" style={{ aspectRatio: "1.618" }}>
            {/* Grid accent lines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className="border border-neutral-400" />)}
            </div>
            {/* Red accent markers */}
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Concept {concept} / {style}</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-none">{selected.title}</h2>
              </div>
              <div>
                <p className="text-base md:text-lg text-neutral-600 mb-4 max-w-sm">{selected.tagline}</p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase">{tone}</span>
                  <span className="px-3 py-1 bg-neutral-900 text-white text-[10px] font-bold tracking-wider uppercase">{audience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Proportion indicators */}
          <div className="flex gap-4 mt-3">
            {[
              { label: "Controls", ratio: "4/12" },
              { label: "Preview", ratio: "5/12" },
              { label: "Concepts", ratio: "3/12" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-1.5">
                <div className="h-1.5 bg-red-600 rounded-none" style={{ width: p.ratio === "4/12" ? "33%" : p.ratio === "5/12" ? "42%" : "25%" }} />
                <span className="text-[9px] font-mono text-neutral-500">{p.ratio} {p.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: Concepts + Metrics — 3 cols */}
        <aside className="col-span-12 lg:col-span-3 p-4 space-y-4 relative z-10">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-900">Concepts</h2>
            <span className="text-[9px] font-mono text-neutral-400">3/12</span>
          </div>

          {CONCEPTS.map((c) => (
            <button key={c.id} onClick={() => { setConcept(c.id); addLog(`Selected concept ${c.id}`); }}
              className={cn("w-full text-left p-3 border transition-all",
                concept === c.id ? "border-red-500 bg-red-50 scale-[1.02] shadow-sm" : "border-neutral-200 hover:border-neutral-400")}>
              <div className="flex items-center gap-2">
                <span className={cn("w-6 h-6 flex items-center justify-center text-[10px] font-bold",
                  concept === c.id ? "bg-red-600 text-white" : "bg-neutral-200 text-neutral-600")}>{c.id}</span>
                <span className="text-sm font-bold tracking-tight">{c.title}</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1 ml-8">{c.tagline}</p>
              {concept === c.id && (
                <div className="mt-2 ml-8 grid grid-cols-2 gap-1 text-[9px]">
                  {Object.entries(c.spec).map(([k, v]) => (
                    <span key={k} className="text-neutral-500"><span className="text-neutral-400">{k}:</span> {v}</span>
                  ))}
                </div>
              )}
            </button>
          ))}

          {/* Metrics interleaved */}
          <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-900 pt-2">Metrics</h2>
          {[
            { label: "Reach", value: selected.reach, unit: "K", icon: Eye, pct: selected.reach / 10 },
            { label: "CTR", value: selected.ctr, unit: "%", icon: MousePointerClick, pct: selected.ctr * 16 },
            { label: "Conversion", value: selected.conv, unit: "%", icon: TrendingUp, pct: selected.conv * 16 },
          ].map((m) => (
            <div key={m.label} className="border border-neutral-200 p-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 flex items-center gap-1"><m.icon className="w-3 h-3" />{m.label}</span>
                <span className="text-sm font-bold tabular-nums text-neutral-900">{m.value}{m.unit}</span>
              </div>
              <div className="h-1.5 bg-neutral-100">
                <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Specification Card */}
      <div className="mt-6 border border-neutral-200 p-5 bg-neutral-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1">Specification Sheet</p>
            <h3 className="text-lg font-bold tracking-tight">Campaign: {selected.title}</h3>
            <p className="text-sm text-neutral-500 mt-0.5">{selected.tagline}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-[11px]">
            <div><span className="text-neutral-400 uppercase tracking-[0.15em]">Audience</span><p className="font-semibold">{audience}</p></div>
            <div><span className="text-neutral-400 uppercase tracking-[0.15em]">Channel</span><p className="font-semibold">{channel}</p></div>
            <div><span className="text-neutral-400 uppercase tracking-[0.15em]">Tone</span><p className="font-semibold">{tone}</p></div>
            <div><span className="text-neutral-400 uppercase tracking-[0.15em]">Style</span><p className="font-semibold">{style}</p></div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
          {Object.entries(selected.spec).map(([k, v]) => (
            <div key={k}>
              <span className="uppercase tracking-[0.2em] text-neutral-400">{k}</span>
              <p className="font-bold text-neutral-800">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
