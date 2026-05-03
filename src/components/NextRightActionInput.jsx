import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function NextRightActionInput({ value, onChange, repeatComplete }) {
  const isComplete = value.trim().length > 0
  const statusText = isComplete
    ? repeatComplete
      ? 'Marked complete. Morning ritual complete.'
      : 'Action saved. Finish the repeats to mark the morning complete.'
    : 'Write one practical action, then let it be enough for today.'

  return (
    <section className="rounded-lg border border-white/60 bg-white/60 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
            Step 3 / Action
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">
            What is the next right action for today?
          </h2>
        </div>
        {isComplete ? (
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-sage" />
        ) : (
          <ArrowRight className="mt-1 h-6 w-6 shrink-0 text-ember" />
        )}
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Next right action</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          placeholder="One practical action, small enough to begin today."
          className="w-full resize-none rounded-lg border border-sage/20 bg-pearl/90 p-4 text-base leading-7 text-ink outline-none transition placeholder:text-cedar/50 focus:border-sage focus:ring-4 focus:ring-sage/20 dark:border-white/10 dark:bg-dusk/60 dark:text-pearl dark:placeholder:text-shell/40 dark:focus:border-shell/40"
        />
      </label>

      <div
        role="status"
        className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
          isComplete
            ? 'bg-sage/10 text-cedar dark:bg-sage/10 dark:text-shell/75'
            : 'bg-pearl/70 text-cedar/70 dark:bg-dusk/40 dark:text-shell/60'
        }`}
      >
        {isComplete ? <CheckCircle2 className="h-4 w-4 shrink-0 text-sage" /> : <ArrowRight className="h-4 w-4 shrink-0 text-ember" />}
        <span>{statusText}</span>
      </div>
    </section>
  )
}
