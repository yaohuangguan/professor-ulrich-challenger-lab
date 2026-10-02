import type { Question } from '../types'

export const satelliteQuestions: Question[] = [
  {
    id: 's-architectures-1',
    domain: 'satellite',
    topic: 'Satellite architectures',
    difficulty: 'core',
    type: 'multi',
    prompt: 'Which pairings are supported by the course slides? Select ALL that apply.',
    options: [
      'GEO: traditional bent-pipe Internet to ISPs',
      'MEO: O3b mPOWER bent-pipe Internet to ISPs',
      'LEO: only direct-to-device and never direct-to-site',
      'LEO: direct-to-site and direct-to-device are possible application areas'
    ],
    answers: [0, 1, 3],
    explanation: 'The overview lists GEO bent pipe/direct-to-site/downlink-only, MEO O3b mPOWER bent pipe, and LEO direct-to-site/direct-to-device.',
    trap: '“Only” is dangerous: LEO is not restricted to one service model.',
    source: 'Satellite Internet slides — application areas',
    tags: ['GEO', 'MEO', 'LEO', 'architecture']
  },
  {
    id: 's-bent-pipe-1',
    domain: 'satellite',
    topic: 'Bent pipe',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'In the “classic” bent-pipe-to-ISP model, where does most user data head after the satellite hop?',
    options: ['Directly to another end user with no ISP', 'To an ISP network', 'Only to a CDN on the satellite', 'Back to the same user terminal'],
    answers: [1],
    explanation: 'The slides describe the classic model as most data heading to an ISP, with the satellite link feeding that ISP network.',
    source: 'Satellite Internet slides — bent pipe to ISPs',
    tags: ['bent pipe', 'ISP']
  },
  {
    id: 's-direct-site-1',
    domain: 'satellite',
    topic: 'Direct to site',
    difficulty: 'core',
    type: 'single',
    prompt: 'Which statement best fits a direct-to-site satellite Internet service?',
    options: [
      'A subscription service for many geographically distributed end users',
      'A system where every end user requires a US$100,000 gateway',
      'A downlink-only system by definition',
      'A service that cannot use LEO satellites'
    ],
    answers: [0],
    explanation: 'The slides describe direct-to-site as a subscription model for many end users spread over a large area, using GEO or LEO.',
    source: 'Satellite Internet slides — direct to site',
    tags: ['direct to site', 'service model']
  },
  {
    id: 's-downlink-only-1',
    domain: 'satellite',
    topic: 'Direct to site downlink only',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'In the older GEO “direct to site downlink only” model, what carries the user-site uplink?',
    options: ['The same satellite channel', 'A wired telephone network', 'A laser ISL', 'A 5G base station on the satellite'],
    answers: [1],
    explanation: 'The slides explicitly state that the “uplink” from the user site uses the wired telephone network, not the satellite.',
    trap: 'Do not assume “satellite Internet” means both directions necessarily use the satellite.',
    source: 'Satellite Internet slides — direct to site downlink only',
    tags: ['uplink', 'downlink only', 'wording']
  },
  {
    id: 's-dtd-1',
    domain: 'satellite',
    topic: 'Direct to device',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'For LEO direct-to-device in the slides, which statements apply? Select ALL that apply.',
    options: [
      'It needs many small satellites',
      'User antennas can be only a few cm to a few dozen cm depending on device',
      'Uplink/downlink can resemble 4G LTE or 5G mobile data',
      'It requires a 60 cm GEO VSAT dish at every phone'
    ],
    answers: [0, 1, 2],
    explanation: 'The slides describe many small satellites, compact user antennas, and cellular-like uplink/downlink. A 60 cm VSAT dish is not the direct-to-device model.',
    source: 'Satellite Internet slides — direct to device',
    tags: ['D2D', 'LEO', 'antenna']
  },
  {
    id: 's-bands-1',
    domain: 'satellite',
    topic: 'Frequency bands',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'Which band/property pairings match the slides? Select ALL that apply.',
    options: [
      'L band: little rain fade, narrowband-oriented',
      'Ku band: wideband with smaller dishes, rain fade can be a problem',
      'Ka band: serious rain fade can occur',
      'E band: atmospheric gases cause serious attenuation',
      'X band: primarily an unlicensed consumer Wi-Fi band'
    ],
    answers: [0, 1, 2, 3],
    explanation: 'The slide table gives those four properties. X band is described as reserved for government/military, not consumer Wi-Fi.',
    trap: 'Many options are individually plausible-sounding; match the exact band to the exact impairment.',
    source: 'Satellite Internet slides — satellite frequency bands',
    tags: ['L band', 'Ku band', 'Ka band', 'E band', 'rain fade']
  },
  {
    id: 's-pointing-1',
    domain: 'satellite',
    topic: 'Dish pointing',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why do higher-frequency satellite links generally require more accurate pointing, even though higher free-space loss can be compensated by antenna gain?',
    options: [
      'Higher gain antennas are more directional',
      'Thermal noise disappears at high frequency',
      'Path loss becomes zero after beamforming',
      'The wavelength becomes longer'
    ],
    answers: [0],
    explanation: 'The slides say higher frequency permits high gain with smaller antennas, but higher gain means greater directionality, so pointing becomes more critical.',
    trap: 'The key is directionality, not simply “higher frequency has more loss.”',
    source: 'Satellite Internet slides — dish pointing',
    tags: ['pointing', 'gain', 'directionality']
  },
  {
    id: 's-cband-budget-1',
    domain: 'satellite',
    topic: 'Satellite link budget',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'In the sample 5 GHz GEO downlink, about how much TOTAL antenna gain is required across transmit and receive sides?',
    options: ['32.1 dBi', '47 dBi', '64.2 dBi', '198.1 dBi'],
    answers: [2],
    explanation: 'The sample computes G ≥ 64.2 dBi total. A 50/50 split would be about 32.1 dBi at each end.',
    trap: 'Do not confuse total gain with the per-end gain after the 50/50 split.',
    source: 'Satellite Internet slides — sample C-band GEO link budget',
    tags: ['link budget', 'C band', 'antenna gain']
  },
  {
    id: 's-cband-budget-2',
    domain: 'satellite',
    topic: 'Satellite link budget',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'In the sample C-band GEO link budget, the noise floor is about -98.9 dBm and 16QAM needs about 12 dB SNR. What minimum received signal level follows?',
    options: ['-110.9 dBm', '-98.9 dBm', '-86.9 dBm', '-12 dBm'],
    answers: [2],
    explanation: 'Required receive power = noise floor + required SNR = -98.9 + 12 = -86.9 dBm.',
    source: 'Satellite Internet slides — sample C-band GEO link budget',
    tags: ['noise floor', 'SNR', 'link budget']
  },
  {
    id: 's-bdp-1',
    domain: 'satellite',
    topic: 'Bandwidth-delay product',
    difficulty: 'core',
    type: 'single',
    prompt: 'What does a large bandwidth-delay product represent on a satellite path?',
    options: [
      'A large amount of data can be in flight before feedback returns',
      'The receiver must have a smaller antenna',
      'The carrier frequency is necessarily higher',
      'The path cannot carry TCP'
    ],
    answers: [0],
    explanation: 'BDP is rate × RTT. The slides emphasize that satellite BDPs can hold a large number of packets “in flight”.',
    source: 'Satellite Internet slides — bandwidth-delay products',
    tags: ['BDP', 'RTT', 'TCP']
  },
  {
    id: 's-bdp-2',
    domain: 'satellite',
    topic: 'Bandwidth-delay product',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'A 100 Mb/s GEO link has a 500 ms RTT. Approximately what is its bandwidth-delay product?',
    options: ['0.625 MB', '6.25 MB', '50 MB', '100 MB'],
    answers: [1],
    explanation: '100 Mb/s × 0.5 s = 50 Mbit = 6.25 MB.',
    trap: 'Convert bits to bytes after multiplying by RTT.',
    source: 'Satellite Internet slides — bandwidth-delay products',
    tags: ['BDP', 'units', 'GEO']
  },
  {
    id: 's-queue-cause-1',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Can TCP queue oscillation explain high packet loss on a satellite bottleneck WITHOUT invoking low SNR or radio interference?',
    options: ['Yes', 'No, packet loss always implies a radio problem', 'Only on LEO', 'Only if the link has zero RTT'],
    answers: [0],
    explanation: 'The slides explicitly note that queue oscillation explains the packet-loss phenomena studied on the satellite links without needing noise or interference.',
    trap: '“Packet loss = RF problem” is an overgeneralisation.',
    source: 'Satellite Internet slides — TCP queue oscillation',
    tags: ['TCP', 'queue oscillation', 'diagnosis']
  },
  {
    id: 's-queue-phase-1',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'The satellite gateway queue has just become FULL. Which event can still occur before TCP senders throttle back?',
    options: [
      'Senders may continue sending because ACK feedback about the drops has not returned yet',
      'All senders instantly know the queue state and stop',
      'The RTT immediately falls to zero',
      'The link must become noise-free'
    ],
    answers: [0],
    explanation: 'The queue can continue overflowing because senders still receive earlier ACKs. Only when ACKs for dropped packets become overdue do senders back off.',
    trap: 'TCP senders do NOT observe the remote bottleneck queue state directly.',
    source: 'Satellite Internet slides — four phases of queue oscillation',
    tags: ['queue', 'ACK', 'feedback delay']
  },
  {
    id: 's-queue-phase-2',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'During the phase after senders throttle back and packet arrival slows, what happens to the gateway queue?',
    options: ['It drains', 'It grows forever', 'It becomes an antenna', 'Its RTT becomes negative'],
    answers: [0],
    explanation: 'After congestion feedback finally reaches senders and they back off, arrivals fall and the previously full queue drains.',
    source: 'Satellite Internet slides — four phases of queue oscillation',
    tags: ['queue', 'TCP phases']
  },
  {
    id: 's-underutilisation-1',
    domain: 'satellite',
    topic: 'TCP queue oscillation',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'A satellite link shows BOTH packet loss and periods of UNDERUTILISATION. Which explanation is explicitly discussed in the slides?',
    options: [
      'TCP queue oscillation can overflow, trigger backoff, drain completely, and leave the link idle',
      'Underutilisation proves there is too little user demand',
      'Packet loss proves the antenna must be misaligned',
      'The two observations cannot happen together'
    ],
    answers: [0],
    explanation: 'Queue oscillation can alternate between overflow and a drained/idle link. So loss and underutilisation are not contradictory.',
    trap: '“Underutilised” does NOT necessarily mean “insufficient demand”. Timing and feedback dynamics matter.',
    source: 'Satellite Internet slides — queue oscillation and engineer vs computer scientist',
    tags: ['underutilisation', 'packet loss', 'wording']
  },
  {
    id: 's-load-states-1',
    domain: 'satellite',
    topic: 'Load regimes',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Which descriptions match the three bent-pipe load regimes? Select ALL that apply.',
    options: [
      'Low load: buffer seldom fills; no queue oscillation',
      'High load: buffer fills and drains repeatedly; excessive queue oscillation',
      'Overload: buffer permanently full and many very small flows can dominate',
      'Overload: all large flows always reach full link rate'
    ],
    answers: [0, 1, 2],
    explanation: 'Those are the three scenarios from the slides. In overload, large flows can time out rather than reach full rate.',
    source: 'Satellite Internet slides — three types of bent pipe scenarios',
    tags: ['low load', 'high load', 'overload']
  },
  {
    id: 's-short-flow-1',
    domain: 'satellite',
    topic: 'Flow size / user experience',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Why might users perceive web browsing as acceptable even when long TCP flows perform badly on a satellite link?',
    options: [
      'Most tested/user-visible flows are short and are dominated by RTT rather than sustained rate',
      'Short flows have no RTT',
      'Browsers bypass the satellite for all small objects',
      'Queue oscillation increases antenna gain'
    ],
    answers: [0],
    explanation: 'The slides emphasize that many flows are short. Small transfers are dominated by RTT, so poor sustained large-flow goodput may be less obvious.',
    trap: 'Do not generalise large-download throughput behaviour to every web transaction.',
    source: 'Satellite Internet slides — why ISPs do not see queue oscillation',
    tags: ['short flows', 'RTT', 'goodput']
  },
  {
    id: 's-download-rate-1',
    domain: 'satellite',
    topic: 'Flow size / user experience',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'For a 160 ms RTT path, which transfer is MOST sensitive to halving the sustained data rate?',
    options: ['A 5 kB object', 'A 10 MB download', 'A single tiny ACK', 'A DNS label string'],
    answers: [1],
    explanation: 'The slides show a 5 kB transfer is mostly RTT-dominated, while a 10 MB transfer is overwhelmingly rate-dominated. Halving data rate roughly doubles the large download time.',
    source: 'Satellite Internet slides — common misconception about download time',
    tags: ['RTT', 'data rate', 'flow size']
  },
  {
    id: 's-diurnal-1',
    domain: 'satellite',
    topic: 'Diagnosis',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'A MEO link has strong daytime/evening packet loss and low goodput, but low/no loss and high goodput overnight. Which hypothesis is especially supported by that demand-correlated pattern in the slides?',
    options: ['TCP queue oscillation at the bottleneck', 'A permanent broken feedline', 'A satellite that only works at night by design', 'A fixed antenna pointing error that disappears every night'],
    answers: [0],
    explanation: 'The case study is used to contrast RF explanations with congestion/queue dynamics. A strong usage-time pattern supports a load-related mechanism such as queue oscillation.',
    trap: 'Ask what changes with user demand. A fixed hardware fault would not normally follow peak usage so neatly.',
    source: 'Satellite Internet slides — Rarotonga case study',
    tags: ['diurnal', 'diagnosis', 'queue oscillation']
  },
  {
    id: 's-rtt-1',
    domain: 'satellite',
    topic: 'Latency',
    difficulty: 'core',
    type: 'single',
    prompt: 'Which latency statement matches the queue-oscillation slides?',
    options: ['GEO feedback delays can exceed 500 ms; MEO can exceed 125 ms', 'MEO always exceeds GEO RTT', 'GEO has effectively zero RTT', 'RTT is irrelevant to TCP feedback'],
    answers: [0],
    explanation: 'The slides explicitly call out long feedback delays: >500 ms on GEO and >125 ms on MEO.',
    source: 'Satellite Internet slides — TCP queue oscillation',
    tags: ['GEO', 'MEO', 'RTT']
  }
]
