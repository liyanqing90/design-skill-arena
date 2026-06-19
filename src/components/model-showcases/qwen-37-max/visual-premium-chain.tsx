"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Plane, Play, Save, Download, ChevronDown, ChevronUp, Film,
  Sparkles, Eye, Palette, Clapperboard, TrendingUp, Zap, Target
} from "lucide-react";

const BRIEF_DEFAULT = "Create a cinematic luxury campaign for Muse launching a private aviation membership aimed at executives who view travel time as their most valuable asset.";
const AUDIENCES = ["C-suite executives", "Family office principals", "Luxury travel directors", "Corporate flight departments"];
const CHANNELS = ["Private aviation events", "Executive networks", "Concierge services", "Art Basel activations"];
const TONES = ["Exclusive", "Effortless", "Commanding", "Discreet"];
const STYLES = ["Aerial cinematography", "Cabin interior", "Horizon line", "Night approach"];

const CONCEPTS = [
  { id: "A", label: "Cleared Direct", tagline: "The shortest distance between ambition and arrival.", reach: 220, ctr: 2.0, conv: 7.8, glow: "from-zinc-400/20 via-zinc-300/10 to-transparent" },
  { id: "B", label: "Flight Level", tagline: "Above the weather, below the radar.", reach: 190, ctr: 1.8, conv: 8.2, glow: "from-amber-500/20 via-amber-400/10 to-transparent" },
  { id: "C", label: "Tail Number", tagline: "Your aircraft knows your calendar better than you do.", reach: 260, ctr: 2.3, conv: 7.4, glow: "from-blue-500/20 via-blue-400/10 to-transparent" },
];

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * ease);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);
  return value;
}

function Metric({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const animated = useCountUp(value);
  return (
    <div className="text-center">
      <p className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase mb-1">{label}</p>
      <p className="font-extralight text-3xl text-zinc-100">{animated.toFixed(1)}<span className="text-sm text-zinc-500 ml-1">{suffix}</span></p>
    </div>
  );
}

export default function VisualPremiumChain() {
  const [brief, setBrief] = useState(BRIEF_DEFAULT);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [concept, setConcept] = useState(0);
  const [directorsCut, setDirectorsCut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [log, setLog] = useState<{ time: string; msg: string }[]>([
    { time: "09:00", msg: "Campaign initialized" },
    { time: "09:01", msg: "Assets preloaded" },
  ]);
  const [fadeKey, setFadeKey] = useState(0);

  const addLog = useCallback((msg: string) => {
    setLog(prev => [...prev.slice(-4), { time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }), msg }]);
  }, []);

  const currentConcept = CONCEPTS[concept];
  const reachMod = currentConcept.reach + (tone === "Exclusive" ? 20 : tone === "Commanding" ? 10 : 0);
  const ctrMod = currentConcept.ctr + (style === "Aerial cinematography" ? 0.3 : 0);
  const convMod = currentConcept.conv + (audience === "C-suite executives" ? 0.5 : 0);

  const handleGenerate = () => {
    if (genState === "loading") return;
    setGenState("loading");
    addLog("Generation started");
    setTimeout(() => {
      if (brief.length >= 16) {
        setGenState("success");
        addLog("Generation complete — 3 concepts ready");
      } else {
        setGenState("error");
        addLog("Generation failed — brief too short");
      }
    }, 800);
  };

  const switchConcept = (idx: number) => {
    setConcept(idx);
    setFadeKey(k => k + 1);
    addLog(`Switched to Concept ${CONCEPTS[idx].id}: ${CONCEPTS[idx].label}`);
  };

  const glowColors = ["rgba(200,200,220,0.15)", "rgba(245,185,60,0.15)", "rgba(80,120,240,0.15)"];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <Plane className="w-5 h-5 text-zinc-400" />
          <span className="font-extralight text-lg tracking-wide">Muse</span>
          <span className="ml-3 px-2 py-0.5 rounded bg-zinc-200 text-zinc-900 text-[10px] font-medium tracking-wide">Qwen 3.7 Max</span>
          <span className="px-2 py-0.5 rounded border border-amber-500/30 text-amber-500/80 text-[10px] tracking-wide">frontend-skill + taste-skill + impeccable</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="tracking-[0.4em] text-[9px] text-zinc-600 uppercase">{directorsCut ? "Extended Cut" : "Theatrical"}</span>
          <button onClick={() => setDirectorsCut(!directorsCut)} className={cn("w-8 h-4 rounded-full transition-colors relative", directorsCut ? "bg-amber-500/60" : "bg-zinc-700")}>
            <span className={cn("absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all", directorsCut ? "left-4" : "left-0.5")} />
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className={cn(
          "lg:w-72 bg-white/[0.03] backdrop-blur-2xl border-r border-white/[0.04] transition-all duration-500 overflow-hidden",
          "lg:relative fixed bottom-0 left-0 right-0 z-40 lg:z-auto",
          sidebarOpen ? "lg:h-auto max-h-[70vh] lg:max-h-none" : "max-h-12 lg:max-h-none lg:w-72"
        )}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 lg:hidden">
            <span className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase">Controls</span>
            {sidebarOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <div className={cn("p-4 space-y-4", !sidebarOpen && "hidden lg:block")}>
            <div>
              <label className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase block mb-1.5">Campaign Brief</label>
              <textarea value={brief} onChange={e => setBrief(e.target.value)} rows={4} className="w-full bg-white/[0.04] border border-white/[0.06] rounded px-3 py-2 text-xs text-zinc-300 font-light resize-none focus:outline-none focus:border-zinc-500 transition-colors" />
            </div>
            {([["Audience", AUDIENCES, audience, setAudience], ["Channel", CHANNELS, channel, setChannel], ["Tone", TONES, tone, setTone], ["Style", STYLES, style, setStyle]] as const).map(([label, opts, val, setter]) => (
              <div key={label}>
                <label className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase block mb-1.5">{label}</label>
                <select value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.06] rounded px-3 py-2 text-xs text-zinc-300 font-light focus:outline-none focus:border-zinc-500 appearance-none">
                  {(opts as readonly string[]).map(o => <option key={o} value={o} className="bg-zinc-900">{o}</option>)}
                </select>
              </div>
            ))}
            <div className="pt-2 border-t border-white/[0.04]">
              <p className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase mb-2">Color Grade</p>
              <div className="flex gap-1.5">
                {["Cool Silver", "Warm Gold", "Deep Blue"].map((g, i) => (
                  <button key={g} onClick={() => switchConcept(i)} className={cn("flex-1 text-[9px] py-1.5 rounded border transition-colors", concept === i ? "border-zinc-400 text-zinc-200 bg-white/[0.06]" : "border-white/[0.06] text-zinc-600")}>{g}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Preview */}
        <main className="flex-1 p-6 space-y-6">
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-zinc-900 border border-white/[0.04]">
            <div key={fadeKey} className="absolute inset-0 transition-opacity duration-1000 animate-[fadeIn_1s_ease-in-out]">
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", currentConcept.glow)} style={{ background: `radial-gradient(ellipse at center, ${glowColors[concept]}, transparent 70%)` }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <p className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase mb-4">Concept {currentConcept.id}</p>
                <h1 className="font-extralight text-4xl md:text-5xl lg:text-7xl tracking-tight text-zinc-100 mb-4">{currentConcept.label}</h1>
                <p className="font-extralight text-sm md:text-base text-zinc-400 max-w-lg">{currentConcept.tagline}</p>
              </div>
              {/* Film frames */}
              <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-3">
                {[0, 1, 2].map(i => (
                  <div key={i} className="flex-1 aspect-[3/2] rounded bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Film className="w-4 h-4 text-zinc-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Concept Selector */}
          <div className="flex gap-3">
            {CONCEPTS.map((c, i) => (
              <button key={c.id} onClick={() => switchConcept(i)} className={cn("flex-1 py-3 px-4 rounded-lg border transition-all duration-500 text-left", i === concept ? "bg-white/[0.06] border-zinc-500/40" : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]")}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="tracking-[0.4em] text-[9px] text-zinc-500">CONCEPT {c.id}</span>
                </div>
                <p className="font-extralight text-sm text-zinc-200">{c.label}</p>
              </button>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 p-6 rounded-lg bg-white/[0.03] backdrop-blur-2xl border border-white/[0.04]">
            <Metric label="Reach" value={reachMod} suffix="K" />
            <Metric label="CTR" value={ctrMod} suffix="%" />
            <Metric label="Conversion" value={convMod} suffix="%" />
          </div>

          {/* Loading bar */}
          {genState === "loading" && (
            <div className="h-[1px] bg-zinc-800 rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-zinc-400 to-zinc-200 animate-[loading_0.8s_ease-in-out]" style={{ width: "100%", animation: "loading 0.8s ease-in-out" }} />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleGenerate} disabled={genState === "loading"} className={cn("flex-1 h-10 font-light text-xs tracking-wide", genState === "success" ? "bg-emerald-600 hover:bg-emerald-700" : genState === "error" ? "bg-red-600 hover:bg-red-700" : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300")}>
              {genState === "loading" && <span className="w-4 h-4 border border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin mr-2" />}
              {genState === "loading" ? "Generating..." : genState === "success" ? "Complete" : genState === "error" ? "Failed — Brief Too Short" : "Generate"}
            </Button>
            <Button variant="outline" className="h-10 px-4 border-white/[0.08] text-zinc-400 hover:bg-white/[0.04]" onClick={() => addLog("Campaign saved")}>
              <Save className="w-3.5 h-3.5 mr-1.5" />Save
            </Button>
            <Button variant="outline" className="h-10 px-4 border-white/[0.08] text-zinc-400 hover:bg-white/[0.04]" onClick={() => addLog("Exported campaign pack")}>
              <Download className="w-3.5 h-3.5 mr-1.5" />Export
            </Button>
          </div>

          {/* Campaign Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/[0.03] backdrop-blur-2xl border border-white/[0.04] p-4">
              <p className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase mb-3">Director Notes</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Clapperboard className="w-3.5 h-3.5 text-zinc-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-zinc-400 font-light">Tone: <span className="text-zinc-300">{tone}</span> — align with private aviation discretion standards.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Eye className="w-3.5 h-3.5 text-zinc-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-zinc-400 font-light">Visual style: <span className="text-zinc-300">{style}</span> — ensure cinematic grade color pipeline.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Palette className="w-3.5 h-3.5 text-zinc-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-zinc-400 font-light">Color grade active: <span className="text-zinc-300">{["Cool Silver", "Warm Gold", "Deep Blue"][concept]}</span></p>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-zinc-400 font-light">Cut: <span className="text-zinc-300">{directorsCut ? "Extended" : "Theatrical"}</span> — {directorsCut ? "90s hero sequence" : "60s hero sequence"}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/[0.03] backdrop-blur-2xl border border-white/[0.04] p-4">
              <p className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase mb-3">Film Frames</p>
              <div className="space-y-2">
                {["Opening wide shot — aircraft on tarmac", "Interior reveal — cabin ambience detail", "Closing horizon — brand lockup"].map((frame, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                    <div className="w-12 h-8 rounded bg-zinc-800/80 flex items-center justify-center shrink-0">
                      <Film className="w-3 h-3 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500">Frame {i + 1}</p>
                      <p className="text-[11px] text-zinc-400 font-light">{frame}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-lg bg-white/[0.03] backdrop-blur-2xl border border-white/[0.04] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="tracking-[0.4em] text-[9px] text-zinc-500 uppercase">Activity</p>
              <span className="text-[9px] text-zinc-600">{log.length} entries</span>
            </div>
            <div className="space-y-1.5">
              {log.slice(-5).map((entry, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="text-zinc-600 font-mono w-10">{entry.time}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-500/40 shrink-0" />
                  <span className="text-zinc-400 font-light">{entry.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
