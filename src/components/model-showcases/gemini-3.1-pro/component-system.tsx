"use client"

import React, { useState } from "react"
import { Layers, Puzzle, PlusCircle, Check, Loader2, Maximize2, MoveRight } from "lucide-react"

export default function ComponentSystem() {
  const [activeTheme, setActiveTheme] = useState("default")
  const [isLoading, setIsLoading] = useState(false)

  const triggerBuild = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1800)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b px-6 py-4 flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Puzzle className="w-5 h-5 text-primary" />
            <span>Muse<span className="text-muted-foreground font-normal">/Components</span></span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              Gemini 3.1 Pro
            </span>
            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border">
              shadcn-best-practices
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            View Docs
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            Publish Campaign
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left: Component Registry */}
        <aside className="w-80 border-r bg-card flex flex-col">
          <div className="p-4 border-b space-y-4">
            <h2 className="font-semibold tracking-tight">Campaign Brief</h2>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Describe your components..."
              defaultValue="A hero section with email capture, and a 3-column feature grid."
            />
            <button 
              onClick={triggerBuild}
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              Generate Blocks
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Available Blocks</h3>
            <div className="space-y-2">
              {['HeroSection', 'FeatureGrid', 'TestimonialCard', 'PricingTable'].map((block, i) => (
                <div key={block} className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground cursor-grab transition-colors">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{block}</span>
                  </div>
                  {i < 2 && <Check className="h-4 w-4 text-primary" />}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: Canvas */}
        <section className="flex-1 bg-muted/30 overflow-y-auto p-8 flex flex-col items-center">
          <div className="w-full max-w-5xl flex justify-between items-center mb-6">
            <div className="flex rounded-md border bg-card p-1">
              <button 
                onClick={() => setActiveTheme("default")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${activeTheme === "default" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Default Theme
              </button>
              <button 
                onClick={() => setActiveTheme("zinc")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${activeTheme === "zinc" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Zinc Dark
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Maximize2 className="h-4 w-4" /> 1024px
            </div>
          </div>

          <div className={`w-full max-w-5xl rounded-xl border shadow-sm overflow-hidden transition-colors duration-500 relative ${activeTheme === 'zinc' ? 'bg-zinc-950 text-zinc-50 border-zinc-800' : 'bg-background text-foreground border-border'}`}>
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin" /> Assembling components...
                </div>
              </div>
            )}
            
            {/* Assembled Component Preview */}
            <div className="px-6 py-24 md:py-32 flex flex-col items-center text-center border-b">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-6">
                New Release
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6">
                Build your next idea even faster
              </h1>
              <p className={`max-w-[42rem] leading-normal sm:text-xl sm:leading-8 mb-8 ${activeTheme === 'zinc' ? 'text-zinc-400' : 'text-muted-foreground'}`}>
                Beautifully designed components built with Radix UI and Tailwind CSS.
              </p>
              <div className="flex gap-4">
                <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 ${activeTheme === 'zinc' ? 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                  Get Started
                </button>
                <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-11 px-8 ${activeTheme === 'zinc' ? 'border-zinc-800 hover:bg-zinc-900' : 'border-input hover:bg-accent hover:text-accent-foreground'}`}>
                  View GitHub
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-12">
              {[1,2,3].map(i => (
                <div key={i} className={`rounded-lg border p-6 ${activeTheme === 'zinc' ? 'bg-zinc-900 border-zinc-800' : 'bg-card text-card-foreground shadow-sm'}`}>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold leading-none tracking-tight mb-2">Component {i}</h3>
                  <p className={`text-sm ${activeTheme === 'zinc' ? 'text-zinc-400' : 'text-muted-foreground'}`}>Accessible, customizable, and open source.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right: Metrics */}
        <aside className="w-72 border-l bg-card p-6 flex flex-col">
          <h3 className="font-semibold tracking-tight mb-6">Performance</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Accessibility</span>
                <span className="font-medium text-green-600">100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Best Practices</span>
                <span className="font-medium text-green-600">100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">SEO</span>
                <span className="font-medium text-green-600">100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border bg-muted/50 p-4">
            <h4 className="text-sm font-semibold mb-2">Conversion Estimate</h4>
            <div className="text-3xl font-bold tracking-tight">4.8%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              Based on component <MoveRight className="h-3 w-3" /> structure
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}
