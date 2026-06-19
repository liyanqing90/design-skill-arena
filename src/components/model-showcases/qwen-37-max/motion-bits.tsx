"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Loader2, Check, AlertCircle, Play, Zap,
  Save, Download, Radio, Volume2, ChevronDown, Timer, Activity
} from "lucide-react";

const AUDIENCES = ["Music lovers", "Festival goers", "Dance creators", "Outdoor adventurers"];
const CHANNELS = ["Music streaming ads", "TikTok challenge", "Festival activations", "DJ partnerships"];
const TONES = ["Energetic", "Rhythmic", "Bold", "Playful"];
const STYLES = ["Kinetic typography", "Sound wave visual", "Dance photography", "Neon graphics"];

const CONCEPTS = [
  { id: "A", name: "Bass Drop", tagline: "Feel the frequency before you see the speaker.", reach: 1200, ctr: 5.5, conv: 3.6, anim: "float" },
  { id: "B", name: "Move Set", tagline: "Every room becomes a dance floor.", reach: 1350, ctr: 5.0, conv: 3.3, anim: "bounce" },
  { id: "C", name: "Beat Match", tagline: "Two speakers, one shared frequency.", reach: 1100, ctr: 5.8, conv: 3.8, anim: "stagger" },
] as const;

const TIMELINE_DOTS = [0, 15, 30, 50, 65, 80, 100];

const DEFAULT_BRIEF = "Animate a campaign for Muse launching a portable speaker line aimed at music lovers who bring the party everywhere, emphasizing rhythm and movement.";

const Select = ({ value, onChange, options, label, addActivity }: { value: string; onChange: (v: string) => void; options: string[]; label: string; addActivity: (msg: string) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => { onChange(e.target.value); addActivity(`${label} → ${e.target.value}`); }}
        className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 pr-8 text-sm text-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
    </div>
  </div>
);

export default function MotionBits() {
  const [concept, setConcept] = useState("A");
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [speed, setSpeed] = useState(1);
  const [bounce, setBounce] = useState(false);
  const [stagger, setStagger] = useState(3);
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [activity, setActivity] = useState<string[]>([]);

  const selected = CONCEPTS.find((c) => c.id === concept)!;

  const addActivity = useCallback((msg: string) => {
    setActivity((prev) => [msg, ...prev].slice(0, 5));
  }, []);

  const handleGenerate = useCallback(() => {
    setGenState("loading");
    setProgress(0);
    addActivity("Generating motion concepts...");
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 12.5;
      });
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      if (brief.length >= 16) {
        setGenState("success");
        addActivity("Motion concepts generated successfully.");
      } else {
        setGenState("error");
        addActivity("Error: brief must be at least 16 characters.");
      }
    }, 800);
  }, [brief, addActivity]);

  const handleSave = useCallback(() => addActivity(`Saved ${selected.name} motion preset.`), [selected, addActivity]);
  const handleExport = useCallback(() => addActivity(`Exported ${selected.name} keyframes.`), [selected, addActivity]);

  const modifier = (audience.length + channel.length + tone.length + style.length) / 40;
  const metrics = {
    reach: Math.round(selected.reach * (0.9 + modifier * 0.2)),
    ctr: +(selected.ctr * (0.95 + modifier * 0.1)).toFixed(1),
    conv: +(selected.conv * (0.95 + modifier * 0.1)).toFixed(1),
  };

  const duration = (2 / speed).toFixed(1);
  const springPhysics = useMemo(() => ({
    tension: Math.round(170 + speed * 50 + (bounce ? 80 : 0)),
    friction: Math.round(26 - speed * 4 + (bounce ? -6 : 0)),
    mass: +(1 + stagger * 0.15).toFixed(1),
  }), [speed, bounce, stagger]);

  const animClass = useMemo(() => {
    if (concept === "A") return "animate-float";
    if (concept === "B") return "animate-bounce-spring";
    return "animate-stagger";
  }, [concept]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 font-sans text-gray-100">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes bounce-spring { 0%,100%{transform:translateY(0) scale(1)} 30%{transform:translateY(-20px) scale(1.05)} 60%{transform:translateY(-8px) scale(0.98)} }
        @keyframes stagger { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes spin-slow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.3);opacity:.1} }
        @keyframes slide-in { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes grid-move { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        .animate-float { animation: float var(--dur, 2s) ease-in-out infinite; }
        .animate-bounce-spring { animation: bounce-spring var(--dur, 2s) ease-in-out infinite; }
        .animate-stagger > * { animation: stagger 0.5s ease-out both; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .bg-grid { background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 40px 40px; animation: grid-move 8s linear infinite; }
      `}</style>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/80 backdrop-blur px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Radio className="h-5 w-5 text-cyan-400" />
          <span className="text-sm font-semibold">Qwen 3.7 Max</span>
          <span className="rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300">react-bits</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} className="hidden sm:flex border-gray-700 text-gray-300 hover:bg-gray-800"><Save className="mr-1.5 h-3.5 w-3.5" />Save</Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="hidden sm:flex border-gray-700 text-gray-300 hover:bg-gray-800"><Download className="mr-1.5 h-3.5 w-3.5" />Export</Button>
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"} className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border-0">
            {genState === "loading" ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : genState === "success" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : genState === "error" ? <AlertCircle className="mr-1.5 h-3.5 w-3.5" /> : <Play className="mr-1.5 h-3.5 w-3.5" />}
            Generate
          </Button>
        </div>
      </header>

      {/* Progress bar */}
      {genState === "loading" && (
        <div className="h-1 bg-gray-800">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left panel — controls */}
        <aside className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-800 bg-gray-900 p-4 md:p-5 overflow-y-auto">
          <h2 className="mb-3 text-lg font-semibold">Campaign Brief</h2>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm leading-relaxed text-gray-200 placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
            <Select label="Audience" value={audience} onChange={setAudience} options={AUDIENCES} addActivity={addActivity} />
            <Select label="Channel" value={channel} onChange={setChannel} options={CHANNELS} addActivity={addActivity} />
            <Select label="Tone" value={tone} onChange={setTone} options={TONES} addActivity={addActivity} />
            <Select label="Style" value={style} onChange={setStyle} options={STYLES} addActivity={addActivity} />
          </div>

          {/* Motion controls */}
          <div className="mt-5 space-y-4 border-t border-gray-800 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Motion Controls</h3>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-400">Speed</label>
                <span className="text-xs font-mono text-cyan-400">{speed.toFixed(1)}x</span>
              </div>
              <input type="range" min="0.3" max="3" step="0.1" value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full accent-cyan-500" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-400">Bounce</label>
              <button onClick={() => setBounce(!bounce)} className={cn("relative h-5 w-9 rounded-full transition-colors", bounce ? "bg-cyan-500" : "bg-gray-700")}>
                <span className={cn("absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform", bounce && "translate-x-4")} />
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-400">Stagger steps</label>
              <input type="number" min="1" max="8" value={stagger} onChange={(e) => setStagger(+e.target.value)} className="mt-1 w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-1.5 text-sm text-gray-200 focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>

          {/* Spring physics readout */}
          <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Spring Physics</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><p className="text-xs font-mono text-cyan-400">{springPhysics.tension}</p><p className="text-[10px] text-gray-600">tension</p></div>
              <div><p className="text-xs font-mono text-violet-400">{springPhysics.friction}</p><p className="text-[10px] text-gray-600">friction</p></div>
              <div><p className="text-xs font-mono text-pink-400">{springPhysics.mass}</p><p className="text-[10px] text-gray-600">mass</p></div>
            </div>
          </div>

          {/* Activity log */}
          <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1"><Activity className="h-3 w-3" /> Activity</p>
            <ul className="space-y-1">
              {activity.map((a, i) => <li key={i} className="text-xs text-gray-400 animate-slide-in leading-snug">{a}</li>)}
              {activity.length === 0 && <li className="text-xs text-gray-600 italic">No activity yet</li>}
            </ul>
          </div>
        </aside>

        {/* Center — Motion stage */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Concept switcher */}
          <div className="flex gap-2 p-4 md:px-6">
            {CONCEPTS.map((c) => (
              <button
                key={c.id}
                onClick={() => { setConcept(c.id); addActivity(`Concept ${c.id}: ${c.name}`); }}
                className={cn(
                  "flex-1 rounded-xl border px-4 py-3 text-left transition-all duration-300 hover:scale-[1.02]",
                  concept === c.id
                    ? "border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 shadow-lg shadow-cyan-500/10"
                    : "border-gray-800 bg-gray-900 hover:border-gray-700 hover:shadow-md hover:shadow-violet-500/5"
                )}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Concept {c.id}</span>
                <p className="mt-1 text-sm font-semibold">{c.name}</p>
              </button>
            ))}
          </div>

          {/* Motion stage */}
          <div className="relative mx-4 md:mx-6 flex-1 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 bg-grid" style={{ minHeight: "50vh" }}>
            {/* Background elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="animate-spin-slow h-48 w-48 rounded-2xl border border-cyan-500/20" style={{ animationDuration: `${12 / speed}s` }} />
              <div className="animate-spin-slow absolute h-32 w-32 rounded-xl border border-violet-500/20" style={{ animationDuration: `${8 / speed}s`, animationDirection: "reverse" }} />
              <div className="animate-pulse-ring absolute h-64 w-64 rounded-full border border-pink-500/10" style={{ animationDuration: `${3 / speed}s` }} />
              <div className="animate-pulse-ring absolute h-40 w-40 rounded-full border border-cyan-500/10" style={{ animationDuration: `${4 / speed}s`, animationDelay: "1s" }} />
            </div>

            {/* Headline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className={concept === "C" ? "animate-stagger flex flex-col gap-1" : ""} style={{ "--dur": `${duration}s` } as React.CSSProperties}>
                <h1
                  key={concept}
                  className={cn(
                    concept === "A" && "animate-float",
                    concept === "B" && "animate-bounce-spring",
                    "text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight"
                  )}
                  style={{ "--dur": `${duration}s`, animationDuration: `${duration}s` } as React.CSSProperties}
                >
                  {selected.name}
                </h1>
              </div>
              <p className="mt-4 max-w-md text-sm md:text-base text-gray-400">{selected.tagline}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Volume2 className="h-3.5 w-3.5" />
                <span>{style} / {tone}</span>
              </div>
            </div>
          </div>

          {/* Motion timeline */}
          <div className="mx-4 md:mx-6 mt-3 rounded-xl border border-gray-800 bg-gray-900 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-[11px] uppercase tracking-wider text-gray-500">Motion Timeline</span>
              <span className="ml-auto text-[11px] font-mono text-gray-600">{duration}s</span>
            </div>
            <div className="relative h-3 rounded-full bg-gray-800">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: "100%" }} />
              {TIMELINE_DOTS.map((p, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border-2 border-gray-900 bg-white" style={{ left: `${p}%`, transform: "translate(-50%, -50%)" }} />
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="mx-4 md:mx-6 mt-3 mb-4 grid grid-cols-3 gap-3">
            {[{ label: "Reach (K)", val: metrics.reach, color: "text-cyan-400" }, { label: "CTR (%)", val: metrics.ctr, color: "text-violet-400" }, { label: "Conv (%)", val: metrics.conv, color: "text-pink-400" }].map((m) => (
              <div key={m.label} className="rounded-xl border border-gray-800 bg-gray-900 p-3 text-center">
                <p className={cn("text-xl font-bold", m.color)}>{m.val}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Mobile action bar */}
      <div className="border-t border-gray-800 bg-gray-900 px-4 py-3 lg:hidden">
        {activity.length > 0 && (
          <div className="mb-2 max-h-16 overflow-y-auto">
            {activity.slice(0, 2).map((a, i) => <p key={i} className="text-[11px] text-gray-500">{a}</p>)}
          </div>
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"><Save className="mr-1 h-3 w-3" />Save</Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"><Download className="mr-1 h-3 w-3" />Export</Button>
        </div>
      </div>
    </div>
  );
}
