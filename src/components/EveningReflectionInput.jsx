import { Sparkles } from 'lucide-react'

export default function EveningReflectionInput({ value, onChange }) {
  return (
    <section className="rounded-lg border border-white/62 bg-white/62 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
            Evening
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">
            Where did guidance, supply, or progress show up today?
          </h2>
        </div>
        <Sparkles className="mt-1 h-6 w-6 shrink-0 text-ember" />
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Evening reflection</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder="A short note about what moved, softened, clarified, or became possible."
          className="w-full resize-none rounded-lg border border-sage/20 bg-pearl/88 p-4 text-base leading-7 text-ink outline-none transition placeholder:text-cedar/45 focus:border-sage focus:ring-4 focus:ring-sage/18 dark:border-white/10 dark:bg-dusk/62 dark:text-pearl dark:placeholder:text-shell/38 dark:focus:border-shell/40"
        />
      </label>
    </section>
  )
}
