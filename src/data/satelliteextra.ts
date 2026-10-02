import type { Question } from '../types'

export const satelliteExtraQuestions: Question[] = [
  {
    id: 'sx-classic-ratio',
    domain: 'satellite',
    topic: 'Bent pipe',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'The classic bent-pipe-to-ISP design ratio in the slides is approximately:',
    options: ['1:1 in/out', '4:1 in/out', '10:1 in/out', '1:4 in/out'],
    answers: [1],
    explanation: 'The classic bent-pipe slide gives a typical design ratio of about 4:1 in/out.',
    source: 'Satellite Internet slides — classic bent pipe',
    tags: ['bent pipe', 'traffic ratio']
  },
  {
    id: 'sx-directsite-uplink',
    domain: 'satellite',
    topic: 'Direct to site',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'In a direct-to-site service, why might the user uplink use spread spectrum or burst-type TDM/FDM arrangements?',
    options: [
      'Many user terminals share the uplink resource',
      'The downlink is always telephone-based',
      'The satellite cannot receive radio',
      'A user terminal has unlimited dedicated spectrum'
    ],
    answers: [0],
    explanation: 'The slides describe shared downlink bandwidth and user-site uplinks using spread-spectrum or burst-type arrangements, consistent with multiplexing many subscribers.',
    source: 'Satellite Internet slides — direct to site',
    tags: ['uplink', 'sharing', 'TDM/FDM']
  },
  {
    id: 'sx-cband',
    domain: 'satellite',
    topic: 'Frequency bands',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Which statement best matches C band in the slide summary?',
    options: [
      'Suitable for wideband but needs larger antennas and can suffer terrestrial microwave interference',
      'Narrowband only and requires no dish',
      'Reserved primarily for government/military',
      'Tiny antennas but severe atmospheric-gas attenuation'
    ],
    answers: [0],
    explanation: 'C band is described as suitable for wideband, relatively resistant to rain fade, but needing large antennas and being subject to microwave interference.',
    source: 'Satellite Internet slides — frequency bands',
    tags: ['C band', 'microwave interference']
  },
  {
    id: 'sx-xband',
    domain: 'satellite',
    topic: 'Frequency bands',
    difficulty: 'core',
    type: 'single',
    prompt: 'Which satellite band is described as similar to C band but reserved for government/military use?',
    options: ['L band', 'X band', 'Ku band', 'E band'],
    answers: [1],
    explanation: 'The slide deck identifies X band (9–12 GHz) as similar to C band and reserved for government/military.',
    source: 'Satellite Internet slides — frequency bands',
    tags: ['X band']
  },
  {
    id: 'sx-geo-distance',
    domain: 'satellite',
    topic: 'Satellite link budget',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why can the actual path length to a GEO satellite exceed the nominal 35,786 km orbital altitude?',
    options: [
      'Ground station latitude/longitude and satellite longitude change the slant range',
      'Radio waves move slower in vacuum',
      'GEO satellites are always at 100,000 km altitude',
      'Path loss adds kilometres to the physical route'
    ],
    answers: [0],
    explanation: 'The slides use a sample path length of about 38,000 km and explicitly note that GEO slant range depends on ground/satellite geometry.',
    source: 'Satellite Internet slides — sample C-band GEO link budget',
    tags: ['GEO', 'slant range', 'geometry']
  },
  {
    id: 'sx-bentpipe-capacity-share',
    domain: 'satellite',
    topic: 'Bent pipe',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'A bent-pipe satellite access link is commonly shared by:',
    options: ['A few dozen to a few thousand end users', 'Exactly one TCP flow', 'No users simultaneously', 'Only one ISP router with no subscribers'],
    answers: [0],
    explanation: 'The slides state that a bent-pipe link may be shared among a few dozen to a few thousand end users.',
    source: 'Satellite Internet slides — bent pipe to ISP',
    tags: ['sharing', 'bottleneck']
  },
  {
    id: 'sx-feedback-queue',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why can the satellite-gateway queue continue overflowing even after packet drops have begun?',
    options: [
      'Senders are still reacting to older ACK feedback and cannot directly observe the remote queue state',
      'TCP disables acknowledgements permanently',
      'Dropped packets instantly increase the congestion window',
      'The satellite converts losses into antenna gain'
    ],
    answers: [0],
    explanation: 'Long feedback delay means senders keep transmitting based on stale congestion information until missing ACKs/timeouts finally trigger backoff.',
    source: 'Satellite Internet slides — TCP queue oscillation',
    tags: ['feedback delay', 'queue', 'ACK']
  },
  {
    id: 'sx-idle-after-drain',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'After excessive TCP backoff drains the bottleneck queue completely, what can happen next?',
    options: [
      'The satellite link can sit idle temporarily even though users still have data to send',
      'Utilisation must remain exactly 100%',
      'The BDP becomes zero',
      'The path changes from GEO to LEO'
    ],
    answers: [0],
    explanation: 'The slide sequence explicitly includes a phase where the queue clears and the link is underutilised for part of the cycle.',
    trap: 'UNDERUTILISATION can be a symptom of too much delayed congestion feedback, not only too little demand.',
    source: 'Satellite Internet slides — four phases of queue oscillation',
    tags: ['underutilisation', 'queue drain']
  },
  {
    id: 'sx-overload-smallflows',
    domain: 'satellite',
    topic: 'Load regimes',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why can very small flows dominate an overloaded satellite bottleneck?',
    options: [
      'Flows smaller than the initial congestion window may finish before needing to back off',
      'Small flows have zero RTT',
      'Small flows bypass the gateway queue',
      'Small flows physically reduce path loss'
    ],
    answers: [0],
    explanation: 'The overload slide notes that small flows (<10 packets, roughly below init_cwnd) can take over while large flows time out.',
    source: 'Satellite Internet slides — overload',
    tags: ['init_cwnd', 'small flows', 'overload']
  },
  {
    id: 'sx-test-observability',
    domain: 'satellite',
    topic: 'Diagnosis',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'Why might ordinary ISP checks fail to reveal poor long-flow performance? Select ALL that apply.',
    options: [
      'Ping is a short exchange',
      'Many web objects are small/short flows',
      'Users may blame a remote server when a large transfer is slow',
      'Long-flow goodput is guaranteed to equal link capacity'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides explain that typical tests and many everyday flows are short, while users may attribute slow large transfers to servers rather than the ISP.',
    source: 'Satellite Internet slides — why ISPs do not see queue oscillation',
    tags: ['observability', 'short flows', 'ISP']
  },
  {
    id: 'sx-rate-misconception',
    domain: 'satellite',
    topic: 'Flow size / user experience',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which statement is the misconception explicitly challenged by the slides?',
    options: [
      'Download time depends mainly on link data rate for every transfer size',
      'Large transfers are rate-sensitive',
      'Short transfers can be RTT-dominated',
      'Satellite RTT can affect user-perceived latency'
    ],
    answers: [0],
    explanation: 'The slides say “download time depends mainly on the link data rate” is true for large downloads only, not short transfers.',
    trap: 'A statement can be true in one regime and false as a universal claim.',
    source: 'Satellite Internet slides — common misconception',
    tags: ['rate', 'RTT', 'universal claim']
  }
]
