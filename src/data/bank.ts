import type { Difficulty, Domain, Question, StudyFormat } from '../types'
import { wirelessQuestions } from './wireless'
import { wirelessExtraQuestions } from './wirelessextra'
import { satelliteQuestions } from './satellite'
import { satelliteExtraQuestions } from './satelliteextra'
import { starlinkQuestions } from './starlink'
import { starlinkExtraQuestions } from './starlinkextra'
import { tcpQuestions } from './tcp'
import { examEvidenceQuestions } from './examevidence'
import { pastExamQuestions } from './pastexams'
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
  ...tcpQuestions,
  ...examEvidenceQuestions,
  ...pastExamQuestions,
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
  tcp: [
    'TCP overview',
    'Ports and header fields',
    'Three-way handshake',
    'Sequence and ACK numbers',
    'Loss recovery',
    'Flow control',
    'Flow vs congestion control',
    'Transmission window',
    'Congestion control',
    'Slow start and AIMD',
    'TCP flavours',
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

/**
 * Find a real sibling question, not an unrelated random question.
 * Parameterised variants are preferred; photographed originals cannot be
 * surfaced early and spoil the replayed exam.
 */
export function nextVariantQuestion(
  original: Question,
  seen: Question[] = [],
): Question {
  const signature = (q: Question) => [q.prompt, q.context ?? '', ...(q.statements ?? [])].join('|')
  const used = new Set([original, ...seen].map(signature))
  const generatorFormat: StudyFormat = original.format === 'professor-xyz' ? 'professor' : 'standard'
  const choices: Question[] = []

  for (let i = 0; i < 70; i += 1) {
    const candidate = generatedFor(original.domain, 'brutal', generatorFormat)
    if (candidate.topic === original.topic && !used.has(signature(candidate))) {
      choices.push(candidate)
      used.add(signature(candidate))
    }
    if (choices.length >= 6) break
  }
  if (choices.length) return choices[Math.floor(Math.random() * choices.length)]

  const sameTopic = staticQuestions.filter((q) =>
    q.topic === original.topic &&
    q.domain === original.domain &&
    !q.id.startsWith('past-') &&
    !used.has(signature(q)),
  )
  const matchingFormat = sameTopic.filter((q) => q.format === original.format)
  const pool = matchingFormat.length ? matchingFormat : sameTopic
  if (pool.length) return pool[Math.floor(Math.random() * pool.length)]

  // All available sibling questions have already been practised. Recycle a
  // sibling rather than silently drifting into a completely unrelated topic.
  const reusable = staticQuestions.filter((q) =>
    q.topic === original.topic && q.domain === original.domain &&
    q.id !== original.id && !q.id.startsWith('past-'),
  )
  if (reusable.length) return reusable[Math.floor(Math.random() * reusable.length)]

  // Last-resort variation: reshuffle A–E choices without changing the key.
  // Keep it structurally correct rather than manufacturing a false new fact.
  const order = original.options.map((_, i) => i).reverse()
  return {
    ...original,
    id: 'variant-options-' + original.id,
    options: order.map((i) => original.options[i]),
    answers: original.answers.map((i) => order.indexOf(i)),
    source: original.source + ' — alternate option order',
  }
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
