import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_MANTRA, STORAGE_KEYS } from '../constants.js'
import { getTodayKey } from '../utils/date.js'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

function createEntry(date, mantraText) {
  const now = new Date().toISOString()

  return {
    date,
    mantraText,
    nextRightAction: '',
    eveningReflection: '',
    completedMorningRitual: false,
    createdAt: now,
    updatedAt: now,
  }
}

export function useDailyEntries(mantraText) {
  const todayKey = getTodayKey()
  const [entries, setEntries] = useState(() => loadFromStorage(STORAGE_KEYS.entries, []))
  const todayEntry = useMemo(
    () => entries.find((entry) => entry.date === todayKey) ?? createEntry(todayKey, mantraText || DEFAULT_MANTRA),
    [entries, mantraText, todayKey],
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.entries, entries)
  }, [entries])

  function updateToday(updates) {
    setEntries((currentEntries) => {
      const now = new Date().toISOString()
      const existing = currentEntries.find((entry) => entry.date === todayKey)
      const nextEntry = {
        ...(existing ?? createEntry(todayKey, mantraText || DEFAULT_MANTRA)),
        ...updates,
        mantraText: updates.mantraText ?? existing?.mantraText ?? mantraText,
        updatedAt: now,
      }

      if (existing) {
        return currentEntries.map((entry) => (entry.date === todayKey ? nextEntry : entry))
      }

      return [...currentEntries, nextEntry]
    })
  }

  function clearEntries() {
    setEntries([])
  }

  return {
    entries,
    todayEntry,
    updateToday,
    clearEntries,
  }
}
