"use client";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  LoaderCircle,
  Save,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type GenerationState = "idle" | "loading" | "success" | "error";

const concepts = [
  {
    id: "A",
    name: "Signal Drop",
    headline: "Make the first move visible.",
    body: "A crisp product reveal built around one unmistakable moment.",
    reach: "2.8M",
    ctr: "4.8%",
    conversion: "8.4%",
    accent: "#1d4ed8",
  },
  {
    id: "B",
    name: "Everyday Lift",
    headline: "Small ritual. Major shift.",
    body: "A human-scale story that turns daily use into a launch event.",
    reach: "3.4M",
    ctr: "5.3%",
    conversion: "7.9%",
    accent: "#ea580c",
  },
  {
    id: "C",
    name: "Proof in Motion",
    headline: "See what changes next.",
    body: "A demonstration-led campaign with proof at every touchpoint.",
    reach: "2.5M",
    ctr: "6.1%",
    conversion: "9.2%",
    accent: "#047857",
  },
] as const;

const visualBackgrounds: Record<string, string> = {
  "Graphic blocks": "linear-gradient(135deg, #dbeafe 0%, #ffffff 48%, #fed7aa 100%)",
  "Editorial crop": "linear-gradient(145deg, #e0e7ff 0%, #f8fafc 52%, #fde68a 100%)",
  "Product macro": "linear-gradient(125deg, #ccfbf1 0%, #f8fafc 50%, #dbeafe 100%)",
};

export default function StandardBuilderShowcase() {
  const [brief, setBrief] = useState(
    "Launch a modular travel speaker that turns any room into a shared listening space.",
  );
  const [audience, setAudience] = useState("Urban creators");
  const [channel, setChannel] = useState("Social + OOH");
  const [tone, setTone] = useState("Confident");
  const [visual, setVisual] = useState("Graphic blocks");
  const [selectedId, setSelectedId] = useState<(typeof concepts)[number]["id"]>("A");
  const [generation, setGeneration] = useState<GenerationState>("idle");
  const [attempt, setAttempt] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [activity, setActivity] = useState([
    "Workspace opened",
    "Signal Drop selected",
    "Forecast model ready",
  ]);

  const selected = concepts.find((concept) => concept.id === selectedId) ?? concepts[0];

  const addActivity = (message: string) => {
    setActivity((items) => [message, ...items].slice(0, 5));
  };

  const selectConcept = (id: (typeof concepts)[number]["id"]) => {
    const next = concepts.find((concept) => concept.id === id) ?? concepts[0];
    setSelectedId(id);
    addActivity(`${next.name} selected`);
  };

  const generate = () => {
    const nextAttempt = attempt + 1;
    setAttempt(nextAttempt);
    setGeneration("loading");
    addActivity("Generating three campaign routes");
    window.setTimeout(() => {
      const nextState: GenerationState = nextAttempt % 2 === 0 ? "error" : "success";
      setGeneration(nextState);
      addActivity(
        nextState === "success"
          ? "New campaign routes are ready"
          : "Generation paused. Revise the brief and retry",
      );
    }, 720);
  };

  const save = () => {
    setSaved(true);
    addActivity("Draft saved to Campaign 07");
  };

  const exportCampaign = () => {
    setExported(true);
    addActivity("Export package prepared");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-700 text-white">
              <Sparkles aria-hidden="true" className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-slate-950 px-2.5 py-1 text-white">GPT 5.6 Sol</span>
                <span className="rounded-full border border-slate-300 px-2.5 py-1 text-slate-700">
                  frontend-app-builder
                </span>
              </div>
              <h1 className="mt-1 text-lg font-bold tracking-tight">Muse Campaign Studio</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex" aria-label="Campaign actions">
            <button
              type="button"
              onClick={save}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Save aria-hidden="true" className="size-4" />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={exportCampaign}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Download aria-hidden="true" className="size-4" />
              {exported ? "Export ready" : "Export"}
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={generation === "loading"}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:cursor-wait disabled:bg-blue-400"
            >
              {generation === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {generation === "loading" ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)_280px] lg:p-6">
        <aside className="order-2 rounded-2xl bg-white p-4 ring-1 ring-slate-200 lg:order-1" aria-label="Campaign brief and controls">
          <h2 className="text-sm font-bold">Campaign brief</h2>
          <label htmlFor="standard-brief" className="mt-4 block text-xs font-semibold text-slate-600">
            What are we launching?
          </label>
          <textarea
            id="standard-brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            rows={6}
            className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-3 text-base leading-6 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-200"
          />

          <fieldset className="mt-5 space-y-4">
            <legend className="text-sm font-bold">Direction</legend>
            <label className="block text-xs font-semibold text-slate-600">
              Audience
              <select
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              >
                <option>Urban creators</option>
                <option>Design-minded travelers</option>
                <option>First-apartment hosts</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-600">
              Channel
              <select
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              >
                <option>Social + OOH</option>
                <option>Creator launch film</option>
                <option>Retail + email</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-600">
              Tone
              <select
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              >
                <option>Confident</option>
                <option>Warm</option>
                <option>Provocative</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-600">
              Visual style
              <select
                value={visual}
                onChange={(event) => setVisual(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              >
                <option>Graphic blocks</option>
                <option>Editorial crop</option>
                <option>Product macro</option>
              </select>
            </label>
          </fieldset>
        </aside>

        <section className="order-1 min-w-0 rounded-2xl bg-white p-3 ring-1 ring-slate-200 sm:p-5 lg:order-2" aria-labelledby="standard-preview-title">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-xs font-semibold text-slate-500">Live creative preview</p>
              <h2 id="standard-preview-title" className="text-lg font-bold">
                {selected.name}
              </h2>
            </div>
            <div className="flex rounded-lg bg-slate-100 p-1" role="group" aria-label="Creative concepts">
              {concepts.map((concept) => (
                <button
                  key={concept.id}
                  type="button"
                  aria-pressed={selectedId === concept.id}
                  onClick={() => selectConcept(concept.id)}
                  className={`min-h-11 min-w-11 cursor-pointer rounded-md px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    selectedId === concept.id
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
                >
                  {concept.id}
                </button>
              ))}
            </div>
          </div>

          <article
            className="relative isolate flex min-h-[460px] overflow-hidden rounded-xl p-6 sm:min-h-[610px] sm:p-10"
            style={{ background: visualBackgrounds[visual] }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 top-12 size-52 rotate-12 rounded-[40px] opacity-90 transition-transform duration-300 motion-reduce:transition-none sm:size-72"
              style={{ backgroundColor: selected.accent }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-12 right-8 h-24 w-40 -rotate-6 rounded-full bg-white/80 sm:h-32 sm:w-56"
            />
            <div className="relative z-10 flex max-w-xl flex-col justify-between">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-white/90 px-3 py-1.5">{audience}</span>
                <span className="rounded-full bg-white/90 px-3 py-1.5">{channel}</span>
              </div>
              <div className="py-12">
                <p className="mb-4 text-sm font-bold" style={{ color: selected.accent }}>
                  {tone} launch direction
                </p>
                <h3 className="max-w-[12ch] text-4xl font-black leading-[0.95] tracking-[-0.035em] text-balance sm:text-6xl">
                  {selected.headline}
                </h3>
                <p className="mt-5 max-w-md text-base font-medium leading-7 text-slate-700 sm:text-lg">
                  {brief || selected.body}
                </p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <p className="max-w-xs text-sm font-semibold text-slate-700">{selected.body}</p>
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-slate-950 text-lg font-black text-white">
                  {selected.id}
                </span>
              </div>
            </div>
          </article>

          <div
            className={`mt-4 flex min-h-12 items-center gap-2 rounded-lg px-3 text-sm font-semibold ${
              generation === "error"
                ? "bg-red-50 text-red-800"
                : generation === "success"
                  ? "bg-emerald-50 text-emerald-800"
                  : generation === "loading"
                    ? "bg-blue-50 text-blue-800"
                    : "bg-slate-50 text-slate-600"
            }`}
            aria-live="polite"
            role="status"
          >
            {generation === "error" ? (
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            ) : generation === "success" ? (
              <CheckCircle2 aria-hidden="true" className="size-4 shrink-0" />
            ) : generation === "loading" ? (
              <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin motion-reduce:animate-none" />
            ) : (
              <Sparkles aria-hidden="true" className="size-4 shrink-0" />
            )}
            {generation === "error"
              ? "Generation stopped. Tighten the brief, then try again."
              : generation === "success"
                ? "Three refreshed directions are ready for review."
                : generation === "loading"
                  ? "Building copy, composition, and channel variants…"
                  : "Ready to generate from the current controls."}
          </div>
        </section>

        <aside className="order-3 space-y-4 lg:order-3" aria-label="Forecast and activity">
          <section className="rounded-2xl bg-slate-950 p-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">Prediction</h2>
              <span className="text-xs text-slate-300">Concept {selected.id}</span>
            </div>
            <dl className="mt-5 divide-y divide-white/15">
              <div className="flex items-baseline justify-between py-3">
                <dt className="text-sm text-slate-300">Reach</dt>
                <dd className="text-2xl font-black">{selected.reach}</dd>
              </div>
              <div className="flex items-baseline justify-between py-3">
                <dt className="text-sm text-slate-300">CTR</dt>
                <dd className="text-2xl font-black">{selected.ctr}</dd>
              </div>
              <div className="flex items-baseline justify-between py-3">
                <dt className="text-sm text-slate-300">Conversion</dt>
                <dd className="text-2xl font-black">{selected.conversion}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <h2 className="text-sm font-bold">Activity</h2>
            <ol className="mt-4 space-y-4">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>

      <div className="sticky bottom-0 z-20 flex gap-2 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden" aria-label="Mobile campaign actions">
        <button
          type="button"
          onClick={save}
          className="min-h-11 min-w-11 flex-1 cursor-pointer rounded-lg border border-slate-300 px-3 text-sm font-bold hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          onClick={exportCampaign}
          className="min-h-11 min-w-11 flex-1 cursor-pointer rounded-lg border border-slate-300 px-3 text-sm font-bold hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {exported ? "Ready" : "Export"}
        </button>
        <button
          type="button"
          onClick={generate}
          disabled={generation === "loading"}
          className="min-h-11 min-w-11 flex-[1.4] cursor-pointer rounded-lg bg-blue-700 px-3 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:bg-blue-400"
        >
          {generation === "loading" ? "Generating…" : "Generate"}
        </button>
      </div>
    </div>
  );
}
