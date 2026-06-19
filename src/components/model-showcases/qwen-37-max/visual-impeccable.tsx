"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Film, Save, Download, Loader2, CheckCircle2, AlertCircle,
  ChevronRight, X, History, Sparkles, Clapperboard
} from "lucide-react";

const SKILLS_LABEL = "frontend-skill + impeccable";
const MODEL_LABEL = "Qwen 3.7 Max";

const AUDIENCES = ["UHNW travelers", "Private jet charter clients", "Luxury travel advisors", "Cultural institution patrons"];
const CHANNELS = ["Private screening events", "Members-only platforms", "Concierge networks", "Art fair partnerships"];
const TONES = ["Exclusive", "Atmospheric", "Understated", "Magnetic"];
const STYLES = ["Cinematic aerial", "Golden hour portrait", "Architectural detail", "Night atmosphere"];
const ASPECT_RATIOS = ["16:9", "2.39:1", "1:1"] as const;

const DEFAULT_BRIEF =
  "Create a premium cinematic campaign for Muse launching an exclusive travel experience aimed at ultra-high-net-worth individuals who collect destinations like art.";

interface Concept {
  id: string;
  headline: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  gradient: string;
  filmStills: string[];
  credits: string;
}

const CONCEPTS: Concept[] = [
  {
    id: "A", headline: "Departure",
    tagline: "The destination begins the moment you decide.",
    reach: 280, ctr: 2.4, conv: 6.8,
    gradient: "from-amber-900/20 via-black to-black",
    filmStills: ["Aerial descent", "Terminal silhouette", "Passport macro"],
    credits: "Dir. Muse Studios / DP: Golden Hour Collective / Score: Ambient Works Vol. III",
  },
  {
    id: "B", headline: "Arrival",
    tagline: "Some places recognize you before you arrive.",
    reach: 240, ctr: 2.1, conv: 7.2,
    gradient: "from-indigo-950/30 via-black to-black",
    filmStills: ["Threshold frame", "Interior light study", "Welcome gesture"],
    credits: "Dir. Muse Studios / DP: Blue Hour Atelier / Score: Strings in Minor Key",
  },
  {
    id: "C", headline: "Return",
    tagline: "You leave with something the brochure never showed.",
    reach: 310, ctr: 2.6, conv: 6.4,
    gradient: "from-emerald-950/20 via-black to-black",
    filmStills: ["Rear-view departure", "Keepsake detail", "Horizon fade"],
    credits: "Dir. Muse Studios / DP: Dusk Division / Score: Piano & Field Recordings",
  },
];

type GenerateState = "idle" | "loading" | "success" | "error";
interface LogEntry { time: string; text: string }

export default function VisualImpeccable() {
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [activeConcept, setActiveConcept] = useState(0);
  const [aspect, setAspect] = useState<(typeof ASPECT_RATIOS)[number]>("2.39:1");
  const [genState, setGenState] = useState<GenerateState>("idle");
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success">("idle");
  const [exportState, setExportState] = useState<"idle" | "loading" | "success">("idle");
  const [showLog, setShowLog] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  const concept = CONCEPTS[activeConcept];
  const glassPanel = "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]";

  const controlFields = [
    { label: "Audience", value: audience, options: AUDIENCES, setter: setAudience },
    { label: "Channel", value: channel, options: CHANNELS, setter: setChannel },
    { label: "Tone", value: tone, options: TONES, setter: setTone },
    { label: "Style", value: style, options: STYLES, setter: setStyle },
  ];

  const renderDropdowns = (grid = false) => (
    <div className={grid ? "grid grid-cols-2 gap-3" : "space-y-3"}>
      {controlFields.map(({ label, value, options, setter }) => (
        <div key={label}>
          <label className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1 block">{label}</label>
          <select
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70 py-2 px-2 appearance-none focus:outline-none focus:border-amber-400 transition-colors"
          >
            {options.map((o) => <option key={o} value={o} className="bg-black text-white">{o}</option>)}
          </select>
        </div>
      ))}
    </div>
  );

  const genLabel = genState === "loading" ? "Generating" : genState === "success" ? "Generated" : genState === "error" ? "Retry" : "Generate";
  const genClass = genState === "error" ? "text-red-400 border-red-500" : genState === "success" ? "text-emerald-400 border-emerald-500" : "text-amber-400 border-amber-400";

  const actionButtons = (mobile = false) => (
    <div className={cn("flex gap-2 flex-wrap", mobile && "pb-4")}>
      <Button onClick={handleGenerate} disabled={genState === "loading"} variant="ghost"
        className={cn("relative text-xs tracking-wider uppercase gap-2 border-b-2 rounded-none", genClass, mobile && "flex-1")}>
        {genState === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {genState === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
        {genState === "error" && <AlertCircle className="w-3.5 h-3.5" />}
        {genLabel}
        {genState === "loading" && <span className="absolute bottom-0 left-0 h-[2px] bg-amber-400 animate-[progressLine_0.8s_linear]" />}
      </Button>
      <Button variant="ghost" size="sm" onClick={handleSave} disabled={saveState === "loading"}
        className="text-white/50 hover:text-white text-[10px] tracking-widest uppercase gap-1.5 rounded-none border-b border-white/[0.08]">
        {saveState === "loading" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
        {saveState === "success" ? "Saved" : "Save"}
      </Button>
      <Button variant="ghost" size="sm" onClick={handleExport} disabled={exportState === "loading"}
        className="text-white/50 hover:text-white text-[10px] tracking-widest uppercase gap-1.5 rounded-none border-b border-white/[0.08]">
        {exportState === "loading" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
        {exportState === "success" ? "Exported" : "Export"}
      </Button>
    </div>
  );

  const addLog = useCallback((text: string) => {
    setLog((prev) => {
      const entry = { time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }), text };
      return [entry, ...prev].slice(0, 5);
    });
  }, []);

  const handleGenerate = () => {
    if (genState === "loading") return;
    setGenState("loading");
    addLog("Generating campaign...");
    setTimeout(() => {
      if (brief.trim().length >= 16) {
        setGenState("success");
        addLog("Campaign generated successfully.");
      } else {
        setGenState("error");
        addLog("Error: brief must be at least 16 characters.");
      }
    }, 800);
  };

  const handleSave = () => {
    setSaveState("loading");
    addLog("Saving campaign...");
    setTimeout(() => { setSaveState("success"); addLog("Campaign saved."); }, 600);
  };

  const handleExport = () => {
    setExportState("loading");
    addLog("Exporting assets...");
    setTimeout(() => { setExportState("success"); addLog("Assets exported."); }, 700);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Ambient gradient */}
      <div className={cn("absolute inset-0 bg-gradient-radial pointer-events-none opacity-40 transition-all duration-700", concept.gradient)} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <Clapperboard className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">{MODEL_LABEL}</p>
            <p className="text-[10px] text-amber-400/70">{SKILLS_LABEL}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Aspect ratio toggle */}
          <div className={cn("hidden sm:flex items-center gap-0.5 rounded-full p-0.5", glassPanel)}>
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar}
                onClick={() => setAspect(ar)}
                className={cn(
                  "px-2.5 py-1 text-[9px] tracking-widest uppercase rounded-full transition-all",
                  aspect === ar ? "bg-amber-400 text-black font-semibold" : "text-white/40 hover:text-white/70"
                )}
              >
                {ar}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLog((v) => !v)}
            className="text-white/40 hover:text-amber-400 text-[10px] tracking-[0.25em] uppercase gap-1.5"
          >
            <History className="w-3.5 h-3.5" /> Log
          </Button>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* LEFT — Glass controls panel (desktop) */}
        <aside className="hidden lg:flex w-[320px] shrink-0 flex-col gap-5 p-6 overflow-y-auto border-r border-white/[0.06]">
          {/* Brief */}
          <div className={cn("p-4", glassPanel)}>
            <label className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2 block">Campaign Brief</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={4}
              className="w-full bg-transparent border-b border-white/[0.1] text-xs text-white/80 py-2 resize-none focus:outline-none focus:border-amber-400 transition-colors placeholder:text-white/20"
              placeholder="Describe the campaign..."
            />
          </div>

          {/* Controls */}
          <div className={cn("p-4", glassPanel)}>{renderDropdowns()}</div>

          {/* Metrics */}
          <div className={cn("p-4", glassPanel)}>
            <label className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3 block">Projections</label>
            <div className="space-y-2">
              {[
                { label: "Reach", value: `${concept.reach}K` },
                { label: "CTR", value: `${concept.ctr}%` },
                { label: "Conversion", value: `${concept.conv}%` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">{label}</span>
                  <span className="text-lg font-light text-amber-400">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          {actionButtons()}
        </aside>

        {/* CENTER — Cinema screen */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
          {/* Film line top */}
          <div className="w-full max-w-3xl flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">{channel} &middot; {tone}</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Massive cinematic headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tighter text-center text-white/95 leading-[0.9] transition-all duration-700 mb-4">
            {concept.headline}
          </h1>
          <p className="text-white/40 text-sm md:text-base text-center max-w-md mb-12 italic transition-all duration-500">
            {concept.tagline}
          </p>

          {/* Film stills */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
            {concept.filmStills.map((label, i) => (
              <div key={label} className="relative group">
                <div
                  className={cn(
                    "w-full bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] flex items-center justify-center transition-all duration-500 group-hover:border-white/[0.15]",
                    aspect === "2.39:1" ? "aspect-[2.39/1]" : aspect === "16:9" ? "aspect-video" : "aspect-square"
                  )}
                >
                  <Film className="w-5 h-5 text-white/[0.12]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <p className="absolute bottom-2 left-2 text-[8px] tracking-[0.3em] uppercase text-white/30">{label}</p>
                <p className="absolute bottom-2 right-2 text-[8px] tracking-widest text-white/20">{aspect}</p>
              </div>
            ))}
          </div>

          {/* Film line bottom */}
          <div className="w-full max-w-3xl flex items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Muse Studios</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Mobile controls toggle */}
          <button
            onClick={() => setShowMobileSheet(true)}
            className="lg:hidden mt-6 text-[10px] tracking-[0.25em] uppercase text-amber-400/70 border-b border-amber-400/30 pb-0.5"
          >
            Controls &amp; Concepts
          </button>
        </main>

        {/* RIGHT — Vertical film strip (concepts) */}
        <aside className="hidden lg:flex w-[200px] shrink-0 flex-col gap-3 p-4 border-l border-white/[0.06] overflow-y-auto">
          <label className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-1">Reels</label>
          {CONCEPTS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveConcept(i)}
              className={cn(
                "text-left p-3 border transition-all relative",
                activeConcept === i
                  ? "border-amber-400/40 bg-white/[0.04]"
                  : "border-white/[0.06] bg-transparent hover:border-white/[0.12]"
              )}
            >
              {/* Sprocket holes */}
              <div className="absolute -left-1.5 top-3 bottom-3 flex flex-col justify-between">
                {[0, 1, 2].map((n) => (
                  <div key={n} className="w-1 h-1 rounded-full bg-white/[0.1]" />
                ))}
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-1">Reel {c.id}</p>
              <p className="text-sm font-light text-white/80">{c.headline}</p>
              {activeConcept === i && (
                <p className="text-[8px] tracking-widest uppercase text-amber-400 mt-1.5">Active</p>
              )}
            </button>
          ))}
        </aside>
      </div>

      {/* Credits roll */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-3 overflow-hidden">
        <p className="text-[9px] font-mono tracking-wider text-white/15 whitespace-nowrap animate-[scroll_20s_linear_infinite]">
          {concept.credits} &nbsp;&nbsp;&middot;&nbsp;&nbsp; Muse Campaign Studio &nbsp;&nbsp;&middot;&nbsp;&nbsp; {MODEL_LABEL} &nbsp;&nbsp;&middot;&nbsp;&nbsp; {concept.credits}
        </p>
      </footer>

      {/* Activity log slide-out */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-xl border-l border-white/[0.08] z-50 transform transition-transform duration-300 flex flex-col",
          showLog ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Activity Log</span>
          <button onClick={() => setShowLog(false)} className="text-white/30 hover:text-white/60">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {log.length === 0 && <p className="text-xs text-white/20 italic">No activity yet.</p>}
          {log.map((entry, i) => (
            <div key={i} className="flex gap-3 items-start">
              <ChevronRight className="w-3 h-3 text-amber-400/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-white/60">{entry.text}</p>
                <p className="text-[10px] text-white/20 mt-0.5">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showLog && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowLog(false)} />}

      {/* Mobile bottom sheet */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bottom-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/[0.08] rounded-t-2xl transform transition-transform duration-300 max-h-[80vh] overflow-y-auto",
          showMobileSheet ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="sticky top-0 bg-black/80 backdrop-blur-sm flex items-center justify-between p-4 border-b border-white/[0.06]">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Controls</span>
          <button onClick={() => setShowMobileSheet(false)} className="text-white/30 hover:text-white/60">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          {/* Brief */}
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2 block">Campaign Brief</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70 py-2 px-3 resize-none focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="Describe the campaign..."
            />
          </div>
          {/* Dropdowns */}
          {renderDropdowns(true)}
          {/* Aspect ratio */}
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2 block">Aspect Ratio</label>
            <div className="flex gap-1">
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar}
                  onClick={() => setAspect(ar)}
                  className={cn(
                    "px-3 py-1.5 text-[10px] tracking-widest uppercase rounded border transition-all",
                    aspect === ar
                      ? "bg-amber-400 text-black border-amber-400 font-semibold"
                      : "border-white/[0.08] text-white/40 hover:text-white/70"
                  )}
                >
                  {ar}
                </button>
              ))}
            </div>
          </div>
          {/* Concepts */}
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2 block">Reels</label>
            <div className="flex gap-2">
              {CONCEPTS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => { setActiveConcept(i); setShowMobileSheet(false); }}
                  className={cn(
                    "flex-1 p-3 border text-left transition-all",
                    activeConcept === i
                      ? "border-amber-400/40 bg-white/[0.04]"
                      : "border-white/[0.06] hover:border-white/[0.12]"
                  )}
                >
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/25">Reel {c.id}</p>
                  <p className="text-xs font-light text-white/80 mt-0.5">{c.headline}</p>
                </button>
              ))}
            </div>
          </div>
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Reach", value: `${concept.reach}K` },
              { label: "CTR", value: `${concept.ctr}%` },
              { label: "Conv", value: `${concept.conv}%` },
            ].map(({ label, value }) => (
              <div key={label} className={cn("p-3 text-center", glassPanel)}>
                <p className="text-lg font-light text-amber-400">{value}</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-white/25">{label}</p>
              </div>
            ))}
          </div>
          {/* Actions */}
          {actionButtons(true)}
        </div>
      </div>
      {showMobileSheet && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setShowMobileSheet(false)} />}
    </div>
  );
}
