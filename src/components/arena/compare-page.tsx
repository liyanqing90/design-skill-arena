"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResultPreview } from "@/components/arena/result-preview"
import { SkillChain } from "@/components/arena/skill-chain"
import { showcases } from "@/data/showcases"

export function ComparePage() {
  const [selectedIds, setSelectedIds] = useState([
    "gpt-55-standard-builder",
    "gpt-55-standard-impeccable",
    "gpt-55-product-polish-chain",
  ])

  const selected = useMemo(
    () => selectedIds.map((id) => showcases.find((item) => item.id === id)).filter(Boolean),
    [selectedIds]
  )

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">并排查看</h1>
        <p className="mt-2 text-muted-foreground">
          选择 2 到 4 个结果页，把视觉方向和 skill chain 放在一起看。
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {showcases.map((item) => {
          const checked = selectedIds.includes(item.id)
          const disabled = !checked && selectedIds.length >= 4

          return (
            <label key={item.id} className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelectedIds((current) => [...current, item.id].slice(0, 4))
                  } else {
                    setSelectedIds((current) => current.filter((id) => id !== item.id))
                  }
                }}
              />
              {item.model} · {item.numericId}. {item.title}
            </label>
          )
        })}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        {selected.map((item) =>
          item ? (
            <Card key={item.id} className="rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">{item.numericId}</div>
                    <CardTitle className="mt-1">{item.title}</CardTitle>
                  </div>
                  <Badge variant="outline">{item.model}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ResultPreview item={item} compact />
                <SkillChain skillIds={item.skills} />
                <p className="text-sm leading-6 text-muted-foreground">{item.focus}</p>
                <Button nativeButton={false} variant="outline" render={<a href={item.demoUrl} target="_blank" rel="noreferrer" />}>
                  打开页面
                </Button>
              </CardContent>
            </Card>
          ) : null
        )}
      </div>
      <Link href="/" className="text-sm text-muted-foreground transition hover:text-foreground">
        返回渲染效果墙
      </Link>
    </main>
  )
}
