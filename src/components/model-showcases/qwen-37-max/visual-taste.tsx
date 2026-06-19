"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Save, Download, Loader2, CheckCircle2,
  AlertCircle, Eye, ChevronRight, X, History
} from "lucide-react";

const SKILLS_LABEL = "frontend-skill + taste-skill";
const MODEL_LABEL = "Qwen 3.7 Max";

const AUDIENCES = ["Fragrance connoisseurs", "Art collectors", "Boutique hotel curators", "Lifestyle journalists"];
const CHANNELS = ["Art gallery pop-ups", "Niche fragrance press", "Curated newsletter", "Private tastings"];
const TONES = ["Evocative", "Intimate", "Cultured", "Mysterious"];
const STYLES = ["Still life photography", "Botanical illustration", "Abstract scent map", "Portrait series"];

const DEFAULT_BRIEF =
  "Curate a visually tasteful campaign for Muse launching an artisanal perfume line aimed at fragrance connoisseurs who treat scent as personal art.";

interface Concept {
  id: string;
  headline: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  curatorStatement: string;
  barColor: string;
  frameLabels: string[];
}

const CONCEPTS: Concept[] = [
  {
    id: "A", headline: "Top Note",
    tagline: "The first breath tells you who you are today.",
    reach: 460, ctr: 4.2, conv: 4.4,
    curatorStatement:
      "Top Note captures the ephemeral instant of encounter — a citrus burst rendered as visual overture, inviting the viewer to lean closer.",
    barColor: "bg-rose-800",
    frameLabels: ["3:4 Still Life", "16:9 Atmospheric", "1:1 Botanical"],
  },
  {
    id: "B", headline: "Base Accord",
    tagline: "What lingers after you leave the room.",
    reach: 510, ctr: 3.8, conv: 4.8,
    curatorStatement:
      "Base Accord is the weight that remains — an amber and musk meditation on presence, memory, and the spaces we leave charged behind us.",
    barColor: "bg-amber-800",
    frameLabels: ["4:5 Portrait", "2.39:1 Mood", "1:1 Texture"],
  },
  {
    id: "C", headline: "Sillage",
    tagline: "A trail that says you were here.",
    reach: 430, ctr: 4.5, conv: 4.1,
    curatorStatement:
      "Sillage maps the invisible path of a passing figure — the scent-trail as ghost, as signature, as the most intimate form of arrival.",
    barColor: "bg-violet-800",
    frameLabels: ["16:9 Cinematic", "4:5 Editorial", "1:1 Abstract"],
  },
];

type GenerateState = "idle" | "loading" | "success" | "error";
interface LogEntry { time: string; text: string }

export default function VisualTaste() {
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [activeConcept, setActiveConcept] = useState(0);
  const [genState, setGenState] = useState<GenerateState>("idle");
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success">("idle");
  const [exportState, setExportState] = useState<"idle" | "loading" | "success">("idle");
  const [showLog, setShowLog] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [fadeKey, setFadeKey] = useState(0);

  const concept = CONCEPTS[activeConcept];

  const addLog = useCallback((text: string) => {
    setLog((prev) => {
      const entry = { time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }), text };
      return [entry, ...prev].slice(0, 5);
    });
  }, []);

  const handleConceptSwitch = (i: number) => {
    setActiveConcept(i);
    setFadeKey((k) => k + 1);
  };

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
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      {/* Exhibition info bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-3">
          <Eye className="w-4 h-4 text-rose-900" />
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400">{MODEL_LABEL}</p>
            <p className="text-[10px] text-rose-900/70">{SKILLS_LABEL}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-stone-400">
          <span>Exhibition 001</span>
          <span className="w-px h-3 bg-stone-300" />
          <span>{audience}</span>
          <span className="w-px h-3 bg-stone-300" />
          <span>{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLog((v) => !v)}
          className="text-stone-500 hover:text-rose-900 text-[10px] tracking-[0.2em] uppercase gap-1.5"
        >
          <History className="w-3.5 h-3.5" /> Log
        </Button>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* GALLERY — 70% */}
        <main className="w-full lg:w-[70%] p-6 md:p-10 overflow-y-auto flex flex-col gap-8">
          {/* Preview wall */}
          <div
            key={fadeKey}
            className="bg-[#FAF8F5] border border-stone-200 p-8 md:p-14 flex flex-col items-center animate-[fadeIn_0.5s_ease]"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-8">
              {channel} &middot; {tone} &middot; {style}
            </p>

            <h1 className="text-3xl md:text-5xl font-light text-center text-stone-900 mb-2 leading-tight transition-all duration-500">
              {concept.headline}
            </h1>
            <p className="text-stone-500 text-sm italic mb-12 text-center max-w-lg">{concept.tagline}</p>

            {/* Artwork frames */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl">
              {concept.frameLabels.map((label, i) => (
                <div key={label} className="flex flex-col items-center group">
                  <div
                    className={cn(
                      "w-full border border-stone-300 bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300",
                      i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-[16/9]" : "aspect-square"
                    )}
                    style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.04)" }}
                  >
                    <Sparkles className="w-5 h-5 text-stone-300" />
                  </div>
                  <p className="mt-2 text-[9px] tracking-[0.25em] uppercase text-stone-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Curator's statement */}
            <div className="mt-10 max-w-lg">
              <p className="text-[10px] tracking-[0.25em] uppercase text-rose-900/60 mb-2">Curator&rsquo;s Statement</p>
              <p className="text-sm italic text-stone-500 leading-relaxed">{concept.curatorStatement}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Estimated Reach", value: `${concept.reach}K` },
              { label: "Click-through Rate", value: `${concept.ctr}%` },
              { label: "Conversion Rate", value: `${concept.conv}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white border border-stone-200 p-5 text-center">
                <p className="text-3xl font-light text-stone-900">{value}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </main>

        {/* SIDEBAR — 30% */}
        <aside className="w-full lg:w-[30%] bg-white border-l border-stone-200 p-6 overflow-y-auto flex flex-col gap-6">
          {/* Brief */}
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-2 block">Campaign Brief</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={4}
              className="w-full border-b border-stone-300 bg-transparent text-sm text-stone-700 py-2 resize-none focus:outline-none focus:border-rose-900 transition-colors placeholder:text-stone-300"
              placeholder="Describe the campaign..."
            />
          </div>

          {/* Controls — exhibition guide style */}
          <div className="space-y-4">
            {[
              { label: "Audience", value: audience, options: AUDIENCES, setter: setAudience },
              { label: "Channel", value: channel, options: CHANNELS, setter: setChannel },
              { label: "Tone", value: tone, options: TONES, setter: setTone },
              { label: "Style", value: style, options: STYLES, setter: setStyle },
            ].map(({ label, value, options, setter }) => (
              <div key={label}>
                <label className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1 block">{label}</label>
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full border-b border-stone-300 bg-transparent text-sm text-stone-700 py-1.5 appearance-none focus:outline-none focus:border-rose-900 transition-colors"
                >
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Concept postcards */}
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-3 block">Concepts</label>
            {/* Mobile: horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {CONCEPTS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleConceptSwitch(i)}
                  className={cn(
                    "shrink-0 w-44 lg:w-full text-left border transition-all",
                    activeConcept === i
                      ? "border-rose-900/40 shadow-sm"
                      : "border-stone-200 hover:border-stone-400"
                  )}
                >
                  <div className={cn("h-1.5", c.barColor)} />
                  <div className="p-3">
                    <p className="text-xs font-medium text-stone-800">{c.headline}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{c.tagline}</p>
                    {activeConcept === i && (
                      <p className="text-[9px] tracking-widest uppercase text-rose-900 mt-2">Selected</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap mt-auto pt-4">
            <Button
              onClick={handleGenerate}
              disabled={genState === "loading"}
              className={cn(
                "text-white text-xs tracking-wider gap-2 px-5",
                genState === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : genState === "success"
                    ? "bg-emerald-700 hover:bg-emerald-800"
                    : "bg-rose-900 hover:bg-rose-800"
              )}
            >
              {genState === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {genState === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
              {genState === "error" && <AlertCircle className="w-3.5 h-3.5" />}
              {genState === "loading" ? "Generating..." : genState === "success" ? "Generated" : genState === "error" ? "Retry" : "Generate"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={saveState === "loading"}
              className="border-stone-300 text-stone-600 hover:bg-stone-100 text-xs tracking-wider gap-1.5"
            >
              {saveState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saveState === "success" ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={exportState === "loading"}
              className="border-stone-300 text-stone-600 hover:bg-stone-100 text-xs tracking-wider gap-1.5"
            >
              {exportState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              {exportState === "success" ? "Exported" : "Export"}
            </Button>
          </div>
        </aside>
      </div>

      {/* Activity log slide-out */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-white border-l border-stone-200 z-50 transform transition-transform duration-300 flex flex-col",
          showLog ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400">Activity Log</span>
          <button onClick={() => setShowLog(false)} className="text-stone-400 hover:text-stone-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {log.length === 0 && <p className="text-xs text-stone-300 italic">No activity yet.</p>}
          {log.map((entry, i) => (
            <div key={i} className="flex gap-3 items-start">
              <ChevronRight className="w-3 h-3 text-rose-900/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-stone-600">{entry.text}</p>
                <p className="text-[10px] text-stone-300 mt-0.5">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showLog && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowLog(false)} />}
    </div>
  );
}
