import type { Difficulty, Domain, Question } from '../types'
import { wirelessQuestions } from './wireless'
import { satelliteQuestions } from './satellite'
import { starlinkQuestions } from './starlink'
import { examEvidenceQuestions } from './examevidence'
import { generateQuestion } from './generators'

export const staticQuestions: Question[] = [
  ...wirelessQuestions,
  ...satelliteQuestions,
  ...starlinkQuestions,
  ...examEvidenceQuestions,
]

const rank: Record<Difficulty, number> = { core: 0, tricky: 1, brutal: 2 }

export const topicCoverage: Record<Domain, string[]> = {
  wireless: [
    'Decibels',
    'dBm / dBW',
    'Feedlines',
    'Antennas',
    'Antenna gain',
    'Antenna aperture',
    'Thermal noise',
    'Receivers',
    'Interference',
    'Fading',
    'Shannon-Hartley',
    'Modulation / SNR',
    'Path loss',
    'Link budgets',
    'Combined link-budget changes',
  ],
  satellite: [
    'Satellite architectures',
    'Bent pipe',
    'Direct to site',
    'Direct to site downlink only',
    'Direct to device',
    'Frequency bands',
    'Dish pointing',
    'Satellite link budget',
    'Bandwidth-delay product',
    'TCP queue oscillation',
    'Load regimes',
    'Flow size / user experience',
    'Diagnosis',
    'Latency',
  ],
  starlink: [
    'Starlink bands',
    'Architecture',
    'Dishy',
    'Ground segment cells',
    'Beams and spectrum reuse',
    'Satellite generations',
    'Visible vs usable satellites',
    'Geostationary arc protection',
    'EPFD',
    'Cell capacity',
    'Late-2025 co-frequency beams',
    'User density management',
    'Laser ISLs',
    'Routing',
    'Content delivery',
  ],
}

export function poolFor(domain: Domain, difficulty: Difficulty) {
  return staticQuestions.filter(
    (q) => q.domain === domain && rank[q.difficulty] <= rank[difficulty],
  )
}

export function nextPracticeQuestion(
  domain: Domain,
  difficulty: Difficulty,
  excludeIds: string[] = [],
): Question {
  const canGenerate = difficulty !== 'core'
  if (canGenerate && Math.random() < 0.38) return generateQuestion(domain, difficulty)

  const pool = poolFor(domain, difficulty)
  const fresh = pool.filter((q) => !excludeIds.includes(q.id))
  const source = fresh.length ? fresh : pool
  return source[Math.floor(Math.random() * source.length)]
}

function uniqueByTopic(xs: Question[]) {
  const copy = [...xs].sort(() => Math.random() - 0.5)
  const seen = new Set<string>()
  const firstPass: Question[] = []
  const rest: Question[] = []
  for (const q of copy) {
    if (!seen.has(q.topic)) {
      seen.add(q.topic)
      firstPass.push(q)
    } else {
      rest.push(q)
    }
  }
  return [...firstPass, ...rest]
}

export function createMock(
  domain: Domain,
  difficulty: Difficulty,
  count = 10,
): Question[] {
  const pool = uniqueByTopic(poolFor(domain, difficulty))
  const out = pool.slice(0, Math.min(count, pool.length))

  while (out.length < count && pool.length) {
    out.push(pool[out.length % pool.length])
  }

  if (difficulty !== 'core') {
    const generatedCount = Math.min(3, count)
    for (let i = 0; i < generatedCount; i++) {
      const generated = generateQuestion(domain, difficulty)
      const slot = Math.max(0, out.length - 1 - i)
      out[slot] = generated
    }
  }

  return out.slice(0, count).sort(() => Math.random() - 0.5)
}

export function countByDomain(domain: Domain) {
  return staticQuestions.filter((q) => q.domain === domain).length
}
