import { useEffect, useMemo, useState } from 'react'
import AppShell from './components/AppShell.jsx'
import DailyMantraCard from './components/DailyMantraCard.jsx'
import EveningReflectionInput from './components/EveningReflectionInput.jsx'
import Header from './components/Header.jsx'
import HistoryList from './components/HistoryList.jsx'
import ManifestationBuilder from './components/ManifestationBuilder.jsx'
import MorningRitual from './components/MorningRitual.jsx'
import NextRightActionInput from './components/NextRightActionInput.jsx'
import RitualCompletionCard from './components/RitualCompletionCard.jsx'
import RitualProgress from './components/RitualProgress.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import { DEFAULT_MANTRA, DEFAULT_SETTINGS, STORAGE_KEYS } from './constants.js'
import { ThemeProvider } from './hooks/useTheme.jsx'
import { useDailyEntries } from './hooks/useDailyEntries.js'
import { generateManifestationMantra, getMantraVariantCount } from './utils/mantraGenerator.js'
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
  const [manifestationIntention, setManifestationIntention] = useState(() =>
    loadFromStorage(STORAGE_KEYS.manifestationIntention, ''),
  )
  const [manifestationDraft, setManifestationDraft] = useState(() =>
    loadFromStorage(STORAGE_KEYS.manifestationDraft, ''),
  )
  const [mantraVariant, setMantraVariant] = useState(0)
  const [repeatCount, setRepeatCount] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState(() => loadFromStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS))
  const { entries, todayEntry, updateToday, clearEntries } = useDailyEntries(mantraText)
  const streakCount = useMemo(() => calculateStreak(entries), [entries])
  const actionSet = todayEntry.nextRightAction?.trim().length > 0
  const reflectionSet = todayEntry.eveningReflection?.trim().length > 0
  const repeatsComplete = repeatCount >= 3 || todayEntry.completedMorningRitual
  const morningComplete = repeatsComplete && actionSet

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
    saveToStorage(STORAGE_KEYS.manifestationIntention, manifestationIntention)
  }, [manifestationIntention])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.manifestationDraft, manifestationDraft)
  }, [manifestationDraft])

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

  function handleCreateManifestationMantra() {
    const nextMantra = generateManifestationMantra(manifestationIntention, mantraVariant)
    setManifestationDraft(nextMantra)
    setMantraVariant((current) => (current + 1) % getMantraVariantCount())
  }

  function handleUseGeneratedMantra() {
    const nextMantra = manifestationDraft.trim()

    if (nextMantra) {
      setMantraText(nextMantra)
    }
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
      <RitualProgress
        repeatCount={repeatsComplete ? 3 : repeatCount}
        actionSet={actionSet}
        reflectionSet={reflectionSet}
      />

      <main className="grid flex-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.68fr)] lg:items-start">
        <div className="space-y-4 sm:space-y-5">
          <ManifestationBuilder
            intention={manifestationIntention}
            generatedMantra={manifestationDraft}
            onChangeIntention={setManifestationIntention}
            onChangeGeneratedMantra={setManifestationDraft}
            onCreateMantra={handleCreateManifestationMantra}
            onUseMantra={handleUseGeneratedMantra}
          />

          <DailyMantraCard mantraText={mantraText} onChangeMantra={setMantraText} />

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <MorningRitual
              repeatCount={repeatCount}
              onRepeat={handleRepeat}
              completed={repeatsComplete}
            />
            <NextRightActionInput
              value={todayEntry.nextRightAction}
              repeatComplete={repeatsComplete}
              onChange={(nextRightAction) => updateToday({ nextRightAction })}
            />
          </div>

          <RitualCompletionCard
            repeatCount={repeatsComplete ? 3 : repeatCount}
            actionSet={actionSet}
            complete={morningComplete}
          />

          {settings.showEveningSection ? (
            <EveningReflectionInput
              value={todayEntry.eveningReflection}
              onChange={(eveningReflection) => updateToday({ eveningReflection })}
            />
          ) : null}
        </div>

        <aside className="space-y-4 sm:space-y-5">
          <section className="rounded-lg border border-white/60 bg-white/60 p-5 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cedar/70 dark:text-shell/70">
              Today
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Metric label="Repeats" value={`${repeatCount}/3`} />
              <Metric label="Streak" value={streakCount} />
              <Metric label="Status" value={morningComplete ? 'Done' : 'Open'} />
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
    <div className="rounded-lg border border-sage/20 bg-pearl/75 px-3 py-4 text-center dark:border-white/10 dark:bg-dusk/40">
      <p className="text-2xl font-semibold text-ink dark:text-pearl">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-cedar/60 dark:text-shell/50">{label}</p>
    </div>
  )
}
