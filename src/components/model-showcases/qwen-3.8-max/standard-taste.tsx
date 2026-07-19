"use client";

import { useState } from "react";
import { Loader2, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Cultured Millennials", "Design Insiders", "Weekend Explorers", "Young Families"];
const CHANNELS = ["Print + Digital", "Instagram", "Pinterest", "Newsletter"];
const TONES = ["Considered", "Warm", "Confident", "Poetic"];
const STYLES = ["Terracotta", "Sage", "Ink Blue", "Ochre"];

const STYLE_COLOR: Record<string, string> = {
  Terracotta: "#bd5d3a",
  Sage: "#7f8f6f",
  "Ink Blue": "#2e3d52",
  Ochre: "#c69a3d",
};

const TONE_HEADLINE: Record<string, string> = {
  Considered: "Made to Be Kept",
  Warm: "A Little More Human",
  Confident: "Quietly, Undeniably Good",
  Poetic: "The Art of the Everyday",
};

type VariantKey = "A" | "B" | "C";

const VARIANTS: Record<
  VariantKey,
  { name: string; standfirst: string; reach: number; ctr: number; conversion: number }
> = {
  A: {
    name: "The Profile",
    standfirst:
      "An intimate portrait of the people behind the product, and the craft that shaped it.",
    reach: 44800,
    ctr: 3.1,
    conversion: 2.4,
  },
  B: {
    name: "The Spread",
    standfirst:
      "A full-bleed visual essay that lets the object speak for itself, without ornament.",
    reach: 58300,
    ctr: 3.9,
    conversion: 1.9,
  },
  C: {
    name: "The Letter",
    standfirst:
      "A personal note to the reader — restrained, sincere, and easy to pass along.",
    reach: 37600,
    ctr: 2.6,
    conversion: 3.5,
  },
};

type Status = "idle" | "loading" | "success" | "error";
type FeedItem = { id: number; text: string };

let fid = 0;

const SERIF = "'Iowan Old Style','Palatino Linotype','Book Antiqua',Georgia,serif";

function OptionList({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-400">
        {label}
      </span>
      <ul className="flex flex-col">
        {options.map((opt, i) => {
          const on = opt === value;
          return (
            <li key={opt} className={cn(i !== 0 && "border-t border-stone-200")}>
              <button
                type="button"
                onClick={() => onChange(opt)}
                aria-pressed={on}
                className={cn(
                  "group flex w-full items-center justify-between py-2 text-left text-sm transition-colors",
                  "focus:outline-none focus-visible:text-stone-900",
                  on ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                )}
              >
                <span className={cn(on && "font-medium")}>{opt}</span>
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-all",
                    on ? "bg-stone-900" : "bg-transparent group-hover:bg-stone-300"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function StandardTasteShowcase() {
  const [brief, setBrief] = useState(
    "Introduce a hand-thrown ceramic pour-over set. Audience values slow living and honest materials."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<VariantKey>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [feed, setFeed] = useState<FeedItem[]>([{ id: fid++, text: "Editorial session opened" }]);

  const push = (text: string) => setFeed((f) => [{ id: fid++, text }, ...f].slice(0, 6));

  const active = VARIANTS[variant];
  const accent = STYLE_COLOR[style];

  const handleGenerate = () => {
    if (status === "loading") return;
    if (brief.trim().length === 0) {
      setStatus("error");
      push("Generation halted — brief is empty");
      return;
    }
    setStatus("loading");
    push("Composing layouts…");
    setTimeout(() => {
      setStatus("success");
      push(`Set variant ${variant} for ${channel}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-stone-900">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Masthead */}
        <header className="mb-10 border-b border-stone-300 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-stone-400">
                Muse · AI Campaign Studio
              </p>
              <h1 className="mt-2 text-3xl leading-tight tracking-tight sm:text-4xl" style={{ fontFamily: SERIF }}>
                The Launch Editorial
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
              <span className="font-medium text-stone-900">Qwen 3.8 Max</span>
              <span className="hidden h-3 w-px bg-stone-300 sm:inline-block" />
              <span>frontend-app-builder + taste-skill</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left — controls */}
          <aside className="flex flex-col gap-8 lg:col-span-3">
            <div className="flex flex-col">
              <span className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-400">
                Campaign Brief
              </span>
              <textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value);
                  if (status === "error" && e.target.value.trim().length > 0) setStatus("idle");
                }}
                placeholder="Describe the product and intent…"
                className={cn(
                  "min-h-28 w-full resize-none border-b border-stone-300 bg-transparent pb-2 text-sm leading-relaxed text-stone-700 transition-colors",
                  "placeholder:text-stone-400 focus:border-stone-900 focus:outline-none",
                  status === "error" && "border-red-400"
                )}
              />
              {status === "error" && (
                <span className="mt-2 text-xs text-red-500">A brief is required to compose.</span>
              )}
            </div>

            <OptionList label="Audience" options={AUDIENCES} value={audience} onChange={(v) => { setAudience(v); push(`Audience — ${v}`); }} />
            <OptionList label="Channel" options={CHANNELS} value={channel} onChange={(v) => { setChannel(v); push(`Channel — ${v}`); }} />
            <OptionList label="Tone" options={TONES} value={tone} onChange={(v) => { setTone(v); push(`Tone — ${v}`); }} />
            <OptionList label="Visual Style" options={STYLES} value={style} onChange={(v) => { setStyle(v); push(`Palette — ${v}`); }} />
          </aside>

          {/* Center — magazine preview */}
          <main className="lg:col-span-6">
            {/* Variant tabs */}
            <div className="mb-5 flex items-center gap-6 border-b border-stone-300">
              {(["A", "B", "C"] as VariantKey[]).map((v) => {
                const on = v === variant;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => { setVariant(v); push(`Turned to variant ${v}`); }}
                    aria-pressed={on}
                    className={cn(
                      "-mb-px border-b-2 pb-2 text-sm transition-colors focus:outline-none focus-visible:text-stone-900",
                      on
                        ? "border-stone-900 font-medium text-stone-900"
                        : "border-transparent text-stone-400 hover:text-stone-600"
                    )}
                  >
                    {v} · {VARIANTS[v].name}
                  </button>
                );
              })}
            </div>

            {/* Spread */}
            <article className="border border-stone-300 bg-[#fbf9f4]">
              <div className="flex flex-col sm:flex-row">
                {/* Color block */}
                <div
                  className="flex shrink-0 items-end p-5 transition-colors duration-500 sm:w-2/5"
                  style={{ backgroundColor: accent, minHeight: "12rem" }}
                >
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/80">
                    {style}
                  </span>
                </div>
                {/* Text */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-stone-400">
                      {channel} · {active.name}
                    </p>
                    {status === "loading" ? (
                      <div className="mt-6 flex items-center gap-2 text-sm text-stone-400">
                        <Loader2 className="size-4 animate-spin" /> Composing the spread…
                      </div>
                    ) : (
                      <>
                        <h2
                          className="mt-4 text-4xl leading-[1.05] tracking-tight sm:text-5xl"
                          style={{ fontFamily: SERIF }}
                        >
                          {TONE_HEADLINE[tone]}
                        </h2>
                        <p className="mt-4 max-w-prose text-sm leading-relaxed text-stone-600">
                          {active.standfirst}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-4 text-[0.65rem] uppercase tracking-[0.2em] text-stone-400">
                    <span>{audience}</span>
                    <span className="text-2xl text-stone-300" style={{ fontFamily: SERIF }}>
                      {variant}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {status === "success" && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
                <Check className="size-3.5" /> Variant {variant} composed for {channel}.
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={status === "loading"}
                className={cn(
                  "inline-flex items-center gap-2 bg-stone-900 px-5 py-2 text-sm font-medium text-[#f7f3ec] transition-colors",
                  "hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ec]",
                  "disabled:opacity-60"
                )}
              >
                {status === "loading" && <Loader2 className="size-4 animate-spin" />}
                {status === "loading" ? "Composing…" : "Generate"}
              </button>
              <button
                type="button"
                onClick={() => push("Draft saved to library")}
                className="border border-stone-300 px-5 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ec]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => push("Exported spread as PDF")}
                className="inline-flex items-center gap-1 px-2 py-2 text-sm font-medium text-stone-500 underline-offset-4 transition-colors hover:text-stone-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                Export <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </main>

          {/* Right — metrics + activity */}
          <aside className="flex flex-col gap-8 lg:col-span-3">
            <div className="flex flex-col">
              <span className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-400">
                Predicted Metrics
              </span>
              {[
                { label: "Reach", value: active.reach.toLocaleString() },
                { label: "CTR", value: `${active.ctr.toFixed(1)}%` },
                { label: "Conversion", value: `${active.conversion.toFixed(1)}%` },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "flex items-baseline justify-between py-3",
                    i !== 0 && "border-t border-stone-200"
                  )}
                >
                  <span className="text-sm text-stone-500">{m.label}</span>
                  <span className="text-xl tabular-nums" style={{ fontFamily: SERIF }}>
                    {m.value}
                  </span>
                </div>
              ))}
              <p className="mt-2 text-xs leading-relaxed text-stone-400">
                Figures reflect variant {variant}.
              </p>
            </div>

            <div className="flex flex-col">
              <span className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-400">
                Activity
              </span>
              <ul className="flex flex-col">
                {feed.map((item, i) => (
                  <li
                    key={item.id}
                    className={cn(
                      "py-2 text-sm leading-relaxed text-stone-600",
                      i !== 0 && "border-t border-stone-200"
                    )}
                  >
                    {item.text}
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
