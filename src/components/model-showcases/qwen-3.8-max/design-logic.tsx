"use client";

import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Download,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Parents"] as const;
const CHANNELS = ["Instagram", "TikTok", "LinkedIn", "Email"] as const;
const TONES = ["Bold", "Playful", "Premium", "Friendly"] as const;
const STYLES = ["Grid", "Mono", "Swiss", "Brutalist"] as const;

type Audience = (typeof AUDIENCES)[number];
type Channel = (typeof CHANNELS)[number];
type Tone = (typeof TONES)[number];
type Style = (typeof STYLES)[number];
type VariantKey = "A" | "B" | "C";

const TONE_HEADLINE: Record<Tone, string> = {
  Bold: "Ship something loud.",
  Playful: "Make it fun to use.",
  Premium: "Built without compromise.",
  Friendly: "Designed to be easy.",
};

const VARIANT_SUB: Record<VariantKey, string> = {
  A: "Concept A — structured announcement layout.",
  B: "Concept B — feature-led modular layout.",
  C: "Concept C — high-reach editorial layout.",
};

const VARIANTS: Record<
  VariantKey,
  { reach: string; ctr: string; conversion: string }
> = {
  A: { reach: "142,300", ctr: "3.7%", conversion: "2.4%" },
  B: { reach: "108,900", ctr: "5.1%", conversion: "4.0%" },
  C: { reach: "176,400", ctr: "2.8%", conversion: "1.7%" },
};

type Status = "idle" | "loading" | "success" | "error";
type FeedItem = { id: number; text: string; time: string };

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
      {children}
    </span>
  );
}

function OptionRows<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={cn(
              "flex items-center justify-between border-b border-neutral-100 px-1 py-1.5 text-left text-sm transition-colors last:border-b-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
              active ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            <span>{opt}</span>
            {active && <span className="size-2 rounded-full bg-amber-500" />}
          </button>
        );
      })}
    </div>
  );
}

export default function DesignLogic() {
  const [brief, setBrief] = useState(
    "Introduce the Forge mechanical keyboard: hot-swap switches, aluminum frame, focused workflow tool."
  );
  const [audience, setAudience] = useState<Audience>("Professionals");
  const [channel, setChannel] = useState<Channel>("LinkedIn");
  const [tone, setTone] = useState<Tone>("Premium");
  const [style, setStyle] = useState<Style>("Swiss");
  const [variant, setVariant] = useState<VariantKey>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 1, text: "System initialized", time: now() },
  ]);
  const idRef = useRef(2);

  const metrics = VARIANTS[variant];

  const subhead = useMemo(() => {
    const words = brief.trim().split(/\s+/).slice(0, 8).join(" ");
    return words || "Product specification summary.";
  }, [brief]);

  function log(text: string) {
    setFeed((prev) =>
      [{ id: idRef.current++, text, time: now() }, ...prev].slice(0, 8)
    );
  }

  function handleGenerate() {
    if (!brief.trim()) {
      setStatus("error");
      log("ERROR — brief module empty");
      return;
    }
    setStatus("loading");
    log(`Compiling spec / ${variant}`);
    window.setTimeout(() => {
      setStatus("success");
      log(`Compiled spec / ${variant}`);
    }, 1200);
  }

  function selectVariant(v: VariantKey) {
    setVariant(v);
    log(`Active concept → ${v}`);
  }

  type Step = {
    n: number;
    title: string;
    body: React.ReactNode;
  };

  const steps: Step[] = [
    {
      n: 1,
      title: "Brief",
      body: (
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={4}
          placeholder="Define the product and goal…"
          className={cn(
            "w-full resize-y rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-sm text-neutral-800",
            "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
            status === "error" && "border-red-400"
          )}
        />
      ),
    },
    {
      n: 2,
      title: "Audience",
      body: (
        <OptionRows options={AUDIENCES} value={audience} onChange={setAudience} />
      ),
    },
    {
      n: 3,
      title: "Channel",
      body: (
        <OptionRows options={CHANNELS} value={channel} onChange={setChannel} />
      ),
    },
    {
      n: 4,
      title: "Tone",
      body: <OptionRows options={TONES} value={tone} onChange={setTone} />,
    },
    {
      n: 5,
      title: "Style",
      body: <OptionRows options={STYLES} value={style} onChange={setStyle} />,
    },
  ];

  const railCard = (step: Step) => (
    <div
      key={step.n}
      className="rounded-lg border border-neutral-200 bg-white p-3"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex size-5 items-center justify-center rounded bg-neutral-900 font-mono text-[10px] font-semibold text-white">
          {step.n}
        </span>
        <MicroLabel>{step.title}</MicroLabel>
      </div>
      {step.body}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <div>
            <div className="text-sm font-semibold tracking-tight">
              Muse — Campaign Studio
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-600">
                Qwen 3.8 Max
              </span>
              <span className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-600">
                frontend-design
              </span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => log("Saved spec")}
              className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Save className="size-3.5" /> Save
            </button>
            <button
              type="button"
              onClick={() => log("Exported spec")}
              className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Download className="size-3.5" /> Export
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="flex h-8 items-center gap-1.5 rounded-md bg-neutral-900 px-3 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" /> Compiling
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" /> Generate
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* LEFT rail */}
        <aside>
          <div className="mb-2 flex items-center justify-between">
            <MicroLabel>Modules</MicroLabel>
            <span className="font-mono text-[10px] text-neutral-400">05</span>
          </div>

          {/* Desktop: stacked cards */}
          <div className="hidden flex-col gap-3 lg:flex">
            {steps.map(railCard)}
          </div>

          {/* Mobile: accordion */}
          <div className="flex flex-col gap-2 lg:hidden">
            {steps.map((step) => (
              <details
                key={step.n}
                open={step.n === 1}
                className="group rounded-lg border border-neutral-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center gap-2 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                  <span className="flex size-5 items-center justify-center rounded bg-neutral-900 font-mono text-[10px] font-semibold text-white">
                    {step.n}
                  </span>
                  <MicroLabel>{step.title}</MicroLabel>
                  <ChevronDown className="ml-auto size-4 text-neutral-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-3 pb-3">{step.body}</div>
              </details>
            ))}
          </div>
        </aside>

        {/* CENTER */}
        <section className="flex flex-col gap-4">
          {/* status line */}
          <div className="flex items-center gap-2 text-xs">
            {status === "loading" && (
              <span className="flex items-center gap-1.5 text-neutral-500">
                <Loader2 className="size-3.5 animate-spin" /> Compiling spec…
              </span>
            )}
            {status === "success" && (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="size-3.5" /> Spec compiled
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1.5 text-red-600">
                <AlertTriangle className="size-3.5" /> Brief module required
              </span>
            )}
            {status === "idle" && (
              <span className="text-neutral-400">Awaiting input</span>
            )}
          </div>

          {/* A/B/C segmented control */}
          <div className="flex items-center gap-3">
            <MicroLabel>Concept</MicroLabel>
            <div className="inline-flex rounded-md border border-neutral-300 bg-white p-0.5">
              {(Object.keys(VARIANTS) as VariantKey[]).map((v) => {
                const active = v === variant;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectVariant(v)}
                    className={cn(
                      "rounded px-4 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                      active
                        ? "bg-amber-500 text-white"
                        : "text-neutral-500 hover:text-neutral-800"
                    )}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spec sheet preview */}
          <div className="overflow-hidden rounded-lg border border-neutral-300 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2">
              <MicroLabel>Spec Sheet / {variant}</MicroLabel>
              <span className="font-mono text-[10px] text-neutral-400">
                {style}
              </span>
            </div>
            <div className="grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-4 sm:col-span-2">
                <MicroLabel>Headline</MicroLabel>
                <h2 className="mt-1 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {TONE_HEADLINE[tone]}
                </h2>
                <div className="mt-3">
                  <MicroLabel>Subhead</MicroLabel>
                  <p className="mt-1 text-sm text-neutral-600">{subhead}</p>
                </div>
                <p className="mt-3 text-xs text-neutral-500">
                  {VARIANT_SUB[variant]}
                </p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-neutral-200 sm:grid-cols-1 sm:divide-x-0 sm:divide-y">
                {[
                  { label: "Channel", value: channel },
                  { label: "Tone", value: tone },
                  { label: "Audience", value: audience },
                  { label: "Style", value: style },
                ].map((cell) => (
                  <div key={cell.label} className="p-3">
                    <MicroLabel>{cell.label}</MicroLabel>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium text-neutral-800">
                        {cell.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics table */}
          <div className="overflow-hidden rounded-lg border border-neutral-300 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2">
              <MicroLabel>Predicted Metrics</MicroLabel>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                    Metric
                  </th>
                  <th className="px-4 py-2 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                    Value / {variant}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  { label: "Reach", value: metrics.reach },
                  { label: "CTR", value: metrics.ctr },
                  { label: "Conversion", value: metrics.conversion },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-2.5 text-neutral-600">
                      {row.label}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold tabular-nums text-neutral-900">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity log */}
          <div className="rounded-lg border border-neutral-300 bg-white p-4">
            <div className="mb-2">
              <MicroLabel>Activity Log</MicroLabel>
            </div>
            <ul className="flex flex-col gap-1.5">
              {feed.map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline gap-2 font-mono text-[11px]"
                >
                  <span className="tabular-nums text-neutral-400">
                    {item.time}
                  </span>
                  <span className="text-neutral-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
