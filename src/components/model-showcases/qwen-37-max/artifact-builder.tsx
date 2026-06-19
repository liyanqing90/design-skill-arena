"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Save, Download, Check, AlertCircle, Loader2, Code, Eye, EyeOff, FileCode } from "lucide-react";

interface Concept {
  letter: string;
  name: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  color: string;
  colorClass: string;
}

interface ActivityEntry {
  timestamp: string;
  action: string;
}

const concepts: Concept[] = [
  {
    letter: "A",
    name: "Modular Life",
    tagline: "Your space, your system, your rules.",
    reach: 920,
    ctr: 4.4,
    conv: 3.0,
    color: "violet",
    colorClass: "bg-violet-600",
  },
  {
    letter: "B",
    name: "Connected Canvas",
    tagline: "Every device becomes a brushstroke.",
    reach: 870,
    ctr: 4.8,
    conv: 3.3,
    color: "cyan",
    colorClass: "bg-cyan-500",
  },
  {
    letter: "C",
    name: "Setup Story",
    tagline: "From unbox to orchestrate in twenty minutes.",
    reach: 1010,
    ctr: 4.1,
    conv: 2.8,
    color: "orange",
    colorClass: "bg-orange-500",
  },
];

const audiences = ["Tech-forward apartment dwellers", "Smart home enthusiasts", "Interior tech integrators", "Connected device reviewers"];
const channels = ["Product demo video", "Interactive landing", "Tech review sites", "App store feature"];
const tones = ["Innovative", "Approachable", "Technical", "Playful"];
const styles = ["Product rendering", "Lifestyle integration", "Interface showcase", "Setup guide"];

const fileTree = [
  { name: "campaign.config.ts", type: "file" },
  { name: "components/", type: "folder" },
  { name: "  Hero.tsx", type: "file" },
  { name: "  Features.tsx", type: "file" },
  { name: "  CTA.tsx", type: "file" },
  { name: "styles/", type: "folder" },
  { name: "  theme.css", type: "file" },
];

export default function ArtifactBuilder() {
  const [brief, setBrief] = useState(
    "Build a campaign artifact for Muse launching a modular smart home hub aimed at tech-forward apartment dwellers who love customizable setups."
  );
  const [audience, setAudience] = useState(audiences[0]);
  const [channel, setChannel] = useState(channels[0]);
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [inspectorMode, setInspectorMode] = useState(false);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);
  const [generateState, setGenerateState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [exportState, setExportState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showExportPanel, setShowExportPanel] = useState(false);

  const currentConcept = concepts[selectedConcept];

  const addActivity = (action: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setActivityLog((prev) => [{ timestamp, action }, ...prev].slice(0, 5));
  };

  const handleGenerate = async () => {
    setGenerateState("loading");
    addActivity("Building artifact components");
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (brief.length >= 16) {
      setGenerateState("success");
      addActivity("Artifact built successfully");
      setTimeout(() => setGenerateState("idle"), 2000);
    } else {
      setGenerateState("error");
      addActivity("Build failed: brief too short");
      setTimeout(() => setGenerateState("idle"), 2000);
    }
  };

  const handleSave = async () => {
    setSaveState("loading");
    addActivity("Saving artifact");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaveState("success");
    addActivity("Artifact saved");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const handleExport = async () => {
    setExportState("loading");
    addActivity("Exporting code");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setExportState("success");
    setShowExportPanel(true);
    addActivity("Code exported");
    setTimeout(() => setExportState("idle"), 2000);
  };

  const getAccentColor = () => {
    if (currentConcept.color === "violet") return "text-violet-600";
    if (currentConcept.color === "cyan") return "text-cyan-500";
    return "text-orange-500";
  };

  const getAccentBg = () => {
    if (currentConcept.color === "violet") return "bg-violet-600";
    if (currentConcept.color === "cyan") return "bg-cyan-500";
    return "bg-orange-500";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code className="h-6 w-6 text-violet-600" />
            <h1 className="text-xl font-semibold text-slate-900">Artifact Builder</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">Qwen 3.7 Max</p>
            <p className="text-xs font-mono text-violet-600">web-artifacts-builder</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left Sidebar - File Tree */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Project</p>
              <div className="space-y-1">
                {fileTree.map((item, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "cursor-pointer rounded px-2 py-1 text-xs font-mono",
                      item.type === "folder" ? "font-semibold text-slate-700" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Preview */}
          <div className="space-y-4 lg:col-span-7">
            {/* Brief */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Campaign Brief</label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full resize-none rounded border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-800 outline-none focus:border-violet-600"
                rows={3}
                placeholder="Describe your artifact..."
              />
            </div>

            {/* Browser Chrome Preview */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 rounded bg-white px-3 py-1 text-xs font-mono text-slate-600">
                  muse://campaign/preview
                </div>
                <Button
                  onClick={() => {
                    setInspectorMode(!inspectorMode);
                    addActivity(inspectorMode ? "Inspector disabled" : "Inspector enabled");
                  }}
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                >
                  {inspectorMode ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div>

              <div className={cn("relative p-6", inspectorMode && "bg-slate-50")}>
                {/* Hero */}
                <div className={cn("mb-4 rounded-lg p-8 text-white", getAccentBg())}>
                  <h2 className="text-3xl font-bold">{currentConcept.name}</h2>
                  <p className="mt-2 text-lg opacity-90">{currentConcept.tagline}</p>
                </div>

                {/* 3-Col Features */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {["Modular", "Connected", "Intelligent"].map((feature, idx) => (
                    <div key={idx} className="rounded border border-slate-200 p-4">
                      <p className="font-semibold text-slate-900">{feature}</p>
                      <p className="mt-1 text-xs text-slate-600">Feature detail {idx + 1}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button className={cn("px-8", getAccentBg())}>Get Started</Button>
                </div>

                {/* Inspector Overlay */}
                {inspectorMode && (
                  <div className="absolute inset-0 border-2 border-dashed border-violet-600 bg-violet-600/5">
                    <div className="absolute left-2 top-2 rounded bg-violet-600 px-2 py-1 text-xs text-white">
                      Wireframe Mode
                    </div>
                    <div className="absolute right-2 top-2 font-mono text-xs text-violet-600">
                      Props changed: {selectedConcept + 1}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">Props Panel</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-mono text-xs text-slate-600">audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full rounded border border-slate-200 bg-slate-50 p-2 font-mono text-xs"
                  >
                    {audiences.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-slate-600">channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full rounded border border-slate-200 bg-slate-50 p-2 font-mono text-xs"
                  >
                    {channels.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-slate-600">tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full rounded border border-slate-200 bg-slate-50 p-2 font-mono text-xs"
                  >
                    {tones.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-slate-600">style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full rounded border border-slate-200 bg-slate-50 p-2 font-mono text-xs"
                  >
                    {styles.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Console Output */}
            <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs">
              <p className="mb-2 text-slate-400">{"// Console Output"}</p>
              {activityLog.length === 0 ? (
                <p className="text-slate-500">Awaiting commands...</p>
              ) : (
                activityLog.map((entry, idx) => (
                  <div key={idx} className="text-slate-300">
                    <span className="text-slate-500">[{entry.timestamp}]</span> {entry.action}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right - Variants & Metrics */}
          <div className="space-y-4 lg:col-span-3">
            {/* Concept Variants */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">Artifact Variants</label>
              <div className="space-y-2">
                {concepts.map((concept, idx) => (
                  <div
                    key={concept.letter}
                    onClick={() => {
                      setSelectedConcept(idx);
                      addActivity(`Switched to variant ${concept.letter}`);
                    }}
                    className={cn(
                      "cursor-pointer rounded-lg border-2 p-3 transition-all",
                      selectedConcept === idx ? "border-violet-600 bg-violet-50" : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded text-white", concept.colorClass)}>
                        {concept.letter}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{concept.name}</p>
                        <p className="mt-1 text-xs text-slate-600">{concept.tagline}</p>
                        <p className="mt-2 font-mono text-xs text-slate-500">
                          reach: {concept.reach}k | ctr: {concept.ctr}% | conv: {concept.conv}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">Live Metrics</label>
              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-600">Reach</span>
                    <span className={cn("font-mono text-lg font-semibold", getAccentColor())}>{currentConcept.reach}k</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn("h-full rounded-full transition-all", getAccentBg())}
                      style={{ width: `${(currentConcept.reach / 1200) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-600">CTR</span>
                    <span className={cn("font-mono text-lg font-semibold", getAccentColor())}>{currentConcept.ctr}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn("h-full rounded-full transition-all", getAccentBg())}
                      style={{ width: `${(currentConcept.ctr / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-600">Conversion</span>
                    <span className={cn("font-mono text-lg font-semibold", getAccentColor())}>{currentConcept.conv}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn("h-full rounded-full transition-all", getAccentBg())}
                      style={{ width: `${(currentConcept.conv / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Tree */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">Component Tree</label>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-slate-700">&lt;Campaign&gt;</div>
                <div className="pl-4 text-slate-600">&lt;Hero variant=&quot;{currentConcept.letter}&quot; /&gt;</div>
                <div className="pl-4 text-slate-600">&lt;Features count={3} /&gt;</div>
                <div className="pl-4 text-slate-600">&lt;CTA action=&quot;Get Started&quot; /&gt;</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                onClick={handleGenerate}
                disabled={generateState === "loading"}
                className="w-full bg-violet-600 hover:bg-violet-700"
              >
                {generateState === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Building...
                  </>
                ) : generateState === "success" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Built
                  </>
                ) : generateState === "error" ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Failed
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Build Artifact
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleSave}
                  disabled={saveState === "loading"}
                  variant="outline"
                  size="sm"
                  className="border-slate-300"
                >
                  {saveState === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : saveState === "success" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={exportState === "loading"}
                  variant="outline"
                  size="sm"
                  className="border-slate-300"
                >
                  {exportState === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : exportState === "success" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Export Panel */}
        {showExportPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-lg bg-slate-900 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Artifact Export</h3>
                <Button onClick={() => setShowExportPanel(false)} size="sm" variant="ghost" className="text-white">
                  Close
                </Button>
              </div>
              <pre className="overflow-auto rounded bg-slate-800 p-4 text-xs text-slate-300">
{`// Generated Campaign Artifact
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTA } from './components/CTA';

export const Campaign${currentConcept.letter} = () => (
  <div className="campaign-container">
    <Hero
      title="${currentConcept.name}"
      tagline="${currentConcept.tagline}"
      variant="${currentConcept.letter.toLowerCase()}"
    />
    <Features
      count={3}
      layout="grid"
      theme="${currentConcept.color}"
    />
    <CTA
      action="Get Started"
      color="${currentConcept.color}"
    />
  </div>
);`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
