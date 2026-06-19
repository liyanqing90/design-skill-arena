"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Monitor, Tablet, Smartphone, Check, X, AlertTriangle, Play, Save, Download,
  Code2, Layout, Rocket, Shield, Accessibility, Eye, Layers, Terminal,
  ChevronRight, Clock, Package, GitBranch
} from "lucide-react";

const BRIEF_DEFAULT = "Build a production-ready campaign for Muse launching a B2B analytics platform aimed at enterprise data teams who need reliable, well-documented tools.";
const AUDIENCES = ["Data engineering teams", "Analytics managers", "CTO offices", "Developer advocates"];
const CHANNELS = ["Developer conferences", "Tech documentation", "Enterprise demos", "Open source communities"];
const TONES = ["Reliable", "Technical", "Transparent", "Professional"];
const STYLES = ["Dashboard interface", "Code sample", "Architecture diagram", "Team workspace"];

const CONCEPTS = [
  { id: "A", version: "v1.0", label: "Query First", tagline: "Ask the data. Get an answer you can ship.", reach: 860, ctr: 3.8, conv: 3.4 },
  { id: "B", version: "v1.1", label: "Pipeline", tagline: "From raw to reliable in three transformations.", reach: 920, ctr: 4.2, conv: 3.1 },
  { id: "C", version: "v1.2", label: "Schema", tagline: "The schema your team actually wants to read.", reach: 780, ctr: 3.5, conv: 3.7 },
];

const CI_CHECKS = [
  { label: "Components", ok: true }, { label: "Styles", ok: true },
  { label: "Assets", ok: true }, { label: "Preview", ok: true },
];
const A11Y_CHECKS = [
  { label: "Contrast ratio ≥ 4.5:1", ok: true },
  { label: "Keyboard navigation", ok: true },
  { label: "Focus indicators", ok: true },
  { label: "ARIA landmarks", ok: true },
];

function useCountUp(target: number, duration = 600) {
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

function MetricCard({ label, value, suffix, trend }: { label: string; value: number; suffix: string; trend: "up" | "down" | "stable" }) {
  const animated = useCountUp(value);
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <p className="text-[11px] text-slate-500 mb-1">{label}</p>
      <div className="flex items-end gap-1.5">
        <span className="text-2xl font-semibold text-slate-900">{animated.toFixed(1)}<span className="text-sm text-slate-400 ml-0.5">{suffix}</span></span>
        <span className={cn("text-[10px] mb-1", trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-slate-400")}>{trend === "up" ? "+2.1%" : trend === "down" ? "-0.3%" : "0.0%"}</span>
      </div>
    </div>
  );
}

export default function ProductPolishChain() {
  const [brief, setBrief] = useState(BRIEF_DEFAULT);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [tab, setTab] = useState<"build" | "system" | "ship">("build");
  const [concept, setConcept] = useState(0);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [log, setLog] = useState<{ time: string; msg: string; status: "info" | "ok" | "warn" }[]>([
    { time: "09:00:01", msg: "BUILD pipeline initialized", status: "ok" },
    { time: "09:00:02", msg: "Dependencies resolved (200 OK)", status: "ok" },
  ]);

  const addLog = useCallback((msg: string, status: "info" | "ok" | "warn" = "info") => {
    const t = new Date().toISOString().slice(11, 19);
    setLog(prev => [...prev.slice(-4), { time: t, msg, status }]);
  }, []);

  const current = CONCEPTS[concept];
  const reachMod = current.reach + (tone === "Technical" ? 40 : 0);
  const ctrMod = current.ctr + (style === "Dashboard interface" ? 0.4 : 0);
  const convMod = current.conv + (audience === "Data engineering teams" ? 0.3 : 0);

  const handleGenerate = () => {
    if (genState === "loading") return;
    setGenState("loading");
    addLog("POST /api/generate → 202 Accepted", "info");
    setTimeout(() => {
      if (brief.length >= 16) {
        setGenState("success");
        addLog("BUILD succeeded — 3 variants compiled (200 OK)", "ok");
      } else {
        setGenState("error");
        addLog("BUILD failed — brief validation error (422)", "warn");
      }
    }, 800);
  };

  const switchConcept = (idx: number) => {
    setConcept(idx);
    addLog(`Variant switched to ${CONCEPTS[idx].version}: ${CONCEPTS[idx].label}`, "info");
  };

  const deviceWidths = { desktop: "100%", tablet: "768px", mobile: "375px" };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-slate-400" />
          <span className="font-semibold text-sm tracking-wide">Muse</span>
          <span className="px-2 py-0.5 rounded bg-blue-700 text-[10px] font-medium">Qwen 3.7 Max</span>
          <span className="px-2 py-0.5 rounded bg-slate-700 text-[10px] text-slate-300">frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-slate-400">System Operational</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-6">
        <div className="flex gap-6">
          {(["build", "system", "ship"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={cn("py-3 text-sm font-medium capitalize border-b-2 transition-colors", tab === t ? "border-blue-700 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700")}>
              {t === "build" && <Layout className="w-3.5 h-3.5 inline mr-1.5" />}
              {t === "system" && <Code2 className="w-3.5 h-3.5 inline mr-1.5" />}
              {t === "ship" && <Rocket className="w-3.5 h-3.5 inline mr-1.5" />}
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "build" && (
        <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-120px)]">
          {/* Left — Form Controls */}
          <div className="lg:w-[280px] w-full bg-white border-r border-slate-200 p-4 space-y-4 overflow-y-auto">
            <div>
              <label className="text-[11px] font-medium text-slate-700 block mb-1">Campaign Brief</label>
              <p className="text-[10px] text-slate-400 mb-1.5">Describe your campaign goals and target audience.</p>
              <textarea value={brief} onChange={e => setBrief(e.target.value)} rows={4} className="w-full border border-slate-200 rounded-md px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              {brief.length < 16 && <p className="text-[10px] text-red-500 mt-1">Minimum 16 characters required ({brief.length}/16)</p>}
            </div>
            {([["Audience", AUDIENCES, audience, setAudience, "Who will see this campaign?"], ["Channel", CHANNELS, channel, setChannel, "Primary distribution channel"], ["Tone", TONES, tone, setTone, "Brand voice for this campaign"], ["Style", STYLES, style, setStyle, "Visual direction"]] as const).map(([label, opts, val, setter, helper]) => (
              <div key={label as string}>
                <label className="text-[11px] font-medium text-slate-700 block mb-0.5">{label as string}</label>
                <p className="text-[10px] text-slate-400 mb-1.5">{helper as string}</p>
                <select value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} className="w-full border border-slate-200 rounded-md px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  {(opts as readonly string[]).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}

            {/* Build Status */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-[11px] font-medium text-slate-700 mb-2">Build Status</p>
              <div className="space-y-1.5">
                {CI_CHECKS.map(c => (
                  <div key={c.label} className="flex items-center gap-2 text-[11px]">
                    {c.ok ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className="text-slate-600">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-[11px] font-medium text-slate-700 mb-2">Accessibility Audit</p>
              <div className="space-y-1.5">
                {A11Y_CHECKS.map(c => (
                  <div key={c.label} className="flex items-center gap-2 text-[11px]">
                    {c.ok ? <Check className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-amber-500" />}
                    <span className="text-slate-600">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center — Preview */}
          <div className="flex-1 p-4 bg-slate-100 overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] text-slate-500 font-medium">Preview — {current.version} {current.label}</p>
              <div className="flex gap-1">
                {(["desktop", "tablet", "mobile"] as const).map(d => (
                  <button key={d} onClick={() => setDevice(d)} className={cn("p-1.5 rounded transition-colors", device === d ? "bg-blue-700 text-white" : "text-slate-400 hover:text-slate-600")}>
                    {d === "desktop" ? <Monitor className="w-3.5 h-3.5" /> : d === "tablet" ? <Tablet className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-auto transition-all duration-300 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden" style={{ maxWidth: deviceWidths[device] }}>
              {/* Mock web page */}
              <div className="border-b border-slate-200 px-4 py-2.5 flex items-center justify-between bg-slate-900 text-white">
                <span className="text-[11px] font-medium">Muse Analytics</span>
                <div className="flex gap-3 text-[10px] text-slate-400"><span>Product</span><span>Docs</span><span>Pricing</span></div>
              </div>
              <div className="px-6 py-8 text-center border-b border-slate-100 bg-gradient-to-b from-blue-50 to-white">
                <span className="text-[9px] text-blue-500 font-medium tracking-wide uppercase">HeroSection</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">{current.label}</h2>
                <p className="text-xs text-slate-500 mt-1">{current.tagline}</p>
                <button className="mt-3 px-4 py-1.5 bg-blue-700 text-white text-xs rounded-md">Get Started</button>
              </div>
              <div className="px-6 py-6 border-b border-slate-100">
                <span className="text-[9px] text-blue-500 font-medium tracking-wide uppercase">FeatureGrid</span>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {["Real-time", "Scalable", "Secure"].map(f => (
                    <div key={f} className="text-center p-3 bg-slate-50 rounded-md">
                      <Layers className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-[10px] font-medium text-slate-700">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-50 text-center">
                <span className="text-[9px] text-blue-500 font-medium tracking-wide uppercase">SiteFooter</span>
                <p className="text-[10px] text-slate-400 mt-1">Muse Analytics Platform</p>
              </div>
            </div>
          </div>

          {/* Right — Variants */}
          <div className="lg:w-[260px] w-full bg-white border-l border-slate-200 p-4 space-y-4 overflow-y-auto">
            <p className="text-[11px] font-medium text-slate-700">Variants</p>
            {CONCEPTS.map((c, i) => (
              <button key={c.id} onClick={() => switchConcept(i)} className={cn("w-full text-left p-3 rounded-lg border transition-all", i === concept ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300")}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-400">{c.version}</span>
                  {i === concept && <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-700 text-white">active</span>}
                </div>
                <p className="text-xs font-medium text-slate-800">{c.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{c.tagline}</p>
              </button>
            ))}

            {/* Metrics */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <p className="text-[11px] font-medium text-slate-700">Performance</p>
              <MetricCard label="Reach" value={reachMod} suffix="K" trend="up" />
              <MetricCard label="CTR" value={ctrMod} suffix="%" trend="stable" />
              <MetricCard label="Conversion" value={convMod} suffix="%" trend="down" />
            </div>
          </div>
        </div>
      )}

      {tab === "system" && (
        <div className="p-6">
          <p className="text-sm font-medium text-slate-700 mb-4">Component Library</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Button", desc: "Primary, secondary, ghost variants", icon: <div className="w-12 h-6 rounded bg-blue-700 flex items-center justify-center text-[9px] text-white">Click</div> },
              { name: "Card", desc: "Content container with shadow", icon: <div className="w-12 h-10 rounded-md border border-slate-200 shadow-sm bg-white" /> },
              { name: "Hero", desc: "Full-width section with CTA", icon: <div className="w-12 h-8 rounded bg-gradient-to-b from-blue-50 to-white border border-slate-100" /> },
              { name: "Badge", desc: "Status and label indicators", icon: <div className="flex gap-1"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[8px]">OK</span><span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[8px]">New</span></div> },
            ].map(c => (
              <div key={c.name} className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="h-16 flex items-center justify-center bg-slate-50 rounded mb-3">{c.icon}</div>
                <p className="text-xs font-medium text-slate-800">{c.name}</p>
                <p className="text-[10px] text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "ship" && (
        <div className="p-6 max-w-2xl">
          <p className="text-sm font-medium text-slate-700 mb-4">Export Configuration</p>
          <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Format</span><span className="font-mono text-slate-800">JSON + Assets</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Variant</span><span className="font-mono text-slate-800">{current.version} {current.label}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Target</span><span className="font-mono text-slate-800">Production CDN</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex gap-2">
              <Button onClick={handleGenerate} disabled={genState === "loading"} className={cn("flex-1 h-9 text-xs", genState === "success" ? "bg-emerald-600 hover:bg-emerald-700" : genState === "error" ? "bg-red-600 hover:bg-red-700" : "bg-blue-700 hover:bg-blue-800")}>
                {genState === "loading" && <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin mr-1.5" />}
                {genState === "loading" ? "Deploying..." : genState === "success" ? "Deployed" : genState === "error" ? "Failed" : "Deploy"}
              </Button>
              <Button variant="outline" className="h-9 px-3 text-xs" onClick={() => addLog("Export downloaded", "ok")}><Download className="w-3 h-3 mr-1" />Export</Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar — Actions + Log */}
      <div className="border-t border-slate-200 bg-white px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto flex-1">
          <GitBranch className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {log.slice(-5).map((entry, i) => (
            <span key={i} className="text-[10px] font-mono whitespace-nowrap">
              <span className="text-slate-400">[{entry.time}]</span>{" "}
              <span className={entry.status === "ok" ? "text-emerald-600" : entry.status === "warn" ? "text-red-500" : "text-slate-600"}>{entry.msg}</span>
            </span>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"} className={cn("text-xs h-8", genState === "success" ? "bg-emerald-600" : genState === "error" ? "bg-red-600" : "bg-blue-700 hover:bg-blue-800")}>
            {genState === "loading" ? "Building..." : genState === "success" ? "Build OK" : genState === "error" ? "Build Failed" : "Generate"}
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => addLog("Campaign saved to disk", "ok")}><Save className="w-3 h-3 mr-1" />Save</Button>
          <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => addLog("Exported campaign bundle", "ok")}><Download className="w-3 h-3 mr-1" />Export</Button>
        </div>
      </div>
    </div>
  );
}
