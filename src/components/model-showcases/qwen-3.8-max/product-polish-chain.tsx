"use client";

import { useState, useCallback, useRef } from "react";
import { Sparkles, Wand2, Save, Download, Loader2, CheckCircle2, AlertCircle, Eye, MousePointerClick, TrendingUp, Activity, SlidersHorizontal, X, Search, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Gen Z Creators", "Urban Professionals", "Tech Enthusiasts", "Luxury Seekers", "Health & Wellness"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Pinterest", "LinkedIn"];
const TONES = ["Bold & Electric", "Minimal & Refined", "Warm & Inviting", "Futuristic", "Playful"];
const VISUAL_STYLES = ["Neon Gradient", "Soft Pastel", "Monochrome Luxe", "Vivid Spectrum", "Earth Tones"];

const VARIANTS = [
  { id: "A", label: "A", reach: 284000, ctr: 4.7, conversion: 3.2, sparkline: [40, 55, 45, 70, 60, 80, 75] },
  { id: "B", label: "B", reach: 312000, ctr: 5.1, conversion: 2.8, sparkline: [50, 60, 55, 65, 75, 70, 85] },
  { id: "C", label: "C", reach: 256000, ctr: 6.3, conversion: 4.1, sparkline: [35, 45, 60, 50, 70, 85, 90] },
] as const;

const STYLE_COLORS: Record<string, { bg: string; accent: string; text: string }> = {
  "Neon Gradient": { bg: "from-violet-500 to-fuchsia-500", accent: "#8b5cf6", text: "Neon energy" },
  "Soft Pastel": { bg: "from-pink-200 to-sky-200", accent: "#f9a8d4", text: "Gentle warmth" },
  "Monochrome Luxe": { bg: "from-gray-700 to-gray-900", accent: "#6b7280", text: "Refined depth" },
  "Vivid Spectrum": { bg: "from-cyan-400 via-violet-500 to-orange-400", accent: "#06b6d4", text: "Full spectrum" },
  "Earth Tones": { bg: "from-amber-600 to-emerald-700", accent: "#d97706", text: "Grounded nature" },
};

export default function ProductPolishChain() {
  const [brief, setBrief] = useState("Launch campaign for our new AI-powered creative suite — targeting design-forward audiences.");
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([AUDIENCES[0]]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([CHANNELS[0]]);
  const [selectedTones, setSelectedTones] = useState<string[]>([TONES[0]]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([VISUAL_STYLES[0]]);
  const [selectedVariant, setSelectedVariant] = useState<"A" | "B" | "C">("A");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activityLog, setActivityLog] = useState<{ msg: string; time: string; icon: string }[]>([
    { msg: "Dashboard initialized", time: "09:00", icon: "init" },
    { msg: "Default brief loaded", time: "09:00", icon: "brief" },
  ]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentVariant = VARIANTS.find((v) => v.id === selectedVariant)!;
  const activeStyle = STYLE_COLORS[selectedStyles[0] || VISUAL_STYLES[0]];

  const addActivity = useCallback((msg: string, icon = "action") => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setActivityLog((prev) => [{ msg, time, icon }, ...prev].slice(0, 10));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const handleGenerate = useCallback(() => {
    if (!brief.trim()) {
      setStatus("error");
      addActivity("Generation failed — empty brief", "error");
      return;
    }
    setStatus("loading");
    addActivity("Generating creative…", "loading");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStatus("success");
      addActivity("Creative generated", "success");
    }, 1200);
  }, [brief, addActivity]);

  const handleSave = useCallback(() => {
    addActivity("Campaign saved", "save");
    showToast("Campaign saved successfully");
  }, [addActivity, showToast]);

  const handleExport = useCallback(() => {
    addActivity("Assets exported", "export");
    showToast("Export complete — PNG + PDF");
  }, [addActivity, showToast]);

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string, label: string) => {
    const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
    setList(next);
    addActivity(`${label}: ${item} ${list.includes(item) ? "removed" : "added"}`, "filter");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
      {/* Toast */}
      {toast && (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {toast}
        </div>
      )}

      {/* Command Bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="flex h-14 items-center gap-3 px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600" />
            <span className="text-sm font-semibold">Muse</span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700 ring-1 ring-violet-200">Qwen 3.8 Max</span>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500 ring-1 ring-gray-200">frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-400 md:flex">
              <Search className="h-3.5 w-3.5" /> Brief shortcut…
            </div>
            <button onClick={() => setDrawerOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
            <button onClick={handleGenerate} className={cn("inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500", status === "loading" ? "cursor-wait bg-violet-100 text-violet-500" : "bg-violet-600 text-white hover:bg-violet-700 active:scale-[0.97]")}>
              {status === "loading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
              Generate
            </button>
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-[0.97]">
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button onClick={handleExport} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-[0.97]">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>
        {/* Mobile model label */}
        <div className="flex items-center gap-1.5 border-t border-gray-100 px-4 py-1.5 sm:hidden">
          <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-700">Qwen 3.8 Max</span>
          <span className="truncate text-[10px] text-gray-400">frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Filter Rail - Desktop */}
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 lg:block">
          <FilterRail
            brief={brief}
            setBrief={(v) => { setBrief(v); setStatus("idle"); }}
            selectedAudiences={selectedAudiences}
            selectedChannels={selectedChannels}
            selectedTones={selectedTones}
            selectedStyles={selectedStyles}
            toggleAudience={(item) => toggleItem(selectedAudiences, setSelectedAudiences, item, "Audience")}
            toggleChannel={(item) => toggleItem(selectedChannels, setSelectedChannels, item, "Channel")}
            toggleTone={(item) => toggleItem(selectedTones, setSelectedTones, item, "Tone")}
            toggleStyle={(item) => toggleItem(selectedStyles, setSelectedStyles, item, "Style")}
          />
        </aside>

        {/* Mobile Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold">Filters</span>
                <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-violet-500"><X className="h-4 w-4" /></button>
              </div>
              <FilterRail
                brief={brief}
                setBrief={(v) => { setBrief(v); setStatus("idle"); }}
                selectedAudiences={selectedAudiences}
                selectedChannels={selectedChannels}
                selectedTones={selectedTones}
                selectedStyles={selectedStyles}
                toggleAudience={(item) => toggleItem(selectedAudiences, setSelectedAudiences, item, "Audience")}
                toggleChannel={(item) => toggleItem(selectedChannels, setSelectedChannels, item, "Channel")}
                toggleTone={(item) => toggleItem(selectedTones, setSelectedTones, item, "Tone")}
                toggleStyle={(item) => toggleItem(selectedStyles, setSelectedStyles, item, "Style")}
              />
            </div>
          </div>
        )}

        {/* Center Content */}
        <main className="flex-1 overflow-x-hidden p-4 lg:p-6">
          {/* Status */}
          {status === "success" && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Creative generated successfully.
            </div>
          )}
          {status === "error" && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" /> Cannot generate — brief is empty.
            </div>
          )}

          {/* Preview Card */}
          <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {status === "loading" ? (
              <div className="flex h-64 items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 sm:h-72">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-7 w-7 animate-spin text-violet-500" />
                  <span className="text-sm text-gray-500">Generating creative…</span>
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-violet-500" />
                  </div>
                </div>
              </div>
            ) : (
              <div className={cn("relative flex h-64 flex-col items-center justify-center bg-gradient-to-br p-8 text-center transition-all duration-500 sm:h-72", activeStyle.bg)}>
                <div className="absolute inset-0 bg-white/10" />
                <div className="relative">
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                    {selectedChannels.join(", ")} · {selectedAudiences.join(", ")}
                  </span>
                  <h2 className="text-3xl font-bold text-white drop-shadow sm:text-4xl">{selectedTones[0] || "Creative"}</h2>
                  <p className="mt-2 text-sm text-white/80">{activeStyle.text} · Variant {selectedVariant}</p>
                  <button className="mt-4 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Learn More
                  </button>
                </div>
                <div className="absolute right-3 top-3 rounded-md bg-black/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                  {selectedStyles[0]}
                </div>
              </div>
            )}
          </div>

          {/* Variant Cards */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => { setSelectedVariant(v.id); addActivity(`Variant ${v.id} selected`, "variant"); }}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500",
                  selectedVariant === v.id ? "border-violet-300 bg-violet-50 ring-1 ring-violet-200" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                )}
              >
                <span className={cn("text-xs font-semibold", selectedVariant === v.id ? "text-violet-700" : "text-gray-500")}>Variant {v.label}</span>
                <div className="mt-1.5 flex items-end gap-0.5" aria-hidden>
                  {v.sparkline.map((h, i) => (
                    <div key={i} className={cn("w-full rounded-sm transition-all duration-300", selectedVariant === v.id ? "bg-violet-400" : "bg-gray-200")} style={{ height: `${h * 0.4}px` }} />
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-gray-400">{(v.reach / 1000).toFixed(0)}K reach</div>
              </button>
            ))}
          </div>

          {/* Activity - Mobile */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 lg:hidden">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-700"><Activity className="h-3.5 w-3.5" /> Activity</div>
            <ul className="space-y-2">
              {activityLog.slice(0, 5).map((item, i) => (
                <li key={i} className={cn("flex items-center gap-2 text-xs", i === 0 ? "text-gray-800" : "text-gray-400")}>
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> {item.msg} <span className="ml-auto text-gray-300">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        {/* Right KPI Column - Desktop */}
        <aside className="hidden w-60 shrink-0 border-l border-gray-200 bg-white p-4 lg:block">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-gray-700"><BarChart3 className="h-3.5 w-3.5" /> Predicted Metrics</div>
          <div className="space-y-4">
            <KpiCard icon={<Eye className="h-4 w-4 text-blue-500" />} label="Reach" value={`${(currentVariant.reach / 1000).toFixed(0)}K`} sparkline={currentVariant.sparkline} color="bg-blue-400" />
            <KpiCard icon={<MousePointerClick className="h-4 w-4 text-violet-500" />} label="CTR" value={`${currentVariant.ctr}%`} sparkline={currentVariant.sparkline} color="bg-violet-400" />
            <KpiCard icon={<TrendingUp className="h-4 w-4 text-emerald-500" />} label="Conversion" value={`${currentVariant.conversion}%`} sparkline={currentVariant.sparkline} color="bg-emerald-400" />
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-700"><Activity className="h-3.5 w-3.5" /> Activity</div>
            <ul className="space-y-2.5">
              {activityLog.map((item, i) => (
                <li key={i} className={cn("flex items-start gap-2 text-xs transition-colors duration-200", i === 0 ? "text-gray-800" : "text-gray-400")}>
                  <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", i === 0 ? "bg-violet-500" : "bg-gray-300")} />
                  <span className="flex-1">{item.msg}</span>
                  <span className="text-gray-300">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FilterRail({ brief, setBrief, selectedAudiences, selectedChannels, selectedTones, selectedStyles, toggleAudience, toggleChannel, toggleTone, toggleStyle }: {
  brief: string; setBrief: (v: string) => void;
  selectedAudiences: string[]; selectedChannels: string[]; selectedTones: string[]; selectedStyles: string[];
  toggleAudience: (item: string) => void; toggleChannel: (item: string) => void; toggleTone: (item: string) => void; toggleStyle: (item: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">Campaign Brief</label>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={4}
          placeholder="Describe your campaign…"
          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 placeholder:text-gray-400 transition-colors focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
      </div>
      <ToggleGroup label="Audience" options={AUDIENCES} selected={selectedAudiences} onToggle={toggleAudience} />
      <ToggleGroup label="Channel" options={CHANNELS} selected={selectedChannels} onToggle={toggleChannel} />
      <ToggleGroup label="Tone" options={TONES} selected={selectedTones} onToggle={toggleTone} />
      <ToggleGroup label="Visual Style" options={VISUAL_STYLES} selected={selectedStyles} onToggle={toggleStyle} />
    </div>
  );
}

function ToggleGroup({ label, options, selected, onToggle }: { label: string; options: readonly string[]; selected: string[]; onToggle: (item: string) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet-500",
              selected.includes(opt) ? "border-violet-200 bg-violet-50 text-violet-700" : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
          >
            <span className={cn("flex h-3.5 w-3.5 items-center justify-center rounded border transition-colors", selected.includes(opt) ? "border-violet-400 bg-violet-500" : "border-gray-300 bg-white")}>
              {selected.includes(opt) && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
            </span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, sparkline, color }: { icon: React.ReactNode; label: string; value: string; sparkline: readonly number[]; color: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
      <div className="flex items-center gap-2 text-[11px] text-gray-500">{icon} {label}</div>
      <div className="mt-1.5 text-xl font-bold text-gray-900 transition-all duration-300">{value}</div>
      <div className="mt-2 flex items-end gap-0.5" aria-hidden>
        {sparkline.map((h, i) => (
          <div key={i} className={cn("w-full rounded-sm transition-all duration-300", color)} style={{ height: `${h * 0.35}px`, opacity: 0.4 + (i / sparkline.length) * 0.6 }} />
        ))}
      </div>
    </div>
  );
}
