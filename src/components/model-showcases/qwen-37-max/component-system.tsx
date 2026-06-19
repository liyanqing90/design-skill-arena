"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Palette, Type, Layout, BarChart3, FileText, ChevronDown,
  Loader2, Check, AlertCircle, Sparkles, Save, Download,
  ArrowUpDown, Eye
} from "lucide-react";

const SECTIONS = [
  { id: "brief", label: "Brief", icon: FileText },
  { id: "tokens", label: "Tokens", icon: Palette },
  { id: "components", label: "Components", icon: Layout },
  { id: "concepts", label: "Concepts", icon: Type },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const AUDIENCES = ["Startup founders", "Growth marketers", "Solo designers", "Product managers"];
const CHANNELS = ["Product Hunt", "SaaS review sites", "Team Slack channels", "Startup newsletters"];
const TONES = ["Systematic", "Empowering", "Clear", "Scalable"];
const STYLES = ["Design system", "Component library", "Brand guide", "UI kit"];

const CONCEPTS = [
  { id: "A", name: "Starter Kit", tagline: "Your brand, componentized from day one.", reach: 880, ctr: 4.5, conv: 3.2 },
  { id: "B", name: "Scale Ready", tagline: "From one screen to one thousand, consistently.", reach: 940, ctr: 4.0, conv: 2.9 },
  { id: "C", name: "Team Token", tagline: "The tokens your team already understands.", reach: 810, ctr: 4.7, conv: 3.5 },
] as const;

const COLOR_SWATCHES = [
  { name: "primary", hex: "#2563eb", contrast: "AAA", ratio: "8.6:1" },
  { name: "accent", hex: "#0891b2", contrast: "AA", ratio: "5.2:1" },
  { name: "surface", hex: "#fafafa", contrast: "AAA", ratio: "18.1:1" },
  { name: "muted", hex: "#a1a1aa", contrast: "AA", ratio: "4.8:1" },
];

const GALLERY_ITEMS = [
  { component: "HeroCard", variants: ["default", "compact", "featured"] },
  { component: "MetricGrid", variants: ["3-col", "4-col", "stacked"] },
  { component: "ChannelBadge", variants: ["pill", "dot", "icon"] },
  { component: "CTAButton", variants: ["primary", "outline", "ghost"] },
];

const TOKEN_ROWS = [
  { token: "color.brand.primary", value: "#2563eb", type: "color" },
  { token: "color.brand.accent", value: "#0891b2", type: "color" },
  { token: "radius.md", value: "8px", type: "size" },
  { token: "font.heading.weight", value: "700", type: "weight" },
  { token: "space.section.gap", value: "48px", type: "size" },
  { token: "shadow.card", value: "0 2px 8px rgba(0,0,0,.08)", type: "shadow" },
];

const THEME_JSON = {
  name: "muse-design-system",
  version: "1.0.0",
  tokens: { color: { primary: "#2563eb", accent: "#0891b2" }, radius: { md: "8px" }, font: { heading: { weight: 700 } } },
};

const DEFAULT_BRIEF = "Systematize a campaign for Muse launching a design tool subscription aimed at startup teams who need consistent brand assets without a full design team.";

const Select = ({ value, onChange, options, label, addActivity }: { value: string; onChange: (v: string) => void; options: string[]; label: string; addActivity: (msg: string) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => { onChange(e.target.value); addActivity(`${label} changed to ${e.target.value}`); }}
        className="w-full appearance-none rounded-md border border-zinc-200 bg-white px-3 py-2 pr-8 text-sm text-zinc-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-zinc-400" />
    </div>
  </div>
);

export default function ComponentSystem() {
  const [section, setSection] = useState<SectionId>("brief");
  const [concept, setConcept] = useState("A");
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [genState, setGenState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activity, setActivity] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<"reach" | "ctr" | "conv">("reach");
  const [sortAsc, setSortAsc] = useState(false);
  const briefRef = useRef<HTMLTextAreaElement>(null);

  const selected = CONCEPTS.find((c) => c.id === concept)!;

  const addActivity = useCallback((msg: string) => {
    setActivity((prev) => [msg, ...prev].slice(0, 5));
  }, []);

  const handleGenerate = useCallback(() => {
    setGenState("loading");
    addActivity("Generating concepts...");
    setTimeout(() => {
      if (brief.length >= 16) {
        setGenState("success");
        addActivity("Generation complete — 3 concepts ready.");
      } else {
        setGenState("error");
        addActivity("Error: brief must be at least 16 characters.");
      }
    }, 800);
  }, [brief, addActivity]);

  const handleSave = useCallback(() => {
    addActivity(`Saved concept ${concept} to workspace.`);
  }, [concept, addActivity]);

  const handleExport = useCallback(() => {
    addActivity(`Exported ${selected.name} as design tokens.`);
  }, [selected, addActivity]);

  const modifier = (audience.length + channel.length + tone.length + style.length) / 40;
  const metrics = {
    reach: Math.round(selected.reach * (0.9 + modifier * 0.2)),
    ctr: +(selected.ctr * (0.95 + modifier * 0.1)).toFixed(1),
    conv: +(selected.conv * (0.95 + modifier * 0.1)).toFixed(1),
  };

  const sortedConcepts = [...CONCEPTS].sort((a, b) => {
    const av = a[sortKey === "reach" ? "reach" : sortKey];
    const bv = b[sortKey === "reach" ? "reach" : sortKey];
    return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold">Qwen 3.7 Max</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">shadcn-best-practices</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} className="hidden sm:flex"><Save className="mr-1.5 h-3.5 w-3.5" />Save</Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="hidden sm:flex"><Download className="mr-1.5 h-3.5 w-3.5" />Export</Button>
          <Button size="sm" onClick={handleGenerate} disabled={genState === "loading"} className="bg-blue-600 hover:bg-blue-700">
            {genState === "loading" ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : genState === "success" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : genState === "error" ? <AlertCircle className="mr-1.5 h-3.5 w-3.5" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
            Generate
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar — desktop */}
        <nav className="hidden w-[220px] shrink-0 border-r border-zinc-200 bg-white p-3 md:flex md:flex-col md:gap-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                section === id ? "bg-blue-600 text-white" : "text-zinc-600 hover:bg-zinc-100"
              )}
            >
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
          <div className="mt-auto rounded-lg bg-zinc-50 p-3">
            <p className="text-[11px] font-medium text-zinc-500">Activity Log</p>
            <ul className="mt-2 space-y-1">
              {activity.map((a, i) => <li key={i} className="text-xs text-zinc-500 leading-snug">{a}</li>)}
              {activity.length === 0 && <li className="text-xs text-zinc-400 italic">No activity yet</li>}
            </ul>
          </div>
        </nav>

        {/* Sidebar — mobile horizontal tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-white px-3 py-2 md:hidden">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                section === id ? "bg-blue-600 text-white" : "text-zinc-500 hover:bg-zinc-100"
              )}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Concept switcher */}
          <div className="mb-6 flex gap-2">
            {CONCEPTS.map((c) => (
              <button
                key={c.id}
                onClick={() => { setConcept(c.id); addActivity(`Switched to Concept ${c.id}: ${c.name}`); }}
                className={cn(
                  "flex-1 rounded-lg border px-4 py-3 text-left transition-all",
                  concept === c.id ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300"
                )}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">Concept {c.id}</span>
                <p className="mt-1 text-sm font-semibold">{c.name}</p>
              </button>
            ))}
          </div>

          {/* Brief section */}
          {section === "brief" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <h2 className="mb-3 text-lg font-semibold">Campaign Brief</h2>
                <textarea
                  ref={briefRef}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Select label="Audience" value={audience} onChange={setAudience} options={AUDIENCES} addActivity={addActivity} />
                  <Select label="Channel" value={channel} onChange={setChannel} options={CHANNELS} addActivity={addActivity} />
                  <Select label="Tone" value={tone} onChange={setTone} options={TONES} addActivity={addActivity} />
                  <Select label="Style" value={style} onChange={setStyle} options={STYLES} addActivity={addActivity} />
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-semibold">Creative Preview — {selected.name}</h3>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
                  <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white mb-4">Concept {concept}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{selected.tagline}</h2>
                  <p className="text-sm text-zinc-600">{selected.name} — {style} approach for {audience}</p>
                  <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    {COLOR_SWATCHES.map((s) => (
                      <div key={s.name} className="h-8 w-8 rounded-md shadow-sm" style={{ backgroundColor: s.hex }} title={s.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tokens section */}
          {section === "tokens" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Design Tokens</h2>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{TOKEN_ROWS.length} tokens applied</span>
                </div>
                <div className="space-y-2">
                  {TOKEN_ROWS.map((t) => (
                    <div key={t.token} className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-2.5">
                      <code className="flex-1 font-mono text-xs text-zinc-700">{t.token}</code>
                      {t.type === "color" && <div className="h-5 w-5 rounded border border-zinc-200" style={{ backgroundColor: t.value }} />}
                      <span className="text-xs text-zinc-500">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color swatches */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold">Accessibility Contrast</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {COLOR_SWATCHES.map((s) => (
                    <div key={s.name} className="rounded-lg border border-zinc-100 p-3 text-center">
                      <div className="mx-auto mb-2 h-12 w-12 rounded-lg shadow-inner" style={{ backgroundColor: s.hex }} />
                      <p className="font-mono text-xs text-zinc-700">{s.name}</p>
                      <p className="text-[11px] text-zinc-500">{s.ratio}</p>
                      <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold", s.contrast === "AAA" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{s.contrast}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Components section */}
          {section === "components" && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h2 className="mb-4 text-lg font-semibold">Component Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {GALLERY_ITEMS.map((item) => (
                  <div key={item.component} className="rounded-lg border border-zinc-200 p-4">
                    <h3 className="font-mono text-sm font-semibold text-zinc-800">{item.component}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.variants.map((v) => (
                        <span key={v} className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">{v}</span>
                      ))}
                    </div>
                    <div className="mt-3 h-16 rounded-md bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
                      <span className="text-xs text-blue-600 font-medium">{item.component} preview</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concepts section */}
          {section === "concepts" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Concept Variants</h2>
              {CONCEPTS.map((c) => {
                const isActive = c.id === concept;
                const diffs = c.id !== concept ? ["tagline", "metrics"] : [];
                return (
                  <div key={c.id} className={cn("rounded-xl border p-5 transition-all", isActive ? "border-blue-600 bg-blue-50" : "border-zinc-200 bg-white")}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Concept {c.id}</span>
                        <h3 className="text-base font-semibold">{c.name}</h3>
                        <p className="text-sm text-zinc-600">{c.tagline}</p>
                      </div>
                      {diffs.length > 0 && (
                        <div className="flex gap-1">
                          {diffs.map((d) => <span key={d} className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">~{d}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Metrics section */}
          {section === "metrics" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <h2 className="mb-4 text-lg font-semibold">Performance Metrics — {selected.name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[{ label: "Reach (K)", val: metrics.reach }, { label: "CTR (%)", val: metrics.ctr }, { label: "Conv (%)", val: metrics.conv }].map((m) => (
                    <div key={m.label} className="rounded-lg bg-zinc-50 p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{m.val}</p>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-500 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Sortable table */}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Concept</th>
                      {(["reach", "ctr", "conv"] as const).map((k) => (
                        <th key={k} className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                          <button onClick={() => { setSortKey(k); setSortAsc(!sortAsc); }} className="inline-flex items-center gap-1 hover:text-blue-600">
                            {k === "reach" ? "Reach" : k === "ctr" ? "CTR" : "Conv"} <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedConcepts.map((c) => (
                      <tr key={c.id} className={cn("border-b border-zinc-100", c.id === concept && "bg-blue-50")}>
                        <td className="py-2.5 font-medium">{c.id}: {c.name}</td>
                        <td className="py-2.5 text-right">{c.reach}K</td>
                        <td className="py-2.5 text-right">{c.ctr}%</td>
                        <td className="py-2.5 text-right">{c.conv}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* theme.json */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <h3 className="mb-3 text-sm font-semibold">theme.json</h3>
                <pre className="rounded-lg bg-zinc-900 p-4 text-xs text-green-400 overflow-x-auto">{JSON.stringify(THEME_JSON, null, 2)}</pre>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile activity + action bar */}
      <div className="border-t border-zinc-200 bg-white px-4 py-3 md:hidden">
        {activity.length > 0 && (
          <div className="mb-2 max-h-20 overflow-y-auto">
            {activity.slice(0, 3).map((a, i) => <p key={i} className="text-[11px] text-zinc-500">{a}</p>)}
          </div>
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} className="flex-1"><Save className="mr-1 h-3 w-3" />Save</Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="flex-1"><Download className="mr-1 h-3 w-3" />Export</Button>
        </div>
      </div>
    </div>
  );
}
