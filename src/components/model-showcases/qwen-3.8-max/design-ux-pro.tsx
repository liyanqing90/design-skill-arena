"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  LayoutGrid,
  Loader2,
  Mic,
  Palette,
  Save,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

const MODEL_LABEL = "Qwen 3.8 Max";
const SKILLS_LABEL = "frontend-design + ui-ux-pro-max";

const SECTIONS = [
  { key: "brief", label: "Brief", icon: FileText },
  { key: "targeting", label: "Targeting", icon: Target },
  { key: "voice", label: "Voice", icon: Mic },
  { key: "look", label: "Look", icon: Palette },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Creators"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"];
const TONES = ["Bold", "Playful", "Premium", "Calm"];
const STYLES = ["Aurora", "Sunset", "Mono", "Neon"];
const VARIANTS = ["A", "B", "C"] as const;

type Variant = (typeof VARIANTS)[number];

const VARIANT_DATA: Record<
  Variant,
  { label: string; headline: string; sub: string; reach: number; ctr: number; conv: number }
> = {
  A: {
    label: "Variant A",
    headline: "Meet the future of everyday carry",
    sub: "Designed to move with you.",
    reach: 48200,
    ctr: 3.4,
    conv: 2.1,
  },
  B: {
    label: "Variant B",
    headline: "One product. Endless possibilities.",
    sub: "Built for the way you work.",
    reach: 61500,
    ctr: 2.8,
    conv: 2.9,
  },
  C: {
    label: "Variant C",
    headline: "Less noise. More signal.",
    sub: "The launch everyone will talk about.",
    reach: 39800,
    ctr: 4.1,
    conv: 1.7,
  },
};

const STYLE_MAP: Record<string, { gradient: string; accent: string; soft: string; ink: string }> = {
  Aurora: { gradient: "linear-gradient(135deg,#6366f1,#14b8a6)", accent: "#0f766e", soft: "#ccfbf1", ink: "#042f2e" },
  Sunset: { gradient: "linear-gradient(135deg,#f97316,#ec4899)", accent: "#9a3412", soft: "#ffedd5", ink: "#431407" },
  Mono: { gradient: "linear-gradient(135deg,#111827,#9ca3af)", accent: "#111827", soft: "#f1f5f9", ink: "#0f172a" },
  Neon: { gradient: "linear-gradient(135deg,#d946ef,#06b6d4)", accent: "#701a75", soft: "#fae8ff", ink: "#4a044e" },
};

const TONE_CLASS: Record<string, string> = {
  Bold: "font-black uppercase tracking-tight",
  Playful: "font-extrabold italic tracking-tight",
  Premium: "font-serif font-medium tracking-wide",
  Calm: "font-light tracking-wide",
};

const CHANNEL_FORMAT: Record<string, { aspect: string; cls: string; tag: string }> = {
  Instagram: { aspect: "aspect-square", cls: "max-w-[420px]", tag: "1:1 · FEED" },
  TikTok: { aspect: "aspect-[9/16]", cls: "max-w-[260px]", tag: "9:16 · REEL" },
  YouTube: { aspect: "aspect-video", cls: "max-w-full", tag: "16:9 · THUMB" },
  Email: { aspect: "aspect-[4/3]", cls: "max-w-[460px]", tag: "4:3 · HERO" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

type Status = "idle" | "loading" | "success" | "error";

type FeedItem = { id: string; msg: string; time: string };

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function fmtReach(n: number) {
  return `${(n / 1000).toFixed(1)}K`;
}

const MAX_REACH = Math.max(...VARIANTS.map((v) => VARIANT_DATA[v].reach));
const MAX_CTR = Math.max(...VARIANTS.map((v) => VARIANT_DATA[v].ctr));
const MAX_CONV = Math.max(...VARIANTS.map((v) => VARIANT_DATA[v].conv));

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function MicroLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500", className)}>
      {children}
    </span>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-1",
        "hover:-translate-y-px active:translate-y-0",
        active
          ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
          : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500 hover:text-neutral-900"
      )}
    >
      {children}
    </button>
  );
}

function Bar({ label, value, display, pct }: { label: string; value: string; display: string; pct: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <MicroLabel>{label}</MicroLabel>
        <span className="font-mono text-xs font-semibold text-neutral-900">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200" title={display}>
        <div
          className="h-full rounded-full bg-neutral-900 transition-all duration-500 ease-out"
          style={{ width: `${Math.max(6, pct)}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DesignUxPro() {
  const [section, setSection] = useState<SectionKey>("brief");
  const [brief, setBrief] = useState(
    "Launch the new modular backpack line to urban commuters who value craft and speed."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<Variant>("A");
  const [gridOverlay, setGridOverlay] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: uid(), msg: "Studio session initialized", time: now() },
  ]);

  const log = (msg: string) => setFeed((prev) => [{ id: uid(), msg, time: now() }, ...prev].slice(0, 7));

  const data = VARIANT_DATA[variant];
  const palette = STYLE_MAP[style];
  const format = CHANNEL_FORMAT[channel];

  const briefHeadline = brief.trim() ? brief.trim().split(/\s+/).slice(0, 6).join(" ") : "";
  const headline = briefHeadline || data.headline;

  const handleGenerate = () => {
    if (status === "loading") return;
    setStatus("loading");
    setNote("Synthesizing creative variants…");
    log(`Generate requested · ${data.label}`);
    window.setTimeout(() => {
      if (!brief.trim()) {
        setStatus("error");
        setNote("Campaign brief is empty — add direction to generate.");
        log("Generate failed · empty brief");
      } else {
        setStatus("success");
        setNote(`Generated ${data.label} for ${channel} · ${audience}.`);
        log(`Generate complete · ${data.label}`);
      }
    }, 1200);
  };

  const handleSave = () => {
    setStatus("success");
    setNote("Snapshot saved to campaign library.");
    log("Saved campaign snapshot");
  };

  const handleExport = () => {
    setStatus("success");
    setNote("Creative package exported.");
    log("Exported creative package");
  };

  const selectVariant = (v: Variant) => {
    setVariant(v);
    log(`Switched preview to ${VARIANT_DATA[v].label}`);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Header */}
        <header className="mb-5 flex flex-col gap-3 border-b border-neutral-300 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white">
                <Sparkles className="size-3.5" />
                {MODEL_LABEL}
              </span>
              <MicroLabel className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-600">
                {SKILLS_LABEL}
              </MicroLabel>
            </div>
            <h1 className="mt-2 text-lg font-semibold tracking-tight">AI Campaign Studio · Design-Ops</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white transition-all",
                "hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2",
                "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
              )}
            >
              {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Generate
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium transition-all hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 active:translate-y-px"
            >
              <Save className="size-4" />
              Save
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium transition-all hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 active:translate-y-px"
            >
              <Download className="size-4" />
              Export
            </button>
          </div>
        </header>

        {/* Status line */}
        <div className="mb-4 min-h-[28px]">
          {status === "loading" && (
            <p className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs text-neutral-600">
              <Loader2 className="size-3.5 animate-spin" /> {note}
            </p>
          )}
          {status === "success" && (
            <p className="inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="size-3.5" /> {note}
            </p>
          )}
          {status === "error" && (
            <p className="inline-flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
              <AlertCircle className="size-3.5" /> {note}
            </p>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          {/* LEFT — system nav + active controls */}
          <aside className="min-w-0 space-y-3">
            {/* mobile select */}
            <div className="lg:hidden">
              <MicroLabel className="mb-1 block">System</MicroLabel>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value as SectionKey)}
                className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
              >
                {SECTIONS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* desktop nav */}
            <nav className="hidden lg:block">
              <MicroLabel className="mb-2 block">System</MicroLabel>
              <ul className="space-y-1">
                {SECTIONS.map((s) => {
                  const Icon = s.icon;
                  const active = section === s.key;
                  return (
                    <li key={s.key}>
                      <button
                        type="button"
                        onClick={() => setSection(s.key)}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-sm transition-all",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30",
                          active
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-white hover:text-neutral-900"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="font-mono text-xs uppercase tracking-wider">{s.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* active control group */}
            <div className="rounded-lg border border-neutral-300 bg-white p-3">
              <MicroLabel className="mb-2 block">{SECTIONS.find((s) => s.key === section)?.label}</MicroLabel>

              {section === "brief" && (
                <div className="space-y-2">
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={6}
                    placeholder="Describe the campaign direction…"
                    aria-invalid={status === "error"}
                    className={cn(
                      "w-full resize-y rounded-md border bg-white px-2.5 py-2 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30",
                      status === "error" ? "border-red-400" : "border-neutral-300"
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <MicroLabel>Brief</MicroLabel>
                    <span className="font-mono text-[10px] text-neutral-400">{brief.trim().length} chars</span>
                  </div>
                </div>
              )}

              {section === "targeting" && (
                <div className="space-y-3">
                  <div>
                    <MicroLabel className="mb-1.5 block">Audience</MicroLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {AUDIENCES.map((a) => (
                        <Chip
                          key={a}
                          active={audience === a}
                          onClick={() => {
                            setAudience(a);
                            log(`Audience set → ${a}`);
                          }}
                        >
                          {a}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <MicroLabel className="mb-1.5 block">Channel</MicroLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {CHANNELS.map((c) => (
                        <Chip
                          key={c}
                          active={channel === c}
                          onClick={() => {
                            setChannel(c);
                            log(`Channel set → ${c}`);
                          }}
                        >
                          {c}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section === "voice" && (
                <div>
                  <MicroLabel className="mb-1.5 block">Tone</MicroLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {TONES.map((t) => (
                      <Chip
                        key={t}
                        active={tone === t}
                        onClick={() => {
                          setTone(t);
                          log(`Tone set → ${t}`);
                        }}
                      >
                        {t}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {section === "look" && (
                <div>
                  <MicroLabel className="mb-1.5 block">Visual style</MicroLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {STYLES.map((s) => (
                      <Chip
                        key={s}
                        active={style === s}
                        onClick={() => {
                          setStyle(s);
                          log(`Visual style set → ${s}`);
                        }}
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* CENTER — annotated preview */}
          <main className="min-w-0">
            <div className="rounded-lg border border-neutral-300 bg-white p-3">
              {/* toolbar: A/B/C tabs + grid toggle */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div role="tablist" aria-label="Creative variants" className="inline-flex rounded-md border border-neutral-300 bg-neutral-100 p-0.5">
                  {VARIANTS.map((v) => {
                    const active = variant === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => selectVariant(v)}
                        className={cn(
                          "rounded px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30",
                          active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                        )}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setGridOverlay((g) => !g);
                    log(`Grid overlay ${!gridOverlay ? "on" : "off"}`);
                  }}
                  aria-pressed={gridOverlay}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30",
                    gridOverlay
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500"
                  )}
                >
                  <LayoutGrid className="size-3.5" />
                  Grid
                </button>
              </div>

              {/* canvas */}
              <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
                <div className={cn("relative mx-auto w-full overflow-hidden rounded-xl shadow-sm", format.aspect, format.cls)}>
                  <div className="absolute inset-0 transition-all duration-300" style={{ background: palette.gradient }} />

                  {/* grid overlay */}
                  {gridOverlay && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                        backgroundSize: "12.5% 12.5%",
                      }}
                    />
                  )}

                  {/* creative content */}
                  <div className="relative flex h-full flex-col justify-between p-4 text-white sm:p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
                        {audience}
                      </span>
                      <span className="rounded bg-black/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                        {format.tag}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={cn("break-words text-xl leading-tight text-white drop-shadow-sm sm:text-2xl", TONE_CLASS[tone])}>
                        {headline}
                      </p>
                      <p className="mt-1 text-xs text-white/85 sm:text-sm">{data.sub}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold" style={{ color: palette.ink }}>
                        Explore →
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">{data.label}</span>
                    </div>
                  </div>

                  {/* callouts */}
                  <div className="pointer-events-none absolute left-1 top-1 hidden -translate-y-0 sm:block">
                    <span className="rounded bg-white/90 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-700 shadow-sm">
                      01 · Format/{channel}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute bottom-1 left-1 hidden sm:block">
                    <span className="rounded bg-white/90 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-700 shadow-sm">
                      02 · Palette/{style}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute bottom-1 right-1 hidden sm:block">
                    <span className="rounded bg-white/90 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-700 shadow-sm">
                      03 · Voice/{tone}
                    </span>
                  </div>
                </div>
              </div>

              {/* spec rows */}
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-neutral-200 pt-3 sm:grid-cols-4">
                {[
                  ["Audience", audience],
                  ["Channel", channel],
                  ["Tone", tone],
                  ["Style", style],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt>
                      <MicroLabel>{k}</MicroLabel>
                    </dt>
                    <dd className="truncate font-mono text-xs font-semibold text-neutral-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </main>

          {/* RIGHT — metrics + tokens */}
          <aside className="min-w-0 space-y-4">
            <div className="rounded-lg border border-neutral-300 bg-white p-3">
              <div className="mb-3 flex items-center justify-between">
                <MicroLabel>Predicted metrics</MicroLabel>
                <span className="font-mono text-[10px] text-neutral-400">{data.label}</span>
              </div>
              <div className="space-y-3">
                <Bar label="Reach" value={fmtReach(data.reach)} display={`${data.reach}`} pct={(data.reach / MAX_REACH) * 100} />
                <Bar label="CTR" value={`${data.ctr.toFixed(1)}%`} display={`${data.ctr}%`} pct={(data.ctr / MAX_CTR) * 100} />
                <Bar label="Conversion" value={`${data.conv.toFixed(1)}%`} display={`${data.conv}%`} pct={(data.conv / MAX_CONV) * 100} />
              </div>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-white p-3">
              <MicroLabel className="mb-2 block">Live tokens</MicroLabel>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["aud", audience],
                  ["chn", channel],
                  ["ton", tone],
                  ["sty", style],
                  ["var", data.label],
                ].map(([k, v]) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 font-mono text-[10px] text-neutral-700"
                  >
                    <span className="text-neutral-400">{k}:</span>
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-white p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <Activity className="size-3.5 text-neutral-500" />
                <MicroLabel>Activity</MicroLabel>
              </div>
              <ul className="space-y-1.5">
                {feed.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-1.5 last:border-0 last:pb-0">
                    <span className="min-w-0 break-words text-xs text-neutral-700">{item.msg}</span>
                    <span className="shrink-0 font-mono text-[10px] text-neutral-400">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
