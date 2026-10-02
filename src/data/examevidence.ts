import type { Question } from '../types'

// Reconstructed only from question-level evidence available from the user's prior Test 2 analysis.
// We deliberately do NOT invent missing Test 1 X/Y/Z wording. Exact screenshots can be added later.

export const examEvidenceQuestions: Question[] = [
  {
    id: 'e-t2-queue-statements',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Past-test pattern: Which statements about TCP queue oscillation are correct? Select ALL that apply.',
    options: [
      'Queue oscillation keeps link utilisation close to capacity throughout the cycle',
      'TCP congestion control reduces the physical bandwidth-delay product of the satellite path',
      'An ACK can arrive back at the sender before the corresponding data packet has reached the receiver',
      'None of the above'
    ],
    answers: [3],
    explanation: 'The prior Test 2 analysis found all three technical statements false. Queue oscillation can include underutilised periods; TCP does not change the physical BDP; an ACK cannot precede delivery of the data that caused it.',
    trap: 'Three plausible-sounding statements can all be false. Evaluate each independently before choosing a combination.',
    source: 'Past Test 2 — reconstructed from prior question analysis',
    tags: ['past test', 'queue oscillation', 'BDP', 'ACK']
  },
  {
    id: 'e-t2-linkbudget-fm',
    domain: 'wireless',
    topic: 'Link budgets',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Past-test pattern: a link-budget calculation gives received power = -67 dBm and the minimum required receive level = -70 dBm. What is the fade margin?',
    options: ['-3 dB', '0 dB', '3 dB', '7 dB'],
    answers: [2],
    explanation: 'Fade margin = actual received level - minimum required level = -67 - (-70) = +3 dB.',
    trap: 'Subtracting two negative dBm levels is a common sign trap.',
    source: 'Past Test 2 — Version 8246 pattern',
    tags: ['past test', 'fade margin', 'sign']
  },
  {
    id: 'e-t2-linkbudget-target',
    domain: 'wireless',
    topic: 'Link budgets',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Past-test pattern: a link has 3 dB fade margin. If ONLY transmit power is changed, how much must TX power increase to reach 7 dB fade margin?',
    options: ['1 dB', '3 dB', '4 dB', '7 dB'],
    answers: [2],
    explanation: 'The desired margin rises by 4 dB. If transmit power is the only changed term, received level and fade margin both rise by 4 dB.',
    trap: 'The word ONLY fixes which budget term is allowed to change.',
    source: 'Past Test 2 — reconstructed Q4 pattern',
    tags: ['past test', 'fade margin', 'TX power', 'only']
  },
  {
    id: 'e-t2-overload-pattern',
    domain: 'satellite',
    topic: 'Load regimes',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Past-test pattern: a bent-pipe satellite link shows HIGH packet loss together with HIGH utilisation. Which conclusions best match the slide model? Select ALL that apply.',
    options: [
      'This is consistent with overload',
      'This observation by itself proves classic fill-and-drain queue oscillation rather than overload',
      'Very small flows are the ones most likely still to complete',
      'Large flows are guaranteed to reach full link rate'
    ],
    answers: [0, 2],
    explanation: 'In the overload regime the buffer stays full, many small flows below init_cwnd can dominate, and large flows can time out. The prior Test 2 analysis treated high loss + high utilisation as overload rather than the fill/drain high-load regime.',
    trap: 'HIGH utilisation and UNDERutilisation point to different queue behaviours; do not use “packet loss” alone to classify the regime.',
    source: 'Past Test 2 — reconstructed Q5 pattern',
    tags: ['past test', 'overload', 'high utilisation', 'small flows']
  },
  {
    id: 'e-wording-pathloss',
    domain: 'wireless',
    topic: 'Link budgets',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Wording-trap pattern: a link starts with 4 dB fade margin. The path loss is reduced by 3 dB and nothing else changes. What WILL the fade margin become?',
    options: ['1 dB', '4 dB', '7 dB', 'It cannot be determined because reducing path loss is not the only possible method'],
    answers: [2],
    explanation: 'Reducing path loss by 3 dB raises received power by 3 dB, so fade margin rises from 4 dB to 7 dB. Whether it was the only possible engineering method is a different question.',
    trap: 'Separate “what WILL happen after this stated change?” from “what do we NEED TO do?” or “is this the ONLY method?”.',
    source: 'Past Test 2 wording dispute — reconstructed pattern',
    tags: ['past test', 'wording', 'will', 'need to', 'path loss']
  }
]
