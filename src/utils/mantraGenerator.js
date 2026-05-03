const DEFAULT_INTENTION = 'the good that is meant for me'

const topicRules = [
  {
    theme: 'Money and provision',
    words: ['money', 'income', 'financial', 'abundance', 'stability', 'stream', 'debt', 'rent', 'salary'],
    action: 'What is one orderly step you can take today to steward your resources with calm and clarity?',
  },
  {
    theme: 'Career and work',
    words: ['job', 'career', 'work', 'client', 'business', 'promotion', 'interview', 'role'],
    action: 'What is one professional step you can take today with steadiness and self-respect?',
  },
  {
    theme: 'Health and healing',
    words: ['health', 'healing', 'body', 'recovery', 'wellness', 'energy'],
    action: 'What is one supportive care step you can take today while honoring proper guidance and rest?',
  },
  {
    theme: 'Home and family peace',
    words: ['home', 'family', 'peace', 'house', 'children', 'marriage'],
    action: 'What is one peaceful act or conversation that would bring more order to your home today?',
  },
  {
    theme: 'Love and relationships',
    words: ['love', 'relationship', 'partner', 'marriage', 'friendship', 'dating'],
    action: 'What is one honest and kind action you can take today without forcing another person or outcome?',
  },
  {
    theme: 'Confidence and self-worth',
    words: ['confidence', 'self-worth', 'worth', 'courage', 'voice', 'esteem'],
    action: 'What is one small action that lets you stand in your worth today?',
  },
  {
    theme: 'Protection and guidance',
    words: ['protection', 'guidance', 'safe', 'safety', 'direction', 'clarity'],
    action: 'What is one wise boundary or clarifying step you can take today?',
  },
  {
    theme: 'Creativity and purpose',
    words: ['creative', 'creativity', 'purpose', 'calling', 'art', 'book', 'music', 'idea'],
    action: 'What is one small creative offering you can bring into form today?',
  },
  {
    theme: 'Forgiveness and release',
    words: ['forgiveness', 'forgive', 'release', 'resentment', 'grief', 'letting go'],
    action: 'What is one gentle release practice that would restore peace to your heart today?',
  },
]

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

export function getManifestationTheme(rawIntention) {
  const intention = cleanIntention(rawIntention).toLowerCase()

  return topicRules.find((rule) => rule.words.some((word) => intention.includes(word))) ?? {
    theme: 'Personal intention',
    action: 'What is one gentle, practical action that supports this intention today?',
  }
}

export function generateLocalManifestation(rawIntention, variant = 0) {
  const { theme, action } = getManifestationTheme(rawIntention)

  return {
    mantra: generateManifestationMantra(rawIntention, variant),
    theme,
    nextActionPrompt: action,
  }
}

export function getMantraVariantCount() {
  return templates.length
}
