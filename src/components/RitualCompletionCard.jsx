import { CheckCircle2, CircleArrowRight, RotateCcw } from 'lucide-react'

export default function RitualCompletionCard({ repeatCount, actionSet, complete }) {
  const repeatsRemaining = Math.max(0, 3 - repeatCount)

  if (complete) {
    return (
      <section className="rounded-lg border border-sage/30 bg-gradient-to-br from-sage/20 via-white/70 to-shell/60 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-sage/25 dark:from-sage/20 dark:via-white/10 dark:to-white/5">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage shadow-innerCalm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cedar/70 dark:text-shell/60">
              Morning complete
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">The day has a clear next step.</h2>
            <p className="mt-2 text-sm leading-6 text-cedar/80 dark:text-shell/70">
              Your words are spoken and your action is marked complete. Return this evening to notice what moved,
              clarified, or became possible.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const Icon = repeatCount >= 3 ? CircleArrowRight : RotateCcw
  const title = repeatCount >= 3 ? 'Now choose one grounded action.' : 'Move through the three repeats.'
  const body =
    repeatCount >= 3
      ? actionSet
        ? 'Your action is saved. The morning ritual will complete once the repeats are finished.'
        : 'Keep it practical and small enough to begin today.'
      : `${repeatsRemaining} ${repeatsRemaining === 1 ? 'repeat remains' : 'repeats remain'} before the action seals the morning ritual.`

  return (
    <section className="rounded-lg border border-white/60 bg-white/60 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember shadow-innerCalm">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cedar/70 dark:text-shell/60">
            Complete the morning
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-cedar/80 dark:text-shell/70">{body}</p>
        </div>
      </div>
    </section>
  )
}
