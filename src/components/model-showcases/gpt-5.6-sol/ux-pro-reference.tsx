"use client";

import {
  Activity,
  AlertOctagon,
  BarChart3,
  CheckCircle2,
  Download,
  LoaderCircle,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type EvidenceState = "idle" | "loading" | "success" | "error";

const candidates = [
  {
    id: "A",
    name: "Instant venue",
    headline: "Every room has a main stage.",
    support: "Lead with transformation, then demonstrate the portable format.",
    reach: "3.2M",
    ctr: "5.1%",
    conversion: "8.3%",
    confidence: 88,
  },
  {
    id: "B",
    name: "Shared ritual",
    headline: "Press play. Pull everyone closer.",
    support: "Lead with a recognizable group behavior and close on product ease.",
    reach: "2.8M",
    ctr: "6.2%",
    conversion: "9.1%",
    confidence: 92,
  },
  {
    id: "C",
    name: "Portable proof",
    headline: "Big sound does not need a fixed address.",
    support: "Lead with performance evidence across three real-world settings.",
    reach: "2.4M",
    ctr: "6.7%",
    conversion: "9.6%",
    confidence: 90,
  },
] as const;

const previewThemes: Record<string, { background: string; foreground: string; panel: string }> = {
  "Evidence grid": { background: "#eaf3ff", foreground: "#08172d", panel: "#ffdd00" },
  "High contrast": { background: "#101010", foreground: "#ffffff", panel: "#2fe3a0" },
  "Product white": { background: "#ffffff", foreground: "#111111", panel: "#2979ff" },
};

export default function UxProReferenceShowcase() {
  const [brief, setBrief] = useState(
    "Launch a compact speaker with a campaign that proves how quickly it can turn a temporary space into a shared experience.",
  );
  const [audience, setAudience] = useState("Urban group hosts");
  const [channel, setChannel] = useState("Social + retail");
  const [tone, setTone] = useState("Clear");
  const [visual, setVisual] = useState("Evidence grid");
  const [selectedId, setSelectedId] = useState<(typeof candidates)[number]["id"]>("A");
  const [evidenceState, setEvidenceState] = useState<EvidenceState>("idle");
  const [runs, setRuns] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [activity, setActivity] = useState([
    { time: "09:42", detail: "Evidence model loaded" },
    { time: "09:43", detail: "Instant venue selected" },
    { time: "09:44", detail: "Channel assumptions verified" },
  ]);

  const selected = candidates.find((candidate) => candidate.id === selectedId) ?? candidates[0];
  const theme = previewThemes[visual];

  const log = (detail: string) => {
    const time = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    setActivity((items) => [{ time, detail }, ...items].slice(0, 5));
  };

  const selectCandidate = (id: (typeof candidates)[number]["id"]) => {
    const next = candidates.find((candidate) => candidate.id === id) ?? candidates[0];
    setSelectedId(id);
    log(`${next.name} selected`);
  };

  const generate = () => {
    const nextRun = runs + 1;
    setRuns(nextRun);
    setEvidenceState("loading");
    log("Forecast recalculation started");
    window.setTimeout(() => {
      const outcome: EvidenceState = nextRun % 2 === 0 ? "error" : "success";
      setEvidenceState(outcome);
      log(outcome === "success" ? "New evidence set available" : "Evidence set incomplete. Brief needs one outcome");
    }, 760);
  };

  const save = () => {
    setSaved(true);
    log("Campaign evidence saved");
  };

  const exportEvidence = () => {
    setExported(true);
    log("Accessible review package prepared");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f6f2] text-[#0a0a0a]">
      <a
        href="#ux-pro-main"
        className="absolute left-3 top-3 z-50 -translate-y-20 bg-[#ffdd00] px-4 py-3 font-bold text-black transition-transform focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-black motion-reduce:transition-none"
      >
        Skip to campaign workspace
      </a>

      <header className="bg-black px-4 py-4 text-white sm:px-6">
        <div className="mx-auto flex max-w-[1580px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 place-items-center bg-[#ffdd00] text-black">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Muse Campaign Evidence Desk</h1>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                <span className="font-bold text-[#ffdd00]">GPT 5.6 Sol</span>
                <span className="text-white/75">ui-ux-pro-max</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Campaign evidence actions">
            <button
              type="button"
              onClick={save}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-white bg-black px-3 text-sm font-bold transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffdd00] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Save aria-hidden="true" className="size-4" />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={exportEvidence}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-white bg-black px-3 text-sm font-bold transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffdd00] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Download aria-hidden="true" className="size-4" />
              {exported ? "Export ready" : "Export"}
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={evidenceState === "loading"}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[#ffdd00] px-4 text-sm font-black text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:bg-[#9b8e35]"
            >
              {evidenceState === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {evidenceState === "loading" ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </header>

      <main id="ux-pro-main" className="mx-auto max-w-[1580px] p-3 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[330px_minmax(0,1fr)]">
          <section className="border-2 border-black bg-white p-4" aria-labelledby="ux-pro-inputs-heading">
            <div className="flex items-center justify-between gap-3 border-b-2 border-black pb-3">
              <h2 id="ux-pro-inputs-heading" className="text-base font-black">Campaign inputs</h2>
              <span className="text-xs font-bold">4 controls</span>
            </div>

            <fieldset className="mt-4">
              <legend className="text-sm font-black">Brief</legend>
              <label htmlFor="ux-pro-brief" className="mt-2 block text-sm font-bold">
                Campaign Brief
              </label>
              <textarea
                id="ux-pro-brief"
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                rows={6}
                aria-describedby="ux-pro-brief-help"
                className="mt-2 w-full resize-none border-2 border-black bg-white p-3 text-base leading-6 outline-none placeholder:text-[#4a4a4a] hover:bg-[#f3f7ff] focus:ring-4 focus:ring-[#2979ff]"
              />
              <p id="ux-pro-brief-help" className="mt-2 text-sm leading-5 text-[#333333]">
                State one product, one audience behavior, and one outcome.
              </p>
            </fieldset>

            <fieldset className="mt-6 grid gap-4 border-t-2 border-black pt-4">
              <legend className="px-1 text-sm font-black">Targeting and expression</legend>
              <label className="text-sm font-bold">
                Audience
                <select
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer border-2 border-black bg-white px-3 text-base outline-none hover:bg-[#f3f7ff] focus:ring-4 focus:ring-[#2979ff]"
                >
                  <option>Urban group hosts</option>
                  <option>Creative co-livers</option>
                  <option>Frequent weekend travelers</option>
                </select>
              </label>
              <label className="text-sm font-bold">
                Channel
                <select
                  value={channel}
                  onChange={(event) => setChannel(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer border-2 border-black bg-white px-3 text-base outline-none hover:bg-[#f3f7ff] focus:ring-4 focus:ring-[#2979ff]"
                >
                  <option>Social + retail</option>
                  <option>Creator film series</option>
                  <option>OOH + landing page</option>
                </select>
              </label>
              <label className="text-sm font-bold">
                Tone
                <select
                  value={tone}
                  onChange={(event) => setTone(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer border-2 border-black bg-white px-3 text-base outline-none hover:bg-[#f3f7ff] focus:ring-4 focus:ring-[#2979ff]"
                >
                  <option>Clear</option>
                  <option>Energetic</option>
                  <option>Reassuring</option>
                </select>
              </label>
              <label className="text-sm font-bold">
                Visual style
                <select
                  value={visual}
                  onChange={(event) => setVisual(event.target.value)}
                  className="mt-2 min-h-11 w-full cursor-pointer border-2 border-black bg-white px-3 text-base outline-none hover:bg-[#f3f7ff] focus:ring-4 focus:ring-[#2979ff]"
                >
                  <option>Evidence grid</option>
                  <option>High contrast</option>
                  <option>Product white</option>
                </select>
              </label>
            </fieldset>
          </section>

          <section className="min-w-0 border-2 border-black bg-white p-3 sm:p-4" aria-labelledby="ux-pro-preview-heading">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
              <div>
                <p className="text-xs font-bold text-[#333333]">SELECTED CREATIVE {selected.id}</p>
                <h2 id="ux-pro-preview-heading" className="mt-1 text-base font-black">{selected.name}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <BarChart3 aria-hidden="true" className="size-5" />
                {selected.confidence}% confidence
              </div>
            </div>

            <article
              className="relative mt-4 flex min-h-[450px] overflow-hidden border-2 border-black p-5 sm:min-h-[560px] sm:p-9"
              style={{ backgroundColor: theme.background, color: theme.foreground }}
              aria-label={`Campaign preview for ${selected.name}`}
            >
              <div
                aria-hidden="true"
                className="absolute right-[-8%] top-[12%] h-[48%] w-[48%] rotate-6 border-4 border-current transition-colors duration-200 motion-reduce:transition-none"
                style={{ backgroundColor: theme.panel }}
              />
              <div aria-hidden="true" className="absolute bottom-[10%] right-[8%] h-[28%] w-[34%] border-4 border-current bg-transparent" />
              <div className="relative z-10 flex max-w-2xl flex-col justify-between">
                <div className="flex flex-wrap gap-2 text-xs font-black">
                  <span className="border-2 border-current px-2 py-1">{audience}</span>
                  <span className="border-2 border-current px-2 py-1">{channel}</span>
                </div>
                <div className="py-10">
                  <p className="text-sm font-black">{tone} direction</p>
                  <h3 className="mt-4 max-w-[14ch] text-4xl font-black leading-[0.98] tracking-[-0.035em] text-balance sm:text-6xl">
                    {selected.headline}
                  </h3>
                  <p className="mt-6 max-w-xl text-base font-semibold leading-7">{brief || selected.support}</p>
                </div>
                <p className="max-w-xl border-t-2 border-current pt-4 text-sm font-bold leading-6">{selected.support}</p>
              </div>
            </article>

            <div
              className={`mt-4 flex min-h-14 items-start gap-3 border-2 p-3 text-sm font-bold ${
                evidenceState === "error"
                  ? "border-[#b00020] bg-[#fff0f2] text-[#7a0016]"
                  : evidenceState === "success"
                    ? "border-[#006b43] bg-[#eafff6] text-[#004d30]"
                    : evidenceState === "loading"
                      ? "border-black bg-[#ffdd00] text-black"
                      : "border-black bg-[#f3f3ef] text-black"
              }`}
              role={evidenceState === "error" ? "alert" : "status"}
              aria-live={evidenceState === "error" ? "assertive" : "polite"}
            >
              {evidenceState === "error" ? (
                <AlertOctagon aria-hidden="true" className="size-5 shrink-0" />
              ) : evidenceState === "success" ? (
                <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" />
              ) : evidenceState === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-5 shrink-0 animate-spin motion-reduce:animate-none" />
              ) : (
                <ShieldCheck aria-hidden="true" className="size-5 shrink-0" />
              )}
              <span>
                {evidenceState === "error"
                  ? "Generation stopped because the brief contains two outcomes. Choose one outcome, then select Generate again."
                  : evidenceState === "success"
                    ? "Three refreshed candidates and forecasts are available for review."
                    : evidenceState === "loading"
                      ? "Recalculating creative fit and predicted response…"
                      : "Inputs are complete. Forecasts reflect the current candidate and controls."}
              </span>
            </div>
          </section>
        </div>

        <section className="mt-4 border-2 border-black bg-white" aria-labelledby="ux-pro-comparison-heading">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black p-4">
            <div>
              <h2 id="ux-pro-comparison-heading" className="text-base font-black">Prediction comparison</h2>
              <p className="mt-1 text-sm text-[#333333]">Select A, B, or C to update the preview and evidence summary.</p>
            </div>
            <Activity aria-hidden="true" className="size-5" />
          </div>
          <table className="w-full table-fixed text-center text-xs sm:text-sm">
            <caption className="sr-only">Reach, click-through rate, conversion, and confidence for each creative candidate</caption>
            <thead className="bg-black text-white">
              <tr>
                <th className="w-[18%] px-1 py-3 font-bold" scope="col">Plan</th>
                <th className="px-1 py-3 font-bold" scope="col">Reach</th>
                <th className="px-1 py-3 font-bold" scope="col">CTR</th>
                <th className="px-1 py-3 font-bold" scope="col"><abbr title="Conversion" className="no-underline">Conv.</abbr></th>
                <th className="px-1 py-3 font-bold" scope="col"><abbr title="Confidence" className="no-underline">Conf.</abbr></th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className={selectedId === candidate.id ? "bg-[#ffdd00] font-black" : "border-t-2 border-black hover:bg-[#eef5ff]"}>
                  <th scope="row" className="p-1">
                    <button
                      type="button"
                      onClick={() => selectCandidate(candidate.id)}
                      aria-pressed={selectedId === candidate.id}
                      aria-label={`Select creative ${candidate.id}, ${candidate.name}`}
                      className="min-h-11 min-w-11 cursor-pointer border-2 border-black bg-white font-black text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2979ff] focus-visible:ring-offset-1"
                    >
                      {candidate.id}
                    </button>
                  </th>
                  <td className="px-1 py-3">{candidate.reach}</td>
                  <td className="px-1 py-3">{candidate.ctr}</td>
                  <td className="px-1 py-3">{candidate.conversion}</td>
                  <td className="px-1 py-3">{candidate.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="border-2 border-black bg-white p-4" aria-labelledby="ux-pro-confidence-heading">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="ux-pro-confidence-heading" className="text-base font-black">Confidence and assumptions</h2>
              <span className="bg-black px-3 py-1.5 text-sm font-black text-white">{selected.confidence}%</span>
            </div>
            <label htmlFor="ux-pro-confidence" className="mt-4 block text-sm font-bold">
              Evidence confidence for {selected.name}
            </label>
            <progress id="ux-pro-confidence" value={selected.confidence} max={100} className="mt-2 h-4 w-full accent-[#2979ff]">
              {selected.confidence}%
            </progress>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[#222222]">
              Confidence combines audience fit, channel format, message clarity, and similarity to prior launch patterns. It is directional and does not guarantee campaign performance.
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border-t-2 border-black pt-2">
                <dt className="text-xs font-bold text-[#333333]">Strongest signal</dt>
                <dd className="mt-1 text-sm font-black">Message clarity</dd>
              </div>
              <div className="border-t-2 border-black pt-2">
                <dt className="text-xs font-bold text-[#333333]">Watch item</dt>
                <dd className="mt-1 text-sm font-black">Channel overlap</dd>
              </div>
              <div className="border-t-2 border-black pt-2">
                <dt className="text-xs font-bold text-[#333333]">Active basis</dt>
                <dd className="mt-1 text-sm font-black">Local mock data</dd>
              </div>
            </dl>
          </section>

          <section className="border-2 border-black bg-white p-4" aria-labelledby="ux-pro-activity-heading">
            <div className="flex items-center justify-between gap-3">
              <h2 id="ux-pro-activity-heading" className="text-base font-black">Activity</h2>
              <span className="text-xs font-bold">Most recent first</span>
            </div>
            <ol className="mt-4 divide-y-2 divide-black border-y-2 border-black">
              {activity.map((item, index) => (
                <li key={`${item.time}-${item.detail}-${index}`} className="grid min-h-11 grid-cols-[58px_1fr] items-center gap-3 py-2 text-sm">
                  <time className="font-mono font-bold">{item.time}</time>
                  <span className="font-semibold">{item.detail}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}
