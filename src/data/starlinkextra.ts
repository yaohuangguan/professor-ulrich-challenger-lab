import type { Question } from '../types'

export const starlinkExtraQuestions: Question[] = [
  {
    id: 'stx-history-isl',
    domain: 'starlink',
    topic: 'Architecture',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'According to the lecture timeline, Starlink inter-satellite links entered production operation around:',
    options: ['2020', '2021', '2022', '2025 only'],
    answers: [2],
    explanation: 'The overview states direct-to-site production operation since 2021 and inter-satellite links since 2022.',
    source: 'Starlink slides — overview timeline',
    tags: ['timeline', 'ISL']
  },
  {
    id: 'stx-community-gateway',
    domain: 'starlink',
    topic: 'Architecture',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'The slides say community gateways appeared from approximately:',
    options: ['2021', '2022', '2023', '2026'],
    answers: [2],
    explanation: 'Community gateways are listed as a Starlink development since 2023.',
    source: 'Starlink slides — overview timeline',
    tags: ['community gateway', 'timeline']
  },
  {
    id: 'stx-mini-router',
    domain: 'starlink',
    topic: 'Dishy',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Which Dishy variant is specifically noted as having a built-in Wi-Fi router?',
    options: ['Mini', 'Round first generation only', 'Every performance model only', 'No Dishy variant'],
    answers: [0],
    explanation: 'The slide list identifies Starlink Mini as having a kickstand and built-in Wi-Fi router.',
    source: 'Starlink slides — Dishy versions',
    tags: ['Mini', 'router']
  },
  {
    id: 'stx-teleport-antennas',
    domain: 'starlink',
    topic: 'Teleports / gateways',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'A Starlink teleport is described as usually having:',
    options: [
      'Nine or more larger dish antennas in radomes',
      'One phone-sized antenna only',
      'No antennas because all traffic stays in space',
      'Only a single Wi-Fi access point'
    ],
    answers: [0],
    explanation: 'The teleport slide says they usually contain nine or more larger dish antennas in radomes.',
    source: 'Starlink slides — teleports',
    tags: ['teleport', 'gateway', 'radome']
  },
  {
    id: 'stx-h3-resolution',
    domain: 'starlink',
    topic: 'Ground segment cells',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which H3 resolutions does the slide deck say Starlink uses for its ground-cell structure?',
    options: ['0 and 1', '3 and 4', '5 and 6', '14 and 15'],
    answers: [2],
    explanation: 'The slides explicitly mention H3 resolutions 5 and 6.',
    source: 'Starlink slides — ground segment structure',
    tags: ['H3', 'resolution']
  },
  {
    id: 'stx-beam-shape',
    domain: 'starlink',
    topic: 'Beams and spectrum reuse',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'How are Starlink satellite beams described relative to an H3 cell?',
    options: [
      'Shaped to be roughly circular on Earth and to just cover a cell',
      'Intentionally global, covering an entire hemisphere',
      'Always square to match a map tile',
      'Unable to be shaped directionally'
    ],
    answers: [0],
    explanation: 'The slides state that beams are shaped to be circular on the Earth surface and to “just” cover a cell.',
    source: 'Starlink slides — beam coverage',
    tags: ['beam shape', 'cell']
  },
  {
    id: 'stx-gen15',
    domain: 'starlink',
    topic: 'Satellite generations',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What is the signature addition highlighted for Generation 1.5 satellites?',
    options: ['Laser inter-satellite links', 'No Ku capability', 'A return to GEO orbit', 'Removal of all phased arrays'],
    answers: [0],
    explanation: 'Generation 1.5, from about mid-2022 onward, is highlighted as adding laser ISLs.',
    source: 'Starlink slides — satellite generations',
    tags: ['Gen 1.5', 'ISL']
  },
  {
    id: 'stx-shells',
    domain: 'starlink',
    topic: 'Constellation design',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Which inclinations are listed among currently deployed Starlink shells in the slides? Select ALL that apply.',
    options: ['43°', '53° / 53.2°', '70°', '97.6°', '0° only'],
    answers: [0, 1, 2, 3],
    explanation: 'The deck lists shells at 43°, 53°, two at 53.2°, 70° and 97.6°.',
    source: 'Starlink slides — constellation design',
    tags: ['shells', 'inclination']
  },
  {
    id: 'stx-dtc-shells',
    domain: 'starlink',
    topic: 'Constellation design',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'The slides place direct-to-cell capable satellites as part of which shell families?',
    options: ['43° and 53.2°', '70° and 97.6° only', '53° only', 'No existing shell'],
    answers: [0],
    explanation: 'DTC-capable satellites are listed as part of the 43° and 53.2° shells.',
    source: 'Starlink slides — constellation design',
    tags: ['DTC', 'shells']
  },
  {
    id: 'stx-epfd-value',
    domain: 'starlink',
    topic: 'EPFD',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which Gen 2 maximum EPFD commitment is quoted in the slide deck?',
    options: ['-116.1 dBW/m²/MHz', '-16.1 dBm', '+116.1 dBW/m²/MHz', '-3 dBW total'],
    answers: [0],
    explanation: 'The Starlink link-budget slide quotes a Gen 2 maximum of -116.1 dBW/m²/MHz.',
    source: 'Starlink slides — link budget to Dishy',
    tags: ['EPFD', 'Gen 2', 'value']
  },
  {
    id: 'stx-epfd-to-snr',
    domain: 'starlink',
    topic: 'EPFD',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'In the slide logic, which quantities are needed to turn an EPFD limit into a maximum received power/SNR? Select ALL that apply.',
    options: [
      'Antenna effective aperture',
      'Bandwidth',
      'Noise calculation',
      'The colour of the Starlink router'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides say maximum received power comes from EPFD × antenna aperture × bandwidth; comparing with noise then yields maximum SNR.',
    source: 'Starlink slides — link budget to Dishy',
    tags: ['EPFD', 'aperture', 'bandwidth', 'SNR']
  },
  {
    id: 'stx-gen-modulation',
    domain: 'starlink',
    topic: 'Satellite generations',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which modulation ceiling pairing matches the Starlink slides?',
    options: [
      'Gen 2: up to 64QAM; Gen 1/1.5: up to 16QAM',
      'Gen 2: only QPSK; Gen 1: 256QAM',
      'All generations: exactly 64QAM only',
      'Modulation order is unrelated to the link budget'
    ],
    answers: [0],
    explanation: 'The downlink budget recap gives up to 64QAM for Gen 2 and up to 16QAM for Gen 1/1.5.',
    source: 'Starlink slides — link budget recap',
    tags: ['64QAM', '16QAM', 'generation']
  },
  {
    id: 'stx-gen1-cell-capacity',
    domain: 'starlink',
    topic: 'Cell capacity',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'For Gen 1 / 1.5 in the polar-region two-polarisation example, what single-cell maximum is quoted after the 3 dB per-beam power split?',
    options: ['6 Gb/s', '10 Gb/s', '12 Gb/s', '20 Gb/s'],
    answers: [2],
    explanation: 'Two beams × (4 − 1) bits/s/Hz × 2 GHz = 12 Gb/s in the slide calculation.',
    source: 'Starlink slides — link budget consequences until 2025',
    tags: ['Gen 1', '12 Gb/s', 'polarisation']
  },
  {
    id: 'stx-grow-capacity',
    domain: 'starlink',
    topic: 'Capacity scaling',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Which mechanisms are explicitly discussed as ways a LEO network might grow beyond the old ~20 Gb/s single-cell limit? Select ALL that apply.',
    options: [
      'Change EPFD rules',
      'Add bandwidth',
      'Decrease cell size using higher-gain/more-directional satellite antennas',
      'Allow more than one same-frequency beam per cell',
      'Ignore international spectrum regulation'
    ],
    answers: [0, 1, 2, 3],
    explanation: 'The slides discuss all four real mechanisms and also explain why each has constraints. “Ignore regulation” is not an engineering option.',
    source: 'Starlink slides — growing beyond the old limit',
    tags: ['capacity scaling', 'EPFD', 'bandwidth', 'cell size']
  },
  {
    id: 'stx-cellsize',
    domain: 'starlink',
    topic: 'Capacity scaling',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why would decreasing Starlink cell size require a new/higher-capability satellite antenna design?',
    options: [
      'Smaller cells require higher-gain, more directional satellite beams',
      'Smaller cells require lower frequency by definition',
      'H3 cannot represent small cells',
      'A smaller cell eliminates the need for antennas'
    ],
    answers: [0],
    explanation: 'The slides compare this with mobile-network densification: smaller cells need more directional/higher-gain satellite antennas and therefore new constellation capability.',
    source: 'Starlink slides — growing beyond the old limit',
    tags: ['cell size', 'directionality', 'gain']
  },
  {
    id: 'stx-demand-surcharge',
    domain: 'starlink',
    topic: 'User density management',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'In the lecture narrative, a one-off “demand surcharge” in busy cells is best interpreted as evidence of:',
    options: [
      'User-density / capacity management',
      'A change in the speed of light',
      'A requirement that all users buy performance Dishy',
      'A proof that spectrum is unlimited'
    ],
    answers: [0],
    explanation: 'The slides present location-dependent availability, minimum rates, pricing and surcharges in the context of managing user density against finite cell capacity.',
    source: 'Starlink slides — user density management',
    tags: ['demand surcharge', 'density management']
  },
  {
    id: 'stx-8beam-gainfactor',
    domain: 'starlink',
    topic: 'Late-2025 co-frequency beams',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'The slide’s old 20 Gb/s limit rises to 48 Gb/s with the eight-beam example. What multiplicative increase is that?',
    options: ['1.4×', '2.4×', '4×', '8×'],
    answers: [1],
    explanation: '48 / 20 = 2.4. This is a concrete reminder that “up to 8 beams” does not mean 8× capacity.',
    trap: 'Permission count and capacity multiplier are not the same quantity.',
    source: 'Starlink slides — late 2025 capacity',
    tags: ['2.4x', 'capacity', '8 beams']
  },
  {
    id: 'stx-isl-old-proposal',
    domain: 'starlink',
    topic: 'Laser ISLs',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'In the slide’s “how we thought Starlink would do it” three-ISL design, which links are described? Select ALL that apply.',
    options: [
      'One link to the next satellite ahead in the same orbit',
      'One link to the next satellite behind in the same orbit',
      'A third cross-plane link whose east/west direction alternates by satellite colour',
      'A permanent laser link from every satellite directly to Auckland'
    ],
    answers: [0, 1, 2],
    explanation: 'The proposed topology shown uses ahead/behind in-plane links plus one alternating cross-plane link.',
    source: 'Starlink slides — hypothesised ISL topology',
    tags: ['ISL topology', 'cross-plane']
  },
  {
    id: 'stx-isl-challenges',
    domain: 'starlink',
    topic: 'Laser ISLs',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Which challenges are explicitly raised for the hypothesised alternating cross-plane ISL topology? Select ALL that apply.',
    options: [
      'East and west reverse twice per orbital period',
      'Satellite failures complicate connectivity',
      'Routing must determine which way packets should go',
      'Space has no line of sight'
    ],
    answers: [0, 1, 2],
    explanation: 'Those three challenges are listed directly after the topology proposal.',
    source: 'Starlink slides — hypothesised ISL topology challenges',
    tags: ['ISL', 'routing', 'failure']
  },
  {
    id: 'stx-tarawa-distance',
    domain: 'starlink',
    topic: 'Routing',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Why does the Tarawa example rule out a simple bent-pipe hop straight to the nearest New Zealand teleport?',
    options: [
      'Tarawa is about 4115 km from the closest NZ teleport, far beyond a single bent-pipe geometry',
      'Tarawa has no IP addresses',
      'Lasers cannot cross orbital planes',
      'Auckland has no Starlink gateway'
    ],
    answers: [0],
    explanation: 'The slide explicitly says ~4115 km is way too far for bent pipe, yet traceroute traffic emerges in Auckland, implying ISL transport.',
    source: 'Starlink slides — Tarawa traceroute',
    tags: ['Tarawa', 'bent pipe', 'ISL']
  }
]
