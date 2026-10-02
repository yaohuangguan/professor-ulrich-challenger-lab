import type { Difficulty, Domain, Question, StudyFormat } from '../types'
import { wirelessQuestions } from './wireless'
import { wirelessExtraQuestions } from './wirelessextra'
import { satelliteQuestions } from './satellite'
import { satelliteExtraQuestions } from './satelliteextra'
import { starlinkQuestions } from './starlink'
import { starlinkExtraQuestions } from './starlinkextra'
import { examEvidenceQuestions } from './examevidence'
import { professorQuestions } from './professor'
import { generateQuestion } from './generators'
import { generateProfessorQuestion } from './professorgenerators'

export const staticQuestions: Question[] = [
  ...wirelessQuestions,
  ...wirelessExtraQuestions,
  ...satelliteQuestions,
  ...satelliteExtraQuestions,
  ...starlinkQuestions,
  ...starlinkExtraQuestions,
  ...examEvidenceQuestions,
  ...professorQuestions,
]

const rank: Record<Difficulty, number> = { core: 0, tricky: 1, brutal: 2 }

export const topicCoverage: Record<Domain, string[]> = {
  wireless: [
    'Decibels',
    'dBm / dBW',
    'Wireless system blocks',
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
    'Reliability / fade margin',
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
    'Teleports / gateways',
    'Ground segment cells',
    'Beams and spectrum reuse',
    'Satellite generations',
    'Constellation design',
    'Visible vs usable satellites',
    'Geostationary arc protection',
    'EPFD',
    'Cell capacity',
    'Late-2025 co-frequency beams',
    'Capacity scaling',
    'User density management',
    'Laser ISLs',
    'Routing',
    'Content delivery',
  ],
}

export function poolFor(
  domain: Domain,
  difficulty: Difficulty,
  format: StudyFormat = 'mixed',
) {
  return staticQuestions.filter((q) => {
    const difficultyOk = q.domain === domain && rank[q.difficulty] <= rank[difficulty]
    if (!difficultyOk) return false
    if (format === 'professor') return q.format === 'professor-xyz'
    if (format === 'standard') return q.format !== 'professor-xyz'
    return true
  })
}

function generatedFor(domain: Domain, difficulty: Difficulty, format: StudyFormat) {
  if (format === 'professor') return generateProfessorQuestion(domain, difficulty)
  if (format === 'standard') return generateQuestion(domain, difficulty)
  return Math.random() < 0.55
    ? generateProfessorQuestion(domain, difficulty)
    : generateQuestion(domain, difficulty)
}

export function nextPracticeQuestion(
  domain: Domain,
  difficulty: Difficulty,
  excludeIds: string[] = [],
  format: StudyFormat = 'mixed',
): Question {
  const generateChance =
    format === 'professor' ? 0.55 :
    format === 'mixed' ? 0.42 :
    difficulty !== 'core' ? 0.38 : 0.18

  if (Math.random() < generateChance) return generatedFor(domain, difficulty, format)

  const pool = poolFor(domain, difficulty, format)
  const fresh = pool.filter((q) => !excludeIds.includes(q.id))
  const source = fresh.length ? fresh : pool

  if (!source.length) return generatedFor(domain, difficulty, format)
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
  format: StudyFormat = 'mixed',
): Question[] {
  const pool = uniqueByTopic(poolFor(domain, difficulty, format))
  const out = pool.slice(0, Math.min(count, pool.length))

  while (out.length < count) {
    out.push(generatedFor(domain, difficulty, format))
  }

  const generatedCount =
    format === 'professor' ? Math.min(5, count) :
    format === 'mixed' ? Math.min(4, count) :
    difficulty !== 'core' ? Math.min(3, count) : 1

  for (let i = 0; i < generatedCount; i++) {
    const slot = Math.max(0, out.length - 1 - i)
    out[slot] = generatedFor(domain, difficulty, format)
  }

  return out.slice(0, count).sort(() => Math.random() - 0.5)
}

export function countByDomain(domain: Domain) {
  return staticQuestions.filter((q) => q.domain === domain).length
}

export function countProfessorByDomain(domain: Domain) {
  return staticQuestions.filter(
    (q) => q.domain === domain && q.format === 'professor-xyz',
  ).length
}
