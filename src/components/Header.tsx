export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-brand uppercase">
              Luottoriskit.fi
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Luottopäätösavustaja
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted sm:text-base">
              Arvioi asiakkaan luottoriskiä suhteessa suunniteltuun kauppaan.
            </p>
          </div>
          <span className="w-fit shrink-0 rounded-md border border-border bg-page px-2.5 py-1 text-[11px] leading-snug text-ink-subtle">
            Konseptiprototyyppi – ei tuotantokäyttöön
          </span>
        </div>
      </div>
    </header>
  )
}
