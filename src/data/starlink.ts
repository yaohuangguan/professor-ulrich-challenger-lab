import type { Question } from '../types'

export const starlinkQuestions: Question[] = [
  {
    id: 'st-bands-1',
    domain: 'starlink',
    topic: 'Starlink bands',
    difficulty: 'core',
    type: 'single',
    prompt: 'Which Starlink band usage matches the course slides?',
    options: [
      'Ku for direct-to-site end users; Ka/E for gateway connections',
      'E band only for Dishy end users',
      'L band for all gateway connections',
      'Ka only for Wi-Fi inside the home'
    ],
    answers: [0],
    explanation: 'The slides specify Ku for direct-to-site end-user service, with Ka and E for Internet gateways and Ka for community gateways.',
    source: 'Starlink slides — overview',
    tags: ['Ku', 'Ka', 'E band']
  },
  {
    id: 'st-bentpipe-1',
    domain: 'starlink',
    topic: 'Architecture',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'For most Starlink users, what architecture does the slide deck say is still commonly used?',
    options: ['Direct-to-site bent pipe', 'GEO-only ISP backhaul', 'Downlink-only with telephone uplink', 'No gateway anywhere'],
    answers: [0],
    explanation: 'The slides say most users are served by direct-to-site as bent pipe, even though inter-satellite links exist.',
    trap: 'The existence of space lasers does NOT mean every packet takes an all-space route.',
    source: 'Starlink slides — direct to site as bent pipe',
    tags: ['bent pipe', 'direct to site', 'ISL']
  },
  {
    id: 'st-dishy-1',
    domain: 'starlink',
    topic: 'Dishy',
    difficulty: 'core',
    type: 'single',
    prompt: '“Dishy McFlatface” is best described as:',
    options: ['A consumer phased-array antenna', 'A conventional fixed parabolic dish only', 'A GEO teleport radome', 'A laser inter-satellite terminal'],
    answers: [0],
    explanation: 'The slides call Dishy the first consumer-grade phased-array antenna and note electronic satellite tracking.',
    source: 'Starlink slides — Dishy McFlatface',
    tags: ['Dishy', 'phased array']
  },
  {
    id: 'st-dishy-track-1',
    domain: 'starlink',
    topic: 'Dishy',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Which statement about Dishy tracking is most accurate in the slides?',
    options: [
      'Dishy can electronically track satellites',
      'Every Dishy requires continuous mechanical rotation for every handover',
      'Dishy cannot see more than one satellite direction at a time',
      'Dishy uses no antenna beamforming'
    ],
    answers: [0],
    explanation: 'Dishy is a phased array and can steer electronically. Some early/standard models also include mechanical adjustment, but that is not the same as requiring mechanical tracking for every handover.',
    trap: 'Electronic tracking and mechanical mounting adjustment are not the same thing.',
    source: 'Starlink slides — Dishy McFlatface',
    tags: ['tracking', 'phased array', 'wording']
  },
  {
    id: 'st-standard-performance-1',
    domain: 'starlink',
    topic: 'Dishy',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'According to the slides, which distinction is stated between standard and performance Dishy versions?',
    options: [
      'Standard communicates via one satellite; performance versions can communicate via multiple satellites',
      'Standard uses Ka only; performance uses L band only',
      'Standard cannot electronically steer',
      'Performance versions are receive-only'
    ],
    answers: [0],
    explanation: 'The slide deck states that standard versions communicate via one satellite while performance versions can communicate via multiple satellites.',
    source: 'Starlink slides — Dishy versions',
    tags: ['Dishy', 'standard', 'performance']
  },
  {
    id: 'st-h3-1',
    domain: 'starlink',
    topic: 'Ground segment cells',
    difficulty: 'core',
    type: 'multi',
    prompt: 'Which statements about Starlink ground cells match the slides? Select ALL that apply.',
    options: [
      'Starlink divides the surface into H3 cells',
      'H3 cells are mostly hexagonal, with some pentagons',
      'H3 is hierarchical',
      'Each H3 cell is necessarily served by exactly one satellite forever'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides describe hierarchical H3 tessellation with mostly hexagonal cells and some pentagons. Service beams/satellites change; a cell is not permanently tied to one satellite.',
    trap: 'A geographic cell is not a permanent satellite assignment.',
    source: 'Starlink slides — ground segment structure',
    tags: ['H3', 'cells']
  },
  {
    id: 'st-beam-leak-1',
    domain: 'starlink',
    topic: 'Beams and spectrum reuse',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why can servicing two nearby cells constrain reuse of the same frequency/polarisation?',
    options: [
      'Beams leak into neighbouring cells',
      'H3 forbids adjacent cells from existing',
      'Satellites cannot form directional beams',
      'Ku band has zero available spectrum'
    ],
    answers: [0],
    explanation: 'The slides explicitly note beam leakage into neighbouring cells. Nearby simultaneous service can therefore block reuse of the same frequency/polarisation.',
    trap: 'The single-cell peak-capacity calculation assumes unusually favourable neighbouring-cell demand.',
    source: 'Starlink slides — beam coverage and link-budget consequences',
    tags: ['beam leakage', 'reuse', 'cells']
  },
  {
    id: 'st-gen1-1',
    domain: 'starlink',
    topic: 'Satellite generations',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'Which statements are listed for Starlink Generation 1 satellites? Select ALL that apply.',
    options: [
      'About 550 km orbital altitude',
      'Up to 16QAM',
      'Two Ku downlink beams in a 2 GHz band',
      'About 1.2 Gb/s down if both beams point at different cells',
      'Up to 64QAM and four Ku beams'
    ],
    answers: [0, 1, 2, 3],
    explanation: 'Those four properties are listed for Gen 1. Up to 64QAM/four Ku beams is listed for Gen 2.',
    source: 'Starlink slides — satellites',
    tags: ['Gen 1', '16QAM', 'capacity']
  },
  {
    id: 'st-gen2-1',
    domain: 'starlink',
    topic: 'Satellite generations',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Which capability is associated with Generation 2 in the slides?',
    options: ['Up to 64QAM and up to four Ku downlink beams', 'Only BPSK', 'No Ku downlink beams', 'A maximum of one beam per satellite'],
    answers: [0],
    explanation: 'Gen 2 is described as significantly more capable, with modulation up to 64QAM and up to four Ku downlink beams.',
    source: 'Starlink slides — satellites',
    tags: ['Gen 2', '64QAM', 'beams']
  },
  {
    id: 'st-visible-usable-1',
    domain: 'starlink',
    topic: 'Visible vs usable satellites',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'A Starlink satellite is above 25° elevation and therefore VISIBLE. Which factors can still make it UNUSABLE for a ground location? Select ALL that apply.',
    options: [
      'No beam available because its beam resources are occupied elsewhere',
      'Spectrum/EPFD constraints for the cell',
      'Geostationary arc protection',
      'The satellite being visible automatically guarantees usability'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides distinguish visible from usable. Visibility above the minimum elevation is only one condition; beam availability, spectrum/EPFD and GEO-arc protection also matter.',
    trap: 'VISIBLE ≠ USABLE.',
    source: 'Starlink slides — visible vs usable satellites',
    tags: ['visible', 'usable', 'EPFD', 'GEO arc']
  },
  {
    id: 'st-elevation-1',
    domain: 'starlink',
    topic: 'Visible vs usable satellites',
    difficulty: 'core',
    type: 'single',
    prompt: 'What minimum elevation threshold is used in the slides for a Starlink satellite to be considered properly visible/eligible before other constraints?',
    options: ['5°', '10°', '25°', '45°'],
    answers: [2],
    explanation: 'The slide deck uses a 25° minimum elevation requirement.',
    source: 'Starlink slides — visible and usable satellites',
    tags: ['elevation', '25 degrees']
  },
  {
    id: 'st-geo-arc-1',
    domain: 'starlink',
    topic: 'Geostationary arc protection',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'What does geostationary arc protection require in the situation described by the slides?',
    options: [
      'A LEO satellite must not transmit to a ground station when it sits in front of the GEO arc',
      'All GEO satellites must switch off whenever Starlink is visible',
      'Dishy must point below the horizon',
      'Only the user uplink is protected; downlink geometry never matters'
    ],
    answers: [0],
    explanation: 'The slides state that LEO satellites must not transmit to a ground station if the LEO satellite sits in front of the geostationary arc, protecting GEO services from interference.',
    trap: 'A geometrically visible LEO satellite can be disqualified from use.',
    source: 'Starlink slides — geostationary arc protection',
    tags: ['GEO arc', 'interference', 'regulation']
  },
  {
    id: 'st-epfd-1',
    domain: 'starlink',
    topic: 'EPFD',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'What is the key “aggregate” idea in the Starlink EPFD limit described in the slides?',
    options: [
      'The limit applies to incoming power from all constellation transmitters/beams contributing in the specified bandwidth and area',
      'Each beam gets the full EPFD limit independently with no interaction',
      'EPFD measures only Ethernet cable loss',
      'EPFD is the number of satellites visible above 25°'
    ],
    answers: [0],
    explanation: 'EPFD is an aggregate power-flux-density constraint. The deck notes the maximum applies to the aggregate power of beams pointing at a cell.',
    trap: 'The word AGGREGATE is crucial when multiple co-frequency beams are used.',
    source: 'Starlink slides — downlink link budget',
    tags: ['EPFD', 'aggregate power']
  },
  {
    id: 'st-polarisation-capacity-1',
    domain: 'starlink',
    topic: 'Cell capacity',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'For Gen 2 under the pre-late-2025 two-polarisation calculation, why does each beam drop from 6 to about 5 bits/s/Hz?',
    options: [
      'Two same-frequency opposite-polarisation beams share the EPFD power allowance, halving power per beam (-3 dB)',
      '64QAM suddenly becomes 16QAM because of H3',
      'Bandwidth halves from 2 GHz to 1 GHz',
      'The satellite altitude doubles'
    ],
    answers: [0],
    explanation: 'With two beams, their powers add under the EPFD limit, so each gets half the power (-3 dB). The slide approximates that as losing 1 bit/s/Hz per beam.',
    source: 'Starlink slides — link budget consequences until 2025',
    tags: ['polarisation', 'EPFD', 'bits per Hz']
  },
  {
    id: 'st-20gbps-1',
    domain: 'starlink',
    topic: 'Cell capacity',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Using the slide calculation for Gen 2 before late-2025: two beams × 5 bits/s/Hz each across 2 GHz gives what maximum single-cell downlink rate?',
    options: ['10 Gb/s', '12 Gb/s', '20 Gb/s', '40 Gb/s'],
    answers: [2],
    explanation: '2 × 5 bits/s/Hz = 10 bits/s/Hz combined. Across 2 GHz, that is 20 Gb/s.',
    trap: 'This is a single-cell upper bound under favourable neighbouring-cell conditions, not a universal user speed.',
    source: 'Starlink slides — link budget consequences until 2025',
    tags: ['20 Gb/s', 'capacity', 'polarisation']
  },
  {
    id: 'st-8beams-1',
    domain: 'starlink',
    topic: 'Late-2025 co-frequency beams',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'After permission for up to 8 co-frequency beams per cell, why is capacity NOT simply 8× the old two-beam capacity?',
    options: [
      'EPFD limits still apply, so per-beam power must be reduced as more beams share the aggregate allowance',
      'The 2 GHz bandwidth becomes 16 GHz automatically',
      'Each new beam gets unlimited transmit power',
      'Polarisation stops existing'
    ],
    answers: [0],
    explanation: 'The slides explicitly keep the EPFD constraint. With four times as many same-frequency beams compared with the two-beam case, each beam gets one quarter of the previous power (-6 dB), reducing spectral efficiency.',
    trap: 'More beams ≠ proportional capacity when a shared aggregate power constraint remains.',
    source: 'Starlink slides — late 2025 link budget',
    tags: ['8 beams', 'EPFD', 'capacity scaling']
  },
  {
    id: 'st-48gbps-1',
    domain: 'starlink',
    topic: 'Late-2025 co-frequency beams',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'In the late-2025 slide calculation, eight beams each operate at about 3 bits/s/Hz across 2 GHz. What combined cell capacity follows?',
    options: ['20 Gb/s', '24 Gb/s', '48 Gb/s', '160 Gb/s'],
    answers: [2],
    explanation: '8 × 3 = 24 bits/s/Hz combined. Across 2 GHz, that is 48 Gb/s.',
    trap: 'Do not multiply the old 20 Gb/s by 8.',
    source: 'Starlink slides — late 2025 link budget',
    tags: ['48 Gb/s', '8 beams', 'capacity']
  },
  {
    id: 'st-geometry-1',
    domain: 'starlink',
    topic: 'Late-2025 co-frequency beams',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Which limitations remain even after allowing up to 8 co-frequency beams per cell? Select ALL that apply.',
    options: [
      'Need enough usable satellites in view',
      'The satellite directions must be sufficiently separated for Dishy to distinguish same-frequency/polarisation beams',
      'Nearby cells can have similar satellite geometry, limiting scaling across many adjacent cells',
      'Capacity automatically scales by exactly 8 everywhere'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides explicitly list usable-satellite availability, suitable directional geometry, and poor scaling across nearby cells as constraints.',
    trap: '“Up to 8” is a permission/upper bound, not a guaranteed multiplier.',
    source: 'Starlink slides — could capacity shortages happen again?',
    tags: ['geometry', 'usable satellites', '8 beams']
  },
  {
    id: 'st-density-1',
    domain: 'starlink',
    topic: 'User density management',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What is the central resource problem behind Starlink user-density management in the slides?',
    options: [
      'Too many users in a cell can exhaust spectrum or available beams',
      'The Internet contains too few IP addresses',
      'Dishy cannot be sold outside cities',
      'Every cell has unlimited spectrum but too much fibre'
    ],
    answers: [0],
    explanation: 'The slides define bad experience as occurring when user density exhausts spectrum or available beams. More satellites can add beams over time, but spectrum is much harder to expand.',
    source: 'Starlink slides — user density management',
    tags: ['user density', 'spectrum', 'beams']
  },
  {
    id: 'st-spectrum-beams-1',
    domain: 'starlink',
    topic: 'User density management',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which resource is described as more fundamentally difficult to scale over time?',
    options: ['Spectrum', 'Number of beams/satellites', 'Number of H3 cell labels', 'Number of Wi-Fi SSIDs'],
    answers: [0],
    explanation: 'The slides say more beams are achievable over time via more satellites, but more spectrum is not similarly scalable.',
    trap: 'Adding satellites does not manufacture new spectrum.',
    source: 'Starlink slides — user density management',
    tags: ['spectrum', 'capacity']
  },
  {
    id: 'st-isl-oneway-1',
    domain: 'starlink',
    topic: 'Laser ISLs',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Why does the slide deck describe a one-way laser link into a fisheye-lens receiver as link-budget-unfavourable?',
    options: [
      'The fisheye receiver behaves like a low-gain antenna, reducing achievable rate',
      'Laser light cannot travel in space',
      'A fisheye receiver has infinite gain and saturates',
      'It forces Ku-band rain fade'
    ],
    answers: [0],
    explanation: 'The wide-angle/fisheye receiver eases pointing at one end but behaves like a low-gain antenna, producing an unfavourable link budget and lower rate.',
    source: 'Starlink slides — space lasers',
    tags: ['ISL', 'laser', 'gain']
  },
  {
    id: 'st-isl-twoway-1',
    domain: 'starlink',
    topic: 'Laser ISLs',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'For the focused two-way laser-link option in the slides, which trade-offs are stated? Select ALL that apply.',
    options: [
      'Better link budget and higher bit rate',
      'Need a moveable head at each end',
      'More complexity / more potential points of failure',
      'No pointing problem exists at either end'
    ],
    answers: [0, 1, 2],
    explanation: 'A focused receiver improves link budget but requires active pointing hardware at both ends, increasing complexity and failure points.',
    source: 'Starlink slides — space lasers',
    tags: ['ISL', 'pointing', 'trade-off']
  },
  {
    id: 'st-tarawa-1',
    domain: 'starlink',
    topic: 'Routing',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'What did the Tarawa traceroute example demonstrate about Starlink ISL routing?',
    options: [
      'Traffic emerged in Auckland, implying cross-plane routing and not a simple shortest path in space',
      'Traffic always exits at the geographically nearest teleport',
      'Starlink uses only in-plane optical links',
      'Tarawa was close enough for ordinary bent-pipe service to New Zealand'
    ],
    answers: [0],
    explanation: 'The slides note Tarawa is roughly 4115 km from the closest NZ teleport—too far for bent pipe—yet traffic emerged in Auckland. The conclusion given is cross-plane routing and no simple shortest-path routing in space.',
    trap: 'Do not infer the routing algorithm from geometric distance alone.',
    source: 'Starlink slides — traceroute from Tarawa',
    tags: ['routing', 'ISL', 'cross-plane']
  },
  {
    id: 'st-cdn-1',
    domain: 'starlink',
    topic: 'Content delivery',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why does “direct to site” create a content-delivery challenge compared with a classic ISP bent-pipe model?',
    options: [
      'There is no local ISP by default in which to place a conventional cache/CDN server near the users',
      'CDNs are illegal on satellite networks',
      'Ku band cannot carry video',
      'Dishy cannot receive IP packets'
    ],
    answers: [0],
    explanation: 'The slides frame the problem as “No ISP. No place to put a cache.” Direct-to-site pushes conventional CDN placement to the far side of the satellite network.',
    source: 'Starlink slides — content delivery',
    tags: ['CDN', 'direct to site']
  }
]
