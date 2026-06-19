"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Save, Download, Eye, MousePointerClick, TrendingUp,
  BookOpen, Users, Radio, Palette, Gauge, Link2,
  CheckCircle2, XCircle, Loader2, FileText, Image, Layers, Send
} from "lucide-react";

const AUDIENCES = ["Home baristas", "Specialty coffee enthusiasts", "Gift purchasers", "Caf\u00e9 professionals"];
const CHANNELS = ["Coffee subscription platforms", "Food and drink publications", "Instagram stories", "Tasting events"];
const TONES = ["Knowledgeable", "Warm", "Precise", "Inviting"];
const STYLES = ["Origin photography", "Roast process", "Cupping session", "Morning ritual"];
const CONCEPTS = [
  { id: "A", title: "Single Origin", tagline: "One farm, one roast, one perfect cup.", reach: 680, ctr: 4.1, conv: 3.8 },
  { id: "B", title: "Ritual Grade", tagline: "Elevate the seven minutes before your first meeting.", reach: 740, ctr: 4.5, conv: 3.5 },
  { id: "C", title: "Cupping Room", tagline: "Taste what the professionals taste.", reach: 620, ctr: 3.8, conv: 4.1 },
];
const GAUGES = [
  { label: "Functionality", value: 84 },
  { label: "Aesthetics", value: 91 },
  { label: "Premium", value: 88 },
];
const SKILL_NODES = ["frontend-app-builder", "taste-skill", "impeccable"];
const CATEGORY_COLORS: Record<string, string> = { brief: "bg-slate-700", design: "bg-amber-700", generate: "bg-emerald-700", export: "bg-sky-700" };

const Dropdown = ({ label, value, onChange, options, icon: Icon }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; icon: React.ElementType;
}) => (
  <div>
    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-medium mb-1.5">
      <Icon className="w-3.5 h-3.5 text-amber-700" />{label}
    </label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-sm">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default function BalancedChain() {
  const [brief, setBrief] = useState("Create a balanced premium campaign for Muse launching a high-end coffee subscription aimed at discerning home baristas who value origin stories and roast precision.");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [concept, setConcept] = useState("A");
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [log, setLog] = useState<{ msg: string; cat: string }[]>([
    { msg: "Executive workspace initialized", cat: "brief" },
    { msg: "Skill chain linked", cat: "design" },
  ]);
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = CONCEPTS.find((c) => c.id === concept)!;
  const addLog = useCallback((msg: string, cat: string) => setLog((p) => [{ msg, cat }, ...p].slice(0, 5)), []);

  const handleGenerate = () => {
    setGenState("loading");
    addLog("Generating premium campaign...", "generate");
    genTimer.current = setTimeout(() => {
      if (brief.length >= 16) { setGenState("success"); addLog("Campaign generated successfully", "generate"); }
      else { setGenState("error"); addLog("Brief too short \u2014 minimum 16 characters", "generate"); }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-6 lg:p-8 font-sans">
      {/* Chain Visualization */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {SKILL_NODES.map((node, i) => (
          <React.Fragment key={node}>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-full">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wide">{node}</span>
            </div>
            {i < SKILL_NODES.length - 1 && (
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-px bg-slate-400" />
                <Link2 className="w-3 h-3 text-slate-400" />
                <div className="w-3 h-px bg-slate-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-0.5 bg-slate-800" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-800 text-white text-[10px] font-semibold rounded tracking-wide">Qwen 3.7 Max</span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-semibold rounded tracking-wide">frontend-app-builder + taste-skill + impeccable</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addLog("Campaign saved", "brief")}
            className="gap-1.5 border-stone-300 shadow-sm"><Save className="w-3.5 h-3.5" />Save</Button>
          <Button size="sm" variant="outline" onClick={() => addLog("Exported to PDF", "export")}
            className="gap-1.5 border-stone-300 shadow-sm"><Download className="w-3.5 h-3.5" />Export</Button>
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"}
            className={cn("gap-1.5 shadow-sm transition-all duration-200 active:scale-95",
              genState === "success" ? "bg-emerald-700 hover:bg-emerald-800" : genState === "error" ? "bg-rose-600 hover:bg-rose-700" : "bg-slate-800 hover:bg-slate-900")}>
            {genState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : genState === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> : genState === "error" ? <XCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            Generate
          </Button>
        </div>
      </header>

      {/* 3 Equal Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Controls */}
        <div className="space-y-5">
          {/* Brief */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-stone-200">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-4 h-0.5 bg-amber-700" />
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Campaign Brief</h3>
            </div>
            <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4}
              className="w-full text-sm border border-stone-200 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-300 bg-stone-50 shadow-sm" />
            <span className="text-[10px] text-stone-400 tabular-nums mt-1 block">{brief.length} characters</span>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-stone-200 space-y-4">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-0.5 bg-amber-700" />
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Controls</h3>
            </div>
            <Dropdown label="Audience" value={audience} onChange={setAudience} options={AUDIENCES} icon={Users} />
            <Dropdown label="Channel" value={channel} onChange={setChannel} options={CHANNELS} icon={Radio} />
            <Dropdown label="Tone" value={tone} onChange={setTone} options={TONES} icon={BookOpen} />
            <Dropdown label="Style" value={style} onChange={setStyle} options={STYLES} icon={Palette} />
          </div>

          {/* Balance Indicators */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-stone-200">
            <div className="flex items-center gap-1.5 mb-3">
              <Gauge className="w-3.5 h-3.5 text-amber-700" />
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Balance Indicators</h3>
            </div>
            <div className="space-y-3">
              {GAUGES.map((g) => (
                <div key={g.label} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e7e5e4" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#334155" strokeWidth="3"
                        strokeDasharray={`${g.value} ${100 - g.value}`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-800 tabular-nums">{g.value}</span>
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{g.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-stone-200">
            <h3 className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-2">Activity Log</h3>
            <ul className="space-y-1.5">
              {log.map((entry, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", CATEGORY_COLORS[entry.cat] || "bg-stone-400")} />
                  <span className={cn("text-[11px] px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider text-white",
                    CATEGORY_COLORS[entry.cat] || "bg-stone-400")}>{entry.cat}</span>
                  <span className={cn("text-xs flex-1", i === 0 ? "text-slate-800 font-medium" : "text-stone-500")}>{entry.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2: Executive Summary Preview */}
        <div className="space-y-5">
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
            {/* Decorative header */}
            <div className="h-1.5 bg-gradient-to-r from-slate-800 via-amber-700 to-slate-800" />
            <div className="p-6 md:p-8">
              <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-1">Executive Summary / Concept {concept}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">{selected.title}</h2>

              {/* 2-col body: narrative + thumbnails */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="col-span-3">
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{selected.tagline}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Crafted for <span className="font-semibold text-slate-700">{audience}</span> through{" "}
                    <span className="font-semibold text-slate-700">{channel}</span>. The creative direction applies a{" "}
                    <span className="font-semibold text-slate-700">{tone.toLowerCase()}</span> voice with{" "}
                    <span className="font-semibold text-slate-700">{style.toLowerCase()}</span> aesthetics to deliver a premium, memorable campaign experience.
                  </p>
                </div>
                <div className="col-span-2 space-y-2">
                  {[
                    { label: "Hero", bg: "bg-gradient-to-br from-amber-100 to-amber-50" },
                    { label: "Body", bg: "bg-gradient-to-br from-stone-200 to-stone-100" },
                    { label: "CTA", bg: "bg-gradient-to-br from-slate-200 to-slate-100" },
                  ].map((thumb) => (
                    <div key={thumb.label} className={cn("rounded-md h-12 flex items-center justify-center", thumb.bg)}>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-medium">{thumb.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer metadata */}
              <div className="pt-4 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Audience", value: audience },
                  { label: "Channel", value: channel },
                  { label: "Tone", value: tone },
                  { label: "Style", value: style },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400">{m.label}</p>
                    <p className="text-xs font-semibold text-slate-800 truncate">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Concepts + Metrics */}
        <div className="space-y-5">
          {/* Concepts */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-stone-200">
            <div className="flex items-center gap-1.5 mb-3">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Concepts</h3>
            </div>
            <div className="space-y-3">
              {CONCEPTS.map((c) => (
                <button key={c.id} onClick={() => { setConcept(c.id); addLog(`Switched to Concept ${c.id}`, "design"); }}
                  className={cn("w-full text-left p-3.5 rounded-md border transition-all duration-200",
                    concept === c.id ? "border-l-4 border-l-slate-800 border-t-stone-200 border-r-stone-200 border-b-stone-200 shadow-md bg-stone-50"
                      : "border border-stone-200 hover:shadow-sm bg-white")}>
                  <div className="flex items-center gap-2.5">
                    <span className={cn("w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0",
                      concept === c.id ? "bg-slate-800 text-white" : "bg-stone-200 text-stone-600")}>{c.id}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{c.title}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{c.tagline}</p>
                    </div>
                  </div>
                  {concept === c.id && (
                    <div className="flex gap-3 mt-2 ml-9">
                      <span className="text-[10px] text-stone-500 tabular-nums"><span className="text-stone-400">Reach</span> <span className="font-semibold text-slate-700">{c.reach}K</span></span>
                      <span className="text-[10px] text-stone-500 tabular-nums"><span className="text-stone-400">CTR</span> <span className="font-semibold text-slate-700">{c.ctr}%</span></span>
                      <span className="text-[10px] text-stone-500 tabular-nums"><span className="text-stone-400">Conv</span> <span className="font-semibold text-slate-700">{c.conv}%</span></span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-stone-200">
            <div className="flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Projected Metrics</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Reach", value: selected.reach, unit: "K", icon: Eye, color: "bg-slate-800" },
                { label: "CTR", value: selected.ctr, unit: "%", icon: MousePointerClick, color: "bg-amber-700" },
                { label: "Conv", value: selected.conv, unit: "%", icon: TrendingUp, color: "bg-emerald-700" },
              ].map((m) => (
                <div key={m.label} className="text-center p-3 bg-stone-50 rounded-md">
                  <m.icon className="w-4 h-4 mx-auto mb-1.5 text-stone-400" />
                  <p className="text-lg font-bold text-slate-900 tabular-nums">{m.value}<span className="text-xs text-stone-400">{m.unit}</span></p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-stone-500 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
