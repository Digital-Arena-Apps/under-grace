import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.jsx'

export default function LightDarkToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/60 text-cedar shadow-innerCalm transition hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-sage/55 dark:border-white/10 dark:bg-white/8 dark:text-shell dark:hover:bg-white/14"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
