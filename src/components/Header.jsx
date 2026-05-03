import { Settings } from 'lucide-react'
import LightDarkToggle from './LightDarkToggle.jsx'

export default function Header({ onOpenSettings, streakCount }) {
  return (
    <header className="mb-7 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar/70 dark:text-shell/70">
          Daily ritual
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold leading-none text-ink dark:text-pearl sm:text-5xl">
          Under Grace
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden rounded-full border border-white/50 bg-white/54 px-4 py-2 text-sm font-medium text-cedar shadow-innerCalm backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-shell sm:block">
          {streakCount} day streak
        </div>
        <LightDarkToggle />
        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/60 text-cedar shadow-innerCalm transition hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-sage/55 dark:border-white/10 dark:bg-white/8 dark:text-shell dark:hover:bg-white/14"
          aria-label="Open settings"
          title="Open settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
