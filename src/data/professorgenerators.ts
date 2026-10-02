import type { Difficulty, Domain, Question } from '../types'
import { pairOptions, singletonOptions } from './professor'

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]
const coin = () => Math.random() < 0.5

function combination(truth: boolean[]) {
  const usePairScheme = coin()
  const count = truth.filter(Boolean).length

  if (!usePairScheme) {
    const answer = count === 0 ? 3 : count === 1 ? truth.findIndex(Boolean) : 4
    return { options: singletonOptions, answer, scheme: 'singletons' }
  }

  let answer = 4
  if (count === 3) answer = 3
  else if (count === 2) {
    if (truth[0] && truth[1]) answer = 0
    else if (truth[0] && truth[2]) answer = 1
    else answer = 2
  }
  return { options: pairOptions, answer, scheme: 'pairs' }
}

function xyzQuestion(
  base: Omit<Question, 'id' | 'options' | 'answers' | 'format' | 'type'>,
  truth: boolean[],
  prefix: string,
): Question {
  const c = combination(truth)
  return {
    ...base,
    id: `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: 'single',
    format: 'professor-xyz',
    statementTruth: truth,
    options: c.options,
    answers: [c.answer],
    tags: [...base.tags, 'XYZ', 'generated', c.scheme],
  }
}

function wirelessBudgetXYZ(): Question {
  const tx = pick([20, 23, 26, 30])
  const txLine = pick([1, 2, 3])
  const txGain = pick([10, 16, 23, 29])
  const pathLoss = pick([100, 110, 120, 130])
  const rxGain = pick([3, 8, 16])
  const rxLine = pick([1, 2, 3])
  const noise = pick([-105, -100, -95])
  const req = pick([12, 18, 25])
  const rx = tx - txLine + txGain - pathLoss + rxGain - rxLine
  const required = noise + req
  const margin = rx - required

  const xTrue = coin()
  const yTrue = coin()
  const zTrue = coin()
  const xValue = xTrue ? tx - txLine : tx - txLine + pick([-3, 3, 6])
  const yValue = yTrue ? margin : margin + pick([-6, -3, 3, 6])
  const zText = zTrue
    ? 'If transmit power is increased by 4 dB and nothing else changes, the fade margin increases by 4 dB.'
    : 'If transmit power is increased by 4 dB and nothing else changes, the free-space path loss increases by 4 dB.'

  return xyzQuestion({
    domain: 'wireless',
    topic: 'Link budgets',
    difficulty: 'brutal',
    context: `TX output ${tx} dBm; TX feedline loss ${txLine} dB; TX antenna gain ${txGain} dBi; free-space path loss ${pathLoss} dB; RX antenna gain ${rxGain} dBi; RX feedline loss ${rxLine} dB; noise floor ${noise} dBm; required SNR ${req} dB.`,
    prompt: 'Which of the following statements about the link are TRUE?',
    statements: [
      `The signal level going into the transmit antenna is ${xValue} dBm.`,
      `The fade margin is ${yValue} dB.`,
      zText,
    ],
    explanation: `Received signal = ${tx} - ${txLine} + ${txGain} - ${pathLoss} + ${rxGain} - ${rxLine} = ${rx} dBm. Minimum required = ${noise} + ${req} = ${required} dBm. Fade margin = ${margin} dB. X is ${xTrue ? 'true' : 'false'}, Y is ${yTrue ? 'true' : 'false'}, and Z is ${zTrue ? 'true' : 'false'}.`,
    trap: 'Do the physics first. Only after deciding X/Y/Z independently should you decode the A–E combination.',
    source: 'Generated from Wireless link-budget slide rules',
    tags: ['link budget', 'fade margin', 'measurement point'],
  }, [xTrue, yTrue, zTrue], 'prof-gen-w-budget')
}

function wirelessWordingXYZ(): Question {
  const margin = pick([2, 3, 4, 6])
  const target = margin + pick([3, 4, 6])
  const delta = target - margin
  const truth = [false, true, false]

  return xyzQuestion({
    domain: 'wireless',
    topic: 'Combined link-budget changes',
    difficulty: 'brutal',
    context: `A link currently has ${margin} dB fade margin. The target is ${target} dB. Assume all link-budget terms remain independent.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `To reach ${target} dB fade margin, we NEED TO reduce path loss by ${delta} dB.`,
      `To reach ${target} dB fade margin, we COULD increase transmit power by ${delta} dB.`,
      `Increasing transmit power by ${delta} dB will reduce the free-space distance by ${delta} dB.`,
    ],
    explanation: `Only Y is true. A ${delta} dB improvement is needed, but path loss is not the only term that can provide it, so X's “need to” is false. Raising TX power by ${delta} dB is one sufficient method. TX power does not alter the physical distance/path loss.`,
    trap: 'NEED TO = necessary. COULD = one sufficient method. Those are not interchangeable.',
    source: 'Generated XYZ wording drill from link-budget rules',
    tags: ['need to', 'could', 'wording'],
  }, truth, 'prof-gen-w-wording')
}

function satelliteQueueXYZ(): Question {
  const regime = pick(['high load', 'overload'] as const)

  if (regime === 'high load') {
    const truth = [true, true, false]
    return xyzQuestion({
      domain: 'satellite',
      topic: 'TCP queue oscillation',
      difficulty: 'brutal',
      context: 'A MEO/GEO bent-pipe link is in the HIGH-LOAD regime: demand is high enough that the gateway queue repeatedly fills and drains.',
      prompt: 'Which of the following statements are TRUE?',
      statements: [
        'The link can alternate between queue overflow and periods of underutilisation.',
        'Long RTT delays the congestion feedback seen by remote TCP senders.',
        'The gateway buffer must remain permanently full throughout this regime.',
      ],
      explanation: 'X and Y are true. The fill/drain cycle can create both loss and idle/underutilised periods because feedback arrives late. A permanently full queue is the overload regime, so Z is false.',
      trap: 'High load is not the same as overload. The queue state over time is the distinguishing clue.',
      source: 'Generated from Satellite Internet queue-oscillation slides',
      tags: ['high load', 'underutilisation', 'feedback'],
    }, truth, 'prof-gen-s-highload')
  }

  const truth = [true, false, true]
  return xyzQuestion({
    domain: 'satellite',
    topic: 'Load regimes',
    difficulty: 'brutal',
    context: 'A MEO/GEO bent-pipe link has high packet loss, high sustained link utilisation, and ample RF fade margin.',
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      'This observation is consistent with the overload regime.',
      'The high packet loss proves that low SNR is the cause.',
      'Very small flows may still complete while large flows time out.',
    ],
    explanation: 'X and Z are true. With sufficient RF margin, high utilisation plus loss fits overload: the queue can remain full, short flows can get through, and large flows can time out. Loss alone does not prove an RF problem.',
    trap: 'Use every clue. “High loss” alone is not enough to classify the cause.',
    source: 'Generated from Satellite Internet overload/diagnosis slides',
    tags: ['overload', 'diagnosis', 'small flows'],
  }, truth, 'prof-gen-s-overload')
}

function satelliteFlowXYZ(): Question {
  const truth = [true, false, true]
  return xyzQuestion({
    domain: 'satellite',
    topic: 'Flow size / user experience',
    difficulty: 'brutal',
    prompt: 'Which of the following statements are TRUE for a long-RTT satellite Internet path?',
    statements: [
      'For a very small transfer, RTT can dominate the total completion time.',
      'Halving sustained data rate must approximately double the completion time of every transfer, regardless of size.',
      'A large file download is generally more sensitive to sustained goodput than a tiny web object.',
    ],
    explanation: 'X and Z are true. The “halving rate doubles time” intuition is mainly valid for large rate-dominated transfers, not every short RTT-dominated transfer.',
    trap: 'Watch universal words such as “every” and “regardless”.',
    source: 'Generated from Satellite Internet flow-size slides',
    tags: ['RTT', 'flow size', 'universal wording'],
  }, truth, 'prof-gen-s-flow')
}

function starlinkUsabilityXYZ(): Question {
  const elevation = pick([30, 35, 40, 55])
  const truth = [true, false, true]
  return xyzQuestion({
    domain: 'starlink',
    topic: 'Visible vs usable satellites',
    difficulty: 'brutal',
    context: `A Starlink satellite is ${elevation}° above the local horizon. The cell is also subject to normal beam, spectrum/EPFD, and geostationary-arc constraints.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      'The satellite satisfies the slide deck\'s 25° minimum-elevation visibility condition.',
      'Because it is visible, it MUST be usable by this cell.',
      'Geostationary arc protection can still disqualify this satellite from use.',
    ],
    explanation: `X and Z are true. ${elevation}° clears the 25° visibility threshold, but visibility is only one condition. GEO-arc protection and resource/spectrum constraints can still make the satellite unusable.`,
    trap: 'Visible is necessary here, but not sufficient for usable.',
    source: 'Generated from Starlink visible-vs-usable slides',
    tags: ['visible', 'usable', 'GEO arc'],
  }, truth, 'prof-gen-st-visible')
}

function starlinkCapacityXYZ(): Question {
  const truth = [true, false, true]
  return xyzQuestion({
    domain: 'starlink',
    topic: 'Late-2025 co-frequency beams',
    difficulty: 'brutal',
    prompt: 'Which of the following statements are TRUE about the late-2025 eight-co-frequency-beam example?',
    statements: [
      'The aggregate EPFD constraint still applies.',
      'Eight allowed beams mean exactly eight times the old two-beam single-cell capacity.',
      'The slide calculation gives 24 bits/s/Hz combined, or 48 Gb/s across 2 GHz.',
    ],
    explanation: 'X and Z are true. Eight beams share the aggregate EPFD allowance, so per-beam power and spectral efficiency fall. The example gives 8 × 3 = 24 bits/s/Hz, hence 48 Gb/s over 2 GHz—not 8× the old 20 Gb/s.',
    trap: '“Up to 8 beams” is a beam-count permission, not a capacity multiplier.',
    source: 'Generated from Starlink late-2025 capacity slides',
    tags: ['EPFD', '8 beams', 'capacity'],
  }, truth, 'prof-gen-st-capacity')
}

function starlinkIslXYZ(): Question {
  const truth = [true, true, false]
  return xyzQuestion({
    domain: 'starlink',
    topic: 'Laser ISLs',
    difficulty: 'brutal',
    prompt: 'Which of the following statements are TRUE about laser inter-satellite links as discussed in the slides?',
    statements: [
      'A wide-angle/fisheye receiver simplifies pointing at one end but gives an unfavourable low-gain link budget.',
      'A focused two-way optical link can support a better link budget but requires pointing hardware at both ends.',
      'The Tarawa traceroute proves that Starlink uses only in-plane optical links.',
    ],
    explanation: 'X and Y are true. The fisheye idea trades pointing simplicity for low gain; focused links improve the budget but add moving/pointing complexity. The Tarawa example instead implies cross-plane routing, so Z is false.',
    trap: 'The first two statements are a trade-off pair; the third deliberately reverses the traceroute conclusion.',
    source: 'Generated from Starlink ISL/routing slides',
    tags: ['ISL', 'gain', 'routing'],
  }, truth, 'prof-gen-st-isl')
}

function tcpHandshakeXYZ(): Question {
  const clientIsn = pick([1000, 2400, 7000])
  const serverIsn = pick([5000, 9000, 15000])
  const truth = [true, true, false]
  return xyzQuestion({
    domain: 'tcp',
    topic: 'Three-way handshake',
    difficulty: 'brutal',
    context: `A TCP client chooses ISN ${clientIsn}; the server chooses ISN ${serverIsn}.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `The server SYN-ACK should use ACK number ${clientIsn + 1}.`,
      `The client’s third handshake packet should use ACK number ${serverIsn + 1}.`,
      'The third handshake packet should still have SYN = 1.',
    ],
    explanation: 'X and Y are true. Each SYN consumes one sequence number for handshake acknowledgment. The third packet completes the handshake with ACK = 1 and SYN = 0.',
    trap: 'Judge flags and sequence-space effects separately.',
    source: 'Generated from TCP handshake material',
    tags: ['TCP', 'handshake', 'ISN'],
  }, truth, 'prof-gen-tcp-handshake')
}

function tcpAckXYZ(): Question {
  const seq = pick([1001, 5000, 12000, 28501])
  const bytes = pick([500, 800, 1000, 1500])
  const ack = seq + bytes
  const truth = [true, true, false]
  return xyzQuestion({
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'brutal',
    context: `A TCP segment starts at SEQ ${seq} and carries ${bytes} payload bytes. It is received contiguously.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `The last payload byte has sequence number ${ack - 1}.`,
      `The receiver’s cumulative ACK should be ${ack}.`,
      `An ACK of ${ack - 1} would correctly mean “all bytes through ${ack - 1} received”.`,
    ],
    explanation: `X and Y are true. TCP ACK is the next expected byte, so the correct ACK is ${ack}, not the last byte received.`,
    trap: 'ACK = next expected byte.',
    source: 'Generated from TCP byte-stream sequencing material',
    tags: ['TCP', 'SEQ', 'ACK'],
  }, truth, 'prof-gen-tcp-ack')
}

function tcpWindowXYZ(): Question {
  const awnd = pick([32, 64, 128])
  const cwnd = pick([8, 16, 32])
  const limit = Math.min(awnd, cwnd)
  const truth = [true, true, false]
  return xyzQuestion({
    domain: 'tcp',
    topic: 'Flow vs congestion control',
    difficulty: 'brutal',
    context: `The receiver advertises ${awnd} KB. The sender has cwnd = ${cwnd} KB. Assume enough application data is available.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `The maximum unacknowledged data in flight is ${limit} KB.`,
      'The advertised window protects the receiver, whereas cwnd is sender-side congestion control.',
      'If the advertised window is larger than cwnd, the sender must ignore cwnd and use the full advertised window.',
    ],
    explanation: 'X and Y are true. The smaller constraint limits in-flight data. A larger advertised window does not override a smaller cwnd.',
    trap: 'Both are “windows”, but they represent different constraints.',
    source: 'Generated from TCP flow/congestion control material',
    tags: ['TCP', 'advertised window', 'cwnd'],
  }, truth, 'prof-gen-tcp-window')
}

function tcpSlowStartXYZ(): Question {
  const truth = [true, false, true]
  return xyzQuestion({
    domain: 'tcp',
    topic: 'Slow start and AIMD',
    difficulty: 'brutal',
    prompt: 'Which of the following statements are TRUE about the supplied congestion-control recap?',
    statements: [
      'Slow Start can approximately double cwnd once per lossless RTT.',
      'AIMD means additive decrease and multiplicative increase.',
      'After loss, a multiplicative reduction of cwnd is part of the basic AIMD idea.',
    ],
    explanation: 'X and Z are true. AIMD means additive increase and multiplicative decrease, not the reverse.',
    trap: 'XYZ-style wording often flips one word in a familiar acronym expansion.',
    source: 'Generated from TCP Slow Start/AIMD recap',
    tags: ['TCP', 'Slow Start', 'AIMD'],
  }, truth, 'prof-gen-tcp-slowstart')
}

function tcpLossXYZ(): Question {
  const truth = [true, true, false]
  return xyzQuestion({
    domain: 'tcp',
    topic: 'Loss recovery',
    difficulty: 'brutal',
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      'An out-of-order segment can cause the receiver to repeat the ACK for the next missing byte.',
      'Duplicate ACKs can allow retransmission before the retransmission timer expires.',
      'Receiving an out-of-order segment means the cumulative ACK must advance past the missing gap.',
    ],
    explanation: 'X and Y are true. The cumulative ACK stays at the next missing byte until the gap is filled.',
    trap: 'Out-of-order arrival and cumulative acknowledgment are not the same thing.',
    source: 'Generated from TCP duplicate-ACK / fast-retransmit material',
    tags: ['TCP', 'duplicate ACK', 'fast retransmit'],
  }, truth, 'prof-gen-tcp-loss')
}

function tcpConversationChainXYZ(): Question {
  const clientIsn = pick([1000, 2400, 7000])
  const serverIsn = pick([5000, 9000, 15000])
  const clientBytes = pick([400, 600, 800, 1200])
  const serverBytes = pick([300, 500, 900])
  const clientNext = clientIsn + 1 + clientBytes
  const serverNext = serverIsn + 1 + serverBytes
  const truth = [true, true, false]

  return xyzQuestion({
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'brutal',
    context: `A TCP handshake completes with client ISN ${clientIsn} and server ISN ${serverIsn}. The client then sends ${clientBytes} bytes, all received. The server then sends ${serverBytes} bytes, all received.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `The server can cumulatively acknowledge the client data with ACK ${clientNext}.`,
      `The client can cumulatively acknowledge the server data with ACK ${serverNext}.`,
      `The server sending its own payload means the client’s next data SEQ resets to ${clientIsn + 1}.`,
    ],
    explanation: `X and Y are true. TCP keeps independent byte streams in each direction. The client sequence space advances to ${clientNext}; the server sequence space advances to ${serverNext}. Neither direction resets because the other side sent data.`,
    trap: 'Keep the two sequence spaces separate.',
    source: 'Generated from TCP handshake and mid-stream sequencing material',
    tags: ['TCP', 'sequence space', 'bidirectional'],
  }, truth, 'prof-gen-tcp-chain')
}

function tcpGapRecoveryXYZ(): Question {
  const base = pick([1001, 5001, 12001])
  const size = pick([400, 500, 1000])
  const missing = base + size
  const later1 = base + size * 2
  const later2 = base + size * 3
  const truth = [true, true, false]

  return xyzQuestion({
    domain: 'tcp',
    topic: 'Loss recovery',
    difficulty: 'brutal',
    context: `Four equal ${size}-byte segments start at SEQ ${base}, ${missing}, ${later1}, and ${later2}. The segment starting at ${missing} is lost; the later two arrive out of order.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `After the first segment, the next cumulative ACK can be ${missing}.`,
      `Arrival of the later out-of-order segments can produce repeated ACK ${missing} while the gap remains.`,
      `The cumulative ACK should jump to ${base + size * 4} before the missing segment is retransmitted because later bytes have already arrived.`,
    ],
    explanation: `X and Y are true. The cumulative ACK remains at the next missing byte, ${missing}, until the gap is filled. Later out-of-order arrivals can therefore create duplicate ACKs and enable retransmission before an RTO.`,
    trap: 'Cumulative ACK tracks the contiguous prefix, not the highest byte seen anywhere.',
    source: 'Generated from TCP duplicate-ACK / fast-retransmit material',
    tags: ['TCP', 'duplicate ACK', 'cumulative ACK'],
  }, truth, 'prof-gen-tcp-loss-chain')
}

function tcpCombinedWindowXYZ(): Question {
  const app = pick([8, 24, 80, 128])
  const awnd = pick([16, 32, 64, 128])
  const cwnd = pick([8, 16, 32, 96])
  const limit = Math.min(app, awnd, cwnd)
  const truth = [true, true, false]

  return xyzQuestion({
    domain: 'tcp',
    topic: 'Transmission window',
    difficulty: 'brutal',
    context: `The sender has ${app} KB of application data ready, the receiver advertises ${awnd} KB, and the sender’s cwnd is ${cwnd} KB.`,
    prompt: 'Which of the following statements are TRUE?',
    statements: [
      `The sender can have at most ${limit} KB of this application data unacknowledged in flight under the stated constraints.`,
      'A smaller advertised window can limit sending even if cwnd is larger.',
      'If application data is available, the sender can always transmit more than cwnd as long as the receiver buffer has space.',
    ],
    explanation: `X and Y are true. The practical send amount is constrained by data available, the receiver-advertised window, and cwnd; here the smallest value is ${limit} KB. Receiver capacity does not override a smaller congestion window.`,
    trap: 'There are three different caps here; calculate the minimum instead of focusing on one “window”.',
    source: 'Generated from TCP sender transmit-window material',
    tags: ['TCP', 'transmission window', 'advertised window', 'cwnd'],
  }, truth, 'prof-gen-tcp-three-limits')
}

export function generateProfessorQuestion(domain: Domain, difficulty: Difficulty): Question {
  const byDomain: Record<Domain, Array<() => Question>> = {
    wireless: [wirelessBudgetXYZ, wirelessWordingXYZ],
    satellite: [satelliteQueueXYZ, satelliteFlowXYZ],
    starlink: [starlinkUsabilityXYZ, starlinkCapacityXYZ, starlinkIslXYZ],
    tcp: [tcpHandshakeXYZ, tcpAckXYZ, tcpWindowXYZ, tcpSlowStartXYZ, tcpLossXYZ, tcpConversationChainXYZ, tcpGapRecoveryXYZ, tcpCombinedWindowXYZ],
  }
  const q = pick(byDomain[domain])()
  if (difficulty === 'core') q.difficulty = 'core'
  else if (difficulty === 'tricky' && q.difficulty === 'brutal') q.difficulty = 'tricky'
  return q
}
