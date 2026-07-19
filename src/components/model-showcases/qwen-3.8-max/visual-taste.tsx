"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Feather,
  ArrowUpRight,
  Loader2,
  AlertTriangle,
  Check,
  Save,
  Download,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODEL_LABEL = "Qwen 3.8 Max";
const SKILLS_LABEL = "frontend-skill + taste-skill";

const SERIF = 'Georgia, "Iowan Old Style", "Times New Roman", serif';

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Creators"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"];
const TONES = ["Bold", "Playful", "Premium", "Minimal"];
const STYLES = ["Ember", "Dune", "Ink", "Clay"];

const STYLE_ART: Record<string, string> = {
  Ember:
    "radial-gradient(120% 120% at 20% 15%, #d97a52 0%, #a8492e 38%, #3a2119 78%, #1c1310 100%)",
  Dune:
    "radial-gradient(120% 120% at 80% 10%, #e7c79a 0%, #c98f5f 40%, #6d4a34 78%, #241a14 100%)",
  Ink: "radial-gradient(120% 120% at 30% 20%, #5b534c 0%, #342d28 45%, #1b1613 80%, #100c0a 100%)",
  Clay:
    "radial-gradient(120% 120% at 70% 80%, #cf8b74 0%, #a75f52 42%, #4a2c28 80%, #1d1310 100%)",
};

const TONE_HEADLINES: Record<string, string> = {
  Bold: "The launch that refuses to whisper.",
  Playful: "A small joy, made for every day.",
  Premium: "Considered. Quiet. Unmistakable.",
  Minimal: "Nothing extra. Everything essential.",
};

type VariantKey = "A" | "B" | "C";

const VARIANTS: Record<
  VariantKey,
  { num: string; title: string; note: string; reach: number; ctr: number; conv: number }
> = {
  A: { num: "01", title: "The Statement", note: "One line, held in space.", reach: 118000, ctr: 4.3, conv: 3.0 },
  B: { num: "02", title: "The Portrait", note: "Product, softly lit.", reach: 92400, ctr: 5.5, conv: 2.6 },
  C: { num: "03", title: "The Detail", note: "Texture up close.", reach: 141600, ctr: 3.8, conv: 4.0 },
};

const CREAM = "#f2e9dc";
const TERRA = "#cf7a54";

function formatReach(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
}
function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

type Activity = { id: number; text: string; time: string };

export default function VisualTaste() {
  const [brief, setBrief] = useState(
    "Introduce the new product as a quiet, well-made object people will want to keep."
  );
  const [audience, setAudience] = useState(AUDIENCES[1]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[2]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<VariantKey>("A");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activity, setActivity] = useState<Activity[]>([
    { id: 1, text: "Studio opened", time: timeNow() },
  ]);

  const idRef = useRef(2);
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (genTimer.current) clearTimeout(genTimer.current);
    };
  }, []);

  const pushActivity = (text: string) =>
    setActivity((prev) => [{ id: idRef.current++, text, time: timeNow() }, ...prev].slice(0, 5));

  const active = VARIANTS[variant];
  const artStyle = useMemo(() => ({ background: STYLE_ART[style] }), [style]);
  const headline = TONE_HEADLINES[tone];

  const handleGenerate = () => {
    if (status === "loading") return;
    if (!brief.trim()) {
      setStatus("error");
      pushActivity("Could not generate — brief empty");
      return;
    }
    setStatus("loading");
    pushActivity(`Composing ${active.title.toLowerCase()}`);
    genTimer.current = setTimeout(() => {
      setStatus("success");
      pushActivity(`${active.title} composed`);
    }, 1200);
  };

  const handleSave = () => pushActivity("Draft saved");
  const handleExport = () => pushActivity("Artwork exported");

  const selectVariant = (key: VariantKey) => {
    setVariant(key);
    pushActivity(`Viewing ${VARIANTS[key].title}`);
  };

  const underlineSelect = (
    label: string,
    value: string,
    options: string[],
    onChange: (v: string) => void
  ) => (
    <label className="flex min-w-[7.5rem] flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.18em] text-[#a99a89]">{label}</span>
      <select
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          pushActivity(`${label} → ${e.target.value}`);
        }}
        className="cursor-pointer appearance-none border-0 border-b border-[#4a3d33] bg-transparent pb-1 pr-4 text-sm text-[#f2e9dc] transition-colors duration-200 hover:border-[#cf7a54] focus:border-[#cf7a54] focus:outline-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23cf7a54' stroke-width='1.4' fill='none'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#241b15] text-[#f2e9dc]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );

  const stats = [
    { label: "Reach", value: formatReach(active.reach) },
    { label: "CTR", value: `${active.ctr.toFixed(1)}%` },
    { label: "Conversion", value: `${active.conv.toFixed(1)}%` },
  ];

  return (
    <div className="min-h-screen w-full bg-[#1a1310] text-[#f2e9dc]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Slim top band */}
        <header className="flex flex-col gap-6 border-b border-[#3a2e25] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Feather className="size-5" style={{ color: TERRA }} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-semibold tracking-tight">{MODEL_LABEL}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#a99a89]">
                  {SKILLS_LABEL}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#a99a89]">
              <span className="hidden sm:inline">Campaign Studio</span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-300",
                    status === "loading" && "animate-pulse bg-[#e0b04a]",
                    status === "success" && "bg-emerald-400",
                    status === "error" && "bg-red-400",
                    status === "idle" && "bg-[#6b5b4d]"
                  )}
                />
                {status === "loading"
                  ? "Composing"
                  : status === "success"
                    ? "Ready"
                    : status === "error"
                      ? "Needs brief"
                      : "Idle"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {underlineSelect("Audience", audience, AUDIENCES, setAudience)}
            {underlineSelect("Channel", channel, CHANNELS, setChannel)}
            {underlineSelect("Tone", tone, TONES, setTone)}
            {underlineSelect("Visual Style", style, STYLES, setStyle)}
          </div>
        </header>

        {/* Brief */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-[7rem_1fr]">
          <span className="pt-2 text-[10px] uppercase tracking-[0.18em] text-[#a99a89]">Brief</span>
          <textarea
            value={brief}
            onChange={(e) => {
              setBrief(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            rows={2}
            placeholder="What are we making, and how should it feel?"
            className={cn(
              "w-full resize-none border-0 border-b bg-transparent pb-2 text-lg leading-relaxed transition-colors duration-200 placeholder:text-[#6b5b4d] focus:outline-none",
              status === "error" ? "border-red-400/70" : "border-[#3a2e25] focus:border-[#cf7a54]"
            )}
            style={{ fontFamily: SERIF, color: CREAM }}
          />
        </div>

        {status === "error" && (
          <p className="mt-3 flex items-center gap-2 text-sm text-red-300/90">
            <AlertTriangle className="size-4" /> The brief is empty — add a sentence so the studio can compose.
          </p>
        )}

        {/* Artwork preview */}
        <figure className="mt-8">
          <div
            className="relative flex aspect-[16/11] w-full items-end overflow-hidden rounded-sm transition-all duration-500 sm:aspect-[16/9]"
            style={artStyle}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 7px)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

            <div className="absolute left-5 top-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70 sm:left-8 sm:top-7">
              {active.num} — {active.title}
            </div>
            <div className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.22em] text-white/60 sm:right-8 sm:top-7">
              {channel}
            </div>

            <figcaption className="relative w-full p-6 sm:p-10">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/70">
                {audience} · {tone} · {style}
              </p>
              <h2
                className="max-w-2xl text-3xl leading-[1.08] text-white drop-shadow-sm transition-all duration-500 sm:text-5xl"
                style={{
                  fontFamily: SERIF,
                  fontWeight: tone === "Bold" ? 700 : tone === "Minimal" ? 400 : 500,
                }}
              >
                {headline}
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/75" style={{ fontFamily: SERIF }}>
                {active.note} A {tone.toLowerCase()} concept for {audience}, built for {channel}.
              </p>
            </figcaption>

            {status === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1310]/45 backdrop-blur-[2px]">
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <Loader2 className="size-5 animate-spin" style={{ color: TERRA }} />
                  Composing artwork…
                </div>
              </div>
            )}
            {status === "success" && (
              <div className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] text-white/90 backdrop-blur-sm sm:bottom-7 sm:right-8">
                <Check className="size-3.5 text-emerald-300" /> Composed
              </div>
            )}
          </div>

          {/* Quiet inline stats */}
          <div className="mt-6 flex flex-wrap items-stretch gap-y-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-1 flex-col gap-1 px-5 first:pl-0",
                  i > 0 && "border-l border-[#3a2e25]"
                )}
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#a99a89]">
                  {s.label}
                </span>
                <span
                  className="text-2xl tabular-nums transition-all duration-300"
                  style={{ fontFamily: SERIF, color: CREAM }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </figure>

        {/* Variant editorial cards */}
        <section className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-[#a99a89]">Variants</h3>
            <span className="h-px flex-1 bg-[#3a2e25]" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(Object.keys(VARIANTS) as VariantKey[]).map((key) => {
              const v = VARIANTS[key];
              const selected = variant === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectVariant(key)}
                  className={cn(
                    "group flex flex-col gap-3 border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cf7a54] active:scale-[0.99]",
                    selected
                      ? "border-[#cf7a54] bg-[#241b15]"
                      : "border-[#3a2e25] bg-transparent hover:border-[#6b5b4d] hover:bg-[#201812]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-3xl transition-colors duration-200"
                      style={{ fontFamily: SERIF, color: selected ? TERRA : "#6b5b4d" }}
                    >
                      {v.num}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-4 transition-all duration-200",
                        selected ? "text-[#cf7a54]" : "text-[#6b5b4d] group-hover:text-[#a99a89]"
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ fontFamily: SERIF, color: CREAM }}>
                      {v.title}
                    </p>
                    <p className="mt-1 text-xs text-[#a99a89]">{v.note}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#3a2e25] pt-6">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium text-[#1a1310] transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cf7a54] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: TERRA }}
          >
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
            {status === "loading" ? "Composing" : "Generate"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-sm border border-[#4a3d33] px-5 py-2.5 text-sm text-[#f2e9dc] transition-all duration-200 hover:border-[#cf7a54] hover:text-[#cf7a54] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cf7a54] active:scale-[0.98]"
          >
            <Save className="size-4" /> Save
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-sm border border-[#4a3d33] px-5 py-2.5 text-sm text-[#f2e9dc] transition-all duration-200 hover:border-[#cf7a54] hover:text-[#cf7a54] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cf7a54] active:scale-[0.98]"
          >
            <Download className="size-4" /> Export
          </button>
        </div>

        {/* Activity footnote */}
        <footer className="mt-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6b5b4d]">Recent</p>
          <ul className="space-y-1">
            {activity.map((a) => (
              <li key={a.id} className="flex items-baseline gap-3 text-xs text-[#a99a89]">
                <span className="tabular-nums text-[#6b5b4d]">{a.time}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}
