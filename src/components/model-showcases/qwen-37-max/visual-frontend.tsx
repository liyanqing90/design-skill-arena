"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Film, Camera, Download, Save, Play, CheckCircle2,
  XCircle, Loader2, Zap, Eye, TrendingUp, Users, Globe, Sliders
} from "lucide-react";

const BRIEF = "Create a bold campaign for Muse promoting a limited edition travel camera to style-led explorers across global cities.";
const AUDIENCES = ["Style-led explorers", "Weekend filmmakers", "Travel editors", "Night photographers"];
const CHANNELS = ["Short video", "Out-of-home", "Creator kit", "Gallery pop-up"];
const TONES = ["Cinematic", "Electric", "Editorial", "Dreamlike"];
const STYLES = ["High color", "Night chrome", "Flash editorial", "Soft grain"];

interface Concept {
  id: string;
  title: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  bgFrom: string;
  bgTo: string;
  accent: string;
  circleColor: string;
}

const CONCEPTS: Concept[] = [
  { id: "A", title: "Afterlight", tagline: "The city after dark is your canvas.", reach: 1050, ctr: 5.1, conv: 3.4, bgFrom: "from-rose-950", bgTo: "to-rose-900", accent: "rose", circleColor: "bg-rose-500/20" },
  { id: "B", title: "Fast Passport", tagline: "Every transfer holds a frame worth keeping.", reach: 1180, ctr: 4.7, conv: 3.2, bgFrom: "from-blue-950", bgTo: "to-indigo-900", accent: "blue", circleColor: "bg-blue-500/20" },
  { id: "C", title: "Local Color", tagline: "The color the map cannot name.", reach: 980, ctr: 5.3, conv: 3.6, bgFrom: "from-amber-950", bgTo: "to-orange-900", accent: "amber", circleColor: "bg-amber-500/20" },
];

type GenerateState = "idle" | "loading" | "success" | "error";

export default function VisualFrontend() {
  const [brief, setBrief] = useState(BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [activeConcept, setActiveConcept] = useState(0);
  const [genState, setGenState] = useState<GenerateState>("idle");
  const [saveState, setSaveState] = useState<"idle" | "success">("idle");
  const [exportState, setExportState] = useState<"idle" | "success">("idle");
  const [intensity, setIntensity] = useState(70);
  const [mobilePanel, setMobilePanel] = useState<"brief" | "preview" | "data">("preview");
  const [activityLog, setActivityLog] = useState<string[]>([
    "Cinematic workspace loaded",
    "Mood particles active",
  ]);

  const current = CONCEPTS[activeConcept];

  const addLog = useCallback((entry: string) => {
    setActivityLog(prev => [entry, ...prev].slice(0, 5));
  }, []);

  const metrics = useMemo(() => {
    const aIdx = AUDIENCES.indexOf(audience);
    const tIdx = TONES.indexOf(tone);
    const mod = (aIdx + tIdx) * 0.035;
    const intMod = intensity / 100;
    return {
      reach: Math.round(current.reach * (1 + mod) * (0.8 + intMod * 0.2)),
      ctr: +(current.ctr * (1 + mod * 0.4) * (0.9 + intMod * 0.1)).toFixed(1),
      conv: +(current.conv * (1 + mod * 0.3) * (0.85 + intMod * 0.15)).toFixed(1),
    };
  }, [audience, tone, intensity, current]);

  const handleGenerate = useCallback(() => {
    if (genState === "loading") return;
    setGenState("loading");
    addLog("Generate started");
    setTimeout(() => {
      if (brief.trim().length >= 16) {
        setGenState("success");
        addLog("Concepts generated successfully");
      } else {
        setGenState("error");
        addLog("Error: brief too short (min 16 chars)");
      }
    }, 800);
  }, [genState, brief, addLog]);

  const handleSave = useCallback(() => {
    setSaveState("success");
    addLog("Campaign saved");
    setTimeout(() => setSaveState("idle"), 2000);
  }, [addLog]);

  const handleExport = useCallback(() => {
    setExportState("success");
    addLog("Exported to clipboard");
    setTimeout(() => setExportState("idle"), 2000);
  }, [addLog]);

  const Pill = ({ value, active, onClick }: { value: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
        active
          ? "bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/20"
          : "bg-white/[0.06] text-zinc-400 hover:bg-white/[0.12] hover:text-zinc-200"
      )}
    >
      {value}
    </button>
  );

  const ConceptCard = ({ c, i }: { c: Concept; i: number }) => (
    <button
      key={c.id}
      onClick={() => { setActiveConcept(i); addLog(`Switched to Concept ${c.id}: ${c.title}`); }}
      className={cn(
        "relative flex-1 min-w-[180px] rounded-xl p-4 text-left transition-all overflow-hidden",
        activeConcept === i
          ? "ring-2 ring-rose-500/50 bg-white/[0.10]"
          : "bg-white/[0.04] hover:bg-white/[0.08]"
      )}
    >
      {activeConcept === i && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-500/10 to-fuchsia-500/5 pointer-events-none" />
      )}
      <div className="relative">
        <span className="text-[11px] font-mono text-zinc-500 uppercase">Concept {c.id}</span>
        <h3 className="mt-1 text-base font-semibold text-zinc-100">{c.title}</h3>
        <p className="mt-0.5 text-xs text-zinc-500 italic">&ldquo;{c.tagline}&rdquo;</p>
        <div className="mt-2 flex gap-3 text-[11px] font-mono text-zinc-400">
          <span>{c.reach}K</span>
          <span>{c.ctr}%</span>
          <span>{c.conv}%</span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Mood particles */}
      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.1); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,30px) scale(0.9); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,25px) scale(1.05); } }
      `}</style>

      {/* Header */}
      <header className="border-b border-white/[0.06] px-4 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Film className="size-5 text-rose-400" />
              <span className="font-semibold text-zinc-100">Muse</span>
            </div>
            <span className="hidden sm:inline rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-3 py-0.5 text-[11px] font-bold text-white">
              Qwen 3.7 Max
            </span>
            <span className="hidden sm:inline rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-0.5 text-[11px] font-mono text-rose-300">
              frontend-skill
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-600">Cinematic Dark Immersion</span>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="md:hidden flex border-b border-white/[0.06]">
        {(["brief", "preview", "data"] as const).map(p => (
          <button
            key={p}
            onClick={() => setMobilePanel(p)}
            className={cn(
              "flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
              mobilePanel === p ? "text-rose-400 border-b-2 border-rose-500" : "text-zinc-600"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <main className="mx-auto max-w-7xl p-4 space-y-6">
        {/* Brief + Controls */}
        <section className={cn("space-y-5", mobilePanel !== "brief" && "hidden md:block")}>
          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl p-5 border border-white/[0.06]">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2 block">
              <Camera className="size-3.5 inline mr-1" />Campaign Brief
            </label>
            <textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-sm text-zinc-200 outline-none resize-none placeholder:text-zinc-600 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20"
            />
            <p className="text-[10px] font-mono text-zinc-600 mt-1">{brief.trim().length} chars</p>
          </div>

          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl p-5 border border-white/[0.06] space-y-4">
            {[
              { label: "Audience", value: audience, opts: AUDIENCES, set: setAudience, icon: Users },
              { label: "Channel", value: channel, opts: CHANNELS, set: setChannel, icon: Globe },
              { label: "Tone", value: tone, opts: TONES, set: setTone, icon: Zap },
              { label: "Style", value: style, opts: STYLES, set: setStyle, icon: Eye },
            ].map(({ label, value, opts, set, icon: Icon }) => (
              <div key={label}>
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  <Icon className="size-3.5" />{label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {opts.map(o => (
                    <Pill key={o} value={o} active={o === value} onClick={() => set(o)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preview */}
        <section className={cn(mobilePanel !== "preview" && "hidden md:block")}>
          <div className={cn(
            "relative rounded-2xl overflow-hidden border border-white/[0.08] min-h-[380px] md:min-h-[440px] flex items-center justify-center",
            "bg-gradient-to-br", current.bgFrom, current.bgTo
          )}>
            {/* Floating circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={cn("absolute w-64 h-64 rounded-full blur-3xl", current.circleColor)} style={{ top: "10%", left: "10%", animation: "float1 8s ease-in-out infinite" }} />
              <div className={cn("absolute w-48 h-48 rounded-full blur-2xl", current.circleColor)} style={{ top: "50%", right: "15%", animation: "float2 10s ease-in-out infinite" }} />
              <div className={cn("absolute w-36 h-36 rounded-full blur-2xl", current.circleColor)} style={{ bottom: "10%", left: "40%", animation: "float3 7s ease-in-out infinite" }} />
            </div>
            <div className="relative text-center px-6 py-10 max-w-2xl mx-auto">
              <span className="inline-block rounded-full border border-white/20 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/60 mb-4">
                Concept {current.id}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                {current.title}
              </h1>
              <p className="text-base sm:text-lg text-white/60 italic max-w-md mx-auto">
                &ldquo;{current.tagline}&rdquo;
              </p>
              <div className="mt-6 flex justify-center gap-4 text-[11px] font-mono text-white/40">
                <span className="rounded-full bg-white/[0.08] px-3 py-1">{tone}</span>
                <span className="rounded-full bg-white/[0.08] px-3 py-1">{style}</span>
                <span className="rounded-full bg-white/[0.08] px-3 py-1">{channel}</span>
              </div>
            </div>
          </div>

          {/* Film-strip concepts */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {CONCEPTS.map((c, i) => <ConceptCard key={c.id} c={c} i={i} />)}
          </div>
        </section>

        {/* Metrics + actions */}
        <section className={cn(mobilePanel !== "data" && "hidden md:block")}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Reach", value: metrics.reach, unit: "K", icon: TrendingUp, max: 1500 },
              { label: "CTR", value: metrics.ctr, unit: "%", icon: Eye, max: 8 },
              { label: "Conversion", value: metrics.conv, unit: "%", icon: Zap, max: 6 },
            ].map(m => (
              <div key={m.label} className="rounded-2xl bg-white/[0.06] backdrop-blur-xl p-5 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <m.icon className="size-3.5" />
                  <span className="text-[11px] font-mono uppercase tracking-wider">{m.label}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {m.value}
                  <span className="text-lg">{m.unit}</span>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-all duration-700"
                    style={{ width: `${Math.min(100, (m.value / m.max) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Intensity slider */}
          <div className="mt-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl p-5 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                <Sliders className="size-3.5" />Visual Intensity
              </span>
              <span className="text-sm font-mono text-rose-400">{intensity}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={intensity}
              onChange={e => setIntensity(+e.target.value)}
              className="w-full accent-rose-500 h-1.5"
            />
          </div>

          {/* Activity log */}
          <div className="mt-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl p-5 border border-white/[0.06]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">Activity Log</span>
            <div className="space-y-1">
              {activityLog.map((entry, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span className="text-rose-500/40">&rsaquo;</span>{entry}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGenerate}
              disabled={genState === "loading"}
              className={cn(
                "flex-1 font-semibold",
                genState === "success" && "!bg-gradient-to-r !from-rose-500 !to-fuchsia-500 !text-white",
                genState === "error" && "!bg-red-600 !text-white"
              )}
            >
              {genState === "loading" && <><Loader2 className="size-4 mr-1.5 animate-spin" /> Generating...</>}
              {genState === "success" && <><CheckCircle2 className="size-4 mr-1.5" /> Done</>}
              {genState === "error" && <><XCircle className="size-4 mr-1.5" /> Brief too short</>}
              {genState === "idle" && <><Sparkles className="size-4 mr-1.5" /> Generate</>}
            </Button>
            <Button variant="outline" size="lg" onClick={handleSave} className="border-white/10 text-zinc-300 hover:bg-white/[0.08]">
              {saveState === "success" ? <CheckCircle2 className="size-4 mr-1.5 text-rose-400" /> : <Save className="size-4 mr-1.5" />}Save
            </Button>
            <Button variant="outline" size="lg" onClick={handleExport} className="border-white/10 text-zinc-300 hover:bg-white/[0.08]">
              {exportState === "success" ? <CheckCircle2 className="size-4 mr-1.5 text-rose-400" /> : <Download className="size-4 mr-1.5" />}Export
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
