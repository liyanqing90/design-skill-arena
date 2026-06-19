"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles, Layers, ChevronDown, ChevronRight, Save, Download,
  CheckCircle2, XCircle, Loader2, Grid3X3, Box, FileText,
  Ruler, Eye, ArrowRight, Activity, Cpu, Settings2, Target
} from "lucide-react";

const BRIEF = "Design a structured campaign for Muse launching a modular desk system aimed at architecture firms and design-forward remote workers.";
const AUDIENCES = ["Architecture firms", "Design-forward remote workers", "Studio managers", "Creative agencies"];
const CHANNELS = ["Industry press", "LinkedIn campaign", "Showroom events", "Design podcast"];
const TONES = ["Precise", "Authoritative", "Measured", "Visionary"];
const STYLES = ["Technical line", "Material study", "Scale model", "White space"];

interface Concept {
  id: string;
  title: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  rationale: string[];
}

const CONCEPTS: Concept[] = [
  {
    id: "A", title: "Grid System", tagline: "Every module finds its place.",
    reach: 720, ctr: 3.8, conv: 2.9,
    rationale: ["Modular grid aligns with architectural conventions", "Structured layout reinforces precision brand identity", "Scalable across print and digital with consistent spacing"],
  },
  {
    id: "B", title: "Material Proof", tagline: "The material speaks before the pitch.",
    reach: 680, ctr: 4.1, conv: 3.3,
    rationale: ["Material-first approach builds immediate credibility", "Tactile textures translate well to high-resolution formats", "Warm material palette contrasts with technical precision"],
  },
  {
    id: "C", title: "Scale Study", tagline: "From floor plan to desktop in three moves.",
    reach: 810, ctr: 3.5, conv: 2.7,
    rationale: ["Scale metaphor resonates with architecture audience", "Three-step narrative creates memorable progression", "Floor-plan aesthetic bridges product and profession"],
  },
];

interface TreeNode {
  label: string;
  icon: React.ElementType;
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    label: "Audience",
    icon: Target,
    children: AUDIENCES.map(a => ({ label: a, icon: ChevronRight })),
  },
  {
    label: "Channel",
    icon: Grid3X3,
    children: CHANNELS.map(c => ({ label: c, icon: ChevronRight })),
  },
  {
    label: "Tone",
    icon: Activity,
    children: TONES.map(t => ({ label: t, icon: ChevronRight })),
  },
  {
    label: "Style",
    icon: Layers,
    children: STYLES.map(s => ({ label: s, icon: ChevronRight })),
  },
  {
    label: "Output",
    icon: Cpu,
    children: CONCEPTS.map(c => ({ label: `${c.id}: ${c.title}`, icon: ChevronRight })),
  },
];

type GenerateState = "idle" | "loading" | "success" | "error";

export default function DesignLogic() {
  const [brief, setBrief] = useState(BRIEF);
  const [activeConcept, setActiveConcept] = useState(0);
  const [genState, setGenState] = useState<GenerateState>("idle");
  const [saveState, setSaveState] = useState<"idle" | "success">("idle");
  const [exportState, setExportState] = useState<"idle" | "success">("idle");
  const [mobilePanel, setMobilePanel] = useState<"tree" | "preview" | "specs">("preview");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["Audience", "Output"]));
  const [activityLog, setActivityLog] = useState<string[]>([
    "Blueprint workspace initialized",
    "Logic tree loaded",
  ]);

  // Toggle pairs for audience/channel/tone/style
  const [audienceIdx, setAudienceIdx] = useState(0);
  const [channelIdx, setChannelIdx] = useState(0);
  const [toneIdx, setToneIdx] = useState(0);
  const [styleIdx, setStyleIdx] = useState(0);

  const current = CONCEPTS[activeConcept];

  const addLog = useCallback((entry: string) => {
    setActivityLog(prev => [entry, ...prev].slice(0, 5));
  }, []);

  const toggleNode = useCallback((label: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }, []);

  const metrics = useMemo(() => {
    const mod = (audienceIdx + channelIdx + toneIdx + styleIdx) * 0.025;
    return {
      reach: Math.round(current.reach * (1 + mod)),
      ctr: +(current.ctr * (1 + mod * 0.4)).toFixed(1),
      conv: +(current.conv * (1 + mod * 0.3)).toFixed(1),
    };
  }, [audienceIdx, channelIdx, toneIdx, styleIdx, current]);

  const handleGenerate = useCallback(() => {
    if (genState === "loading") return;
    setGenState("loading");
    addLog("Generate started");
    setTimeout(() => {
      if (brief.trim().length >= 16) {
        setGenState("success");
        addLog("Blueprint generated successfully");
      } else {
        setGenState("error");
        addLog("Error: brief too short (min 16 chars)");
      }
    }, 800);
  }, [genState, brief, addLog]);

  const handleSave = useCallback(() => {
    setSaveState("success");
    addLog("Blueprint saved");
    setTimeout(() => setSaveState("idle"), 2000);
  }, [addLog]);

  const handleExport = useCallback(() => {
    setExportState("success");
    addLog("Exported specification");
    setTimeout(() => setExportState("idle"), 2000);
  }, [addLog]);

  // Toggle switch component for paired options
  const renderTogglePair = ({ label, options, idx, setIdx, icon: Icon }: {
    label: string; options: string[]; idx: number;
    setIdx: (v: number) => void; icon: React.ElementType;
  }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400/70">
          <Icon className="size-3" />{label}
        </span>
        <span className="text-[10px] font-mono text-slate-500">{idx + 1}/{options.length}</span>
      </div>
      <div className="flex rounded-md overflow-hidden border border-slate-700">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => setIdx(i)}
            className={cn(
              "flex-1 px-2 py-1.5 text-[11px] font-mono transition-colors truncate",
              i === idx
                ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
                : "bg-slate-800/50 text-slate-500 hover:text-slate-300"
            )}
            title={opt}
          >
            {opt.length > 14 ? opt.slice(0, 12) + "..." : opt}
          </button>
        ))}
      </div>
    </div>
  );

  // Logic tree renderer
  const renderTreeView = () => (
    <div className="space-y-1">
      {TREE.map(node => {
        const expanded = expandedNodes.has(node.label);
        return (
          <div key={node.label}>
            <button
              onClick={() => toggleNode(node.label)}
              className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm text-slate-200 hover:bg-slate-800/60 transition-colors"
            >
              {expanded ? <ChevronDown className="size-3.5 text-sky-400" /> : <ChevronRight className="size-3.5 text-slate-500" />}
              <node.icon className="size-3.5 text-sky-400/60" />
              <span className="font-mono text-xs">{node.label}</span>
            </button>
            {expanded && node.children && (
              <div className="ml-6 border-l border-slate-700/50 pl-3 space-y-0.5">
                {node.children.map((child, ci) => (
                  <div key={ci} className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors">
                    <span className="size-1 rounded-full bg-sky-500/30" />
                    {child.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Blueprint preview
  const renderBlueprintPreview = () => (
    <div className="relative rounded-lg border border-slate-700/50 bg-slate-800/30 p-6 min-h-[320px]">
      {/* Dashed grid overlay */}
      <div className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(56,189,248,0.04) 39px, rgba(56,189,248,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(56,189,248,0.04) 39px, rgba(56,189,248,0.04) 40px)"
        }}
      />
      <div className="relative space-y-4">
        <div className="flex items-center gap-2">
          <Box className="size-4 text-sky-400" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400/70">Concept {current.id} Blueprint</span>
        </div>

        {/* Wireframe layout */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 border border-dashed border-sky-500/20 rounded p-3 relative">
            <h2 className="text-xl font-bold text-slate-200 tracking-tight">{current.title}</h2>
            <p className="text-xs text-slate-500 italic mt-1">&ldquo;{current.tagline}&rdquo;</p>
            {/* Dimension annotation */}
            <div className="absolute -top-2 right-2 flex items-center gap-1">
              <Ruler className="size-3 text-sky-400/40" />
              <span className="text-[9px] font-mono text-sky-400/50">headline: 48px</span>
            </div>
          </div>
          <div className="border border-dashed border-sky-500/20 rounded p-2 flex items-center justify-center min-h-[80px] relative">
            <span className="text-[10px] font-mono text-slate-600">hero-asset</span>
            <div className="absolute -bottom-2 left-2 flex items-center gap-1">
              <span className="text-[9px] font-mono text-sky-400/50">4:3 ratio</span>
            </div>
          </div>
          <div className="border border-dashed border-sky-500/20 rounded p-2 space-y-1 min-h-[80px] relative">
            <span className="text-[10px] font-mono text-slate-600 block">spec-panel</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 h-3 rounded-sm bg-sky-500/10" />
              ))}
            </div>
            <div className="absolute -bottom-2 left-2">
              <span className="text-[9px] font-mono text-sky-400/50">gap: 8px</span>
            </div>
          </div>
          <div className="col-span-2 border border-dashed border-sky-500/20 rounded p-2 flex items-center justify-between relative">
            <span className="text-[10px] font-mono text-slate-600">cta-bar</span>
            <div className="flex gap-2">
              <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-mono text-sky-400/60">{TONES[toneIdx]}</span>
              <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-mono text-sky-400/60">{STYLES[styleIdx]}</span>
            </div>
            <div className="absolute -top-2 right-2">
              <span className="text-[9px] font-mono text-sky-400/50">height: 48px</span>
            </div>
          </div>
        </div>

        {/* Connection lines */}
        <div className="flex items-center justify-center gap-1 text-slate-600">
          <div className="h-px w-8 border-t border-dashed border-sky-500/20" />
          <ArrowRight className="size-3 text-sky-500/30" />
          <div className="h-px w-8 border-t border-dashed border-sky-500/20" />
          <span className="text-[9px] font-mono text-sky-400/40 mx-1">flow</span>
          <div className="h-px w-8 border-t border-dashed border-sky-500/20" />
          <ArrowRight className="size-3 text-sky-500/30" />
          <div className="h-px w-8 border-t border-dashed border-sky-500/20" />
        </div>
      </div>
    </div>
  );

  // Spec cards
  const renderSpecCards = () => (
    <div className="space-y-3">
      {CONCEPTS.map((c, i) => (
        <button
          key={c.id}
          onClick={() => { setActiveConcept(i); addLog(`Selected Concept ${c.id}: ${c.title}`); }}
          className={cn(
            "w-full text-left rounded-lg border p-3 transition-all",
            activeConcept === i
              ? "border-sky-500/30 bg-sky-500/5"
              : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600"
          )}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase text-sky-400/70">Spec {c.id}</span>
            {activeConcept === i && <span className="size-1.5 rounded-full bg-sky-400" />}
          </div>
          <h3 className="text-sm font-semibold text-slate-200">{c.title}</h3>
          <p className="text-[11px] text-slate-500 italic mt-0.5">&ldquo;{c.tagline}&rdquo;</p>

          {/* Metrics as technical readouts */}
          <div className="mt-2 space-y-1">
            {[
              { label: "RCH", value: Math.round(c.reach * (1 + (audienceIdx + channelIdx) * 0.025)), max: 1000 },
              { label: "CTR", value: +(c.ctr * (1 + toneIdx * 0.02)).toFixed(1), max: 7 },
              { label: "CVR", value: +(c.conv * (1 + styleIdx * 0.02)).toFixed(1), max: 5 },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-600 w-6">{m.label}</span>
                <div className="flex-1 h-1 rounded-full bg-slate-700/50 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", activeConcept === i ? "bg-sky-400" : "bg-slate-500")}
                    style={{ width: `${Math.min(100, (m.value / m.max) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-10 text-right">{m.value}</span>
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );

  // Design rationale panel
  const renderDesignRationale = () => (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
      <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400/70 mb-2">
        <FileText className="size-3" />Design Rationale — Concept {current.id}
      </span>
      <ul className="space-y-1.5">
        {current.rationale.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-slate-400 font-mono">
            <span className="text-sky-500/50 mt-0.5">{i + 1}.</span>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(56,189,248,0.03) 31px, rgba(56,189,248,0.03) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(56,189,248,0.03) 31px, rgba(56,189,248,0.03) 32px)"
      }}
    >
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-sky-400" />
              <span className="font-semibold text-slate-100">Muse</span>
            </div>
            <span className="hidden sm:inline rounded-full bg-sky-500 px-2.5 py-0.5 text-[11px] font-mono font-bold text-slate-900">
              Qwen 3.7 Max
            </span>
            <span className="hidden sm:inline rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-mono text-sky-300">
              frontend-design
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-600">Blueprint Architect</span>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="lg:hidden flex border-b border-slate-700/50">
        {(["tree", "preview", "specs"] as const).map(p => (
          <button
            key={p}
            onClick={() => setMobilePanel(p)}
            className={cn(
              "flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
              mobilePanel === p ? "text-sky-400 border-b-2 border-sky-500" : "text-slate-600"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <main className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-4">
          {/* Left: Logic tree + controls */}
          <aside className={cn("space-y-4", mobilePanel !== "tree" && "hidden lg:block")}>
            {/* Brief */}
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
              <label className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400/70 mb-1.5">
                <FileText className="size-3" />Brief
              </label>
              <textarea
                value={brief}
                onChange={e => setBrief(e.target.value)}
                rows={4}
                className="w-full rounded border border-slate-700 bg-slate-800/50 p-2 text-xs text-slate-300 outline-none resize-none font-mono focus:border-sky-500/40"
              />
              <p className="text-[9px] font-mono text-slate-600 mt-1">{brief.trim().length} chars</p>
            </div>

            {/* Toggle switches */}
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3 space-y-3">
              {renderTogglePair({ label: "Audience", options: AUDIENCES, idx: audienceIdx, setIdx: setAudienceIdx, icon: Target })}
              {renderTogglePair({ label: "Channel", options: CHANNELS, idx: channelIdx, setIdx: setChannelIdx, icon: Grid3X3 })}
              {renderTogglePair({ label: "Tone", options: TONES, idx: toneIdx, setIdx: setToneIdx, icon: Activity })}
              {renderTogglePair({ label: "Style", options: STYLES, idx: styleIdx, setIdx: setStyleIdx, icon: Settings2 })}
            </div>

            {/* Logic tree */}
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400/70 mb-2">
                <Layers className="size-3" />Logic Tree
              </span>
              {renderTreeView()}
            </div>
          </aside>

          {/* Center: Blueprint preview */}
          <section className={cn("space-y-4", mobilePanel !== "preview" && "hidden lg:block")}>
            {renderBlueprintPreview()}
            {renderDesignRationale()}
          </section>

          {/* Right: Specs + metrics + actions */}
          <aside className={cn("space-y-4", mobilePanel !== "specs" && "hidden lg:block")}>
            {renderSpecCards()}

            {/* Metrics technical readout */}
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400/70 mb-3">
                <Eye className="size-3" />Performance Readout
              </span>
              {[
                { label: "REACH", value: metrics.reach, unit: "K", max: 1000 },
                { label: "CTR", value: metrics.ctr, unit: "%", max: 6 },
                { label: "CVR", value: metrics.conv, unit: "%", max: 5 },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-slate-500 w-12">{m.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, (m.value / m.max) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-sky-300 w-14 text-right">{m.value}{m.unit}</span>
                </div>
              ))}
            </div>

            {/* Activity log */}
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400/70 block mb-2">Activity Log</span>
              <div className="space-y-1">
                {activityLog.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="text-sky-500/40">&rsaquo;</span>{entry}
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleGenerate}
                disabled={genState === "loading"}
                className={cn(
                  "w-full font-mono text-sm",
                  genState === "success" && "!bg-sky-500 !text-slate-900",
                  genState === "error" && "!bg-red-500 !text-white"
                )}
              >
                {genState === "loading" && <><Loader2 className="size-4 mr-1.5 animate-spin" /> Building...</>}
                {genState === "success" && <><CheckCircle2 className="size-4 mr-1.5" /> Complete</>}
                {genState === "error" && <><XCircle className="size-4 mr-1.5" /> Error</>}
                {genState === "idle" && <><Sparkles className="size-4 mr-1.5" /> Generate Blueprint</>}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSave} className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 font-mono text-xs">
                  {saveState === "success" ? <CheckCircle2 className="size-3.5 mr-1 text-sky-400" /> : <Save className="size-3.5 mr-1" />}Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport} className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 font-mono text-xs">
                  {exportState === "success" ? <CheckCircle2 className="size-3.5 mr-1 text-sky-400" /> : <Download className="size-3.5 mr-1" />}Export
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
