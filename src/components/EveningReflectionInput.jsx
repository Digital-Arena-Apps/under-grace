import { PenLine } from 'lucide-react'

export default function EveningReflectionInput({ value, onChange }) {
  return (
    <section className="rounded-lg border border-white/60 bg-white/60 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
            Step 4 / Reflect
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">
            Where did guidance, supply, or progress show up today?
          </h2>
        </div>
        <PenLine className="mt-1 h-6 w-6 shrink-0 text-ember" />
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Evening reflection</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder="A short note about what moved, softened, clarified, or became possible."
          className="w-full resize-none rounded-lg border border-sage/20 bg-pearl/90 p-4 text-base leading-7 text-ink outline-none transition placeholder:text-cedar/50 focus:border-sage focus:ring-4 focus:ring-sage/20 dark:border-white/10 dark:bg-dusk/60 dark:text-pearl dark:placeholder:text-shell/40 dark:focus:border-shell/40"
        />
      </label>
    </section>
  )
}
