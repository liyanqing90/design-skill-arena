"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Play, Save, Download, Sparkles, Monitor, ChevronRight,
  CheckCircle2, XCircle, Loader2, Radio, Layout, Users,
  Palette, Megaphone, Type
} from "lucide-react";

const BRIEF = "Launch Muse as the AI campaign studio for creative directors planning a premium wearable audio product launch across digital channels.";
const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters", "Agency planners"];
const CHANNELS = ["Paid social", "Launch email", "Retail display", "Podcast sponsor"];
const TONES = ["Confident", "Useful", "Direct", "Warm"];
const STYLES = ["Clean product", "Soft studio", "Sharp contrast", "Warm editorial"];

interface Concept {
  id: string;
  title: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
}

const CONCEPTS: Concept[] = [
  { id: "A", title: "Daily Signal", tagline: "The first touch, perfectly timed.", reach: 820, ctr: 4.2, conv: 2.8 },
  { id: "B", title: "Desk Ritual", tagline: "Your first ten minutes, reimagined.", reach: 760, ctr: 4.6, conv: 3.1 },
  { id: "C", title: "Launch Proof", tagline: "Proof that moves at your speed.", reach: 910, ctr: 3.9, conv: 2.6 },
];

const BUILD_STEPS = ["Parsing brief...", "Loading assets...", "Composing layout..."];

type GenerateState = "idle" | "loading" | "success" | "error";

export default function StandardBuilder() {
  const [brief, setBrief] = useState(BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [activeConcept, setActiveConcept] = useState(0);
  const [genState, setGenState] = useState<GenerateState>("idle");
  const [buildStep, setBuildStep] = useState(0);
  const [saveState, setSaveState] = useState<"idle" | "success">("idle");
  const [exportState, setExportState] = useState<"idle" | "success">("idle");
  const [mobileTab, setMobileTab] = useState<"config" | "preview" | "metrics">("preview");
  const buildLogRef = useRef<HTMLDivElement>(null);

  const current = CONCEPTS[activeConcept];

  const getMetrics = useCallback(() => {
    const aIdx = AUDIENCES.indexOf(audience);
    const cIdx = CHANNELS.indexOf(channel);
    const mod = (aIdx + cIdx) * 0.04;
    return {
      reach: Math.round(current.reach * (1 + mod)),
      ctr: +(current.ctr * (1 + mod * 0.5)).toFixed(1),
      conv: +(current.conv * (1 + mod * 0.3)).toFixed(1),
    };
  }, [audience, channel, current]);

  const [activityLog, setActivityLog] = useState<string[]>([
    "Workspace initialized",
    "Default brief loaded",
  ]);

  const addLog = useCallback((entry: string) => {
    setActivityLog(prev => [entry, ...prev].slice(0, 5));
  }, []);

  const handleGenerate = useCallback(() => {
    if (genState === "loading") return;
    setGenState("loading");
    setBuildStep(0);
    addLog("Generate started");
  }, [genState, addLog]);

  useEffect(() => {
    if (genState !== "loading") return;
    if (buildStep < BUILD_STEPS.length) {
      const t = setTimeout(() => setBuildStep(s => s + 1), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (brief.trim().length >= 16) {
        setGenState("success");
        addLog("Concepts generated successfully");
      } else {
        setGenState("error");
        addLog("Error: brief too short (min 16 chars)");
      }
    }, 50);
    return () => clearTimeout(t);
  }, [genState, buildStep, brief, addLog]);

  const handleSave = useCallback(() => {
    setSaveState("success");
    addLog("Campaign saved to workspace");
    setTimeout(() => setSaveState("idle"), 2000);
  }, [addLog]);

  const handleExport = useCallback(() => {
    setExportState("success");
    addLog("Exported as JSON bundle");
    setTimeout(() => setExportState("idle"), 2000);
  }, [addLog]);

  const metrics = getMetrics();

  const renderSelect = ({ value, onChange, options, icon: Icon, label }: {
    value: string; onChange: (v: string) => void; options: string[];
    icon: React.ElementType; label: string;
  }) => (
    <div className="space-y-1">
      <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-gray-500">
        <Icon className="size-3.5" />{label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const renderSidebar = () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-gray-500">
          <Type className="size-3.5" />Campaign Brief
        </label>
        <textarea
          value={brief}
          onChange={e => setBrief(e.target.value)}
          rows={5}
          className="w-full rounded-md border border-gray-200 bg-white p-2.5 text-sm text-gray-800 outline-none resize-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
        />
        <p className="text-[10px] font-mono text-gray-400">{brief.trim().length} chars {brief.trim().length < 16 && "(min 16)"}</p>
      </div>
      {renderSelect({ value: audience, onChange: setAudience, options: AUDIENCES, icon: Users, label: "Audience" })}
      {renderSelect({ value: channel, onChange: setChannel, options: CHANNELS, icon: Megaphone, label: "Channel" })}
      {renderSelect({ value: tone, onChange: setTone, options: TONES, icon: Radio, label: "Tone" })}
      {renderSelect({ value: style, onChange: setStyle, options: STYLES, icon: Palette, label: "Style" })}
    </div>
  );

  const renderPreview = () => (
    <div className="flex flex-col gap-4">
      {/* Browser mockup frame */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-yellow-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-[10px] font-mono text-gray-400">muse://preview/{current.title.toLowerCase().replace(/\s/g, "-")}</span>
        </div>
        <div className="p-6 space-y-4 min-h-[280px]">
          <div className="flex items-center gap-2">
            <Layout className="size-4 text-emerald-600" />
            <span className="text-[11px] font-mono uppercase text-gray-400">Concept {current.id}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{current.title}</h2>
          <p className="text-sm text-gray-500 italic">&ldquo;{current.tagline}&rdquo;</p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={cn(
                "aspect-[4/3] rounded-md border border-dashed border-gray-200 flex items-center justify-center",
                i === 1 && "bg-emerald-50", i === 2 && "bg-gray-50", i === 3 && "bg-emerald-50/50"
              )}>
                <span className="text-[10px] font-mono text-gray-400">asset-{i}.png</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400">
            <span className="rounded bg-gray-100 px-1.5 py-0.5">{tone}</span>
            <span className="rounded bg-gray-100 px-1.5 py-0.5">{style}</span>
            <span className="rounded bg-gray-100 px-1.5 py-0.5">{channel}</span>
          </div>
        </div>
      </div>

      {/* Concept tabs */}
      <div className="flex border-b border-gray-200">
        {CONCEPTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { setActiveConcept(i); addLog(`Switched to Concept ${c.id}: ${c.title}`); }}
            className={cn(
              "flex-1 px-3 py-2 text-sm font-medium transition-colors relative",
              activeConcept === i ? "text-emerald-700" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {c.id}: {c.title}
            {activeConcept === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Build log */}
      {genState === "loading" && (
        <div ref={buildLogRef} className="rounded-md bg-gray-900 p-3 font-mono text-xs text-emerald-400 space-y-1">
          {BUILD_STEPS.slice(0, buildStep).map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <ChevronRight className="size-3 text-emerald-600" />{s}
            </div>
          ))}
          {buildStep < BUILD_STEPS.length && (
            <div className="flex items-center gap-2 text-emerald-300 animate-pulse">
              <Loader2 className="size-3 animate-spin" />{BUILD_STEPS[buildStep]}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderMetricsPanel = () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-[11px] font-mono uppercase tracking-wider text-gray-500">Performance Estimates</h3>
      {[
        { label: "Reach (K)", value: metrics.reach, unit: "K", color: "bg-emerald-500" },
        { label: "CTR", value: metrics.ctr, unit: "%", color: "bg-emerald-400" },
        { label: "Conversion", value: metrics.conv, unit: "%", color: "bg-emerald-300" },
      ].map(m => (
        <div key={m.label} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{m.label}</span>
            <span className="font-mono font-semibold text-gray-900">{m.value}{m.unit}</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", m.color)}
              style={{ width: `${Math.min(100, (m.value / (m.label.includes("Reach") ? 1200 : 6)) * 100)}%` }}
            />
          </div>
        </div>
      ))}

      <div className="mt-2 border-t border-gray-100 pt-3">
        <h3 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">Activity Log</h3>
        <div className="space-y-1">
          {activityLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-gray-500 font-mono">
              <span className="text-gray-300 mt-0.5">&rsaquo;</span>
              <span>{entry}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-2 pt-3 border-t border-gray-100">
        <Button
          onClick={handleGenerate}
          disabled={genState === "loading"}
          className={cn(
            "w-full font-mono text-sm",
            genState === "success" && "bg-emerald-600 hover:bg-emerald-700",
            genState === "error" && "bg-red-600 hover:bg-red-700"
          )}
        >
          {genState === "loading" && <><Loader2 className="size-4 mr-1.5 animate-spin" /> Running...</>}
          {genState === "success" && <><CheckCircle2 className="size-4 mr-1.5" /> Done</>}
          {genState === "error" && <><XCircle className="size-4 mr-1.5" /> Error</>}
          {genState === "idle" && <><Play className="size-4 mr-1.5" /> &gt; Run</>}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="flex-1 font-mono text-xs"
          >
            {saveState === "success" ? <CheckCircle2 className="size-3.5 mr-1 text-emerald-600" /> : <Save className="size-3.5 mr-1" />}
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex-1 font-mono text-xs"
          >
            {exportState === "success" ? <CheckCircle2 className="size-3.5 mr-1 text-emerald-600" /> : <Download className="size-3.5 mr-1" />}
            Export
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-5 text-emerald-600" />
              <span className="font-semibold text-gray-900">Muse</span>
            </div>
            <span className="hidden sm:inline rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-white">
              Qwen 3.7 Max
            </span>
            <span className="hidden sm:inline rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-mono text-emerald-700">
              frontend-app-builder
            </span>
          </div>
          <span className="text-[11px] font-mono text-gray-400">Developer Workspace</span>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="lg:hidden flex border-b border-gray-200 bg-white">
        {(["config", "preview", "metrics"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={cn(
              "flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
              mobileTab === tab
                ? "text-emerald-700 border-b-2 border-emerald-600"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <main className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-4">
          {/* Left sidebar */}
          <aside className={cn(
            "rounded-lg border border-gray-200 bg-white p-4",
            mobileTab !== "config" && "hidden lg:block"
          )}>
            {renderSidebar()}
          </aside>

          {/* Center preview */}
          <section className={cn(
            mobileTab !== "preview" && "hidden lg:block"
          )}>
            {renderPreview()}
          </section>

          {/* Right panel */}
          <aside className={cn(
            "rounded-lg border border-gray-200 bg-white p-4",
            mobileTab !== "metrics" && "hidden lg:block"
          )}>
            {renderMetricsPanel()}
          </aside>
        </div>
      </main>
    </div>
  );
}
