"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Monitor, Tablet, Smartphone, Play, Save, Download, Target, Zap,
  TrendingUp, Shield, Eye, Layers, Radio, Crosshair, BarChart3,
  Activity, AlertTriangle, Check, X, ChevronDown, ChevronUp,
  Cpu, MapPin, Gauge
} from "lucide-react";

const BRIEF_DEFAULT = "Execute a maximum-quality campaign for Muse launching an AI-powered design review tool aimed at enterprise product teams who demand pixel-perfect consistency across platforms.";
const AUDIENCES = ["Enterprise product teams", "Design system managers", "QA engineers", "VP of Product"];
const CHANNELS = ["Enterprise tech conferences", "Design system summits", "Product management networks", "Executive briefings"];
const TONES = ["Authoritative", "Comprehensive", "Precise", "Visionary"];
const STYLES = ["System dashboard", "Review interface", "Consistency matrix", "Team collaboration"];

const CONCEPTS = [
  { id: "A", label: "Pixel Audit", tagline: "Every pixel passes inspection, or none of them ship.", reach: 940, ctr: 4.6, conv: 4.2, risk: "Low" },
  { id: "B", label: "Consistency Index", tagline: "Measure the distance between design and deploy.", reach: 880, ctr: 4.2, conv: 4.5, risk: "Medium" },
  { id: "C", label: "Review Cycle", tagline: "The review that makes every sprint the last review sprint.", reach: 1020, ctr: 4.9, conv: 3.9, risk: "Low" },
];

const QUALITY_MATRIX = ["Visual", "UX", "Accessibility", "Performance", "Consistency", "Premium"] as const;
const MISSION_PHASES = ["Research", "Design", "Build", "Test", "Launch"] as const;

function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(target * ease);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);
  return value;
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t transition-all duration-500" style={{ height: `${(v / max) * 100}%`, backgroundColor: color, opacity: 0.3 + (i / data.length) * 0.7 }} />
      ))}
    </div>
  );
}

function MetricBlock({ label, value, suffix, data, color }: { label: string; value: number; suffix: string; data: number[]; color: string }) {
  const animated = useCountUp(value);
  return (
    <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-slate-500">{label}</span>
        <TrendingUp className="w-3 h-3 text-emerald-500" />
      </div>
      <p className="text-lg font-semibold text-white">{animated.toFixed(1)}<span className="text-xs text-slate-500 ml-0.5">{suffix}</span></p>
      <MiniChart data={data} color={color} />
    </div>
  );
}

function Panel({ title, dotColor, children, className, collapsible = false }: { title: string; dotColor: string; children: React.ReactNode; className?: string; collapsible?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn("bg-slate-900/80 rounded-lg border border-slate-800 overflow-hidden", className)} style={{ borderTop: `2px solid ${dotColor}` }}>
      <div className={cn("flex items-center justify-between px-4 py-2.5", collapsible && "cursor-pointer")} onClick={collapsible ? () => setOpen(!open) : undefined}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
          <span className="text-[11px] font-medium text-slate-300">{title}</span>
        </div>
        {collapsible && (open ? <ChevronUp className="w-3.5 h-3.5 text-slate-600" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-600" />)}
      </div>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function MaxQualityChain() {
  const [brief, setBrief] = useState(BRIEF_DEFAULT);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [concept, setConcept] = useState(0);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [genStage, setGenStage] = useState(0);
  const [log, setLog] = useState<{ time: string; msg: string }[]>([
    { time: "09:00:00", msg: "Mission control initialized" },
    { time: "09:00:01", msg: "All systems nominal" },
  ]);
  const [activePhase, setActivePhase] = useState(2);

  const addLog = useCallback((msg: string) => {
    setLog(prev => [...prev.slice(-4), { time: new Date().toISOString().slice(11, 19), msg }]);
  }, []);

  const current = CONCEPTS[concept];
  const reachMod = current.reach + (tone === "Authoritative" ? 60 : tone === "Visionary" ? 30 : 0);
  const ctrMod = current.ctr + (style === "System dashboard" ? 0.5 : 0);
  const convMod = current.conv + (audience === "Enterprise product teams" ? 0.4 : 0);

  const chartData = {
    reach: [120, 180, 220, 280, 310, reachMod / 3, reachMod / 2, reachMod],
    ctr: [1.2, 1.8, 2.4, 2.8, 3.2, 3.6, ctrMod * 0.8, ctrMod],
    conv: [0.8, 1.2, 1.6, 2.0, 2.5, 3.0, convMod * 0.85, convMod],
    engagement: [45, 52, 61, 68, 74, 82, 88, 92],
  };

  const handleGenerate = () => {
    if (genState === "loading") return;
    setGenState("loading");
    setGenStage(0);
    addLog("Execute Mission — initiating");
    const stages = ["Analyzing brief", "Generating concepts", "Running quality checks", "Finalizing"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setGenStage(i);
      if (i < stages.length) addLog(stages[i]);
      if (i >= stages.length) {
        clearInterval(interval);
        if (brief.length >= 16) {
          setGenState("success");
          addLog("Mission executed successfully");
        } else {
          setGenState("error");
          addLog("Mission failed — insufficient brief");
        }
      }
    }, 200);
  };

  const switchConcept = (idx: number) => {
    setConcept(idx);
    addLog(`Mission option ${CONCEPTS[idx].id} selected: ${CONCEPTS[idx].label}`);
  };

  const deviceW = { desktop: "100%", tablet: "768px", mobile: "375px" };

  const qualityScores = [92, 88, 96, 85, 91, 89];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Crosshair className="w-5 h-5 text-cyan-500" />
          <span className="font-semibold text-sm">Muse Mission Control</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-medium">Qwen 3.7 Max</span>
          <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 text-[10px] hidden md:inline">frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {MISSION_PHASES.map((p, i) => (
              <button key={p} onClick={() => setActivePhase(i)} className={cn("px-2 py-1 rounded text-[9px] transition-colors", i === activePhase ? "bg-cyan-500/20 text-cyan-400" : i < activePhase ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-600")}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
        {/* Row 1: Strategy | Preview | Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Strategy — Controls */}
          <Panel title="Strategy" dotColor="#06b6d4" className="lg:col-span-4" collapsible>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Campaign Brief</label>
                <textarea value={brief} onChange={e => setBrief(e.target.value)} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-slate-300 resize-none focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              {([["Audience", AUDIENCES, audience, setAudience], ["Channel", CHANNELS, channel, setChannel], ["Tone", TONES, tone, setTone], ["Style", STYLES, style, setStyle]] as const).map(([label, opts, val, setter]) => (
                <div key={label as string}>
                  <label className="text-[10px] text-slate-500 block mb-1">{label as string}</label>
                  <select value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 appearance-none">
                    {(opts as readonly string[]).map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
                  </select>
                </div>
              ))}
              {/* Quality Matrix */}
              <div className="border-t border-slate-800 pt-3">
                <p className="text-[10px] text-slate-500 mb-2">Quality Matrix</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {QUALITY_MATRIX.map((q, i) => (
                    <div key={q} className={cn("text-center py-1.5 rounded text-[9px] font-medium", qualityScores[i] >= 90 ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400")}>
                      {q}
                      <span className="block text-[8px] mt-0.5 opacity-70">{qualityScores[i]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          {/* Preview — Main Display */}
          <Panel title="Preview" dotColor="#8b5cf6" className="lg:col-span-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                {(["desktop", "tablet", "mobile"] as const).map(d => (
                  <button key={d} onClick={() => setDevice(d)} className={cn("p-1 rounded", device === d ? "bg-violet-500/30 text-violet-400" : "text-slate-600")}>
                    {d === "desktop" ? <Monitor className="w-3 h-3" /> : d === "tablet" ? <Tablet className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                  </button>
                ))}
              </div>
              <span className="text-[9px] text-slate-600">Grid alignment: ON</span>
            </div>
            <div className="mx-auto transition-all duration-300 rounded-lg overflow-hidden" style={{ maxWidth: deviceW[device] }}>
              <div className="aspect-video relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700 rounded-lg overflow-hidden">
                {/* Geometric patterns */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 75% 50%, #8b5cf6 0%, transparent 50%)" }} />
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                {/* Annotation markers */}
                <div className="absolute top-3 left-3 px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[8px]">A1</div>
                <div className="absolute top-3 right-3 px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 text-[8px]">A2</div>
                <div className="absolute bottom-3 left-3 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[8px]">B1</div>
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <span className="text-[9px] text-slate-500 tracking-widest uppercase mb-2">Mission Option {current.id}</span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{current.label}</h2>
                  <p className="text-xs text-slate-400 max-w-xs">{current.tagline}</p>
                </div>
                {/* Quality overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur px-3 py-1.5 flex items-center justify-between text-[9px]">
                  <span className="text-slate-500">Contrast: AAA</span>
                  <span className="text-slate-500">Type scale: 1.25</span>
                  <span className="text-emerald-400">Grid: aligned</span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Intelligence — Concepts */}
          <Panel title="Intelligence" dotColor="#a855f7" className="lg:col-span-3" collapsible>
            <div className="space-y-2">
              {CONCEPTS.map((c, i) => (
                <button key={c.id} onClick={() => switchConcept(i)} className={cn("w-full text-left p-2.5 rounded-lg border transition-all", i === concept ? "border-violet-500/50 bg-violet-500/10" : "border-slate-800 hover:border-slate-700")}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-medium text-slate-300">Option {c.id}: {c.label}</span>
                    <span className={cn("text-[8px] px-1.5 py-0.5 rounded", c.risk === "Low" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400")}>{c.risk} Risk</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{c.tagline}</p>
                </button>
              ))}
              <div className="border-t border-slate-800 pt-2 mt-2">
                <p className="text-[10px] text-slate-500 mb-1.5">Insights</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px]"><Zap className="w-3 h-3 text-amber-500" /><span className="text-slate-400">High intent signals detected</span></div>
                  <div className="flex items-center gap-2 text-[10px]"><Shield className="w-3 h-3 text-emerald-500" /><span className="text-slate-400">Brand safety: Green</span></div>
                  <div className="flex items-center gap-2 text-[10px]"><Radio className="w-3 h-3 text-cyan-500" /><span className="text-slate-400">Market fit: {tone}</span></div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Row 2: Analytics | Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Analytics — Metrics */}
          <Panel title="Analytics" dotColor="#10b981" className="lg:col-span-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <MetricBlock label="Reach" value={reachMod} suffix="K" data={chartData.reach} color="#06b6d4" />
              <MetricBlock label="CTR" value={ctrMod} suffix="%" data={chartData.ctr} color="#8b5cf6" />
              <MetricBlock label="Conversion" value={convMod} suffix="%" data={chartData.conv} color="#10b981" />
              <MetricBlock label="Engagement" value={92} suffix="%" data={chartData.engagement} color="#f59e0b" />
            </div>
          </Panel>

          {/* Operations — Log + Actions */}
          <Panel title="Operations" dotColor="#f59e0b" className="lg:col-span-6">
            <div className="space-y-3">
              {/* Activity log */}
              <div>
                <p className="text-[10px] text-slate-500 mb-1.5">Mission Timeline</p>
                <div className="space-y-1">
                  {log.slice(-5).map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className="font-mono text-slate-600 w-14">{entry.time}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 shrink-0" />
                      <span className="text-slate-400">{entry.msg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Checks */}
              <div className="border-t border-slate-800 pt-2">
                <p className="text-[10px] text-slate-500 mb-1.5">Quality Checks</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "Type Scale", ok: true }, { label: "Spacing", ok: true },
                    { label: "Color Tokens", ok: true }, { label: "Responsive", ok: true },
                    { label: "A11y", ok: true }, { label: "Performance", ok: concept !== 1 },
                  ].map(c => (
                    <div key={c.label} className={cn("text-[9px] py-1 px-2 rounded flex items-center gap-1", c.ok ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400")}>
                      {c.ok ? <Check className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleGenerate} disabled={genState === "loading"} className={cn("flex-1 h-9 text-xs", genState === "success" ? "bg-emerald-600 hover:bg-emerald-700" : genState === "error" ? "bg-red-600 hover:bg-red-700" : "bg-cyan-600 hover:bg-cyan-700")}>
                  {genState === "loading" ? (
                    <>
                      <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                      Stage {genStage}/4
                    </>
                  ) : genState === "success" ? "Mission Complete" : genState === "error" ? "Mission Failed" : "Execute Mission"}
                </Button>
                <Button variant="outline" size="sm" className="h-9 text-xs border-slate-700 text-slate-400 hover:bg-slate-800" onClick={() => addLog("Campaign saved")}>
                  <Save className="w-3 h-3 mr-1" />Save
                </Button>
                <Button variant="outline" size="sm" className="h-9 text-xs border-slate-700 text-slate-400 hover:bg-slate-800" onClick={() => addLog("Report exported")}>
                  <Download className="w-3 h-3 mr-1" />Export
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
