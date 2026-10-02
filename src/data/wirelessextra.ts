import type { Question } from '../types'

export const wirelessExtraQuestions: Question[] = [
  {
    id: 'wx-db-rounding',
    domain: 'wireless',
    topic: 'Decibels',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Using the course mental-dB method, 47,527:1 is rounded to about 50,000:1 = 100,000/2. What dB value follows?',
    options: ['43 dB', '47 dB', '50 dB', '53 dB'],
    answers: [1],
    explanation: '100,000:1 is +50 dB and dividing power by 2 is -3 dB, giving about 47 dB.',
    trap: 'The permitted approximation is there to avoid a calculator; do not overthink the exact logarithm.',
    source: 'Wireless slides — easy working with dB',
    tags: ['mental dB', 'rounding']
  },
  {
    id: 'wx-dbwdBm',
    domain: 'wireless',
    topic: 'dBm / dBW',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'A transmitter output is 47 dBm. What is the same power in dBW?',
    options: ['17 dBW', '47 dBW', '77 dBW', '-17 dBW'],
    answers: [0],
    explanation: 'dBW and dBm differ by 30 dB because 1 W = 1000 mW. Therefore 47 dBm = 17 dBW.',
    source: 'Wireless slides — dBm and dBW',
    tags: ['dBm', 'dBW', 'conversion']
  },
  {
    id: 'wx-transmitter-definition',
    domain: 'wireless',
    topic: 'Wireless system blocks',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'In the course definition, “transmitter” MOST precisely means:',
    options: [
      'The electronic device that generates the radio signal before feedline/antenna',
      'Always the complete transmitter + feedline + antenna system',
      'Only the antenna',
      'Only the information source'
    ],
    answers: [0],
    explanation: 'The slides warn that everyday usage often says “transmitter” for the whole system, but the course definition treats the transmitter as the electronic device generating the radio signal.',
    trap: 'This is a terminology trap: colloquial usage and the slide definition differ.',
    source: 'Wireless slides — point of confusion',
    tags: ['terminology', 'transmitter', 'wording']
  },
  {
    id: 'wx-feedline-highfreq',
    domain: 'wireless',
    topic: 'Feedlines',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Why do many very-high-frequency wireless systems avoid long RF feedlines?',
    options: [
      'Feedline attenuation becomes too high, so the transmitter/receiver is moved close to the antenna',
      'High-frequency antennas cannot be connected electrically',
      'Free-space propagation stops above 2 GHz',
      'Feedlines amplify thermal noise but never attenuate signal'
    ],
    answers: [0],
    explanation: 'The slides note that at sufficiently high frequencies feedline attenuation is severe, motivating mounting radio electronics at or near the antenna.',
    source: 'Wireless slides — feedlines',
    tags: ['feedline', 'high frequency']
  },
  {
    id: 'wx-dbd-dbi',
    domain: 'wireless',
    topic: 'Antennas',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'An antenna has 8 dBd gain. Approximately what is that in dBi?',
    options: ['5.85 dBi', '8 dBi', '10.15 dBi', '16 dBi'],
    answers: [2],
    explanation: 'The slides give dBd = dBi - 2.15 dB, so dBi = dBd + 2.15 ≈ 10.15 dBi.',
    trap: 'Check which reference is being used: dipole or isotropic.',
    source: 'Wireless slides — antennas',
    tags: ['dBd', 'dBi']
  },
  {
    id: 'wx-isotropic',
    domain: 'wireless',
    topic: 'Antennas',
    difficulty: 'core',
    type: 'single',
    prompt: 'Which statement about an isotropic antenna is correct?',
    options: [
      'It is a hypothetical reference that radiates equally in all directions and cannot be built in practice',
      'It is a real half-wave stick antenna',
      'It has 2.15 dBd gain',
      'It is a high-gain satellite dish'
    ],
    answers: [0],
    explanation: 'The isotropic antenna is an ideal reference model used for dBi; it is not physically realizable.',
    source: 'Wireless slides — simple antennas',
    tags: ['isotropic', 'reference']
  },
  {
    id: 'wx-obstacle-loss',
    domain: 'wireless',
    topic: 'Path loss',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Friis free-space loss models geometric spreading. What do real obstacles do in the slide model?',
    options: ['They can add additional signal loss', 'They always increase antenna gain', 'They remove thermal noise', 'They make received power independent of distance'],
    answers: [0],
    explanation: 'The path-loss slide explicitly notes that obstacles cause additional signal loss beyond ideal free-space spreading.',
    source: 'Wireless slides — Friis law',
    tags: ['obstacles', 'path loss']
  },
  {
    id: 'wx-sensitivity',
    domain: 'wireless',
    topic: 'Receivers',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'For a good receiver, which factors are directly involved in sensitivity according to the slides? Select ALL that apply.',
    options: [
      'Receiver bandwidth',
      'Noise floor',
      'Required ability to recover the modulation with acceptable quality',
      'The colour of the antenna radome'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides connect sensitivity to bandwidth/noise floor and the minimum signal needed to recover the transmitted information with acceptable quality.',
    source: 'Wireless slides — receivers',
    tags: ['sensitivity', 'bandwidth', 'noise floor']
  },
  {
    id: 'wx-noise-correlation',
    domain: 'wireless',
    topic: 'Thermal noise',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which property of thermal noise is emphasised in the slides?',
    options: [
      'It is uncorrelated, so knowing the instantaneous noise now does not let us predict the future instantaneous value',
      'It is fully deterministic once carrier frequency is known',
      'It comes only from lightning',
      'It disappears at room temperature'
    ],
    answers: [0],
    explanation: 'Thermal noise is described as uncorrelated/random, although average noise power can be characterised statistically.',
    source: 'Wireless slides — noise',
    tags: ['thermal noise', 'uncorrelated']
  },
  {
    id: 'wx-interference-sources',
    domain: 'wireless',
    topic: 'Interference',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'Which are examples of interference sources listed or directly exemplified in the slides? Select ALL that apply.',
    options: [
      'A microwave oven sharing 2.45 GHz',
      'Poorly shielded digital electronics',
      'Lightning/static discharges',
      'A perfectly matched resistor at absolute zero'
    ],
    answers: [0, 1, 2],
    explanation: 'Artificial electronics/sparks and natural static/lightning are all discussed as interference sources.',
    source: 'Wireless slides — interference',
    tags: ['interference', 'sources']
  },
  {
    id: 'wx-link-example-margin',
    domain: 'wireless',
    topic: 'Link budgets',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'In the worked 2.45 GHz / 500 kHz microwave-link example, the slide gives received signal about -59.85 dBm and a required level about -74.85 dBm before comparing with the natural noise floor. Which statement is safest?',
    options: [
      'The received signal exceeds the minimum required signal by about 15 dB at that comparison point',
      'The link necessarily has exactly 15 dB total fade margin',
      'The received signal is below the required level',
      'The link cannot work because the signal level is negative dBm'
    ],
    answers: [0],
    explanation: 'At that intermediate comparison, -59.85 dBm is 15 dB above -74.85 dBm. The full slide then compares against the noise-floor construction and reports much larger available fade margin.',
    trap: 'Do not treat “negative dBm” as “bad”; dBm is an absolute logarithmic power reference.',
    source: 'Wireless slides — worked link budget',
    tags: ['link budget', 'dBm', 'wording']
  },
  {
    id: 'wx-reliability',
    domain: 'wireless',
    topic: 'Reliability / fade margin',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Why is the “right” fade margin not one universal number?',
    options: [
      'Required reliability, interference/background noise, traffic timing requirements and implementation details vary',
      'Fade margin is unrelated to reliability',
      'Every link must use exactly 3 dB',
      'Fade margin is fixed by the speed of light'
    ],
    answers: [0],
    explanation: 'The slides explicitly ask how much margin is appropriate and note that reliability targets, interference, burst tolerance and added components vary.',
    source: 'Wireless slides — link budget notes II',
    tags: ['fade margin', 'reliability']
  }
]
