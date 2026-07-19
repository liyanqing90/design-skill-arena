"use client";

import { useState, useCallback, useRef } from "react";
import { Sparkles, Wand2, Save, Download, Loader2, CheckCircle2, AlertCircle, Zap, Eye, MousePointerClick, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Gen Z Creators", "Urban Professionals", "Tech Enthusiasts", "Luxury Seekers"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Pinterest"];
const TONES = ["Bold & Electric", "Minimal & Refined", "Warm & Inviting", "Futuristic"];
const VISUAL_STYLES = ["Neon Gradient", "Soft Pastel", "Monochrome Luxe", "Vivid Spectrum"];

const VARIANTS = [
  { id: "A", label: "Variant A", reach: 284000, ctr: 4.7, conversion: 3.2, delta: "+12%" },
  { id: "B", label: "Variant B", reach: 312000, ctr: 5.1, conversion: 2.8, delta: "+8%" },
  { id: "C", label: "Variant C", reach: 256000, ctr: 6.3, conversion: 4.1, delta: "+15%" },
] as const;

const STYLE_GRADIENTS: Record<string, string> = {
  "Neon Gradient": "linear-gradient(135deg, #7c3aed 0%, #ec4899 40%, #f59e0b 100%)",
  "Soft Pastel": "linear-gradient(135deg, #c4b5fd 0%, #fbcfe8 50%, #a7f3d0 100%)",
  "Monochrome Luxe": "linear-gradient(135deg, #1a1a2e 0%, #4a4a6a 50%, #9a9abf 100%)",
  "Vivid Spectrum": "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 35%, #ef4444 70%, #f59e0b 100%)",
};

const TONE_HEADLINES: Record<string, string> = {
  "Bold & Electric": "Unleash the Future",
  "Minimal & Refined": "Less. Elevated.",
  "Warm & Inviting": "Made for You",
  "Futuristic": "Beyond Tomorrow",
};

export default function VisualPremiumChain() {
  const [brief, setBrief] = useState("Launch campaign for our new AI-powered creative suite — targeting design-forward audiences who value aesthetics and innovation.");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [visualStyle, setVisualStyle] = useState(VISUAL_STYLES[0]);
  const [selectedVariant, setSelectedVariant] = useState<"A" | "B" | "C">("A");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activityLog, setActivityLog] = useState<string[]>(["Studio initialized", "Default brief loaded"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentVariant = VARIANTS.find((v) => v.id === selectedVariant)!;

  const addActivity = useCallback((msg: string) => {
    setActivityLog((prev) => [`${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — ${msg}`, ...prev].slice(0, 8));
  }, []);

  const handleGenerate = useCallback(() => {
    if (!brief.trim()) {
      setStatus("error");
      addActivity("Generation failed — brief is empty");
      return;
    }
    setStatus("loading");
    addActivity("Generating creative concepts…");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStatus("success");
      addActivity("Creative generated successfully");
    }, 1200);
  }, [brief, addActivity]);

  const handleSave = useCallback(() => {
    addActivity("Campaign saved to workspace");
  }, [addActivity]);

  const handleExport = useCallback(() => {
    addActivity("Exported assets as PNG + PDF");
  }, [addActivity]);

  const handleVariantChange = useCallback((id: "A" | "B" | "C") => {
    setSelectedVariant(id);
    addActivity(`Switched to Variant ${id}`);
  }, [addActivity]);

  const gradient = STYLE_GRADIENTS[visualStyle];
  const headline = TONE_HEADLINES[tone];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a14] text-white antialiased" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(99,102,241,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.9) 0%, #0a0a14 100%)" }}>
      {/* Header */}
      <header className="px-4 pt-6 pb-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <span className="text-lg font-semibold tracking-tight">Muse — AI Campaign Studio</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-violet-300/70">
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 font-medium text-violet-300">Qwen 3.8 Max</span>
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5">frontend-skill + taste-skill + impeccable</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleGenerate} className={cn("inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400", status === "loading" ? "cursor-wait bg-violet-600/50 text-violet-200" : "bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500 active:scale-[0.97]")}>
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {status === "loading" ? "Generating…" : "Generate"}
            </button>
            <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:scale-[0.97]">
              <Save className="h-4 w-4" /> Save
            </button>
            <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:scale-[0.97]">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>
      </header>

      {/* Status Banner */}
      {status === "success" && (
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> Creative generated successfully — preview updated.
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            <AlertCircle className="h-4 w-4" /> Cannot generate — please provide a campaign brief.
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Controls */}
          <div className="lg:col-span-4 space-y-5">
            {/* Brief */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-violet-300/70">Campaign Brief</label>
              <textarea
                value={brief}
                onChange={(e) => { setBrief(e.target.value); setStatus("idle"); }}
                rows={4}
                placeholder="Describe your campaign…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/90 placeholder:text-white/30 transition-all duration-200 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Controls */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl space-y-4">
              <ControlGroup label="Target Audience" options={AUDIENCES} selected={audience} onSelect={(v) => { setAudience(v); addActivity(`Audience → ${v}`); }} />
              <ControlGroup label="Channel" options={CHANNELS} selected={channel} onSelect={(v) => { setChannel(v); addActivity(`Channel → ${v}`); }} />
              <ControlGroup label="Tone" options={TONES} selected={tone} onSelect={(v) => { setTone(v); addActivity(`Tone → ${v}`); }} />
              <ControlGroup label="Visual Style" options={VISUAL_STYLES} selected={visualStyle} onSelect={(v) => { setVisualStyle(v); addActivity(`Visual style → ${v}`); }} />
            </div>

            {/* Activity */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-violet-300/70">
                <Activity className="h-3.5 w-3.5" /> Activity
              </div>
              <ul className="space-y-2">
                {activityLog.map((item, i) => (
                  <li key={i} className={cn("text-xs leading-relaxed transition-all duration-300", i === 0 ? "text-white/80" : "text-white/40")}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center + Right: Preview + Variants + Metrics */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Preview */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-violet-900/20">
              {status === "loading" ? (
                <div className="flex h-[380px] items-center justify-center sm:h-[460px]" style={{ background: gradient }}>
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-white/80" />
                    <span className="text-sm text-white/70">Crafting your creative…</span>
                  </div>
                </div>
              ) : (
                <div className="relative h-[380px] transition-all duration-500 sm:h-[460px]" style={{ background: gradient }}>
                  {/* Overlay texture */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <span className="mb-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm">{channel} · {audience}</span>
                    <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg transition-all duration-500 sm:text-6xl">{headline}</h2>
                    <p className="mt-3 max-w-md text-sm text-white/70 transition-all duration-300">Crafted for {audience.toLowerCase()} with a {tone.toLowerCase()} voice</p>
                    <button className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                      Explore Now
                    </button>
                  </div>
                  {/* Variant badge */}
                  <div className="absolute right-4 top-4 rounded-lg border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                    Variant {selectedVariant}
                  </div>
                </div>
              )}
            </div>

            {/* Variant Selector */}
            <div className="grid grid-cols-3 gap-3">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleVariantChange(v.id)}
                  className={cn(
                    "group relative rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                    selectedVariant === v.id
                      ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  )}
                >
                  {selectedVariant === v.id && <div className="absolute inset-0 rounded-2xl ring-1 ring-violet-400/30" />}
                  <span className={cn("text-sm font-semibold transition-colors", selectedVariant === v.id ? "text-violet-300" : "text-white/60 group-hover:text-white/80")}>{v.label}</span>
                  <div className="mt-2 space-y-1 text-xs text-white/40">
                    <div className="flex items-center gap-1"><Eye className="h-3 w-3" /> {(v.reach / 1000).toFixed(0)}K</div>
                    <div className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" /> {v.ctr}%</div>
                    <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {v.conversion}%</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <MetricCard icon={<Eye className="h-4 w-4 text-violet-400" />} label="Reach" value={`${(currentVariant.reach / 1000).toFixed(0)}K`} delta={currentVariant.delta} />
              <MetricCard icon={<MousePointerClick className="h-4 w-4 text-indigo-400" />} label="CTR" value={`${currentVariant.ctr}%`} delta={currentVariant.delta} />
              <MetricCard icon={<TrendingUp className="h-4 w-4 text-emerald-400" />} label="Conversion" value={`${currentVariant.conversion}%`} delta={currentVariant.delta} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ControlGroup({ label, options, selected, onSelect }: { label: string; options: readonly string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-violet-300/70">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:scale-95",
              selected === opt
                ? "border-violet-500/50 bg-violet-500/15 text-violet-200 shadow-sm shadow-violet-500/10"
                : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center gap-2 text-xs text-white/50">{icon} {label}</div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-white transition-all duration-300">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
        <Zap className="h-3 w-3" /> {delta}
      </div>
    </div>
  );
}
