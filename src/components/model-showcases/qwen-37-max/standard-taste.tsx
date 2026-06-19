"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Loader2, Check, AlertCircle, ChevronDown,
  Archive, Send, PenLine, Eye, Clock, Lightbulb
} from "lucide-react";

const AUDIENCES = ["Design-conscious professionals", "Minimalist collectors", "Architecture enthusiasts", "Independent retailers"];
const CHANNELS = ["Design publications", "Instagram carousel", "Boutique partnerships", "Podcast feature"];
const TONES = ["Restrained", "Considered", "Quiet", "Assured"];
const STYLES = ["Minimalist product", "Architectural context", "Material detail", "Lifestyle moment"];

const CONCEPTS = [
  { id: "A", name: "Hour Mark", tagline: "Time, measured in intention.", reach: 540, ctr: 3.4, conv: 3.9,
    principles: ["Restraint over decoration", "Negative space as content", "Material honesty"] },
  { id: "B", name: "Face Value", tagline: "The dial tells you everything the brand won't.", reach: 480, ctr: 3.8, conv: 4.2,
    principles: ["Typography as architecture", "Contrast through weight", "Precision in alignment"] },
  { id: "C", name: "Wrist Architecture", tagline: "A building on your wrist, scaled to the second.", reach: 590, ctr: 3.2, conv: 3.6,
    principles: ["Structure over ornament", "Proportion as beauty", "Function reveals form"] },
] as const;

const DEFAULT_BRIEF = "Curate a tasteful campaign for Muse launching a minimalist watch collection aimed at design-conscious professionals who appreciate restrained luxury.";

const Select = ({ value, onChange, options, label, addActivity }: { value: string; onChange: (v: string) => void; options: string[]; label: string; addActivity: (msg: string) => void }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => { onChange(e.target.value); addActivity(`${label}: ${e.target.value}`); }}
        className="w-full appearance-none border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-sm text-neutral-800 focus:border-teal-800 focus:outline-none focus:ring-0 transition-colors duration-500"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 top-2.5 h-4 w-4 text-neutral-400" />
    </div>
  </div>
);

export default function StandardTaste() {
  const [concept, setConcept] = useState("A");
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activity, setActivity] = useState<string[]>([]);

  const selected = CONCEPTS.find((c) => c.id === concept)!;

  const addActivity = useCallback((msg: string) => {
    setActivity((prev) => [msg, ...prev].slice(0, 5));
  }, []);

  const handleGenerate = useCallback(() => {
    setGenState("loading");
    addActivity("Curating concepts...");
    setTimeout(() => {
      if (brief.length >= 16) {
        setGenState("success");
        addActivity("Three curated concepts ready.");
      } else {
        setGenState("error");
        addActivity("Error: brief must be at least 16 characters.");
      }
    }, 800);
  }, [brief, addActivity]);

  const handleSave = useCallback(() => addActivity(`Archived concept ${concept}: ${selected.name}.`), [concept, selected, addActivity]);
  const handleExport = useCallback(() => addActivity(`Delivered ${selected.name} assets.`), [selected, addActivity]);

  const modifier = (audience.length + channel.length + tone.length + style.length) / 40;
  const metrics = {
    reach: Math.round(selected.reach * (0.9 + modifier * 0.2)),
    ctr: +(selected.ctr * (0.95 + modifier * 0.1)).toFixed(1),
    conv: +(selected.conv * (0.95 + modifier * 0.1)).toFixed(1),
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 font-sans text-neutral-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-200/70 bg-white px-5 py-4 md:px-8">
        <div className="flex items-center gap-4">
          <PenLine className="h-5 w-5 text-teal-800" />
          <div>
            <span className="text-sm font-semibold tracking-wide">Qwen 3.7 Max</span>
            <span className="ml-3 rounded-full border border-teal-800/20 bg-teal-800/5 px-3 py-0.5 text-[11px] font-medium text-teal-800">frontend-app-builder + taste-skill</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" onClick={handleSave} className="hidden sm:flex border-neutral-300 text-neutral-700 hover:bg-neutral-50">
            <Archive className="mr-1.5 h-3.5 w-3.5" />Archive
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="hidden sm:flex border-neutral-300 text-neutral-700 hover:bg-neutral-50">
            <Send className="mr-1.5 h-3.5 w-3.5" />Deliver
          </Button>
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"} className="bg-teal-800 hover:bg-teal-900 text-white">
            {genState === "loading" ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : genState === "success" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : genState === "error" ? <AlertCircle className="mr-1.5 h-3.5 w-3.5" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
            Generate
          </Button>
        </div>
      </header>

      {/* Three-column layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left — Controls */}
        <aside className="w-full lg:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-200/70 bg-white p-6 md:p-8 overflow-y-auto">
          <h2 className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-3">Campaign Brief</h2>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-neutral-200/70 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800/30 transition-all duration-500"
          />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">{brief.length} characters</span>
            {brief.length < 16 && <span className="text-[11px] text-amber-600">Min 16 chars to generate</span>}
          </div>

          <div className="mt-6 space-y-5">
            <Select label="Audience" value={audience} onChange={setAudience} options={AUDIENCES} addActivity={addActivity} />
            <Select label="Channel" value={channel} onChange={setChannel} options={CHANNELS} addActivity={addActivity} />
            <Select label="Tone" value={tone} onChange={setTone} options={TONES} addActivity={addActivity} />
            <Select label="Style" value={style} onChange={setStyle} options={STYLES} addActivity={addActivity} />
          </div>

          {/* Activity log */}
          <div className="mt-8 border-t border-neutral-200/70 pt-5">
            <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-3 flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Activity
            </p>
            <ul className="space-y-2">
              {activity.map((a, i) => <li key={i} className="text-xs text-neutral-500 leading-relaxed">{a}</li>)}
              {activity.length === 0 && <li className="text-xs text-neutral-400 italic">No activity recorded</li>}
            </ul>
          </div>
        </aside>

        {/* Center — Preview + Concepts */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Concept selector */}
          <div className="mb-8 flex items-center gap-6">
            {CONCEPTS.map((c) => (
              <button
                key={c.id}
                onClick={() => { setConcept(c.id); addActivity(`Selected ${c.id}: ${c.name}`); }}
                className={cn(
                  "flex items-center gap-2.5 transition-all duration-500",
                  concept === c.id ? "opacity-100" : "opacity-50 hover:opacity-75"
                )}
              >
                <span className={cn(
                  "h-2 w-2 rounded-full transition-all duration-500",
                  concept === c.id ? "bg-teal-800 scale-125" : "bg-neutral-400"
                )} />
                <span className={cn(
                  "text-sm transition-all duration-500",
                  concept === c.id ? "font-semibold tracking-wide" : "font-normal"
                )}>
                  {c.id}. {c.name}
                </span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mb-8 rounded-2xl border border-neutral-200/70 bg-white p-1 shadow-sm">
            <div className="rounded-xl bg-neutral-50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Asymmetric image placeholder 2:3 */}
                <div className="w-full md:w-2/5 aspect-[2/3] rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-neutral-400" />
                </div>
                {/* Text content */}
                <div className="flex-1 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-500">Concept {concept} — {selected.name}</p>
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug">{selected.tagline}</h2>
                  <div className="h-px w-16 bg-teal-800" />
                  <p className="text-sm text-neutral-500 leading-relaxed">{style} approach via {channel} — {tone.toLowerCase()} voice for {audience.toLowerCase()}</p>
                </div>
              </div>
              {/* Asymmetric image placeholder 3:2 */}
              <div className="mt-8 w-full aspect-[3/2] rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                <span className="text-xs text-neutral-400 tracking-wide uppercase">Campaign visual — {style}</span>
              </div>
            </div>
          </div>

          {/* Metrics — thin dividers */}
          <div className="mb-8 flex items-center divide-x divide-neutral-200">
            {[{ label: "Reach (K)", val: metrics.reach }, { label: "CTR (%)", val: metrics.ctr }, { label: "Conversion (%)", val: metrics.conv }].map((m) => (
              <div key={m.label} className="flex-1 px-6 text-center">
                <p className="text-2xl font-light tracking-wide text-neutral-900">{m.val}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-neutral-500">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Taste notes */}
          <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-4 w-4 text-teal-800" />
              <h3 className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium">Taste Notes — {selected.name}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {selected.principles.map((p, i) => (
                <div key={i} className="border-l-2 border-teal-800/20 pl-4">
                  <p className="text-sm text-neutral-700 leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mood board — palette & typography */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
              <h3 className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-4">Colour Palette</h3>
              <div className="space-y-3">
                {[
                  { name: "Bone", hex: "#f5f0eb", text: "text-neutral-800" },
                  { name: "Graphite", hex: "#2d2d2d", text: "text-white" },
                  { name: "Teal Depth", hex: "#115e59", text: "text-white" },
                  { name: "Warm Stone", hex: "#a8a29e", text: "text-neutral-900" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md shadow-sm border border-neutral-200/50" style={{ backgroundColor: c.hex }} />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-700">{c.name}</p>
                      <p className="text-[11px] font-mono text-neutral-400">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
              <h3 className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-4">Typography Specimen</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-light tracking-wide text-neutral-900">Aa Bb Cc</p>
                  <p className="text-[11px] text-neutral-400 mt-1">Display — Light 300 / tracking-wide</p>
                </div>
                <div className="h-px bg-neutral-200/70" />
                <div>
                  <p className="text-base text-neutral-700 leading-relaxed">The quick brown fox jumps over the lazy dog. Restrained luxury demands intention in every stroke.</p>
                  <p className="text-[11px] text-neutral-400 mt-1">Body — Regular 400 / relaxed leading</p>
                </div>
                <div className="h-px bg-neutral-200/70" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-500">Caption — 11px uppercase</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile action bar */}
      <div className="border-t border-neutral-200/70 bg-white px-5 py-3 lg:hidden">
        {activity.length > 0 && (
          <div className="mb-2 max-h-16 overflow-y-auto">
            {activity.slice(0, 2).map((a, i) => <p key={i} className="text-[11px] text-neutral-500">{a}</p>)}
          </div>
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} className="flex-1 border-neutral-300 text-neutral-700 hover:bg-neutral-50">
            <Archive className="mr-1 h-3 w-3" />Archive
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="flex-1 border-neutral-300 text-neutral-700 hover:bg-neutral-50">
            <Send className="mr-1 h-3 w-3" />Deliver
          </Button>
        </div>
      </div>
    </div>
  );
}
