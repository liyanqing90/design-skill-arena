"use client"

import { useEffect, useRef, useState } from "react"
import {
  Activity,
  BarChart3,
  Check,
  Command as CommandIcon,
  Download,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LoaderCircle,
  MessageSquareText,
  MoreHorizontal,
  Save,
  Search,
  Settings2,
  Sparkles,
  TriangleAlert,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

type DirectionId = "A" | "B" | "C"
type JobState = "idle" | "loading" | "success" | "error"

const directions: Record<
  DirectionId,
  {
    name: string
    headline: string
    copy: string
    reach: string
    ctr: string
    conversion: string
    accent: string
  }
> = {
  A: {
    name: "Clear capacity",
    headline: "Make room for the remarkable.",
    copy: "Muse One protects the hour where good work becomes unmistakable.",
    reach: "2.8M",
    ctr: "4.8%",
    conversion: "8.8%",
    accent: "from-[#3d5f9e] to-[#6f8fc8]",
  },
  B: {
    name: "Team tempo",
    headline: "Better rhythm. Better work.",
    copy: "A launch story about shared momentum without the extra meeting.",
    reach: "3.5M",
    ctr: "4.3%",
    conversion: "7.7%",
    accent: "from-[#7e4f8f] to-[#bd75aa]",
  },
  C: {
    name: "Focus object",
    headline: "An instrument for attention.",
    copy: "A composed product story built for leaders who value durable craft.",
    reach: "2.4M",
    ctr: "5.4%",
    conversion: "9.6%",
    accent: "from-[#176f70] to-[#42a5a1]",
  },
}

const projectSections = [
  { label: "Canvas", icon: LayoutDashboard },
  { label: "Brief", icon: FileText },
  { label: "Forecast", icon: BarChart3 },
  { label: "Activity", icon: Activity },
]

export default function ProductPolishChain() {
  const [direction, setDirection] = useState<DirectionId>("A")
  const [brief, setBrief] = useState("Launch Muse One as the dependable focus layer for creative teams growing without losing their standards.")
  const [audience, setAudience] = useState("Creative leads")
  const [channel, setChannel] = useState("Paid social + CRM")
  const [tone, setTone] = useState("Confident")
  const [style, setStyle] = useState("Product editorial")
  const [section, setSection] = useState("Canvas")
  const [commandOpen, setCommandOpen] = useState(false)
  const [state, setState] = useState<JobState>("idle")
  const [saved, setSaved] = useState(false)
  const [activity, setActivity] = useState([
    { action: "Campaign workspace opened", detail: "Just now" },
    { action: "Forecast assumptions synced", detail: "2 min" },
    { action: "Direction A selected", detail: "4 min" },
  ])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const runRef = useRef(0)
  const runTokenRef = useRef(0)
  const active = directions[direction]

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function addActivity(action: string, detail = "Just now") {
    setActivity((items) => [{ action, detail }, ...items].slice(0, 5))
  }

  function cancelPendingRun() {
    runTokenRef.current += 1
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function generate() {
    cancelPendingRun()
    runRef.current += 1
    const currentRun = runRef.current
    const runToken = runTokenRef.current
    setState("loading")
    setSaved(false)
    setCommandOpen(false)
    addActivity("Generation started")
    timeoutRef.current = setTimeout(() => {
      if (runToken !== runTokenRef.current) return
      timeoutRef.current = null
      if (currentRun % 2 === 0) {
        setState("error")
        addActivity("Generation needs review", "Validation issue")
      } else {
        setState("success")
        addActivity(`Direction ${direction} generated`, "Completed")
      }
    }, 760)
  }

  function save() {
    cancelPendingRun()
    setSaved(true)
    setState("success")
    setCommandOpen(false)
    addActivity(`Direction ${direction} saved`, "Draft updated")
  }

  function exportCampaign() {
    cancelPendingRun()
    setState("success")
    setCommandOpen(false)
    addActivity(`Direction ${direction} export prepared`, "Package ready")
  }

  function selectDirection(id: DirectionId) {
    cancelPendingRun()
    setDirection(id)
    setState("idle")
    setCommandOpen(false)
    addActivity(`Direction ${id} selected`)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#edf0f4] text-[#18202c]">
      <div className="grid min-h-screen min-w-0 lg:grid-cols-[220px_minmax(0,1fr)_310px] lg:grid-rows-[68px_minmax(570px,1fr)_190px]">
        <nav className="border-b border-[#d8dde6] bg-[#111827] p-3 text-white lg:row-span-3 lg:border-b-0 lg:border-r" aria-label="Project navigation">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="grid size-9 place-items-center rounded-lg bg-[#5b7cfa] text-sm font-bold">M</div>
              <div><p className="text-sm font-semibold">Muse Studio</p><p className="text-[10px] text-white/45">Campaign OS</p></div>
            </div>
            <button type="button" aria-label="Project options" className="grid min-h-11 min-w-11 place-items-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8299ff]/35 lg:hidden"><MoreHorizontal className="size-5" /></button>
          </div>
          <div className="mt-3 flex gap-1 overflow-x-auto pb-1 lg:mt-8 lg:block lg:space-y-1 lg:overflow-visible">
            {projectSections.map(({ label, icon: Icon }) => (
              <button key={label} type="button" onClick={() => { setSection(label); addActivity(`${label} view opened`) }} aria-current={section === label ? "page" : undefined} className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3 text-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8299ff]/35 lg:w-full ${section === label ? "bg-white/13 text-white" : "text-white/55 hover:bg-white/8 hover:text-white"}`}><Icon className="size-4" />{label}</button>
            ))}
          </div>
          <div className="mt-8 hidden border-t border-white/10 pt-5 lg:block">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Current project</p>
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-white/6 p-3"><FolderKanban className="size-4 text-[#8ba4ff]" /><div className="min-w-0"><p className="truncate text-xs font-medium">Muse One Launch</p><p className="mt-1 text-[10px] text-white/35">Draft 06</p></div></div>
          </div>
          <div className="mt-auto hidden pt-8 lg:block">
            <div className="rounded-lg border border-white/10 p-3 text-[10px] leading-5 text-white/45"><p className="font-semibold text-white/70">GPT 5.6 Sol</p><p className="mt-1 break-words">frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable</p></div>
          </div>
        </nav>

        <header className="flex min-w-0 flex-col gap-3 border-b border-[#d8dde6] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:col-span-2 lg:col-start-2 lg:row-start-1" aria-label="Campaign command bar">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-[#667085]"><span>Projects</span><span>/</span><span>Muse One Launch</span></div>
            <p className="mt-0.5 truncate text-sm font-semibold">{section} workspace</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-[#d8dde6] bg-[#f8fafc] px-2.5 py-1.5 text-[10px] font-semibold lg:hidden">GPT 5.6 Sol</span>
            <span className="basis-full break-words rounded-md border border-[#d8dde6] bg-[#f8fafc] px-2.5 py-1.5 text-[9px] leading-4 text-[#526072] lg:hidden">frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable</span>
            <button type="button" aria-keyshortcuts="Meta+K Control+K" onClick={() => setCommandOpen(true)} className="inline-flex min-h-11 min-w-[180px] items-center gap-2 rounded-lg border border-[#cfd5df] bg-[#f8fafc] px-3 text-sm text-[#667085] transition hover:border-[#9aa8bf] hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#607df3]/25"><Search className="size-4" /><span className="mr-auto">Search commands</span><kbd className="rounded border border-[#d6dbe3] bg-white px-1.5 py-0.5 text-[10px]">⌘K</kbd></button>
            <button type="button" onClick={generate} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#4f6fe8] px-4 text-sm font-semibold text-white transition hover:bg-[#3e5ed7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#607df3]/30">{state === "loading" ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-4" />}{state === "loading" ? "Generating" : "Generate"}</button>
          </div>
        </header>

        <section className="min-w-0 p-3 sm:p-5 lg:col-start-2 lg:row-start-2" aria-label="Campaign preview workspace">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lg border border-[#cfd5df] bg-white p-1" role="group" aria-label="Creative directions">
              {(Object.keys(directions) as DirectionId[]).map((id) => <button key={id} type="button" onClick={() => selectDirection(id)} aria-pressed={direction === id} className={`min-h-11 rounded-md px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#607df3]/25 ${direction === id ? "bg-[#e9edff] text-[#3452bd]" : "text-[#667085] hover:bg-[#f3f5f8] hover:text-[#1f2937]"}`}>{id} / {directions[id].name}</button>)}
            </div>
            <span className="text-xs text-[#7a8494]">Preview updates from inspector controls</span>
          </div>
          <div className="relative isolate flex min-h-[500px] overflow-hidden rounded-xl border border-[#cfd5df] bg-[#e7ebf4] shadow-sm">
            <div className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-90`} />
            <div className="absolute -right-20 top-14 h-96 w-72 rotate-12 rounded-[44%] border-[36px] border-white/18" />
            <div className="absolute bottom-[-4rem] right-[32%] size-64 rounded-full bg-white/15 blur-2xl" />
            <div className="relative flex w-full flex-col justify-between p-5 text-white sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Muse One / Direction {direction}</p><p className="mt-3 max-w-lg text-sm leading-6 text-white/75">{brief || "Add a campaign brief in the inspector."}</p></div>
                <span className="rounded-md border border-white/25 bg-black/10 px-3 py-1.5 text-xs backdrop-blur">{channel}</span>
              </div>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{tone} / {style}</p>
                <h1 className="mt-3 text-5xl font-semibold leading-[0.94] tracking-[-0.04em] sm:text-6xl">{active.headline}</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/80">{active.copy}</p>
                <button type="button" className="mt-7 min-h-11 rounded-lg bg-white px-5 text-sm font-semibold text-[#2e4e9a] transition hover:bg-[#eef3ff] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">Explore Muse One</button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-4 text-xs text-white/65"><span>{audience}</span><span>Local campaign mock</span></div>
            </div>
          </div>
        </section>

        <aside className="min-w-0 border-t border-[#d8dde6] bg-white p-4 lg:col-start-3 lg:row-start-2 lg:border-l lg:border-t-0" aria-label="Campaign inspector">
          <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold">Inspector</h2><p className="mt-1 text-xs text-[#7a8494]">Campaign inputs and forecast</p></div><Settings2 className="size-4 text-[#7a8494]" /></div>
          <label htmlFor="pp-brief" className="mt-5 block text-xs font-semibold text-[#4b5565]">Campaign Brief</label>
          <textarea id="pp-brief" value={brief} onChange={(event) => setBrief(event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-lg border border-[#cfd5df] bg-white p-3 text-sm leading-5 outline-none transition focus:border-[#607df3] focus:ring-4 focus:ring-[#607df3]/18" />
          <div className="mt-4 grid gap-3">
            {([
              ["Audience", "pp-audience", audience, setAudience, ["Creative leads", "Studio owners", "Product executives"]],
              ["Channel", "pp-channel", channel, setChannel, ["Paid social + CRM", "OOH + launch", "Creator partnerships"]],
              ["Tone", "pp-tone", tone, setTone, ["Confident", "Warm", "Direct"]],
              ["Visual style", "pp-style", style, setStyle, ["Product editorial", "Human systems", "Quiet premium"]],
            ] as const).map(([label, id, value, setter, options]) => <label key={id} htmlFor={id} className="grid gap-1.5 text-xs font-semibold text-[#4b5565]">{label}<select id={id} value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 rounded-lg border border-[#cfd5df] bg-white px-3 text-sm font-normal text-[#18202c] outline-none transition hover:border-[#9aa8bf] focus:border-[#607df3] focus:ring-4 focus:ring-[#607df3]/18">{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
          </div>
          <div className="mt-5 border-t border-[#e0e4eb] pt-4">
            <p className="text-xs font-semibold text-[#4b5565]">Forecast</p>
            <div className="mt-3 grid grid-cols-3 gap-2">{[["Reach", active.reach], ["CTR", active.ctr], ["Conversion", active.conversion]].map(([label, value]) => <div key={label} className="min-w-0 rounded-lg bg-[#f1f4f8] p-2"><p className="truncate text-[8px] font-bold uppercase tracking-wide text-[#7a8494]" title={label}>{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>)}</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={save} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#cfd5df] text-sm font-semibold transition hover:bg-[#f4f6f9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#607df3]/20">{saved ? <Check className="size-4 text-[#3e7a61]" /> : <Save className="size-4" />}{saved ? "Saved" : "Save"}</button><button type="button" onClick={exportCampaign} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#cfd5df] text-sm font-semibold transition hover:bg-[#f4f6f9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#607df3]/20"><Download className="size-4" />Export</button></div>
        </aside>

        <section className="min-w-0 border-t border-[#d8dde6] bg-white p-4 lg:col-span-2 lg:col-start-2 lg:row-start-3" aria-labelledby="pp-activity">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><h2 id="pp-activity" className="flex items-center gap-2 text-sm font-semibold"><MessageSquareText className="size-4" />Activity</h2><p className="mt-1 text-xs text-[#7a8494]">Recent campaign operations</p></div>
            <div className="min-h-11" aria-live="polite">
              {state === "idle" && <span className="inline-flex rounded-full bg-[#f1f4f8] px-3 py-2 text-xs text-[#667085]">Ready</span>}
              {state === "loading" && <span role="status" className="inline-flex items-center gap-2 rounded-full bg-[#e9edff] px-3 py-2 text-xs text-[#3452bd]"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />Generating</span>}
              {state === "success" && <span role="status" className="inline-flex items-center gap-2 rounded-full bg-[#e5f2eb] px-3 py-2 text-xs font-semibold text-[#2e6b4e]"><Check className="size-4" />{saved ? "Saved" : "Operation complete"}</span>}
              {state === "error" && <span role="alert" className="inline-flex items-center gap-2 rounded-full bg-[#fbe9e7] px-3 py-2 text-xs font-semibold text-[#9b3d35]"><TriangleAlert className="size-4" />Review and retry</span>}
            </div>
          </div>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">{activity.map((item, index) => <li key={`${item.action}-${index}`} className="rounded-lg border border-[#e0e4eb] px-3 py-2"><p className="truncate text-xs font-medium">{item.action}</p><p className="mt-1 text-[10px] text-[#8a94a3]">{item.detail}</p></li>)}</ol>
        </section>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} title="Muse campaign commands" description="Search and run campaign generation, saving, export, and direction commands.">
        <CommandInput placeholder="Type a campaign command…" />
        <CommandList>
          <CommandEmpty>No matching campaign command.</CommandEmpty>
          <CommandGroup heading="Campaign actions">
            <CommandItem onSelect={generate}><Sparkles />Generate campaign<CommandShortcut>G</CommandShortcut></CommandItem>
            <CommandItem onSelect={save}><Save />Save current direction<CommandShortcut>S</CommandShortcut></CommandItem>
            <CommandItem onSelect={exportCampaign}><Download />Prepare export<CommandShortcut>E</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandGroup heading="Creative directions">
            {(Object.keys(directions) as DirectionId[]).map((id) => <CommandItem key={id} onSelect={() => selectDirection(id)} data-checked={direction === id}><CommandIcon />Direction {id}: {directions[id].name}</CommandItem>)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </main>
  )
}
