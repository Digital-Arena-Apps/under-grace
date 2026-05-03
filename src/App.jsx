import { useEffect, useMemo, useState } from 'react'
import AppShell from './components/AppShell.jsx'
import DailyMantraCard from './components/DailyMantraCard.jsx'
import EveningReflectionInput from './components/EveningReflectionInput.jsx'
import Header from './components/Header.jsx'
import HistoryList from './components/HistoryList.jsx'
import MorningRitual from './components/MorningRitual.jsx'
import NextRightActionInput from './components/NextRightActionInput.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import { DEFAULT_MANTRA, DEFAULT_SETTINGS, STORAGE_KEYS } from './constants.js'
import { ThemeProvider } from './hooks/useTheme.jsx'
import { useDailyEntries } from './hooks/useDailyEntries.js'
import { loadFromStorage, saveToStorage } from './utils/storage.js'
import { calculateStreak } from './utils/streaks.js'

export default function App() {
  return (
    <ThemeProvider>
      <UnderGraceApp />
    </ThemeProvider>
  )
}

function UnderGraceApp() {
  const [mantraText, setMantraText] = useState(() => loadFromStorage(STORAGE_KEYS.mantra, DEFAULT_MANTRA))
  const [repeatCount, setRepeatCount] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState(() => loadFromStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS))
  const { entries, todayEntry, updateToday, clearEntries } = useDailyEntries(mantraText)
  const streakCount = useMemo(() => calculateStreak(entries), [entries])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.mantra, mantraText)
    updateToday({ mantraText })
    // The entry update intentionally follows mantra edits so today's saved history mirrors the active text.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mantraText])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings)
  }, [settings])

  useEffect(() => {
    setRepeatCount(todayEntry.completedMorningRitual ? 3 : 0)
  }, [todayEntry.date, todayEntry.completedMorningRitual])

  function handleRepeat(step) {
    const nextCount = step === repeatCount ? Math.max(0, step - 1) : step
    setRepeatCount(nextCount)
    updateToday({ completedMorningRitual: nextCount >= 3 })
  }

  function updateSettings(updates) {
    setSettings((current) => ({ ...current, ...updates }))
  }

  const historicalEntries = entries.filter(
    (entry) =>
      entry.nextRightAction?.trim() ||
      entry.eveningReflection?.trim() ||
      entry.completedMorningRitual ||
      entry.date === todayEntry.date,
  )

  return (
    <AppShell>
      <Header onOpenSettings={() => setSettingsOpen(true)} streakCount={streakCount} />

      <main className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.68fr)] lg:items-start">
        <div className="space-y-5">
          <DailyMantraCard mantraText={mantraText} onChangeMantra={setMantraText} />

          <div className="grid gap-5 md:grid-cols-2">
            <MorningRitual
              repeatCount={repeatCount}
              onRepeat={handleRepeat}
              completed={todayEntry.completedMorningRitual}
            />
            <NextRightActionInput
              value={todayEntry.nextRightAction}
              onChange={(nextRightAction) => updateToday({ nextRightAction })}
            />
          </div>

          {settings.showEveningSection ? (
            <EveningReflectionInput
              value={todayEntry.eveningReflection}
              onChange={(eveningReflection) => updateToday({ eveningReflection })}
            />
          ) : null}
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-white/62 bg-white/62 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
              Today
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Metric label="Repeats" value={`${repeatCount}/3`} />
              <Metric label="Streak" value={streakCount} />
              <Metric label="Action" value={todayEntry.nextRightAction?.trim() ? 'Set' : 'Open'} />
            </div>
          </section>

          <HistoryList entries={historicalEntries} compact={settings.compactHistory} />
        </aside>
      </main>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onChangeSettings={updateSettings}
        onResetMantra={setMantraText}
        onClearEntries={() => {
          clearEntries()
          setRepeatCount(0)
        }}
      />
    </AppShell>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-sage/16 bg-pearl/74 px-3 py-4 text-center dark:border-white/10 dark:bg-dusk/42">
      <p className="text-2xl font-semibold text-ink dark:text-pearl">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-cedar/58 dark:text-shell/48">{label}</p>
    </div>
  )
}
