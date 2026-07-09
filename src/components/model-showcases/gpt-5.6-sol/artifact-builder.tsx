"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Image as ImageIcon,
  Layers3,
  LoaderCircle,
  MousePointer2,
  PanelsTopLeft,
  Save,
  Square,
  Type,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

type StudioState = "idle" | "loading" | "success" | "error";
type LayerName = "Headline" | "Product form" | "Call to action" | "Backdrop";

const artboards = [
  {
    id: "A",
    name: "Pocket venue",
    headline: "Tonight fits in your hand.",
    line: "Portable sound for plans that start after the plan.",
    reach: "3.3M",
    ctr: "5.4%",
    conversion: "8.5%",
    shape: "#ff4f2e",
  },
  {
    id: "B",
    name: "Shared signal",
    headline: "One speaker. Everyone in.",
    line: "A social-first system built around the moment the group connects.",
    reach: "3.9M",
    ctr: "4.9%",
    conversion: "7.7%",
    shape: "#48d9a4",
  },
  {
    id: "C",
    name: "Anywhere set",
    headline: "No venue needed.",
    line: "Performance proof framed as spontaneous live sessions.",
    reach: "2.5M",
    ctr: "6.6%",
    conversion: "9.5%",
    shape: "#f6c85f",
  },
] as const;

const posterThemes: Record<string, { background: string; foreground: string; muted: string }> = {
  "Offset type": { background: "#efe7d8", foreground: "#171717", muted: "#4d453a" },
  "Hard flash": { background: "#f06442", foreground: "#111111", muted: "#35201b" },
  "Night poster": { background: "#10264f", foreground: "#f7f3e8", muted: "#cbd8ee" },
};

const layers: Array<{ name: LayerName; icon: typeof Type }> = [
  { name: "Headline", icon: Type },
  { name: "Product form", icon: ImageIcon },
  { name: "Call to action", icon: Square },
  { name: "Backdrop", icon: Layers3 },
];

export default function ArtifactBuilderShowcase() {
  const [brief, setBrief] = useState(
    "Create a launch system for a compact speaker that can turn spontaneous gatherings into memorable sets.",
  );
  const [audience, setAudience] = useState("Independent creatives");
  const [channel, setChannel] = useState("Social poster set");
  const [tone, setTone] = useState("Bold");
  const [visual, setVisual] = useState("Offset type");
  const [selectedId, setSelectedId] = useState<(typeof artboards)[number]["id"]>("A");
  const [selectedLayer, setSelectedLayer] = useState<LayerName>("Headline");
  const [studioState, setStudioState] = useState<StudioState>("idle");
  const [renderCount, setRenderCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [activity, setActivity] = useState(["artboard-A opened", "Headline layer selected", "Properties synced"]);

  const selected = artboards.find((artboard) => artboard.id === selectedId) ?? artboards[0];
  const theme = posterThemes[visual];

  const log = (message: string) => setActivity((items) => [message, ...items].slice(0, 5));

  const chooseArtboard = (id: (typeof artboards)[number]["id"]) => {
    const next = artboards.find((artboard) => artboard.id === id) ?? artboards[0];
    setSelectedId(id);
    log(`${next.name} artboard opened`);
  };

  const chooseLayer = (name: LayerName) => {
    setSelectedLayer(name);
    log(`${name} layer selected`);
  };

  const generate = () => {
    const nextCount = renderCount + 1;
    setRenderCount(nextCount);
    setStudioState("loading");
    log("Generate command running");
    window.setTimeout(() => {
      const outcome: StudioState = nextCount % 2 === 0 ? "error" : "success";
      setStudioState(outcome);
      log(outcome === "success" ? "Three artboards refreshed" : "Render stopped. Brief needs one clear focus");
    }, 800);
  };

  const save = () => {
    setSaved(true);
    log("Muse source saved");
  };

  const exportArtifacts = () => {
    setExported(true);
    log("Campaign assets packaged");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111315] pb-20 text-[#f4f4ef]">
      <header className="border-b border-white/10 bg-[#17191c] px-4 py-3 sm:px-5">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-[#e7ff65] text-black">
              <PanelsTopLeft aria-hidden="true" className="size-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold">Muse Artifact Editor</h1>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/60">
                <span className="font-bold text-[#e7ff65]">GPT 5.6 Sol</span>
                <span>web-artifacts-builder / artifacts-builder</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/55">
            <MousePointer2 aria-hidden="true" className="size-4" />
            <span>Selected: {selectedLayer}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1680px] gap-0 xl:grid-cols-[230px_minmax(0,1fr)_290px]">
        <aside className="order-2 border-t border-white/10 bg-[#17191c] p-4 xl:order-1 xl:min-h-[calc(100vh-136px)] xl:border-r xl:border-t-0" aria-label="Layers and artifacts">
          <section aria-labelledby="artifact-layers-heading">
            <div className="flex items-center justify-between">
              <h2 id="artifact-layers-heading" className="text-xs font-bold text-white/65">Layers</h2>
              <span className="text-[10px] text-white/40">4 visible</span>
            </div>
            <div className="mt-3 space-y-1">
              {layers.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => chooseLayer(name)}
                  aria-pressed={selectedLayer === name}
                  className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7ff65] ${
                    selectedLayer === name
                      ? "bg-[#e7ff65] font-bold text-black"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 border-t border-white/10 pt-5" aria-labelledby="artifact-brief-heading">
            <div className="flex items-center justify-between">
              <h2 id="artifact-brief-heading" className="text-xs font-bold text-white/65">Artifacts</h2>
              <span className="text-[10px] text-white/40">brief.md</span>
            </div>
            <label htmlFor="artifact-brief" className="mt-3 block text-xs font-semibold text-white/55">
              Campaign Brief
            </label>
            <textarea
              id="artifact-brief"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              rows={7}
              className="mt-2 w-full resize-none rounded-md border border-white/15 bg-[#0d0f11] p-3 font-mono text-base leading-6 text-white outline-none transition-colors placeholder:text-white/50 hover:border-white/30 focus:border-[#e7ff65] focus:ring-2 focus:ring-[#e7ff65]/25"
            />
          </section>
        </aside>

        <section className="order-1 min-w-0 bg-[#24272b] p-3 sm:p-5 xl:order-2" aria-labelledby="artifact-artboard-heading">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-[10px] font-semibold text-white/45">ARTBOARD / 1080 × 1350</p>
              <h2 id="artifact-artboard-heading" className="mt-1 text-sm font-bold">Campaign poster</h2>
            </div>
            <div className="flex rounded-md bg-[#111315] p-1" role="group" aria-label="Artboard tabs">
              {artboards.map((artboard) => (
                <button
                  key={artboard.id}
                  type="button"
                  onClick={() => chooseArtboard(artboard.id)}
                  aria-pressed={selectedId === artboard.id}
                  className={`min-h-11 min-w-11 cursor-pointer rounded px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7ff65] ${
                    selectedId === artboard.id
                      ? "bg-[#f4f4ef] text-black"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {artboard.id}
                </button>
              ))}
            </div>
          </div>

          <div className="grid min-h-[630px] place-items-center py-5 sm:min-h-[760px] sm:py-8">
            <article
              className="relative aspect-[4/5] w-full max-w-[620px] overflow-hidden p-6 sm:p-10"
              style={{ backgroundColor: theme.background, color: theme.foreground }}
            >
              <div
                aria-hidden="true"
                className={`absolute -right-[8%] top-[18%] h-[42%] w-[58%] rotate-12 transition-colors duration-200 motion-reduce:transition-none ${
                  selectedLayer === "Product form" ? "outline-4 outline-offset-4 outline-[#e7ff65]" : ""
                }`}
                style={{ backgroundColor: selected.shape }}
              />
              <div
                aria-hidden="true"
                className="absolute right-[12%] top-[25%] h-[30%] w-[35%] -rotate-6 rounded-[48%] bg-[#111315]"
              />

              <div className="relative z-10 flex h-full max-w-[82%] flex-col justify-between">
                <div className="flex flex-wrap gap-2 text-xs font-bold">
                  <span className="border border-current px-2 py-1">{audience}</span>
                  <span className="border border-current px-2 py-1">{channel}</span>
                </div>

                <div className={selectedLayer === "Headline" ? "outline-4 outline-offset-4 outline-[#e7ff65]" : ""}>
                  <p className="text-sm font-bold" style={{ color: selected.shape }}>
                    {tone} / {selected.name}
                  </p>
                  <h3 className="mt-3 text-4xl font-black leading-[0.92] tracking-[-0.04em] text-balance sm:text-6xl">
                    {selected.headline}
                  </h3>
                  <p className="mt-5 max-w-md text-sm font-semibold leading-6" style={{ color: theme.muted }}>
                    {brief || selected.line}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <p className="max-w-xs text-xs font-semibold leading-5" style={{ color: theme.muted }}>
                    {selected.line}
                  </p>
                  <span
                    className={`shrink-0 border-2 border-current px-4 py-2 text-xs font-black ${
                      selectedLayer === "Call to action" ? "outline-4 outline-offset-4 outline-[#e7ff65]" : ""
                    }`}
                  >
                    PLAY ANYWHERE
                  </span>
                </div>
              </div>

              <dl className="absolute right-3 top-3 z-20 grid gap-1 bg-[#111315] p-2 text-right text-white sm:right-5 sm:top-5" aria-label={`Predictions for ${selected.name}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[9px] text-white/55">Reach</dt>
                  <dd className="text-xs font-bold">{selected.reach}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[9px] text-white/55">CTR</dt>
                  <dd className="text-xs font-bold">{selected.ctr}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[9px] text-white/55">Conversion</dt>
                  <dd className="text-xs font-bold">{selected.conversion}</dd>
                </div>
              </dl>
            </article>
          </div>

          <div
            className={`flex min-h-12 items-center gap-2 rounded-md px-3 text-sm font-semibold ${
              studioState === "error"
                ? "bg-red-950 text-red-100"
                : studioState === "success"
                  ? "bg-emerald-950 text-emerald-100"
                  : studioState === "loading"
                    ? "bg-[#e7ff65] text-black"
                    : "bg-[#17191c] text-white/65"
            }`}
            role={studioState === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {studioState === "error" ? (
              <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
            ) : studioState === "success" ? (
              <CheckCircle2 aria-hidden="true" className="size-4 shrink-0" />
            ) : studioState === "loading" ? (
              <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin motion-reduce:animate-none" />
            ) : (
              <PanelsTopLeft aria-hidden="true" className="size-4 shrink-0" />
            )}
            {studioState === "error"
              ? "Render stopped. Reduce the brief to one primary campaign behavior."
              : studioState === "success"
                ? "Three artboards refreshed and ready to inspect."
                : studioState === "loading"
                  ? "Composing layers, copy, and properties…"
                  : "Artboard and properties are in sync."}
          </div>
        </section>

        <aside className="order-3 border-t border-white/10 bg-[#17191c] p-4 xl:border-l xl:border-t-0" aria-label="Properties and activity">
          <section aria-labelledby="artifact-properties-heading">
            <div className="flex items-center justify-between gap-3">
              <h2 id="artifact-properties-heading" className="text-xs font-bold text-white/65">Properties</h2>
              <span className="text-[10px] text-[#e7ff65]">{selectedLayer}</span>
            </div>
            <fieldset className="mt-4 grid gap-4">
              <legend className="sr-only">Campaign properties</legend>
              <label className="text-xs font-semibold text-white/55">
                Audience
                <select
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer rounded-md border border-white/15 bg-[#0d0f11] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#e7ff65] focus:ring-2 focus:ring-[#e7ff65]/25"
                >
                  <option>Independent creatives</option>
                  <option>Nightlife collectives</option>
                  <option>Design-minded travelers</option>
                </select>
              </label>
              <label className="text-xs font-semibold text-white/55">
                Channel
                <select
                  value={channel}
                  onChange={(event) => setChannel(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer rounded-md border border-white/15 bg-[#0d0f11] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#e7ff65] focus:ring-2 focus:ring-[#e7ff65]/25"
                >
                  <option>Social poster set</option>
                  <option>Retail display loop</option>
                  <option>Creator story kit</option>
                </select>
              </label>
              <label className="text-xs font-semibold text-white/55">
                Tone
                <select
                  value={tone}
                  onChange={(event) => setTone(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer rounded-md border border-white/15 bg-[#0d0f11] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#e7ff65] focus:ring-2 focus:ring-[#e7ff65]/25"
                >
                  <option>Bold</option>
                  <option>Playful</option>
                  <option>Minimal</option>
                </select>
              </label>
              <label className="text-xs font-semibold text-white/55">
                Visual style
                <select
                  value={visual}
                  onChange={(event) => setVisual(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer rounded-md border border-white/15 bg-[#0d0f11] px-3 text-sm text-white outline-none hover:border-white/30 focus:border-[#e7ff65] focus:ring-2 focus:ring-[#e7ff65]/25"
                >
                  <option>Offset type</option>
                  <option>Hard flash</option>
                  <option>Night poster</option>
                </select>
              </label>
            </fieldset>
          </section>

          <section className="mt-6 border-t border-white/10 pt-5" aria-labelledby="artifact-activity-heading">
            <h2 id="artifact-activity-heading" className="text-xs font-bold text-white/65">Activity</h2>
            <ol className="mt-3 space-y-3">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-3 text-sm text-white/70">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#e7ff65]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-[#0d0f11]/95 px-3 py-3 backdrop-blur" aria-label="Command dock">
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-2">
          <button
            type="button"
            onClick={save}
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-white/20 px-3 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7ff65]"
          >
            <Save aria-hidden="true" className="size-4" />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
          <button
            type="button"
            onClick={generate}
            disabled={studioState === "loading"}
            className="inline-flex min-h-11 flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-md bg-[#e7ff65] px-3 text-sm font-black text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:bg-[#7b824f]"
          >
            {studioState === "loading" ? (
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
            ) : (
              <WandSparkles aria-hidden="true" className="size-4" />
            )}
            <span>{studioState === "loading" ? "Generating…" : "Generate"}</span>
          </button>
          <button
            type="button"
            onClick={exportArtifacts}
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-white/20 px-3 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7ff65]"
          >
            <Download aria-hidden="true" className="size-4" />
            <span>{exported ? "Ready" : "Export"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
