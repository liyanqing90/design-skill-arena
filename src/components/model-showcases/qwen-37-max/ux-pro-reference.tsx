"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Save, Download, Check, AlertCircle, Loader2, Users, Layout, BarChart3 } from "lucide-react";

interface Concept {
  letter: string;
  name: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  uxScore: { clarity: number; accessibility: number; consistency: number };
}

interface ActivityEntry {
  timestamp: string;
  action: string;
  category: string;
}

const concepts: Concept[] = [
  {
    letter: "A",
    name: "Evidence First",
    tagline: "The data says breathe, and here is why.",
    reach: 680,
    ctr: 3.9,
    conv: 3.8,
    uxScore: { clarity: 85, accessibility: 92, consistency: 88 },
  },
  {
    letter: "B",
    name: "Human Moment",
    tagline: "The pause between meetings that changes everything.",
    reach: 750,
    ctr: 4.3,
    conv: 3.5,
    uxScore: { clarity: 90, accessibility: 88, consistency: 85 },
  },
  {
    letter: "C",
    name: "Clinical Trust",
    tagline: "Built with psychologists, tested with professionals.",
    reach: 620,
    ctr: 3.6,
    conv: 4.1,
    uxScore: { clarity: 82, accessibility: 95, consistency: 91 },
  },
];

const audiences = ["Busy professionals", "Corporate wellness teams", "Health-conscious millennials", "Clinical psychology reviewers"];
const channels = ["Wellness app stores", "Corporate intranet", "Health podcasts", "Clinical partnerships"];
const tones = ["Evidence-based", "Empathetic", "Clear", "Reassuring"];
const styles = ["Data visualization", "Calm interface", "Human portrait", "Clinical clean"];

export default function UxProReference() {
  const [brief, setBrief] = useState(
    "Design a user-research-informed campaign for Muse launching a wellness app aimed at busy professionals who need evidence-based stress management tools."
  );
  const [audience, setAudience] = useState(audiences[0]);
  const [channel, setChannel] = useState(channels[0]);
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);
  const [generateState, setGenerateState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [exportState, setExportState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hoveredAnnotation, setHoveredAnnotation] = useState<number | null>(null);

  const currentConcept = concepts[selectedConcept];

  const addActivity = (action: string, category: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setActivityLog((prev) => [{ timestamp, action, category }, ...prev].slice(0, 5));
  };

  const handleGenerate = async () => {
    setGenerateState("loading");
    addActivity("Running user research analysis", "Research");
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (brief.length >= 16) {
      setGenerateState("success");
      addActivity("Research synthesis complete", "Analysis");
      setTimeout(() => setGenerateState("idle"), 2000);
    } else {
      setGenerateState("error");
      addActivity("Insufficient brief data", "Error");
      setTimeout(() => setGenerateState("idle"), 2000);
    }
  };

  const handleSave = async () => {
    setSaveState("loading");
    addActivity("Saving research findings", "Save");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaveState("success");
    addActivity("Campaign saved", "Success");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const handleExport = async () => {
    setExportState("loading");
    addActivity("Exporting UX report", "Export");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setExportState("success");
    addActivity("Report exported", "Success");
    setTimeout(() => setExportState("idle"), 2000);
  };

  const annotations = [
    { id: 1, x: 20, y: 30, label: "Hero", rationale: "Clear value proposition with supporting evidence" },
    { id: 2, x: 50, y: 50, label: "CTA", rationale: "Primary action with trust indicators" },
    { id: 3, x: 75, y: 35, label: "Social Proof", rationale: "Clinical validation and user testimonials" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">UX Pro Reference</h1>
            <p className="text-sm text-slate-600">Research-driven campaign design</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">Qwen 3.7 Max</p>
            <p className="text-xs font-semibold text-indigo-600">ui-ux-pro-max</p>
          </div>
        </div>

        {/* Compact Brief */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Campaign Brief</label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="w-full resize-none rounded border border-slate-200 bg-slate-50 p-2 text-sm text-slate-800 outline-none focus:border-indigo-600"
            rows={2}
            placeholder="Define your campaign objectives..."
          />
        </div>

        {/* 4-Quadrant Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Top Left - User Research */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              <label className="text-xs font-semibold uppercase text-slate-500">User Research</label>
            </div>
            <div className="space-y-2">
              <div className="rounded border border-slate-200 p-2">
                <p className="text-xs font-semibold text-slate-700">Target Audience</p>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-slate-50 p-1 text-xs"
                >
                  {audiences.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded border border-slate-200 p-2">
                <p className="text-xs font-semibold text-slate-700">Insights</p>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Engagement intent</span>
                    <span className="font-semibold text-teal-600">78%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Trust factor</span>
                    <span className="font-semibold text-teal-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Clarity score</span>
                    <span className="font-semibold text-teal-600">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right - Wireframe Preview */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Layout className="h-4 w-4 text-indigo-600" />
              <label className="text-xs font-semibold uppercase text-slate-500">Annotated Wireframe</label>
            </div>
            <div className="relative aspect-video rounded border-2 border-slate-200 bg-slate-50 p-4">
              {/* Wireframe content */}
              <div className="mb-2 h-8 w-3/4 rounded bg-slate-200"></div>
              <div className="mb-2 h-4 w-1/2 rounded bg-slate-200"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded bg-slate-200"></div>
                <div className="h-12 rounded bg-slate-200"></div>
                <div className="h-12 rounded bg-slate-200"></div>
              </div>

              {/* Annotation circles */}
              {annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                  onMouseEnter={() => setHoveredAnnotation(annotation.id)}
                  onMouseLeave={() => setHoveredAnnotation(null)}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {annotation.id === 1 ? "①" : annotation.id === 2 ? "②" : "③"}
                  </div>
                  {hoveredAnnotation === annotation.id && (
                    <div className="absolute left-8 top-0 z-10 w-48 rounded border border-slate-200 bg-white p-2 shadow-lg">
                      <p className="text-xs font-semibold text-slate-900">{annotation.label}</p>
                      <p className="mt-1 text-xs text-slate-600">{annotation.rationale}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left - Concept Comparison */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <label className="text-xs font-semibold uppercase text-slate-500">Concept Comparison</label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 text-left text-slate-500">Attribute</th>
                    {concepts.map((c) => (
                      <th
                        key={c.letter}
                        className={cn(
                          "pb-2 text-center",
                          selectedConcept === concepts.indexOf(c) ? "font-bold text-indigo-600" : "text-slate-500"
                        )}
                      >
                        {c.letter}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">Name</td>
                    {concepts.map((c, idx) => (
                      <td
                        key={idx}
                        onClick={() => {
                          setSelectedConcept(idx);
                          addActivity(`Selected concept ${c.letter}`, "Selection");
                        }}
                        className={cn(
                          "cursor-pointer py-2 text-center",
                          selectedConcept === idx ? "font-semibold text-indigo-600" : "text-slate-600"
                        )}
                      >
                        {c.name}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">Reach</td>
                    {concepts.map((c, idx) => (
                      <td key={idx} className="py-2 text-center tabular-nums text-slate-600">
                        {c.reach}k
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">CTR</td>
                    {concepts.map((c, idx) => (
                      <td key={idx} className="py-2 text-center tabular-nums text-slate-600">
                        {c.ctr}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-700">Conv</td>
                    {concepts.map((c, idx) => (
                      <td key={idx} className="py-2 text-center tabular-nums text-slate-600">
                        {c.conv}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Right - Metrics & UX Score */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <label className="text-xs font-semibold uppercase text-slate-500">Metrics & UX Score</label>
            </div>

            {/* Metrics with mini charts */}
            <div className="mb-4 space-y-2">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-600">Reach</span>
                  <span className="tabular-nums text-sm font-semibold text-slate-900">{currentConcept.reach}k</span>
                </div>
                <div className="mt-1 flex gap-1">
                  {concepts.map((c, idx) => (
                    <div
                      key={idx}
                      className={cn("h-6 flex-1 rounded", idx === selectedConcept ? "bg-indigo-600" : "bg-slate-200")}
                      style={{ height: `${(c.reach / 800) * 24}px` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-600">CTR</span>
                  <span className="tabular-nums text-sm font-semibold text-slate-900">{currentConcept.ctr}%</span>
                </div>
                <div className="mt-1 flex gap-1">
                  {concepts.map((c, idx) => (
                    <div
                      key={idx}
                      className={cn("h-6 flex-1 rounded", idx === selectedConcept ? "bg-indigo-600" : "bg-slate-200")}
                      style={{ height: `${(c.ctr / 5) * 24}px` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-600">Conversion</span>
                  <span className="tabular-nums text-sm font-semibold text-slate-900">{currentConcept.conv}%</span>
                </div>
                <div className="mt-1 flex gap-1">
                  {concepts.map((c, idx) => (
                    <div
                      key={idx}
                      className={cn("h-6 flex-1 rounded", idx === selectedConcept ? "bg-indigo-600" : "bg-slate-200")}
                      style={{ height: `${(c.conv / 5) * 24}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* UX Score */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700">UX Score</p>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Clarity</span>
                  <span className="tabular-nums font-semibold text-teal-600">{currentConcept.uxScore.clarity}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all"
                    style={{ width: `${currentConcept.uxScore.clarity}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Accessibility</span>
                  <span className="tabular-nums font-semibold text-teal-600">{currentConcept.uxScore.accessibility}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all"
                    style={{ width: `${currentConcept.uxScore.accessibility}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Consistency</span>
                  <span className="tabular-nums font-semibold text-teal-600">{currentConcept.uxScore.consistency}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all"
                    style={{ width: `${currentConcept.uxScore.consistency}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* User Journey */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-slate-700">User Journey</p>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((step, idx) => (
                  <React.Fragment key={step}>
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white",
                        idx <= selectedConcept + 1 ? "bg-indigo-600" : "bg-slate-300"
                      )}
                    >
                      {step}
                    </div>
                    {idx < 4 && <div className={cn("h-0.5 flex-1", idx < selectedConcept + 1 ? "bg-indigo-600" : "bg-slate-200")}></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Toolbar */}
        <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
          >
            {channels.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
          >
            {tones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
          >
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="mx-2 h-6 w-px bg-slate-200"></div>
          <Button
            onClick={handleGenerate}
            disabled={generateState === "loading"}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {generateState === "loading" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : generateState === "success" ? (
              <Check className="h-3 w-3" />
            ) : generateState === "error" ? (
              <AlertCircle className="h-3 w-3" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saveState === "loading"}
            size="sm"
            variant="outline"
            className="border-slate-300"
          >
            {saveState === "loading" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : saveState === "success" ? (
              <Check className="h-3 w-3" />
            ) : (
              <Save className="h-3 w-3" />
            )}
          </Button>
          <Button
            onClick={handleExport}
            disabled={exportState === "loading"}
            size="sm"
            variant="outline"
            className="border-slate-300"
          >
            {exportState === "loading" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : exportState === "success" ? (
              <Check className="h-3 w-3" />
            ) : (
              <Download className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Activity Timeline */}
        <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
          <label className="mb-3 block text-xs font-semibold uppercase text-slate-500">Activity Timeline</label>
          {activityLog.length === 0 ? (
            <p className="text-xs text-slate-400">No activity recorded</p>
          ) : (
            <div className="space-y-2">
              {activityLog.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-slate-400">{entry.timestamp}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">{entry.category}</span>
                  <span className="text-slate-700">{entry.action}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
