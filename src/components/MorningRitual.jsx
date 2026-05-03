import { Check, Circle } from 'lucide-react'

export default function MorningRitual({ repeatCount, onRepeat, completed }) {
  const repeats = Array.from({ length: 3 }, (_, index) => index + 1)

  return (
    <section className="rounded-lg border border-white/62 bg-white/62 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
        Morning
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">Repeat the mantra three times.</h2>
      <p className="mt-2 text-sm leading-6 text-cedar/78 dark:text-shell/68">
        Words open the door. Action walks through it.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {repeats.map((step) => {
          const isDone = step <= repeatCount

          return (
            <button
              type="button"
              key={step}
              onClick={() => onRepeat(step)}
              className={`flex h-16 items-center justify-center rounded-lg border text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sage/45 ${
                isDone
                  ? 'border-sage/30 bg-sage/18 text-cedar dark:border-sage/30 dark:bg-sage/18 dark:text-shell'
                  : 'border-sage/18 bg-pearl/74 text-cedar/65 hover:-translate-y-0.5 hover:bg-pearl dark:border-white/10 dark:bg-dusk/42 dark:text-shell/58 dark:hover:bg-white/10'
              }`}
              aria-label={`Mark mantra repeat ${step}`}
            >
              {isDone ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-lg bg-pearl/72 px-4 py-3 text-sm font-medium text-cedar dark:bg-dusk/45 dark:text-shell/74">
        {completed ? 'Morning ritual complete.' : `${Math.min(repeatCount, 3)} of 3 repetitions complete.`}
      </div>
    </section>
  )
}
