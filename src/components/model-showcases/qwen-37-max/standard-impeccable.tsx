"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Save, Download, ChevronRight, History, X,
  Loader2, CheckCircle2, AlertCircle, Pen
} from "lucide-react";

const SKILLS_LABEL = "frontend-app-builder + impeccable";
const MODEL_LABEL = "Qwen 3.7 Max";

const AUDIENCES = ["Pen collectors", "C-suite executives", "Luxury gift buyers", "Heritage brand enthusiasts"];
const CHANNELS = ["Private events", "Luxury lifestyle press", "Concierge email", "Heritage retail"];
const TONES = ["Prestigious", "Timeless", "Articulate", "Exclusive"];
const STYLES = ["Product photography", "Heritage editorial", "Atelier documentary", "Gift presentation"];

const DEFAULT_BRIEF =
  "Create a luxury launch campaign for Muse promoting a limited-edition fountain pen collection aimed at collectors and C-suite executives who value tangible craftsmanship.";

interface Concept {
  id: string;
  label: string;
  headline: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  craftsmanship: string[];
  curatorNote: string;
  aspectSlots: string[];
}

const CONCEPTS: Concept[] = [
  {
    id: "A", label: "A", headline: "First Stroke",
    tagline: "The first stroke writes the legacy.",
    reach: 420, ctr: 3.1, conv: 5.2,
    craftsmanship: ["Gold foil stamp", "120gsm cotton stock", "Debossed logo"],
    curatorNote: "An invocation of beginnings — the moment intent meets material.",
    aspectSlots: ["4:5 Portrait", "16:9 Hero", "1:1 Detail"],
  },
  {
    id: "B", label: "B", headline: "Heirloom",
    tagline: "Not a pen. A promise to the next generation.",
    reach: 380, ctr: 2.8, conv: 5.6,
    craftsmanship: ["Letterpress type", "Hand-bound album", "Wax seal closure"],
    curatorNote: "Positioned as inheritance — an object that outlives its owner's story.",
    aspectSlots: ["3:4 Editorial", "2.39:1 Cinematic", "1:1 Macro"],
  },
  {
    id: "C", label: "C", headline: "Boardroom",
    tagline: "The instrument that signs the deal.",
    reach: 460, ctr: 3.4, conv: 4.8,
    craftsmanship: ["Brushed steel mount", "Laser-engraved serial", "Leather sleeve"],
    curatorNote: "Power codified — the pen as the final actor in high-stakes theatre.",
    aspectSlots: ["16:9 Wide", "4:5 Product", "1:1 Texture"],
  },
];

type GenerateState = "idle" | "loading" | "success" | "error";
interface LogEntry { time: string; text: string }

export default function StandardImpeccable() {
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [activeConcept, setActiveConcept] = useState(0);
  const [genState, setGenState] = useState<GenerateState>("idle");
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success">("idle");
  const [exportState, setExportState] = useState<"idle" | "loading" | "success">("idle");
  const [showHistory, setShowHistory] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const concept = CONCEPTS[activeConcept];

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
    timerRef.current = setTimeout(() => {
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
    setTimeout(() => { setExportState("success"); addLog("Assets exported to ZIP."); }, 700);
  };

  const selectClass =
    "w-full bg-stone-900 border border-stone-700 text-stone-200 text-xs uppercase tracking-widest py-2.5 px-3 rounded-none appearance-none focus:outline-none focus:border-amber-500 transition-colors";

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <Pen className="w-5 h-5 text-amber-500" />
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block">{MODEL_LABEL}</span>
            <span className="text-xs italic text-amber-500/80">{SKILLS_LABEL}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHistory((v) => !v)}
          className="text-stone-400 hover:text-amber-500 text-[10px] tracking-[0.25em] uppercase gap-1.5"
        >
          <History className="w-3.5 h-3.5" /> History
        </Button>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL — Workspace (45%) */}
        <aside className="w-full lg:w-[45%] border-r border-stone-800 p-6 overflow-y-auto flex flex-col gap-6">
          {/* Brief */}
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2 block">Campaign Brief</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={5}
              className="w-full bg-stone-900 border border-stone-700 text-stone-200 text-sm leading-relaxed p-4 resize-none focus:outline-none focus:border-amber-500 transition-colors placeholder:text-stone-600"
              placeholder="Describe the campaign..."
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Audience", value: audience, options: AUDIENCES, setter: setAudience },
              { label: "Channel", value: channel, options: CHANNELS, setter: setChannel },
              { label: "Tone", value: tone, options: TONES, setter: setTone },
              { label: "Style", value: style, options: STYLES, setter: setStyle },
            ].map(({ label, value, options, setter }) => (
              <div key={label}>
                <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1.5 block">{label}</label>
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className={selectClass}
                >
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Concepts */}
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-3 block">Concepts</label>
            <div className="flex flex-col gap-3">
              {CONCEPTS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConcept(i)}
                  className={cn(
                    "text-left p-4 border transition-all relative",
                    activeConcept === i
                      ? "border-amber-500/60 bg-stone-900"
                      : "border-stone-800 bg-stone-900/50 hover:border-stone-600"
                  )}
                >
                  {activeConcept === i && (
                    <span className="absolute top-2 right-2 text-[9px] tracking-widest uppercase bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 px-2 py-0.5 font-semibold">
                      Selected
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="text-lg font-light text-amber-500/70 italic leading-none mt-0.5">{c.id}</span>
                    <div>
                      <p className="text-sm font-medium text-stone-100 italic">{c.headline}</p>
                      <p className="text-xs text-stone-500 mt-1">{c.tagline}</p>
                      <div className="mt-2 space-y-0.5">
                        {c.craftsmanship.map((line) => (
                          <p key={line} className="text-[10px] tracking-wider uppercase text-stone-600">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Reach", value: `${concept.reach}K` },
              { label: "CTR", value: `${concept.ctr}%` },
              { label: "Conversion", value: `${concept.conv}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-900 border border-stone-800 p-4 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">{label}</p>
                <p className="text-2xl font-light text-amber-500">{value}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={handleGenerate}
              disabled={genState === "loading"}
              className={cn(
                "relative overflow-hidden text-stone-950 font-semibold tracking-wide text-xs uppercase gap-2 px-6",
                genState === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : genState === "success"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400"
              )}
            >
              {genState === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {genState === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
              {genState === "error" && <AlertCircle className="w-3.5 h-3.5" />}
              {genState === "loading" ? "Generating..." : genState === "success" ? "Generated" : genState === "error" ? "Retry" : "Generate"}
              {genState === "loading" && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_1s_infinite]" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={saveState === "loading"}
              className="border-stone-700 text-stone-300 hover:bg-stone-800 text-xs uppercase tracking-wider gap-1.5"
            >
              {saveState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saveState === "success" ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={exportState === "loading"}
              className="border-stone-700 text-stone-300 hover:bg-stone-800 text-xs uppercase tracking-wider gap-1.5"
            >
              {exportState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              {exportState === "success" ? "Exported" : "Export"}
            </Button>
          </div>
        </aside>

        {/* RIGHT PANEL — Preview (55%) */}
        <main className="w-full lg:w-[55%] bg-stone-900 flex flex-col relative overflow-hidden">
          {/* Gallery frame */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-600 mb-6">{channel} &middot; {tone} &middot; {style}</p>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light italic text-center leading-tight bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-3 transition-all duration-500">
              {concept.headline}
            </h1>
            <p className="text-stone-400 text-sm italic mb-10 text-center max-w-md">{concept.tagline}</p>

            {/* Image slots */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
              {concept.aspectSlots.map((slot, i) => (
                <div
                  key={slot}
                  className={cn(
                    "border border-stone-700/60 bg-stone-800/50 flex flex-col items-center justify-center transition-all duration-500",
                    i === 0 ? "aspect-[4/5]" : i === 1 ? "aspect-[16/9]" : "aspect-square"
                  )}
                >
                  <Sparkles className="w-5 h-5 text-stone-700 mb-2" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-stone-600">{slot}</span>
                </div>
              ))}
            </div>

            {/* Campaign line */}
            <p className="mt-8 text-[10px] tracking-[0.35em] uppercase text-stone-600">
              Muse &middot; {concept.headline} &middot; {audience}
            </p>
          </div>
        </main>
      </div>

      {/* History slide-out */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-stone-900 border-l border-stone-800 z-50 transform transition-transform duration-300 flex flex-col",
          showHistory ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-stone-800">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Activity Log</span>
          <button onClick={() => setShowHistory(false)} className="text-stone-500 hover:text-stone-300">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {log.length === 0 && <p className="text-xs text-stone-600 italic">No activity yet.</p>}
          {log.map((entry, i) => (
            <div key={i} className="flex gap-3 items-start">
              <ChevronRight className="w-3 h-3 text-amber-500/50 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-stone-300">{entry.text}</p>
                <p className="text-[10px] text-stone-600 mt-0.5">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showHistory && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowHistory(false)} />}
    </div>
  );
}
