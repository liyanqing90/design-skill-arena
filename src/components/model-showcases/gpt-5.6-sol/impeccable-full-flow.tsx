"use client";

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Download,
  Layers3,
  LoaderCircle,
  Save,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

type FlowState = "idle" | "loading" | "success" | "error";
type Stage = "Brief" | "Shape" | "Generate" | "Review";

const releaseRoutes = [
  {
    id: "A",
    name: "The handoff",
    headline: "Pass the sound. Keep the moment.",
    detail: "One continuous scene moves the speaker from person to person and place to place.",
    reach: "2.9M",
    ctr: "5.2%",
    conversion: "8.7%",
    accent: "#ffbf69",
  },
  {
    id: "B",
    name: "Room shift",
    headline: "The room changes when the music arrives.",
    detail: "A restrained before-and-after system makes the product impact immediate.",
    reach: "3.5M",
    ctr: "4.8%",
    conversion: "8.0%",
    accent: "#9ed8db",
  },
  {
    id: "C",
    name: "Open session",
    headline: "No stage required.",
    detail: "Creator-led sessions show performance in familiar, imperfect environments.",
    reach: "2.6M",
    ctr: "6.5%",
    conversion: "9.3%",
    accent: "#f4978e",
  },
] as const;

const roomSurfaces: Record<string, string> = {
  "Steel print": "linear-gradient(135deg, #505a66 0%, #252b33 58%, #181c22 100%)",
  "Soft product": "linear-gradient(145deg, #65717d 0%, #39434d 46%, #1f252c 100%)",
  "Motion still": "linear-gradient(125deg, #353c46 0%, #171b20 55%, #4a3330 100%)",
};

export default function ImpeccableFullFlowShowcase() {
  const [brief, setBrief] = useState(
    "Launch a compact speaker through moments where sharing music changes the energy of a space.",
  );
  const [audience, setAudience] = useState("Creative hosts");
  const [channel, setChannel] = useState("Social launch system");
  const [tone, setTone] = useState("Assured");
  const [visual, setVisual] = useState("Steel print");
  const [selectedId, setSelectedId] = useState<(typeof releaseRoutes)[number]["id"]>("A");
  const [stage, setStage] = useState<Stage>("Shape");
  const [flowState, setFlowState] = useState<FlowState>("idle");
  const [runs, setRuns] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [activity, setActivity] = useState([
    "Brief normalized",
    "Three routes shaped",
    "The handoff selected",
    "Forecast ready",
  ]);

  const selected = releaseRoutes.find((route) => route.id === selectedId) ?? releaseRoutes[0];
  const stages: Stage[] = ["Brief", "Shape", "Generate", "Review"];

  const log = (message: string) => setActivity((items) => [message, ...items].slice(0, 4));

  const chooseRoute = (id: (typeof releaseRoutes)[number]["id"]) => {
    const next = releaseRoutes.find((route) => route.id === id) ?? releaseRoutes[0];
    setSelectedId(id);
    setStage("Review");
    log(`${next.name} moved to review`);
  };

  const generate = () => {
    const nextRun = runs + 1;
    setRuns(nextRun);
    setFlowState("loading");
    setStage("Generate");
    log("Generation pass started");
    window.setTimeout(() => {
      const outcome: FlowState = nextRun % 2 === 0 ? "error" : "success";
      setFlowState(outcome);
      setStage(outcome === "success" ? "Review" : "Shape");
      log(outcome === "success" ? "Review set prepared" : "Generation needs a clearer brief");
    }, 780);
  };

  const save = () => {
    setSaved(true);
    log("Release room saved");
  };

  const exportRelease = () => {
    setExported(true);
    log("Review package exported");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1d2229] text-[#f4f7fa]">
      <header className="border-b border-white/15 bg-[#252b33] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-[#ffbf69] text-[#1d2229]">
              <Layers3 aria-hidden="true" className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Muse Release Room</h1>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                <span className="font-bold text-white">GPT 5.6 Sol</span>
                <span className="text-[#c7d0da]">impeccable</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Release actions">
            <button
              type="button"
              onClick={save}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/25 px-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf69]"
            >
              <Save aria-hidden="true" className="size-4" />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={exportRelease}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/25 px-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf69]"
            >
              <Download aria-hidden="true" className="size-4" />
              {exported ? "Ready" : "Export"}
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={flowState === "loading"}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-[#ffbf69] px-4 text-sm font-bold text-[#1d2229] transition-colors hover:bg-[#ffd29a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#252b33] disabled:cursor-wait disabled:bg-[#8b8174]"
            >
              {flowState === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <WandSparkles aria-hidden="true" className="size-4" />
              )}
              {flowState === "loading" ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </header>

      <nav className="border-b border-white/15 bg-[#20262d] px-4 py-3 sm:px-6" aria-label="Campaign stages">
        <ol className="mx-auto grid max-w-[1560px] grid-cols-4 gap-2">
          {stages.map((item, index) => {
            const activeIndex = stages.indexOf(stage);
            const isComplete = index < activeIndex || (item === "Review" && flowState === "success");
            const isActive = item === stage;
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => setStage(item)}
                  aria-current={isActive ? "step" : undefined}
                  className={`flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md px-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf69] sm:text-sm ${
                    isActive
                      ? "bg-[#e9eef3] text-[#1d2229]"
                      : "text-[#c7d0da] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-full text-[10px] ${
                      isComplete ? "bg-emerald-300 text-emerald-950" : isActive ? "bg-[#1d2229] text-white" : "border border-white/30"
                    }`}
                  >
                    {isComplete ? <Check aria-hidden="true" className="size-3" /> : index + 1}
                  </span>
                  <span className="truncate">{item}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mx-auto grid max-w-[1560px] gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px] sm:p-6">
        <section className="min-w-0" aria-labelledby="release-preview-heading">
          <article
            className="relative isolate min-h-[520px] overflow-hidden rounded-xl p-5 sm:min-h-[650px] sm:p-9"
            style={{ background: roomSurfaces[visual] }}
          >
            <div
              aria-hidden="true"
              className="absolute right-[8%] top-[16%] h-[48%] w-[38%] rotate-6 rounded-xl opacity-90 transition-colors duration-200 motion-reduce:transition-none"
              style={{ backgroundColor: selected.accent }}
            />
            <div aria-hidden="true" className="absolute right-[14%] top-[23%] h-[38%] w-[28%] -rotate-3 rounded-xl bg-[#20262d]" />
            <div className="relative z-10 flex min-h-[470px] max-w-2xl flex-col justify-between sm:min-h-[580px]">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#e0e6ec]">
                <span className="rounded-full border border-white/30 px-3 py-1.5">{audience}</span>
                <span className="rounded-full border border-white/30 px-3 py-1.5">{channel}</span>
              </div>
              <div className="py-10">
                <p className="text-sm font-bold" style={{ color: selected.accent }}>
                  {tone} route · {selected.name}
                </p>
                <h2 id="release-preview-heading" className="mt-4 max-w-[13ch] text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl">
                  {selected.headline}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#d8e0e8]">{brief || selected.detail}</p>
              </div>
              <p className="max-w-lg border-t border-white/30 pt-4 text-sm leading-6 text-[#c7d0da]">{selected.detail}</p>
            </div>
          </article>

          <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Creative routes">
            {releaseRoutes.map((route) => (
              <button
                key={route.id}
                type="button"
                onClick={() => chooseRoute(route.id)}
                aria-pressed={selectedId === route.id}
                className={`min-h-[88px] cursor-pointer rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf69] ${
                  selectedId === route.id
                    ? "border-[#ffbf69] bg-[#313944]"
                    : "border-white/15 bg-[#252b33] hover:border-white/40 hover:bg-[#2d343d]"
                }`}
              >
                <span className="text-xs font-bold" style={{ color: route.accent }}>
                  Route {route.id}
                </span>
                <span className="mt-2 block text-sm font-semibold text-white">{route.name}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="rounded-xl border border-white/15 bg-[#252b33] p-4 sm:p-5" aria-label="Campaign inspector">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold">Inspector</h2>
            <span className="rounded-full bg-[#343d47] px-2.5 py-1 text-xs text-[#c7d0da]">Route {selected.id}</span>
          </div>

          <label htmlFor="impeccable-brief" className="mt-5 block text-xs font-semibold text-[#c7d0da]">
            Campaign brief
          </label>
          <textarea
            id="impeccable-brief"
            value={brief}
            onChange={(event) => {
              setBrief(event.target.value);
              setStage("Brief");
            }}
            rows={5}
            className="mt-2 w-full resize-none rounded-lg border border-white/20 bg-[#1d2229] p-3 text-base leading-6 text-white outline-none transition-colors placeholder:text-[#aeb8c3] hover:border-white/40 focus:border-[#ffbf69] focus:ring-2 focus:ring-[#ffbf69]/25"
          />

          <fieldset className="mt-5 grid gap-4">
            <legend className="text-sm font-bold">Shape</legend>
            <label className="text-xs font-semibold text-[#c7d0da]">
              Audience
              <select
                value={audience}
                onChange={(event) => {
                  setAudience(event.target.value);
                  setStage("Shape");
                }}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-[#1d2229] px-3 text-sm text-white outline-none hover:border-white/40 focus:border-[#ffbf69] focus:ring-2 focus:ring-[#ffbf69]/25"
              >
                <option>Creative hosts</option>
                <option>Shared-space residents</option>
                <option>Independent travelers</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-[#c7d0da]">
              Channel
              <select
                value={channel}
                onChange={(event) => {
                  setChannel(event.target.value);
                  setStage("Shape");
                }}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-[#1d2229] px-3 text-sm text-white outline-none hover:border-white/40 focus:border-[#ffbf69] focus:ring-2 focus:ring-[#ffbf69]/25"
              >
                <option>Social launch system</option>
                <option>Retail motion loop</option>
                <option>Creator seeding kit</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-[#c7d0da]">
              Tone
              <select
                value={tone}
                onChange={(event) => {
                  setTone(event.target.value);
                  setStage("Shape");
                }}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-[#1d2229] px-3 text-sm text-white outline-none hover:border-white/40 focus:border-[#ffbf69] focus:ring-2 focus:ring-[#ffbf69]/25"
              >
                <option>Assured</option>
                <option>Warm</option>
                <option>Precise</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-[#c7d0da]">
              Visual style
              <select
                value={visual}
                onChange={(event) => {
                  setVisual(event.target.value);
                  setStage("Shape");
                }}
                className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-[#1d2229] px-3 text-sm text-white outline-none hover:border-white/40 focus:border-[#ffbf69] focus:ring-2 focus:ring-[#ffbf69]/25"
              >
                <option>Steel print</option>
                <option>Soft product</option>
                <option>Motion still</option>
              </select>
            </label>
          </fieldset>

          <section className="mt-6 border-t border-white/15 pt-5" aria-labelledby="release-prediction-heading">
            <h2 id="release-prediction-heading" className="text-sm font-bold">Prediction</h2>
            <dl className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-md bg-[#1d2229] p-2">
                <dt className="text-[10px] text-[#aeb8c3]">Reach</dt>
                <dd className="mt-1 text-lg font-bold">{selected.reach}</dd>
              </div>
              <div className="rounded-md bg-[#1d2229] p-2">
                <dt className="text-[10px] text-[#aeb8c3]">CTR</dt>
                <dd className="mt-1 text-lg font-bold">{selected.ctr}</dd>
              </div>
              <div className="rounded-md bg-[#1d2229] p-2">
                <dt className="text-[10px] text-[#aeb8c3]">Conversion</dt>
                <dd className="mt-1 text-lg font-bold">{selected.conversion}</dd>
              </div>
            </dl>
          </section>

          <div
            className={`mt-5 flex min-h-12 items-start gap-2 rounded-lg px-3 py-3 text-sm font-semibold ${
              flowState === "error"
                ? "bg-[#5a2d2d] text-[#ffd8d4]"
                : flowState === "success"
                  ? "bg-[#21463c] text-[#c8f7e9]"
                  : flowState === "loading"
                    ? "bg-[#3d4249] text-white"
                    : "bg-[#313944] text-[#d8e0e8]"
            }`}
            aria-live="polite"
            role={flowState === "error" ? "alert" : "status"}
          >
            {flowState === "error" ? (
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            ) : flowState === "success" ? (
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            ) : flowState === "loading" ? (
              <LoaderCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 animate-spin motion-reduce:animate-none" />
            ) : (
              <Layers3 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            )}
            <span>
              {flowState === "error"
                ? "Generation stopped. Clarify the primary behavior, then retry."
                : flowState === "success"
                  ? "Review set is complete and ready to export."
                  : flowState === "loading"
                    ? "Building copy, art direction, and delivery notes…"
                    : "Shape controls are synced to the preview."}
            </span>
          </div>
        </aside>

        <section className="rounded-xl border border-white/15 bg-[#252b33] p-4 lg:col-span-2" aria-labelledby="release-activity-heading">
          <div className="flex items-center justify-between gap-3">
            <h2 id="release-activity-heading" className="text-sm font-bold">Activity</h2>
            <span className="text-xs text-[#aeb8c3]">Current stage: {stage}</span>
          </div>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {activity.map((item, index) => (
              <li key={`${item}-${index}`} className="flex min-h-11 items-center gap-3 rounded-md bg-[#1d2229] px-3 text-sm text-[#d8e0e8]">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#343d47] text-xs font-bold">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
