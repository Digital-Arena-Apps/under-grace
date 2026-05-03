import { CalendarDays } from 'lucide-react'
import { formatEntryDate } from '../utils/date.js'

export default function HistoryList({ entries, compact }) {
  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="rounded-lg border border-white/64 bg-white/70 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/8 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
            History
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-pearl">Previous days</h2>
        </div>
        <CalendarDays className="h-6 w-6 text-ember" />
      </div>

      <div className="mt-5 space-y-4">
        {sortedEntries.length === 0 ? (
          <p className="rounded-lg bg-pearl/72 px-4 py-4 text-sm leading-6 text-cedar/74 dark:bg-dusk/45 dark:text-shell/68">
            Your daily entries will collect here after you begin.
          </p>
        ) : (
          sortedEntries.map((entry) => (
            <article
              key={entry.date}
              className="rounded-lg border border-sage/16 bg-pearl/74 p-4 dark:border-white/10 dark:bg-dusk/42"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-ink dark:text-pearl">{formatEntryDate(entry.date)}</h3>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-cedar/58 dark:text-shell/50">
                  {entry.completedMorningRitual ? 'Morning complete' : 'In progress'}
                </p>
              </div>

              <div className={`mt-4 grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}>
                <HistoryField label="Action" value={entry.nextRightAction} />
                <HistoryField label="Reflection" value={entry.eveningReflection} />
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

function HistoryField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cedar/58 dark:text-shell/48">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-cedar dark:text-shell/72">{value?.trim() || 'Not entered yet.'}</p>
    </div>
  )
}
