"use client";

import {
  AlertTriangle,
  Aperture,
  CheckCircle2,
  Download,
  LoaderCircle,
  Save,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

type RenderState = "idle" | "loading" | "success" | "error";

const galleryConcepts = [
  {
    id: "A",
    name: "Afterglow",
    headline: "Carry the room with you.",
    note: "An atmospheric launch film that follows sound from dusk into night.",
    reach: "3.1M",
    ctr: "5.6%",
    conversion: "8.1%",
    color: "#ff5c35",
    secondary: "#f4d35e",
  },
  {
    id: "B",
    name: "Close Range",
    headline: "Built for the distance between us.",
    note: "Tactile close-ups make the product feel personal before it feels technical.",
    reach: "2.7M",
    ctr: "6.3%",
    conversion: "9.0%",
    color: "#39ffbd",
    secondary: "#2d6cdf",
  },
  {
    id: "C",
    name: "Open Frequency",
    headline: "Let every place become the venue.",
    note: "A panoramic social series that transforms overlooked spaces through sound.",
    reach: "3.8M",
    ctr: "4.9%",
    conversion: "7.6%",
    color: "#ff8bd7",
    secondary: "#8b5cf6",
  },
] as const;

const canvasStyles: Record<string, string> = {
  "Light trails": "radial-gradient(circle at 72% 34%, rgba(255,255,255,.16), transparent 28%), linear-gradient(145deg, #11131a 0%, #1e2635 48%, #08090d 100%)",
  "Soft grain": "radial-gradient(circle at 28% 70%, rgba(255,255,255,.12), transparent 32%), linear-gradient(125deg, #17120f 0%, #2a2521 45%, #09090b 100%)",
  "Color field": "linear-gradient(125deg, #0a1226 0%, #25113b 50%, #090b12 100%)",
};

export default function VisualFrontendShowcase() {
  const [brief, setBrief] = useState(
    "Introduce a portable speaker as the object that turns unplanned moments into shared memories.",
  );
  const [audience, setAudience] = useState("Culture seekers");
  const [channel, setChannel] = useState("Launch film");
  const [tone, setTone] = useState("Cinematic");
  const [visual, setVisual] = useState("Light trails");
  const [activeId, setActiveId] = useState<(typeof galleryConcepts)[number]["id"]>("A");
  const [renderState, setRenderState] = useState<RenderState>("idle");
  const [runs, setRuns] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [activity, setActivity] = useState(["Afterglow opened", "Film palette calibrated"]);

  const active = galleryConcepts.find((concept) => concept.id === activeId) ?? galleryConcepts[0];

  const log = (message: string) => setActivity((items) => [message, ...items].slice(0, 4));

  const chooseConcept = (id: (typeof galleryConcepts)[number]["id"]) => {
    const next = galleryConcepts.find((concept) => concept.id === id) ?? galleryConcepts[0];
    setActiveId(id);
    log(`${next.name} placed on stage`);
  };

  const generate = () => {
    const nextRun = runs + 1;
    setRuns(nextRun);
    setRenderState("loading");
    log("Rendering new frames");
    window.setTimeout(() => {
      const outcome: RenderState = nextRun % 2 === 0 ? "error" : "success";
      setRenderState(outcome);
      log(outcome === "success" ? "Three visual routes rendered" : "Render interrupted. Adjust the brief");
    }, 840);
  };

  const save = () => {
    setSaved(true);
    log("Gallery draft saved");
  };

  const exportSet = () => {
    setExported(true);
    log("Presentation frames packaged");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090d] text-white">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Aperture aria-hidden="true" className="size-8 shrink-0 text-[#ff6b4a]" />
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">Muse / Visual Gallery</h1>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/70">
              <span className="font-bold text-white">GPT 5.6 Sol</span>
              <span>frontend-skill</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex" aria-label="Gallery actions">
          <button
            type="button"
            onClick={save}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73]"
          >
            <Save aria-hidden="true" className="size-4" />
            {saved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={exportSet}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73]"
          >
            <Download aria-hidden="true" className="size-4" />
            {exported ? "Ready" : "Export"}
          </button>
          <button
            type="button"
            onClick={generate}
            disabled={renderState === "loading"}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-black transition-colors hover:bg-[#ffb09e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:bg-white/50"
          >
            {renderState === "loading" ? (
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
            ) : (
              <WandSparkles aria-hidden="true" className="size-4" />
            )}
            {renderState === "loading" ? "Rendering…" : "Generate"}
          </button>
        </div>
      </header>

      <div className="grid gap-0 xl:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="order-2 border-t border-white/10 bg-[#0d0f15] p-4 xl:order-1 xl:min-h-[calc(100vh-74px)] xl:border-r xl:border-t-0" aria-label="Visual controls">
          <h2 className="text-sm font-semibold">Control rail</h2>
          <label htmlFor="visual-brief" className="mt-5 block text-xs font-semibold text-white/65">
            Campaign brief
          </label>
          <textarea
            id="visual-brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            rows={6}
            className="mt-2 w-full resize-none rounded-lg border border-white/15 bg-black/30 p-3 text-base leading-6 text-white outline-none transition-colors placeholder:text-white/60 hover:border-white/30 focus:border-[#ff8b73] focus:ring-2 focus:ring-[#ff8b73]/30"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <label className="text-xs font-semibold text-white/65">
              Audience
              <select
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/15 bg-[#151821] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#ff8b73] focus:ring-2 focus:ring-[#ff8b73]/30"
              >
                <option>Culture seekers</option>
                <option>Nightlife creators</option>
                <option>Weekend collectives</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-white/65">
              Channel
              <select
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/15 bg-[#151821] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#ff8b73] focus:ring-2 focus:ring-[#ff8b73]/30"
              >
                <option>Launch film</option>
                <option>Social stories</option>
                <option>Digital billboards</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-white/65">
              Tone
              <select
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/15 bg-[#151821] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#ff8b73] focus:ring-2 focus:ring-[#ff8b73]/30"
              >
                <option>Cinematic</option>
                <option>Intimate</option>
                <option>Electric</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-white/65">
              Visual style
              <select
                value={visual}
                onChange={(event) => setVisual(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/15 bg-[#151821] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#ff8b73] focus:ring-2 focus:ring-[#ff8b73]/30"
              >
                <option>Light trails</option>
                <option>Soft grain</option>
                <option>Color field</option>
              </select>
            </label>
          </div>

          <section className="mt-6 border-t border-white/10 pt-4" aria-labelledby="visual-activity-heading">
            <h2 id="visual-activity-heading" className="text-xs font-semibold text-white/60">
              Activity
            </h2>
            <ol className="mt-3 space-y-3">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="text-sm leading-5 text-white/80">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-6 grid grid-cols-3 gap-2 md:hidden" aria-label="Mobile gallery actions">
            <button
              type="button"
              onClick={save}
              className="min-h-11 cursor-pointer rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73]"
            >
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={exportSet}
              className="min-h-11 cursor-pointer rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73]"
            >
              {exported ? "Ready" : "Export"}
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={renderState === "loading"}
              className="min-h-11 cursor-pointer rounded-lg bg-white px-2 text-sm font-bold text-black hover:bg-[#ffb09e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73] disabled:cursor-wait disabled:opacity-60"
            >
              {renderState === "loading" ? "Rendering…" : "Generate"}
            </button>
          </div>
        </aside>

        <section className="order-1 min-w-0 p-3 sm:p-5 xl:order-2" aria-labelledby="visual-stage-heading">
          <div
            className="relative isolate min-h-[540px] overflow-hidden rounded-xl sm:min-h-[720px]"
            style={{ background: canvasStyles[visual] }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-24 top-[18%] h-60 w-[75%] rotate-[-12deg] rounded-[50%] opacity-70 blur-2xl transition-colors duration-300 motion-reduce:transition-none sm:h-72"
              style={{ backgroundColor: active.color }}
            />
            <div
              aria-hidden="true"
              className="absolute -left-20 bottom-[22%] h-48 w-[65%] rotate-12 rounded-[50%] opacity-45 blur-3xl"
              style={{ backgroundColor: active.secondary }}
            />

            <div className="absolute left-4 top-4 z-10 text-xs font-semibold text-white/70 sm:left-7 sm:top-7">
              {tone} / {channel}
            </div>

            <dl className="absolute right-4 top-4 z-10 grid grid-cols-3 gap-1 rounded-lg bg-black/55 p-2 text-right sm:right-7 sm:top-7 sm:gap-4 sm:p-3" aria-label={`Predictions for ${active.name}`}>
              <div>
                <dt className="text-[10px] text-white/60">Reach</dt>
                <dd className="text-sm font-bold sm:text-base">{active.reach}</dd>
              </div>
              <div>
                <dt className="text-[10px] text-white/60">CTR</dt>
                <dd className="text-sm font-bold sm:text-base">{active.ctr}</dd>
              </div>
              <div>
                <dt className="text-[10px] text-white/60">Conversion</dt>
                <dd className="text-sm font-bold sm:text-base">{active.conversion}</dd>
              </div>
            </dl>

            <article className="relative z-[1] flex min-h-[540px] flex-col justify-center px-5 py-24 sm:min-h-[720px] sm:px-12 lg:px-[8vw]">
              <p className="mb-5 max-w-md text-sm font-semibold" style={{ color: active.color }}>
                {audience} · {active.name}
              </p>
              <h2 id="visual-stage-heading" className="max-w-[11ch] text-5xl font-black leading-[0.92] tracking-[-0.04em] text-balance sm:text-7xl lg:text-8xl">
                {active.headline}
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{brief || active.note}</p>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/60">{active.note}</p>
            </article>

            <div
              className={`absolute left-4 top-24 z-10 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold sm:left-7 sm:top-20 ${
                renderState === "error"
                  ? "bg-red-200 text-red-950"
                  : renderState === "success"
                    ? "bg-emerald-200 text-emerald-950"
                    : renderState === "loading"
                      ? "bg-white text-black"
                      : "bg-black/55 text-white/75"
              }`}
              aria-live="polite"
              role={renderState === "error" ? "alert" : "status"}
            >
              {renderState === "error" ? (
                <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
              ) : renderState === "success" ? (
                <CheckCircle2 aria-hidden="true" className="size-4 shrink-0" />
              ) : renderState === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin motion-reduce:animate-none" />
              ) : (
                <Aperture aria-hidden="true" className="size-4 shrink-0" />
              )}
              {renderState === "error"
                ? "Render paused. Clarify the desired scene and try again."
                : renderState === "success"
                  ? "New gallery frames are ready."
                  : renderState === "loading"
                    ? "Rendering atmosphere and motion frames…"
                    : "Stage is synced to the control rail."}
            </div>

            <nav className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-3 gap-px bg-black/60 p-2 sm:p-3" aria-label="Creative filmstrip">
              {galleryConcepts.map((concept) => (
                <button
                  key={concept.id}
                  type="button"
                  aria-pressed={activeId === concept.id}
                  onClick={() => chooseConcept(concept.id)}
                  className={`group min-h-[92px] cursor-pointer overflow-hidden rounded-md border p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b73] sm:min-h-[108px] sm:p-3 ${
                    activeId === concept.id
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-black/45 text-white hover:border-white/50 hover:bg-black/70"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 text-xs font-bold">
                    <span>{concept.id}</span>
                    <span className="size-2 rounded-full" style={{ backgroundColor: concept.color }} aria-hidden="true" />
                  </span>
                  <span className="mt-5 block truncate text-sm font-semibold sm:text-base">{concept.name}</span>
                  <span className={`mt-1 hidden text-xs sm:block ${activeId === concept.id ? "text-black/60" : "text-white/50"}`}>
                    {concept.headline}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}
