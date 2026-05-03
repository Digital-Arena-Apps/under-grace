import { Check, Circle } from 'lucide-react'

export default function MorningRitual({ repeatCount, onRepeat, completed }) {
  const repeats = ['First', 'Second', 'Third']

  return (
    <section className="rounded-lg border border-white/60 bg-white/60 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
        Step 2 / Repeat
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">Repeat the mantra three times.</h2>
      <p className="mt-2 text-sm leading-6 text-cedar/80 dark:text-shell/70">
        Words open the door. Action walks through it.
      </p>

      <div className="mt-5 h-2 rounded-full bg-sage/10 p-0.5 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-sage transition-all duration-500"
          style={{ width: `${(Math.min(repeatCount, 3) / 3) * 100}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {repeats.map((label, index) => {
          const step = index + 1
          const isDone = step <= repeatCount

          return (
            <button
              type="button"
              key={step}
              onClick={() => onRepeat(step)}
              aria-pressed={isDone}
              className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-3 text-sm font-semibold shadow-[0_16px_30px_-24px_rgba(78,94,86,0.85)] transition duration-200 active:translate-y-0.5 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-sage/40 sm:min-h-24 ${
                isDone
                  ? 'border-sage/40 bg-gradient-to-b from-sage/20 to-sage/10 text-cedar dark:border-sage/30 dark:from-sage/20 dark:to-sage/10 dark:text-shell'
                  : 'border-sage/20 bg-gradient-to-b from-pearl/90 to-shell/60 text-cedar/70 hover:-translate-y-0.5 hover:border-sage/30 hover:text-cedar dark:border-white/10 dark:from-dusk/50 dark:to-white/5 dark:text-shell/60 dark:hover:bg-white/10 dark:hover:text-shell'
              }`}
              aria-label={`Mark mantra repeat ${step}`}
            >
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-innerCalm ${
                  isDone
                    ? 'border-sage/30 bg-white/60 text-sage dark:border-sage/25 dark:bg-white/10'
                    : 'border-sage/20 bg-white/50 text-cedar/50 dark:border-white/10 dark:bg-white/10 dark:text-shell/40'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </span>
              <span className="mt-1">{label}</span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] opacity-60">Repeat</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-lg bg-pearl/70 px-4 py-3 text-sm font-medium text-cedar dark:bg-dusk/40 dark:text-shell/75">
        {completed ? 'Three repetitions complete. Choose one action to seal the morning.' : `${Math.min(repeatCount, 3)} of 3 repetitions complete.`}
      </div>
    </section>
  )
}
