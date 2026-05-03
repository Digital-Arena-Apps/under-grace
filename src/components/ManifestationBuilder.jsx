import { CheckCircle2, PenLine, RefreshCw, Save } from 'lucide-react'

export default function ManifestationBuilder({
  intention,
  generatedMantra,
  onChangeIntention,
  onChangeGeneratedMantra,
  onCreateMantra,
  onUseMantra,
}) {
  const hasIntention = intention.trim().length > 0
  const hasDraft = generatedMantra.trim().length > 0

  return (
    <section className="rounded-lg border border-white/60 bg-white/70 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember dark:text-shell/70">
            Intention
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink dark:text-pearl">
            What are you seeking to manifest?
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cedar dark:border-white/10 dark:bg-white/10 dark:text-shell/70">
          <Save className="h-4 w-4" />
          Local
        </div>
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Manifestation intention</span>
        <input
          type="text"
          value={intention}
          onChange={(event) => onChangeIntention(event.target.value)}
          placeholder="financial stability, a new job, peace in my home, confidence"
          className="w-full rounded-lg border border-sage/20 bg-pearl/90 px-4 py-4 text-base text-ink outline-none transition placeholder:text-cedar/50 focus:border-sage focus:ring-4 focus:ring-sage/20 dark:border-white/10 dark:bg-dusk/60 dark:text-pearl dark:placeholder:text-shell/40 dark:focus:border-shell/40"
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCreateMantra}
          disabled={!hasIntention}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-sage/25 bg-sage/10 px-4 py-3 text-sm font-semibold text-cedar transition hover:-translate-y-0.5 hover:bg-sage/20 focus:outline-none focus:ring-2 focus:ring-sage/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:border-sage/25 dark:bg-sage/10 dark:text-shell"
        >
          <PenLine className="h-4 w-4" />
          Create my mantra
        </button>
        {hasDraft ? (
          <button
            type="button"
            onClick={onCreateMantra}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/60 bg-white/60 px-4 py-3 text-sm font-semibold text-cedar transition hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-sage/40 dark:border-white/10 dark:bg-white/10 dark:text-shell dark:hover:bg-white/20"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </button>
        ) : null}
      </div>

      {hasDraft ? (
        <div className="mt-5 rounded-lg border border-sage/20 bg-pearl/75 p-4 dark:border-white/10 dark:bg-dusk/40">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cedar/60 dark:text-shell/50">
              Generated mantra
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-cedar/70 dark:text-shell/60">
              <CheckCircle2 className="h-4 w-4 text-sage" />
              Saved draft
            </span>
          </div>

          <label className="mt-3 block">
            <span className="sr-only">Edit generated mantra</span>
            <textarea
              value={generatedMantra}
              onChange={(event) => onChangeGeneratedMantra(event.target.value)}
              rows={6}
              className="w-full resize-none rounded-lg border border-sage/20 bg-white/70 p-4 font-display text-xl leading-snug text-ink outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/20 dark:border-white/10 dark:bg-white/10 dark:text-pearl dark:focus:border-shell/40"
            />
          </label>

          <button
            type="button"
            onClick={onUseMantra}
            disabled={!generatedMantra.trim()}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-sage/30 bg-sage/20 px-4 py-3 text-sm font-semibold text-cedar transition hover:-translate-y-0.5 hover:bg-sage/20 focus:outline-none focus:ring-2 focus:ring-sage/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:border-sage/25 dark:bg-sage/10 dark:text-shell"
          >
            <CheckCircle2 className="h-4 w-4" />
            Use as today's mantra
          </button>
        </div>
      ) : null}

      <p className="mt-4 text-sm leading-6 text-cedar/70 dark:text-shell/60">
        Intention and draft mantra are saved locally on this device.
      </p>
    </section>
  )
}
