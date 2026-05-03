const DEFAULT_INTENTION = 'the good that is meant for me'

const templates = [
  ({ intention }) =>
    `What is truly mine by divine right now comes to me under grace, in perfect ways. I am divinely guided toward ${intention}, abundantly supplied, and ready to receive with faith, wisdom, and peace. I release fear, doubt, and forcing. I take one inspired action today and let the perfect outcome unfold.`,
  ({ intention }) =>
    `What belongs to me by divine right is now revealed and received under grace, in perfect ways. I am divinely guided in the direction of ${intention}, supplied with what is needed, and ready to receive calmly and clearly. I release fear, doubt, and the need to force. I follow one inspired action and trust the way to open.`,
  ({ intention }) =>
    `What is mine by divine right cannot be withheld, and now comes to me under grace, in perfect ways. I am divinely guided, abundantly supplied, and ready to receive the right expression of ${intention}. I let go of fear, doubt, and strain. I take the next inspired action and leave the result to perfect timing.`,
  ({ intention }) =>
    `The good appointed for me now finds me under grace, in perfect ways. I am divinely guided toward ${intention}, supported in right measure, and ready to receive with steadiness and gratitude. I release fear, doubt, and all anxious forcing. I take one inspired action and allow the right path to arrange itself.`,
  ({ intention }) =>
    `What is truly mine by divine right comes into form now under grace, in perfect ways. I am divinely guided in all matters concerning ${intention}, abundantly supplied for the next step, and ready to receive. I release fear, doubt, haste, and pressure. I take one inspired action and move with peace.`,
]

export function cleanIntention(value) {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '')
}

export function generateManifestationMantra(rawIntention, variant = 0) {
  const intention = cleanIntention(rawIntention) || DEFAULT_INTENTION
  const template = templates[Math.abs(variant) % templates.length]

  return template({ intention })
}

export function getMantraVariantCount() {
  return templates.length
}
