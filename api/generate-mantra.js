import OpenAI from 'openai'

const MAX_INTENTION_LENGTH = 200

function parseBody(body) {
  if (!body) {
    return {}
  }

  if (typeof body === 'string') {
    return JSON.parse(body)
  }

  return body
}

function cleanIntention(value) {
  return value.trim().replace(/\s+/g, ' ')
}

function sanitizeText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { intention } = parseBody(req.body)

    if (!intention || typeof intention !== 'string' || !intention.trim()) {
      return res.status(400).json({ error: 'Please enter what you are seeking to manifest.' })
    }

    const clean = cleanIntention(intention)

    if (clean.length > MAX_INTENTION_LENGTH) {
      return res.status(400).json({ error: 'Please keep your intention under 200 characters.' })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'Unable to create an AI mantra right now.' })
    }

    const client = new OpenAI({ apiKey })

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content:
            'You write original daily mantras inspired by Florence Scovel Shinn style and principles, but you never quote her directly. Do not simply insert the user phrase into a generic template. Interpret the emotional and spiritual context of the intention and write a tailored mantra. Use themes of divine right, under grace in perfect ways, divine order, perfect timing, faith instead of fear, release of forcing, strain, doubt, resentment, or fear, the next right inspired action, and receiving without desperation. Adapt language for love and relationships, money and abundance, career and work, health and healing, home and family peace, confidence and self-worth, protection and guidance, creativity and purpose, forgiveness and release, or general manifestation. Avoid guaranteed medical, financial, legal, relationship, healing, success, or wealth outcomes. Keep the tone calm, elegant, spiritually confident, concise, and suitable to repeat aloud. Return only valid JSON.',
        },
        {
          role: 'user',
          content: `Create a tailored mantra for this intention: "${clean}". Return JSON with keys: mantra, theme, nextActionPrompt. The mantra must be original wording, 60 to 120 words, written in first person where suitable, include the phrase "under grace, in perfect ways", mention divine guidance, divine order or perfect timing, release of fear or forcing, readiness to receive, and one next right inspired action. The nextActionPrompt should be one gentle practical prompt, not a guarantee.`,
        },
      ],
      max_output_tokens: 420,
      text: {
        format: {
          type: 'json_object',
        },
      },
    })

    const data = JSON.parse(response.output_text)
    const mantra = sanitizeText(data.mantra)
    const theme = sanitizeText(data.theme, 'Personal intention')
    const nextActionPrompt = sanitizeText(
      data.nextActionPrompt,
      'What is one gentle, practical action that supports this intention today?',
    )

    if (!mantra) {
      throw new Error('Missing mantra in model response')
    }

    return res.status(200).json({
      mantra,
      theme,
      nextActionPrompt,
    })
  } catch (error) {
    console.error('Mantra generation failed', error)

    return res.status(500).json({
      error: 'Unable to create an AI mantra right now.',
    })
  }
}
