import { RotateCcw, SlidersHorizontal, X } from 'lucide-react'
import { DEFAULT_MANTRA } from '../constants.js'

export default function SettingsPanel({
  open,
  onClose,
  settings,
  onChangeSettings,
  onResetMantra,
  onClearEntries,
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/28 px-4 py-4 backdrop-blur-sm dark:bg-black/38">
      <aside className="flex h-full w-full max-w-md flex-col rounded-lg border border-white/60 bg-ivory p-5 shadow-calm dark:border-white/10 dark:bg-dusk sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage/14 text-cedar dark:bg-white/8 dark:text-shell">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-ink dark:text-pearl">Settings</h2>
            <p className="mt-2 text-sm leading-6 text-cedar/78 dark:text-shell/68">
              Keep the ritual simple, local, and easy to return to.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage/20 bg-white/60 text-cedar transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sage/45 dark:border-white/10 dark:bg-white/8 dark:text-shell dark:hover:bg-white/14"
            aria-label="Close settings"
            title="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 space-y-4">
          <SettingToggle
            label="Show evening reflection"
            description="Keep the end-of-day prompt visible on the main screen."
            checked={settings.showEveningSection}
            onChange={(checked) => onChangeSettings({ showEveningSection: checked })}
          />
          <SettingToggle
            label="Compact history"
            description="Stack previous action and reflection notes in a narrower layout."
            checked={settings.compactHistory}
            onChange={(checked) => onChangeSettings({ compactHistory: checked })}
          />
        </div>

        <div className="mt-7 space-y-3 border-t border-sage/16 pt-6 dark:border-white/10">
          <button
            type="button"
            onClick={() => onResetMantra(DEFAULT_MANTRA)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-sage/20 bg-white/60 px-4 py-3 text-sm font-semibold text-cedar transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-sage/45 dark:border-white/10 dark:bg-white/8 dark:text-shell dark:hover:bg-white/14"
          >
            <RotateCcw className="h-4 w-4" />
            Reset mantra to default
          </button>
          <button
            type="button"
            onClick={onClearEntries}
            className="flex w-full items-center justify-center rounded-lg border border-ember/26 bg-ember/10 px-4 py-3 text-sm font-semibold text-ember transition hover:-translate-y-0.5 hover:bg-ember/14 focus:outline-none focus:ring-2 focus:ring-ember/35"
          >
            Clear daily history
          </button>
        </div>

        <p className="mt-auto pt-6 text-xs leading-5 text-cedar/60 dark:text-shell/48">
          Under Grace stores data in this browser only. It is a daily mindset and action ritual, not a promise of
          financial, medical, or spiritual outcomes.
        </p>
      </aside>
    </div>
  )
}

function SettingToggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-sage/16 bg-white/54 p-4 dark:border-white/10 dark:bg-white/8">
      <span>
        <span className="block font-semibold text-ink dark:text-pearl">{label}</span>
        <span className="mt-1 block text-sm leading-6 text-cedar/72 dark:text-shell/62">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-5 w-5 rounded border-sage/30 text-sage focus:ring-sage"
      />
    </label>
  )
}
