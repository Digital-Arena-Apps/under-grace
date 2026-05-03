import { getDaysBetween, getTodayKey } from './date.js'

export function calculateStreak(entries) {
  const completedDates = entries
    .filter((entry) => entry.completedMorningRitual && entry.nextRightAction?.trim())
    .map((entry) => entry.date)
    .sort()
    .reverse()

  if (!completedDates.length) {
    return 0
  }

  const today = getTodayKey()
  const newestDate = completedDates[0]
  const newestDistance = getDaysBetween(newestDate, today)

  if (newestDistance > 1) {
    return 0
  }

  let streak = 1

  for (let index = 1; index < completedDates.length; index += 1) {
    const distance = getDaysBetween(completedDates[index], completedDates[index - 1])

    if (distance !== 1) {
      break
    }

    streak += 1
  }

  return streak
}
