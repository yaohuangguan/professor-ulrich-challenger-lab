import type { Difficulty, Domain, Question } from '../types'

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]
const round = (n: number, dp = 1) => Number(n.toFixed(dp))
const shuffled = <T,>(xs: T[]) => [...xs].sort(() => Math.random() - 0.5)

function optionQuestion(
  base: Omit<Question, 'options' | 'answers' | 'id'>,
  correct: string,
  wrong: string[],
  prefix: string,
): Question {
  const options = shuffled([correct, ...wrong.slice(0, 3)])
  return {
    ...base,
    id: `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    options,
    answers: [options.indexOf(correct)],
  }
}

function wirelessDb(): Question {
  const cases = [
    { ratio: '2:1', db: 3 },
    { ratio: '4:1', db: 6 },
    { ratio: '8:1', db: 9 },
    { ratio: '10:1', db: 10 },
    { ratio: '100:1', db: 20 },
    { ratio: '1:2', db: -3 },
    { ratio: '1:4', db: -6 },
  ]
  const c = pick(cases)
  return optionQuestion({
    domain: 'wireless',
    topic: 'Decibels',
    difficulty: 'tricky',
    type: 'single',
    prompt: `A POWER ratio is ${c.ratio}. Approximately what is the dB value?`,
    explanation: `Using the course shortcuts, ${c.ratio} corresponds to about ${c.db} dB.`,
    trap: 'The question explicitly says POWER ratio.',
    source: 'Wireless slides — easy working with dB',
    tags: ['generated', 'dB', 'power ratio'],
  }, `${c.db} dB`, [`${-c.db} dB`, `${c.db * 2} dB`, `${Math.abs(c.db) + 3} dB`], 'gen-w-db')
}

function wirelessLinkBudget(): Question {
  const tx = pick([20, 23, 27, 30])
  const txGain = pick([2, 5, 8, 11])
  const txLine = pick([0, 1, 2, 3])
  const path = pick([88, 94, 100, 106])
  const rxGain = pick([0, 2, 5, 8])
  const rxLine = pick([0, 1, 2])
  const noise = pick([-112, -108, -104, -100])
  const req = pick([9, 12, 15, 18])
  const rx = tx - txLine + txGain - path + rxGain - rxLine
  const required = noise + req
  const margin = round(rx - required)
  return optionQuestion({
    domain: 'wireless',
    topic: 'Link budgets',
    difficulty: 'brutal',
    type: 'single',
    prompt: `TX=${tx} dBm, TX feedline=-${txLine} dB, TX antenna=+${txGain} dBi, path loss=-${path} dB, RX antenna=+${rxGain} dBi, RX feedline=-${rxLine} dB. Noise floor=${noise} dBm and required SNR=${req} dB. What is the fade margin?`,
    explanation: `Received signal = ${tx} - ${txLine} + ${txGain} - ${path} + ${rxGain} - ${rxLine} = ${rx} dBm. Required signal = ${noise} + ${req} = ${required} dBm. Fade margin = ${rx} - (${required}) = ${margin} dB.`,
    trap: 'Keep dBm signal levels and dB gains/losses straight; subtracting a negative required level is a common sign error.',
    source: 'Wireless slides — link budgets',
    tags: ['generated', 'link budget', 'fade margin'],
  }, `${margin} dB`, [`${round(-margin)} dB`, `${round(margin + 3)} dB`, `${round(margin - 6)} dB`], 'gen-w-budget')
}

function wirelessCombinedChange(): Question {
  const start = pick([10, 12, 15, 18])
  return optionQuestion({
    domain: 'wireless',
    topic: 'Combined link-budget changes',
    difficulty: 'brutal',
    type: 'single',
    prompt: `A link has ${start} dB fade margin using 16QAM. The receiver bandwidth is doubled and the modulation changes to 64QAM. Using the course approximations (3 dB more noise for doubled bandwidth; ~3 dB SNR per bit/symbol), with all signal-path terms unchanged, what is the new fade margin?`,
    explanation: `Doubling bandwidth raises noise by ~3 dB. 16QAM needs ~12 dB SNR; 64QAM needs ~18 dB, another 6 dB. Total margin loss ≈ 9 dB, so new margin ≈ ${start - 9} dB.`,
    trap: 'Two independent penalties apply: wider bandwidth raises noise AND higher-order QAM raises required SNR.',
    source: 'Wireless slides — thermal noise + link budget notes',
    tags: ['generated', 'synthesis', 'bandwidth', 'QAM'],
  }, `${start - 9} dB`, [`${start - 3} dB`, `${start - 6} dB`, `${start + 9} dB`], 'gen-w-synthesis')
}

function wirelessDistance(): Question {
  const d = pick([100, 250, 400, 800])
  const multiplier = pick([2, 4])
  const extra = multiplier === 2 ? 6 : 12
  return optionQuestion({
    domain: 'wireless',
    topic: 'Path loss',
    difficulty: 'tricky',
    type: 'single',
    prompt: `A free-space link distance increases from ${d} m to ${d * multiplier} m, with frequency and antennas unchanged. Approximately how much EXTRA path loss results?`,
    explanation: `Free-space received power follows 1/r². A ×${multiplier} distance change produces about ${extra} dB additional loss.`,
    source: 'Wireless slides — Friis law / inverse-square law',
    tags: ['generated', 'distance', 'path loss'],
  }, `${extra} dB`, [`${extra / 2} dB`, `${extra + 6} dB`, `${extra + 3} dB`], 'gen-w-distance')
}

function satelliteBdp(): Question {
  const rate = pick([16, 40, 100, 300])
  const rtt = pick(rate <= 40 ? [130, 500] : [130, 500])
  const mb = round(rate * (rtt / 1000) / 8, 3)
  return optionQuestion({
    domain: 'satellite',
    topic: 'Bandwidth-delay product',
    difficulty: 'tricky',
    type: 'single',
    prompt: `A satellite path runs at ${rate} Mb/s with ${rtt} ms RTT. Approximately how much data can be in flight from the bandwidth-delay product (ignore extra input buffers)?`,
    explanation: `BDP = ${rate} Mb/s × ${rtt / 1000} s = ${round(rate * rtt / 1000, 3)} Mbit = ${mb} MB.`,
    trap: 'The link rate is in bits/s; divide by 8 for bytes.',
    source: 'Satellite Internet slides — bandwidth-delay products',
    tags: ['generated', 'BDP', 'units'],
  }, `${mb} MB`, [`${round(mb * 8, 3)} MB`, `${round(mb / 8, 3)} MB`, `${round(mb * 2, 3)} MB`], 'gen-s-bdp')
}

function satelliteSmallVsLarge(): Question {
  const rtt = pick([130, 160, 500])
  const rate = pick([4, 8, 16])
  const sizeKb = pick([5, 10, 20])
  const transferMs = round((sizeKb * 8 / (rate * 1000)) * 1000 + rtt, 0)
  return optionQuestion({
    domain: 'satellite',
    topic: 'Flow size / user experience',
    difficulty: 'brutal',
    type: 'single',
    prompt: `Ignoring server delay, a ${sizeKb} kB object crosses a ${rtt} ms RTT path at an average ${rate} Mb/s. Roughly which total transfer time is closest?`,
    explanation: `Serialization time ≈ ${sizeKb * 8} kbit / ${rate * 1000} kbit/s = ${round(sizeKb * 8 / rate, 1)} ms. Add about one RTT (${rtt} ms): ≈ ${transferMs} ms. For a small object, RTT dominates.`,
    trap: 'For short transfers, “download time depends mainly on link rate” can be badly misleading.',
    source: 'Satellite Internet slides — common misconception',
    tags: ['generated', 'RTT', 'short flow'],
  }, `${transferMs} ms`, [`${rtt} s`, `${round(transferMs * 2, 0)} ms`, `${round(sizeKb * 8 / rate, 1)} ms`], 'gen-s-flow')
}

function satelliteLoadState(): Question {
  const cases = [
    {
      prompt: 'The buffer seldom fills, demand is low, and there is no queue oscillation.',
      answer: 'Low load',
      wrong: ['High load', 'Overload', 'RF fade state'],
      exp: 'This is the low-load scenario in the slides.'
    },
    {
      prompt: 'The buffer repeatedly fills and drains within seconds; large flows suffer excessive backoff.',
      answer: 'High load',
      wrong: ['Low load', 'Overload', 'No-demand state'],
      exp: 'This is the high-load / excessive queue-oscillation scenario.'
    },
    {
      prompt: 'The buffer is permanently full; small flows below init_cwnd dominate and large flows time out.',
      answer: 'Overload',
      wrong: ['Low load', 'High load', 'Fade-margin reserve'],
      exp: 'This is the overload scenario.'
    },
  ]
  const c = pick(cases)
  return optionQuestion({
    domain: 'satellite',
    topic: 'Load regimes',
    difficulty: 'tricky',
    type: 'single',
    prompt: `Classify this bent-pipe scenario: ${c.prompt}`,
    explanation: c.exp,
    source: 'Satellite Internet slides — three types of bent pipe scenarios',
    tags: ['generated', 'load regime', 'queue oscillation'],
  }, c.answer, c.wrong, 'gen-s-load')
}

function starlinkTwoBeamCapacity(): Question {
  const bandwidth = pick([1, 2])
  const eff = 5
  const capacity = 2 * eff * bandwidth
  return optionQuestion({
    domain: 'starlink',
    topic: 'Cell capacity',
    difficulty: 'brutal',
    type: 'single',
    prompt: `Use the pre-late-2025 Gen 2 slide logic: two opposite-polarisation beams each achieve about ${eff} bits/s/Hz after sharing the EPFD allowance. If usable bandwidth were ${bandwidth} GHz, what combined cell downlink rate follows?`,
    explanation: `2 beams × ${eff} bits/s/Hz × ${bandwidth} GHz = ${capacity} Gb/s.`,
    trap: 'Spectral efficiency × bandwidth gives bit rate; keep “per beam” and “combined” separate.',
    source: 'Starlink slides — link budget consequences until 2025',
    tags: ['generated', 'capacity', 'polarisation'],
  }, `${capacity} Gb/s`, [`${eff * bandwidth} Gb/s`, `${capacity * 2} Gb/s`, `${2 * bandwidth} Gb/s`], 'gen-st-2beam')
}

function starlinkEightBeamCapacity(): Question {
  const bandwidth = pick([1, 2])
  const eff = 3
  const capacity = 8 * eff * bandwidth
  return optionQuestion({
    domain: 'starlink',
    topic: 'Late-2025 co-frequency beams',
    difficulty: 'brutal',
    type: 'single',
    prompt: `Under the late-2025 slide calculation, eight co-frequency beams each deliver about ${eff} bits/s/Hz after the EPFD power split. Across ${bandwidth} GHz, what combined maximum rate is implied?`,
    explanation: `8 × ${eff} bits/s/Hz = 24 bits/s/Hz combined. Across ${bandwidth} GHz, this is ${capacity} Gb/s.`,
    trap: 'Eight beams are not eight copies of the old per-cell capacity because per-beam power is lower.',
    source: 'Starlink slides — late 2025 link budget',
    tags: ['generated', '8 beams', '48 Gb/s', 'EPFD'],
  }, `${capacity} Gb/s`, [`${20 * bandwidth} Gb/s`, `${8 * bandwidth} Gb/s`, `${eff * bandwidth} Gb/s`], 'gen-st-8beam')
}

function starlinkPowerSplit(): Question {
  return optionQuestion({
    domain: 'starlink',
    topic: 'EPFD',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Compared with the earlier TWO-beam same-frequency case, the late-2025 example uses EIGHT beams under the same aggregate EPFD limit. Approximately how much lower is the allowed power PER BEAM?',
    explanation: 'Eight beams are four times as many as two beams. Per-beam power becomes one quarter, which is about -6 dB.',
    trap: 'Compare 8 beams with the earlier 2-beam baseline: the factor is 4, not 8.',
    source: 'Starlink slides — late 2025 link budget',
    tags: ['generated', 'EPFD', 'power split'],
  }, '-6 dB', ['-3 dB', '-8 dB', '-9 dB'], 'gen-st-power')
}

function starlinkVisibleUsable(): Question {
  const reason = pick([
    'the satellite has no beam available because its beam resources are occupied elsewhere',
    'the cell cannot accept the beam without violating spectrum/EPFD constraints',
    'geostationary arc protection disqualifies the geometry',
  ])
  return optionQuestion({
    domain: 'starlink',
    topic: 'Visible vs usable satellites',
    difficulty: 'brutal',
    type: 'single',
    prompt: `A satellite is 40° above the horizon from Dishy, but ${reason}. Which classification is correct?`,
    explanation: 'It clears the 25° visibility threshold, but another eligibility constraint makes it unusable.',
    trap: 'Visible is necessary in this model, but not sufficient for usable.',
    source: 'Starlink slides — visible vs usable satellites',
    tags: ['generated', 'visible', 'usable'],
  }, 'Visible but not usable', ['Usable because elevation alone decides', 'Not visible and not usable', 'Guaranteed usable if Ku band is enabled'], 'gen-st-visible')
}

function tcpHandshake(): Question {
  const clientIsn = pick([1000, 2400, 7000, 12000])
  const serverIsn = pick([5000, 9000, 15000, 30000])
  const askServer = Math.random() < 0.5
  const correct = askServer ? clientIsn + 1 : serverIsn + 1
  return optionQuestion({
    domain: 'tcp',
    topic: 'Three-way handshake',
    difficulty: 'tricky',
    type: 'single',
    prompt: askServer
      ? `A TCP client sends SYN with ISN ${clientIsn}. What ACK number should the server place in its SYN-ACK?`
      : `A TCP server sends SYN-ACK with ISN ${serverIsn}. What ACK number should the client place in the third handshake packet?`,
    explanation: `A SYN consumes one sequence number for handshake acknowledgment, so the correct ACK is ISN + 1 = ${correct}.`,
    trap: 'During the handshake, SYN advances the acknowledged sequence space even without application payload.',
    source: 'TCP Fundamentals — three-way handshake',
    tags: ['generated', 'TCP', 'handshake', 'ISN'],
  }, String(correct), [String(correct - 1), String(correct + 1), '0'], 'gen-tcp-handshake')
}

function tcpSequenceAck(): Question {
  const seq = pick([1001, 5000, 12000, 28501])
  const bytes = pick([500, 800, 1000, 1500])
  const ack = seq + bytes
  return optionQuestion({
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'tricky',
    type: 'single',
    prompt: `A TCP segment starts at Sequence Number ${seq} and carries ${bytes} bytes, all received contiguously. What cumulative ACK number should the receiver return?`,
    explanation: `The payload covers bytes ${seq} through ${ack - 1}. TCP ACK is the next expected byte, so ACK = ${ack}.`,
    trap: 'ACK means next expected byte, not last byte received.',
    source: 'TCP Fundamentals — byte-level sequencing',
    tags: ['generated', 'TCP', 'SEQ', 'ACK'],
  }, String(ack), [String(ack - 1), String(seq + 1), String(bytes)], 'gen-tcp-ack')
}

function tcpWindow(): Question {
  const awnd = pick([16, 32, 64, 128])
  const cwnd = pick([8, 16, 32, 64].filter((value) => value !== awnd))
  const result = Math.min(awnd, cwnd)
  return optionQuestion({
    domain: 'tcp',
    topic: 'Transmission window',
    difficulty: 'brutal',
    type: 'single',
    prompt: `A TCP receiver advertises ${awnd} KB of available window and the sender has cwnd = ${cwnd} KB. Ignoring a smaller amount of application data, what is the maximum unacknowledged data allowed in flight?`,
    explanation: `The effective transmission window is constrained by the smaller receiver-flow-control and sender-congestion-control limits: min(${awnd}, ${cwnd}) = ${result} KB.`,
    trap: 'Advertised window and cwnd constrain different resources, but the smaller one limits in-flight data.',
    source: 'TCP Fundamentals — effective transmission window',
    tags: ['generated', 'TCP', 'cwnd', 'advertised window'],
  }, `${result} KB`, [`${Math.max(awnd, cwnd)} KB`, `${awnd + cwnd} KB`, `${Math.max(1, Math.round(result / 2))} KB`], 'gen-tcp-window')
}

function tcpSlowStart(): Question {
  const initial = pick([5, 10, 12])
  const rtts = pick([1, 2, 3])
  const result = initial * Math.pow(2, rtts)
  return optionQuestion({
    domain: 'tcp',
    topic: 'Slow start and AIMD',
    difficulty: 'brutal',
    type: 'single',
    prompt: `Assume lossless TCP Slow Start and enough data/receive window. cwnd begins at ${initial} packets. Using the recap approximation that cwnd doubles per RTT, what is cwnd after ${rtts} RTT${rtts > 1 ? 's' : ''}?`,
    explanation: `Slow Start approximately doubles cwnd each lossless RTT: ${initial} × 2^${rtts} = ${result} packets.`,
    trap: '“+1 per ACK” produces exponential per-RTT growth because more cwnd creates more ACKs.',
    source: 'TCP quick re-cap — Slow Start',
    tags: ['generated', 'TCP', 'slow start', 'cwnd'],
  }, `${result} packets`, [`${initial + rtts} packets`, `${initial * rtts} packets`, `${result + initial} packets`], 'gen-tcp-slowstart')
}

export function generateQuestion(domain: Domain, difficulty: Difficulty): Question {
  const byDomain: Record<Domain, Array<() => Question>> = {
    wireless: [wirelessDb, wirelessLinkBudget, wirelessCombinedChange, wirelessDistance],
    satellite: [satelliteBdp, satelliteSmallVsLarge, satelliteLoadState],
    starlink: [starlinkTwoBeamCapacity, starlinkEightBeamCapacity, starlinkPowerSplit, starlinkVisibleUsable],
    tcp: [tcpHandshake, tcpSequenceAck, tcpWindow, tcpSlowStart],
  }
  const eligible = byDomain[domain].filter((factory) => {
    const sample = factory()
    const rank: Record<Difficulty, number> = { core: 0, tricky: 1, brutal: 2 }
    return rank[sample.difficulty] <= rank[difficulty]
  })
  return pick(eligible.length ? eligible : byDomain[domain])()
}
