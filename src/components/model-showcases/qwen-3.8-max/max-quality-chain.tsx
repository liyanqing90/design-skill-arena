"use client";

import { useState, useCallback, useRef } from "react";
import { Sparkles, Wand2, Save, Download, Loader2, CheckCircle2, AlertCircle, Eye, MousePointerClick, TrendingUp, PenTool, Palette, Type, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Gen Z Creators", "Urban Professionals", "Tech Enthusiasts", "Luxury Seekers"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Pinterest"];
const TONES = ["Bold & Electric", "Minimal & Refined", "Warm & Inviting", "Futuristic"];
const VISUAL_STYLES = ["Neon Gradient", "Soft Pastel", "Monochrome Luxe", "Vivid Spectrum"];

const VARIANTS = [
  { id: "A", numeral: "I", reach: 284000, ctr: 4.7, conversion: 3.2, deltaReach: "+12%", deltaCtr: "+0.4%", deltaConv: "+0.3%" },
  { id: "B", numeral: "II", reach: 312000, ctr: 5.1, conversion: 2.8, deltaReach: "+8%", deltaCtr: "+0.8%", deltaConv: "-0.1%" },
  { id: "C", numeral: "III", reach: 256000, ctr: 6.3, conversion: 4.1, deltaReach: "+15%", deltaCtr: "+1.2%", deltaConv: "+0.9%" },
] as const;

const STYLE_PALETTES: Record<string, { primary: string; secondary: string; accent: string; bg: string; name: string }> = {
  "Neon Gradient": { primary: "#7c3aed", secondary: "#ec4899", accent: "#f59e0b", bg: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)", name: "Neon" },
  "Soft Pastel": { primary: "#a78bfa", secondary: "#f9a8d4", accent: "#6ee7b7", bg: "linear-gradient(135deg, #c4b5fd 0%, #fbcfe8 50%, #a7f3d0 100%)", name: "Pastel" },
  "Monochrome Luxe": { primary: "#374151", secondary: "#6b7280", accent: "#d1d5db", bg: "linear-gradient(135deg, #1f2937 0%, #4b5563 50%, #9ca3af 100%)", name: "Mono" },
  "Vivid Spectrum": { primary: "#06b6d4", secondary: "#8b5cf6", accent: "#ef4444", bg: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 40%, #ef4444 70%, #f59e0b 100%)", name: "Spectrum" },
};

const TONE_COPY: Record<string, { headline: string; sub: string }> = {
  "Bold & Electric": { headline: "Unleash the Future", sub: "Where creativity meets raw energy" },
  "Minimal & Refined": { headline: "Less. Elevated.", sub: "Precision in every pixel" },
  "Warm & Inviting": { headline: "Made for You", sub: "Crafted with care, designed with heart" },
  "Futuristic": { headline: "Beyond Tomorrow", sub: "The next era of creative expression" },
};

export default function MaxQualityChain() {
  const [brief, setBrief] = useState("Launch campaign for our new AI-powered creative suite — targeting design-forward audiences who value aesthetics and innovation.");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [visualStyle, setVisualStyle] = useState(VISUAL_STYLES[0]);
  const [selectedVariant, setSelectedVariant] = useState<"A" | "B" | "C">("A");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activityLog, setActivityLog] = useState<{ msg: string; time: string }[]>([
    { msg: "Studio session started", time: "10:00" },
    { msg: "Default brief loaded", time: "10:00" },
  ]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentVariant = VARIANTS.find((v) => v.id === selectedVariant)!;
  const palette = STYLE_PALETTES[visualStyle];
  const toneCopy = TONE_COPY[tone];

  const addActivity = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setActivityLog((prev) => [{ msg, time }, ...prev].slice(0, 10));
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

  const handleSave = useCallback(() => { addActivity("Campaign saved to workspace"); }, [addActivity]);
  const handleExport = useCallback(() => { addActivity("Exported assets — PNG, PDF, SVG"); }, [addActivity]);

  const handleVariantChange = useCallback((id: "A" | "B" | "C") => {
    setSelectedVariant(id);
    addActivity(`Switched to Variant ${id}`);
  }, [addActivity]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fafaf9] text-stone-900 antialiased">
      {/* Masthead */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            {/* Crest */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-stone-800 bg-stone-900 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-stone-900">Muse — AI Campaign Studio</h1>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                <span className="font-medium text-stone-700">Qwen 3.8 Max</span>
                <span className="text-stone-300">|</span>
                <span>frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleGenerate} className={cn("inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800", status === "loading" ? "cursor-wait bg-stone-200 text-stone-500" : "bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.97]")}>
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{status === "loading" ? "Generating…" : "Generate"}</span>
            </button>
            <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 transition-all duration-200 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800 active:scale-[0.97]">
              <Save className="h-4 w-4" /><span className="hidden sm:inline">Save</span>
            </button>
            <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 transition-all duration-200 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800 active:scale-[0.97]">
              <Download className="h-4 w-4" /><span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* Status Note */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        {status === "success" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> Creative generated — preview and metrics updated.
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0" /> Cannot generate — please provide a campaign brief.
          </div>
        )}
      </div>

      {/* Main Grid */}
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Controls */}
          <div className="space-y-6 lg:col-span-3">
            {/* Brief */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <PenTool className="h-3.5 w-3.5" /> Campaign Brief
              </label>
              <textarea
                value={brief}
                onChange={(e) => { setBrief(e.target.value); setStatus("idle"); }}
                rows={5}
                placeholder="Describe your campaign vision…"
                className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm leading-relaxed text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:border-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
              />
            </div>

            {/* Selectable Lists */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <SelectableList label="Target Audience" icon={<Eye className="h-3.5 w-3.5" />} options={AUDIENCES} selected={audience} onSelect={(v) => { setAudience(v); addActivity(`Audience → ${v}`); }} />
              <div className="my-4 border-t border-stone-100" />
              <SelectableList label="Channel" icon={<Layout className="h-3.5 w-3.5" />} options={CHANNELS} selected={channel} onSelect={(v) => { setChannel(v); addActivity(`Channel → ${v}`); }} />
              <div className="my-4 border-t border-stone-100" />
              <SelectableList label="Tone" icon={<Type className="h-3.5 w-3.5" />} options={TONES} selected={tone} onSelect={(v) => { setTone(v); addActivity(`Tone → ${v}`); }} />
              <div className="my-4 border-t border-stone-100" />
              <SelectableList label="Visual Style" icon={<Palette className="h-3.5 w-3.5" />} options={VISUAL_STYLES} selected={visualStyle} onSelect={(v) => { setVisualStyle(v); addActivity(`Visual style → ${v}`); }} />
            </div>
          </div>

          {/* Center: Preview Plate */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              {/* Plate */}
              {status === "loading" ? (
                <div className="flex h-[420px] items-center justify-center sm:h-[500px]" style={{ background: palette.bg }}>
                  <div className="absolute inset-0 animate-pulse opacity-30" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
                  <div className="relative flex flex-col items-center gap-3 text-white">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="text-sm font-medium">Composing your creative…</span>
                  </div>
                </div>
              ) : (
                <div className="relative h-[420px] transition-all duration-500 sm:h-[500px]" style={{ background: palette.bg }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                    <span className="mb-4 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                      {channel} · {audience}
                    </span>
                    <h2 className="font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg transition-all duration-300 sm:text-5xl lg:text-6xl">
                      {toneCopy.headline}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-white/70 transition-all duration-300">{toneCopy.sub}</p>
                    <button className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-semibold text-stone-900 shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                      Discover More
                    </button>
                  </div>
                  {/* Spec callouts */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="rounded bg-black/30 px-2 py-1 text-[9px] font-medium text-white/70 backdrop-blur-sm">Variant {currentVariant.numeral}</span>
                    <span className="rounded bg-black/30 px-2 py-1 text-[9px] font-medium text-white/70 backdrop-blur-sm">{palette.name} palette</span>
                  </div>
                  <div className="absolute right-4 top-4 rounded bg-black/30 px-2 py-1 text-[9px] font-medium text-white/70 backdrop-blur-sm">
                    {visualStyle}
                  </div>
                </div>
              )}
              {/* Caption */}
              <div className="border-t border-stone-100 px-5 py-3">
                <p className="text-xs text-stone-500">
                  <span className="font-medium text-stone-700">Plate {currentVariant.numeral}</span> — {tone} campaign for {audience} via {channel}. Visual language: {visualStyle}.
                </p>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="mt-4 flex items-center justify-center gap-8">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleVariantChange(v.id)}
                  className={cn(
                    "group relative flex flex-col items-center gap-1 pb-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-800",
                    selectedVariant === v.id ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                  )}
                >
                  <span className={cn("font-serif text-lg font-bold transition-all duration-200", selectedVariant === v.id ? "scale-110" : "group-hover:scale-105")}>{v.numeral}</span>
                  <span className={cn("absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-stone-900 transition-all duration-300", selectedVariant === v.id ? "w-6" : "w-0")} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Specs + Metrics + Activity */}
          <div className="space-y-6 lg:col-span-4">
            {/* Token/Spec Panel */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">Design Tokens</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Primary</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-stone-700">
                    <span className="h-3 w-3 rounded-full border border-stone-200" style={{ background: palette.primary }} /> {palette.primary}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Secondary</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-stone-700">
                    <span className="h-3 w-3 rounded-full border border-stone-200" style={{ background: palette.secondary }} /> {palette.secondary}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Accent</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-stone-700">
                    <span className="h-3 w-3 rounded-full border border-stone-200" style={{ background: palette.accent }} /> {palette.accent}
                  </span>
                </div>
                <div className="border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">Typography</span>
                    <span className="text-xs text-stone-700">Serif Display / Sans UI</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-stone-500">Audience</span>
                    <span className="text-xs text-stone-700">{audience}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-stone-500">Channel</span>
                    <span className="text-xs text-stone-700">{channel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-500">Predicted Metrics</h3>
              <div className="space-y-4">
                <MetricRow icon={<Eye className="h-4 w-4 text-blue-600" />} label="Reach" value={`${(currentVariant.reach / 1000).toFixed(0)}K`} delta={currentVariant.deltaReach} />
                <div className="border-t border-stone-100" />
                <MetricRow icon={<MousePointerClick className="h-4 w-4 text-violet-600" />} label="CTR" value={`${currentVariant.ctr}%`} delta={currentVariant.deltaCtr} />
                <div className="border-t border-stone-100" />
                <MetricRow icon={<TrendingUp className="h-4 w-4 text-emerald-600" />} label="Conversion" value={`${currentVariant.conversion}%`} delta={currentVariant.deltaConv} />
              </div>
            </div>

            {/* Activity Ledger */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">Activity Ledger</h3>
              <ul className="space-y-2.5">
                {activityLog.map((item, i) => (
                  <li key={i} className={cn("flex items-baseline gap-3 text-xs transition-all duration-200", i === 0 ? "text-stone-800" : "text-stone-400")}>
                    <span className="shrink-0 font-mono text-[10px] text-stone-300">{item.time}</span>
                    <span className={cn("h-1 w-1 shrink-0 translate-y-[-1px] rounded-full", i === 0 ? "bg-stone-800" : "bg-stone-300")} />
                    <span>{item.msg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SelectableList({ label, icon, options, selected, onSelect }: { label: string; icon: React.ReactNode; options: readonly string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">{icon} {label}</span>
      <div className="space-y-0.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-stone-800",
              selected === opt ? "bg-stone-100 font-medium text-stone-900" : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
            )}
          >
            {opt}
            {selected === opt && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-stone-800" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricRow({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string; delta: string }) {
  const isPositive = delta.startsWith("+");
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-sm text-stone-600">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold tracking-tight text-stone-900 transition-all duration-300">{value}</span>
        <span className={cn("text-xs font-medium", isPositive ? "text-emerald-600" : "text-red-500")}>{delta}</span>
      </div>
    </div>
  );
}
