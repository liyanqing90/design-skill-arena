"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Save, Download, Check, AlertCircle, Loader2 } from "lucide-react";

interface Concept {
  letter: string;
  name: string;
  tagline: string;
  reach: number;
  ctr: number;
  conv: number;
  directorNote: string;
}

interface ActivityEntry {
  timestamp: string;
  action: string;
}

const concepts: Concept[] = [
  {
    letter: "A",
    name: "Provenance",
    tagline: "Every stitch carries a story worth keeping.",
    reach: 580,
    ctr: 3.6,
    conv: 4.2,
    directorNote: "Heritage speaks to those who understand that true luxury is patience made tangible.",
  },
  {
    letter: "B",
    name: "Material Truth",
    tagline: "Let the leather speak before the logo appears.",
    reach: 520,
    ctr: 4.0,
    conv: 4.5,
    directorNote: "When craft is this refined, the material becomes the manifesto.",
  },
  {
    letter: "C",
    name: "Quiet Signal",
    tagline: "The collection that doesn't need to announce itself.",
    reach: 490,
    ctr: 3.2,
    conv: 4.8,
    directorNote: "Confidence whispers. The discerning always lean in.",
  },
];

const audiences = ["Discerning collectors", "Luxury lifestyle editors", "Heritage brand loyalists", "Art curators"];
const channels = ["Private preview events", "Luxury magazine", "Curated email", "Gallery partnerships"];
const tones = ["Refined", "Understated", "Confident", "Timeless"];
const styles = ["Heritage portrait", "Material close-up", "Atelier scene", "Archive editorial"];

export default function ImpeccableFullFlow() {
  const [brief, setBrief] = useState(
    "Craft an impeccable launch campaign for Muse promoting a handcrafted leather goods collection to discerning collectors who value provenance and craft."
  );
  const [audience, setAudience] = useState(audiences[0]);
  const [channel, setChannel] = useState(channels[0]);
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);
  const [generateState, setGenerateState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [exportState, setExportState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const currentConcept = concepts[selectedConcept];

  const addActivity = (action: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setActivityLog((prev) => [{ timestamp, action }, ...prev].slice(0, 5));
  };

  const handleGenerate = async () => {
    setGenerateState("loading");
    addActivity("Generating campaign concepts");
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (brief.length >= 16) {
      setGenerateState("success");
      addActivity("Campaign generated successfully");
      setTimeout(() => setGenerateState("idle"), 2000);
    } else {
      setGenerateState("error");
      addActivity("Generation failed: brief too short");
      setTimeout(() => setGenerateState("idle"), 2000);
    }
  };

  const handleSave = async () => {
    setSaveState("loading");
    addActivity("Saving campaign");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaveState("success");
    addActivity("Campaign saved");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const handleExport = async () => {
    setExportState("loading");
    addActivity("Exporting assets");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setExportState("success");
    addActivity("Assets exported");
    setTimeout(() => setExportState("idle"), 2000);
  };

  const flipCard = (index: number) => {
    setFlippedCards((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-4xl italic text-stone-900">Impeccable</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">Full Campaign Flow</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-stone-700">Qwen 3.7 Max</p>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-700">impeccable</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left Column - 60% */}
          <div className="space-y-6 lg:col-span-3">
            {/* Campaign Brief */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-stone-500">Campaign Brief</label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full resize-none border-b border-stone-200 bg-transparent pb-2 font-serif text-lg italic text-stone-800 outline-none focus:border-amber-700"
                rows={4}
                placeholder="Describe your campaign vision..."
              />
            </div>

            {/* Controls */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="mb-4 block text-xs uppercase tracking-[0.2em] text-stone-500">Campaign Parameters</label>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs text-stone-600">Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-800 outline-none focus:border-amber-700"
                  >
                    {audiences.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs text-stone-600">Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-800 outline-none focus:border-amber-700"
                  >
                    {channels.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs text-stone-600">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-800 outline-none focus:border-amber-700"
                  >
                    {tones.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs text-stone-600">Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-800 outline-none focus:border-amber-700"
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

            {/* Creative Preview */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <label className="mb-6 block text-xs uppercase tracking-[0.2em] text-stone-500">Editorial Spread</label>
              <div className="mb-8 text-center">
                <h2 className="font-serif text-5xl italic text-stone-900">{currentConcept.name}</h2>
                <hr className="mx-auto my-6 w-24 border-amber-700" />
                <p className="mx-auto max-w-md font-serif text-xl italic text-stone-700">{currentConcept.tagline}</p>
              </div>

              <div className="mt-8 rounded-lg border-l-4 border-amber-700 bg-stone-50 p-6">
                <p className="font-serif text-lg italic text-stone-800">{"\""}{currentConcept.directorNote}{"\""}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500">— Creative Director&apos;s Note</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="aspect-video rounded bg-gradient-to-br from-stone-200 to-stone-300 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-600">16:9 Hero</p>
                  <p className="mt-2 font-serif text-sm italic text-stone-700">Editorial centerpiece</p>
                </div>
                <div className="aspect-square rounded bg-gradient-to-br from-stone-200 to-stone-300 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-600">1:1 Social</p>
                  <p className="mt-2 font-serif text-sm italic text-stone-700">Intimate detail</p>
                </div>
                <div className="aspect-[9/16] rounded bg-gradient-to-br from-stone-200 to-stone-300 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-600">9:16 Story</p>
                  <p className="mt-2 font-serif text-sm italic text-stone-700">Vertical narrative</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="space-y-6 lg:col-span-2">
            {/* Concepts */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="mb-4 block text-xs uppercase tracking-[0.2em] text-stone-500">Concepts</label>
              <div className="space-y-3">
                {concepts.map((concept, idx) => (
                  <div
                    key={concept.letter}
                    onClick={() => {
                      setSelectedConcept(idx);
                      flipCard(idx);
                      addActivity(`Selected concept ${concept.letter}: ${concept.name}`);
                    }}
                    className={cn(
                      "cursor-pointer rounded-lg border-2 p-4 transition-all",
                      selectedConcept === idx ? "border-amber-700 bg-amber-50" : "border-stone-200 hover:border-stone-300"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded font-serif text-2xl transition-transform",
                          flippedCards[idx] ? "bg-amber-700 text-white" : "bg-stone-100 text-stone-700"
                        )}
                        style={{ transform: flippedCards[idx] ? "rotateY(180deg)" : "rotateY(0deg)" }}
                      >
                        {concept.letter}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-stone-900">{concept.name}</h3>
                        <p className="mt-1 text-sm italic text-stone-600">{concept.tagline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="mb-4 block text-xs uppercase tracking-[0.2em] text-stone-500">Performance Metrics</label>
              <div className="space-y-4">
                <div className="border-b border-stone-100 pb-4">
                  <p className="text-xs text-stone-500">Reach (K)</p>
                  <p className="font-serif text-3xl text-stone-900">{currentConcept.reach}</p>
                </div>
                <div className="border-b border-stone-100 pb-4">
                  <p className="text-xs text-stone-500">CTR (%)</p>
                  <p className="font-serif text-3xl text-stone-900">{currentConcept.ctr}</p>
                </div>
                <div className="pb-2">
                  <p className="text-xs text-stone-500">Conversion (%)</p>
                  <p className="font-serif text-3xl text-stone-900">{currentConcept.conv}</p>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="mb-4 block text-xs uppercase tracking-[0.2em] text-stone-500">Activity</label>
              <div className="space-y-2">
                {activityLog.length === 0 ? (
                  <p className="text-sm italic text-stone-400">No activity yet</p>
                ) : (
                  activityLog.map((entry, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <span className="font-mono text-xs text-stone-400">{entry.timestamp}</span>
                      <span className="text-stone-700">{entry.action}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleGenerate}
                disabled={generateState === "loading"}
                className="w-full bg-amber-700 hover:bg-amber-800"
              >
                {generateState === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Composing...
                  </>
                ) : generateState === "success" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Composed
                  </>
                ) : generateState === "error" ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Failed
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Compose
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleSave}
                  disabled={saveState === "loading"}
                  variant="outline"
                  className="border-stone-300"
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
                  className="border-stone-300"
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
      </div>
    </div>
  );
}
