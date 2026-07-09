"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Download,
  LoaderCircle,
  Network,
  Save,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type BuildState = "idle" | "loading" | "success" | "error";

const branches = [
  {
    id: "A",
    name: "Awareness branch",
    message: "A room is wherever you press play.",
    rationale: "Lead with category reframing, then reveal the portable object.",
    reach: "3.6M",
    ctr: "4.7%",
    conversion: "7.8%",
    confidence: "84%",
  },
  {
    id: "B",
    name: "Community branch",
    message: "Bring one. Build the night together.",
    rationale: "Lead with group behavior and make the product the social trigger.",
    reach: "3.0M",
    ctr: "5.9%",
    conversion: "8.6%",
    confidence: "88%",
  },
  {
    id: "C",
    name: "Proof branch",
    message: "Full sound, minus the fixed address.",
    rationale: "Lead with portable performance proof and close on versatility.",
    reach: "2.4M",
    ctr: "6.4%",
    conversion: "9.4%",
    confidence: "91%",
  },
] as const;

const blueprintSurfaces: Record<string, string> = {
  Linework: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px), #123c78",
  "Signal blocks": "linear-gradient(135deg, #0b2f66 0%, #1757a6 55%, #0b2f66 100%)",
  "Paper schematic": "linear-gradient(rgba(16,64,122,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16,64,122,.08) 1px, transparent 1px), #edf6ff",
};

export default function DesignLogicShowcase() {
  const [brief, setBrief] = useState(
    "Launch a travel speaker by showing how one object can turn temporary spaces into places people remember.",
  );
  const [audience, setAudience] = useState("Mobile creative teams");
  const [channel, setChannel] = useState("Short-form video");
  const [tone, setTone] = useState("Direct");
  const [visual, setVisual] = useState("Linework");
  const [activeBranch, setActiveBranch] = useState<(typeof branches)[number]["id"]>("A");
  const [buildState, setBuildState] = useState<BuildState>("idle");
  const [buildCount, setBuildCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [activity, setActivity] = useState(["Strategy graph created", "Awareness branch active"]);

  const active = branches.find((branch) => branch.id === activeBranch) ?? branches[0];
  const isPaper = visual === "Paper schematic";

  const log = (message: string) => setActivity((items) => [message, ...items].slice(0, 4));

  const chooseBranch = (id: (typeof branches)[number]["id"]) => {
    const next = branches.find((branch) => branch.id === id) ?? branches[0];
    setActiveBranch(id);
    log(`${next.name} activated`);
  };

  const generate = () => {
    const nextCount = buildCount + 1;
    setBuildCount(nextCount);
    setBuildState("loading");
    log("Recomputing campaign branches");
    window.setTimeout(() => {
      const outcome: BuildState = nextCount % 2 === 0 ? "error" : "success";
      setBuildState(outcome);
      log(outcome === "success" ? "Strategy branches rebuilt" : "Logic conflict found in the brief");
    }, 680);
  };

  const save = () => {
    setSaved(true);
    log("Strategy map saved");
  };

  const exportMap = () => {
    setExported(true);
    log("Decision map exported");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#eef5fb] text-[#102b4e]">
      <header className="border-b-2 border-[#123c78] bg-[#f8fbfe] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1540px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 place-items-center bg-[#123c78] text-white">
              <Network aria-hidden="true" className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">Muse Strategy Blueprint</h1>
              <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
                <span className="text-[#0b4a91]">GPT 5.6 Sol</span>
                <span className="text-[#46617f]">frontend-design</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2" aria-label="Blueprint actions">
            <button
              type="button"
              onClick={save}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[#7692b1] bg-white px-3 text-sm font-bold transition-colors hover:bg-[#e3effb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b63ce]"
            >
              <Save aria-hidden="true" className="size-4" />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={exportMap}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[#7692b1] bg-white px-3 text-sm font-bold transition-colors hover:bg-[#e3effb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b63ce]"
            >
              <Download aria-hidden="true" className="size-4" />
              {exported ? "Ready" : "Export"}
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={buildState === "loading"}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[#123c78] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0b2f66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b63ce] focus-visible:ring-offset-2 disabled:cursor-wait disabled:bg-[#6a85a6]"
            >
              {buildState === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {buildState === "loading" ? "Building…" : "Generate"}
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-[#9db3ca] bg-white px-4 py-4 sm:px-6" aria-labelledby="logic-brief-heading">
        <div className="mx-auto grid max-w-[1540px] gap-4 lg:grid-cols-[160px_minmax(0,1fr)_300px] lg:items-start">
          <div>
            <p className="text-xs font-bold text-[#46617f]">INPUT / 01</p>
            <h2 id="logic-brief-heading" className="mt-1 text-base font-extrabold">
              Campaign brief
            </h2>
          </div>
          <textarea
            aria-label="Campaign Brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            rows={3}
            className="w-full resize-none border border-[#9db3ca] bg-[#f8fbfe] p-3 text-base leading-6 outline-none transition-colors placeholder:text-[#526b87] hover:border-[#5a7696] focus:border-[#0b63ce] focus:ring-2 focus:ring-[#0b63ce]/20"
          />
          <div className="border-t border-[#b7c8d8] pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-bold text-[#46617f]">RECENT ACTIVITY</p>
            <p className="mt-2 text-sm font-semibold">{activity[0]}</p>
            <p className="mt-1 text-xs text-[#526b87]">{activity[1]}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1540px] p-4 sm:p-6">
        <section className="border border-[#9db3ca] bg-white p-4" aria-labelledby="logic-path-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="logic-path-heading" className="text-sm font-extrabold">
              Decision path
            </h2>
            <span className="text-xs font-semibold text-[#526b87]">Audience → Message → Channel → Visual</span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            <label className="border border-[#9db3ca] bg-[#f4f9fe] p-3 text-xs font-bold text-[#46617f]">
              Audience
              <select
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer border border-[#7692b1] bg-white px-3 text-sm font-semibold text-[#102b4e] outline-none hover:border-[#0b63ce] focus:border-[#0b63ce] focus:ring-2 focus:ring-[#0b63ce]/20"
              >
                <option>Mobile creative teams</option>
                <option>Independent producers</option>
                <option>Design-led travelers</option>
              </select>
            </label>
            <ArrowRight aria-hidden="true" className="hidden size-5 self-center text-[#5278a5] lg:block" />
            <ArrowDown aria-hidden="true" className="mx-auto size-5 text-[#5278a5] lg:hidden" />
            <label className="border border-[#9db3ca] bg-[#f4f9fe] p-3 text-xs font-bold text-[#46617f]">
              Message tone
              <select
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer border border-[#7692b1] bg-white px-3 text-sm font-semibold text-[#102b4e] outline-none hover:border-[#0b63ce] focus:border-[#0b63ce] focus:ring-2 focus:ring-[#0b63ce]/20"
              >
                <option>Direct</option>
                <option>Inviting</option>
                <option>Evidence-led</option>
              </select>
            </label>
            <ArrowRight aria-hidden="true" className="hidden size-5 self-center text-[#5278a5] lg:block" />
            <ArrowDown aria-hidden="true" className="mx-auto size-5 text-[#5278a5] lg:hidden" />
            <label className="border border-[#9db3ca] bg-[#f4f9fe] p-3 text-xs font-bold text-[#46617f]">
              Channel
              <select
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer border border-[#7692b1] bg-white px-3 text-sm font-semibold text-[#102b4e] outline-none hover:border-[#0b63ce] focus:border-[#0b63ce] focus:ring-2 focus:ring-[#0b63ce]/20"
              >
                <option>Short-form video</option>
                <option>OOH sequence</option>
                <option>Creator toolkit</option>
              </select>
            </label>
            <ArrowRight aria-hidden="true" className="hidden size-5 self-center text-[#5278a5] lg:block" />
            <ArrowDown aria-hidden="true" className="mx-auto size-5 text-[#5278a5] lg:hidden" />
            <label className="border border-[#9db3ca] bg-[#f4f9fe] p-3 text-xs font-bold text-[#46617f]">
              Visual style
              <select
                value={visual}
                onChange={(event) => setVisual(event.target.value)}
                className="mt-2 min-h-11 w-full cursor-pointer border border-[#7692b1] bg-white px-3 text-sm font-semibold text-[#102b4e] outline-none hover:border-[#0b63ce] focus:border-[#0b63ce] focus:ring-2 focus:ring-[#0b63ce]/20"
              >
                <option>Linework</option>
                <option>Signal blocks</option>
                <option>Paper schematic</option>
              </select>
            </label>
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[270px_minmax(0,1fr)]">
          <nav className="border border-[#9db3ca] bg-white p-3" aria-label="Creative branch lanes">
            <h2 className="px-2 pb-3 text-sm font-extrabold">Branch lanes</h2>
            <div className="space-y-2">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  aria-pressed={activeBranch === branch.id}
                  onClick={() => chooseBranch(branch.id)}
                  className={`min-h-[92px] w-full cursor-pointer border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b63ce] ${
                    activeBranch === branch.id
                      ? "border-[#123c78] bg-[#123c78] text-white"
                      : "border-[#b7c8d8] bg-[#f8fbfe] hover:border-[#5278a5] hover:bg-[#e8f3ff]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-xs font-extrabold">BRANCH {branch.id}</span>
                    <span className={`text-xs ${activeBranch === branch.id ? "text-white/70" : "text-[#526b87]"}`}>
                      {branch.confidence}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm font-bold">{branch.name}</span>
                </button>
              ))}
            </div>
          </nav>

          <section className="min-w-0 border border-[#9db3ca] bg-white p-3 sm:p-4" aria-labelledby="logic-preview-heading">
            <article
              className={`relative min-h-[430px] overflow-hidden p-6 sm:min-h-[520px] sm:p-10 ${isPaper ? "text-[#102b4e]" : "text-white"}`}
              style={{
                background: blueprintSurfaces[visual],
                backgroundSize: visual === "Linework" || visual === "Paper schematic" ? "24px 24px" : undefined,
              }}
            >
              <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 text-xs font-bold ${isPaper ? "border-[#5a7696]" : "border-white/35"}`}>
                <span>{audience}</span>
                <span>{channel}</span>
              </div>
              <div className="flex min-h-[330px] flex-col justify-center py-10 sm:min-h-[410px]">
                <p className={`text-sm font-bold ${isPaper ? "text-[#0b4a91]" : "text-[#a8d5ff]"}`}>
                  {tone} message / Branch {active.id}
                </p>
                <h2 id="logic-preview-heading" className="mt-4 max-w-[15ch] text-4xl font-black leading-[0.98] tracking-[-0.035em] text-balance sm:text-6xl">
                  {active.message}
                </h2>
                <p className={`mt-6 max-w-2xl text-base leading-7 ${isPaper ? "text-[#264b72]" : "text-white/80"}`}>
                  {brief || active.rationale}
                </p>
              </div>
              <p className={`max-w-xl text-sm font-semibold ${isPaper ? "text-[#264b72]" : "text-white/75"}`}>{active.rationale}</p>
            </article>

            <div
              className={`mt-3 flex min-h-12 items-center gap-2 border px-3 text-sm font-semibold ${
                buildState === "error"
                  ? "border-red-300 bg-red-50 text-red-900"
                  : buildState === "success"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : buildState === "loading"
                      ? "border-blue-300 bg-blue-50 text-blue-900"
                      : "border-[#b7c8d8] bg-[#f8fbfe] text-[#46617f]"
              }`}
              role={buildState === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {buildState === "error" ? (
                <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              ) : buildState === "success" ? (
                <CheckCircle2 aria-hidden="true" className="size-4 shrink-0" />
              ) : buildState === "loading" ? (
                <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin motion-reduce:animate-none" />
              ) : (
                <Network aria-hidden="true" className="size-4 shrink-0" />
              )}
              {buildState === "error"
                ? "The brief has competing objectives. Clarify one priority and retry."
                : buildState === "success"
                  ? "Logic path validated. Three refreshed branches are available."
                  : buildState === "loading"
                    ? "Resolving audience, message, and channel dependencies…"
                    : "All path inputs are connected."}
            </div>

            <div className="mt-4 border border-[#b7c8d8]">
              <table className="w-full table-fixed text-left text-xs sm:text-sm">
                <caption className="border-b border-[#b7c8d8] bg-[#f4f9fe] px-3 py-2 text-left text-sm font-extrabold">
                  Branch analysis
                </caption>
                <thead className="bg-[#e8f3ff] text-[#264b72]">
                  <tr>
                    <th className="w-[24%] px-2 py-3 font-bold">Branch</th>
                    <th className="px-2 py-3 font-bold">Reach</th>
                    <th className="px-2 py-3 font-bold">CTR</th>
                    <th className="px-2 py-3 font-bold">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id} className={activeBranch === branch.id ? "bg-[#d7ebff] font-bold" : "border-t border-[#d3e0ec]"}>
                      <th scope="row" className="px-2 py-3">{branch.id}</th>
                      <td className="px-2 py-3">{branch.reach}</td>
                      <td className="px-2 py-3">{branch.ctr}</td>
                      <td className="px-2 py-3">{branch.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="mt-4 border border-[#9db3ca] bg-white p-4" aria-labelledby="logic-activity-heading">
          <h2 id="logic-activity-heading" className="text-sm font-extrabold">Activity</h2>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {activity.map((item, index) => (
              <li key={`${item}-${index}`} className="border-t-2 border-[#123c78] pt-2 text-sm text-[#264b72]">
                {item}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
