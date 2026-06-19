import { t } from "@/i18n"

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-950/15 bg-[#f7f7f2] text-zinc-950">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-2 px-4 py-8 font-mono text-xs text-zinc-500 sm:px-6 lg:px-8">
        <p>{t.footer.line1}</p>
        <p>{t.footer.line2}</p>
      </div>
    </footer>
  )
}
