import { RotateCcw, Save } from 'lucide-react'
import { DEFAULT_MANTRA } from '../constants.js'

export default function DailyMantraCard({ mantraText, onChangeMantra }) {
  return (
    <section className="rounded-lg border border-white/60 bg-white/70 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl transition dark:border-white/10 dark:bg-white/10 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember dark:text-shell/70">
            Step 1 / Read
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink dark:text-pearl sm:text-4xl">
            Begin with the word. Follow with one action. Release the outcome.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onChangeMantra(DEFAULT_MANTRA)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-sage/25 bg-sage/10 px-4 py-2 text-sm font-semibold text-cedar transition hover:-translate-y-0.5 hover:bg-sage/20 focus:outline-none focus:ring-2 focus:ring-sage/40 dark:border-white/10 dark:bg-white/10 dark:text-shell dark:hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <label className="mt-6 block">
        <span className="sr-only">Editable mantra text</span>
        <textarea
          value={mantraText}
          onChange={(event) => onChangeMantra(event.target.value)}
          rows={4}
          className="w-full resize-none rounded-lg border border-sage/20 bg-pearl/90 p-4 font-display text-xl leading-snug text-ink outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/20 dark:border-white/10 dark:bg-dusk/60 dark:text-pearl dark:focus:border-shell/40 sm:text-3xl"
        />
      </label>

      <div className="mt-4 flex items-center gap-2 text-sm text-cedar/70 dark:text-shell/70">
        <Save className="h-4 w-4" />
        Saved locally on this device.
      </div>
    </section>
  )
}
