import type { Question } from '../types'

export const tcpQuestions: Question[] = [
  {
    id: 'tcp-overview-1',
    domain: 'tcp',
    topic: 'TCP overview',
    difficulty: 'core',
    type: 'single',
    prompt: 'Which description best matches TCP in the supplied revision material?',
    options: [
      'A reliable, connection-oriented, ordered byte stream at the transport layer',
      'A connectionless best-effort datagram service at the network layer',
      'A protocol that guarantees application data will arrive on time',
      'A routing protocol used by IP routers'
    ],
    answers: [0],
    explanation: 'The material describes TCP as a Transport Layer protocol providing a reliable, connection-oriented, ordered byte stream. It explicitly says TCP is not a protocol capable of delivering data on time.',
    source: 'TCP Fundamentals + TCP quick re-cap — overview',
    tags: ['TCP', 'transport layer', 'reliability']
  },
  {
    id: 'tcp-bidirectional',
    domain: 'tcp',
    topic: 'TCP overview',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Which statement about a TCP connection is correct?',
    options: [
      'It is bi-directional: both endpoints may send data',
      'Only the client may send payload after the handshake',
      'Only the server may acknowledge',
      'It becomes unidirectional once ACK is set'
    ],
    answers: [0],
    explanation: 'The recap explicitly describes TCP as bi-directional: both sides can send data to each other.',
    source: 'TCP quick re-cap — overview',
    tags: ['bidirectional', 'connection']
  },
  {
    id: 'tcp-port-purpose',
    domain: 'tcp',
    topic: 'Ports and header fields',
    difficulty: 'core',
    type: 'single',
    prompt: 'What is the main role of TCP source and destination port numbers?',
    options: [
      'Identify the sending and receiving application processes/sockets',
      'Identify the physical network interfaces',
      'Replace IP addresses for routing between hosts',
      'Measure the current congestion window'
    ],
    answers: [0],
    explanation: 'IP addresses identify hosts; TCP ports identify the application process/socket at each endpoint.',
    source: 'TCP Fundamentals — TCP header and port identification',
    tags: ['ports', 'applications']
  },
  {
    id: 'tcp-port-ranges',
    domain: 'tcp',
    topic: 'Ports and header fields',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'Which port-range statements match the supplied study guide? Select ALL that apply.',
    options: [
      'Well-known ports: 0–1023',
      'Registered ports: 1024–49151',
      'Dynamic/ephemeral ports: 49152–65535',
      'HTTPS normally uses port 22'
    ],
    answers: [0, 1, 2],
    explanation: 'The guide lists those three ranges. HTTPS is given as port 443; SSH is 22.',
    source: 'TCP Fundamentals — port numbers and application addressing',
    tags: ['ports', 'ranges']
  },
  {
    id: 'tcp-seq-field',
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'core',
    type: 'single',
    prompt: 'During normal TCP data transfer, what does the Sequence Number field identify?',
    options: [
      'The sequence number of the first data byte in this segment',
      'The final byte in the entire connection',
      'The number of packets sent so far',
      'The next byte expected from the other endpoint'
    ],
    answers: [0],
    explanation: 'The sequence number refers to the first payload byte carried by the segment. The acknowledgment number instead refers to the next byte expected from the other side.',
    source: 'TCP Fundamentals + TCP quick re-cap — packet structure',
    tags: ['SEQ', 'byte stream']
  },
  {
    id: 'tcp-ack-field',
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'core',
    type: 'single',
    prompt: 'What does a TCP Acknowledgment Number normally mean?',
    options: [
      'The next sequence number/byte the receiver expects from the other side',
      'The last sequence number the sender transmitted',
      'The number of bytes currently in the router queue',
      'The sender’s congestion window'
    ],
    answers: [0],
    explanation: 'TCP uses cumulative acknowledgment semantics: the ACK number indicates the next byte expected.',
    source: 'TCP Fundamentals — cumulative acknowledgment',
    tags: ['ACK', 'cumulative ACK']
  },
  {
    id: 'tcp-handshake-1',
    domain: 'tcp',
    topic: 'Three-way handshake',
    difficulty: 'core',
    type: 'single',
    prompt: 'A client starts a TCP connection with ISN 1000. What ACK number should the server place in its SYN-ACK?',
    options: ['1000', '1001', '999', '0'],
    answers: [1],
    explanation: 'A SYN consumes one sequence number for acknowledgment purposes, so the server acknowledges the client SYN with ISN + 1 = 1001.',
    source: 'TCP Fundamentals — three-way handshake',
    tags: ['SYN', 'ACK', 'ISN']
  },
  {
    id: 'tcp-handshake-2',
    domain: 'tcp',
    topic: 'Three-way handshake',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Client ISN = 1000 and server ISN = 5000. Which fields belong in the client’s third handshake segment?',
    options: [
      'SYN=0, ACK=1, SEQ=1001, ACK number=5001',
      'SYN=1, ACK=0, SEQ=1000, ACK number=0',
      'SYN=1, ACK=1, SEQ=5000, ACK number=1001',
      'SYN=0, ACK=0, SEQ=1001, ACK number=5000'
    ],
    answers: [0],
    explanation: 'The third step is ACK only. The client advances its sequence number by one for its SYN and acknowledges the server SYN with server ISN + 1.',
    source: 'TCP Fundamentals — three-way handshake',
    tags: ['handshake', 'SEQ', 'ACK']
  },
  {
    id: 'tcp-syn-byte',
    domain: 'tcp',
    topic: 'Three-way handshake',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why does the ACK number advance by one for a SYN even when the SYN carries no application payload?',
    options: [
      'During connection setup, SYN is treated as consuming one sequence number',
      'Every empty TCP segment always consumes exactly one payload byte forever',
      'ACK numbers are packet counters rather than byte positions',
      'The receiver adds one because of the TCP header length'
    ],
    answers: [0],
    explanation: 'The supplied guide explicitly treats a SYN as if it consumed one byte for acknowledgment purposes during the handshake.',
    trap: 'The guide also notes this special treatment is associated with the handshake, not normal payload-free ACK packets afterward.',
    source: 'TCP Fundamentals — three-way handshake',
    tags: ['SYN', 'sequence space', 'wording']
  },
  {
    id: 'tcp-after-handshake-ack',
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'According to the supplied guide, after the handshake what is normally true of TCP packets?',
    options: [
      'The ACK flag is set, whether or not the packet also contains payload',
      'The SYN flag remains set for the whole connection',
      'The ACK field becomes meaningless',
      'Only payload-carrying packets can have ACK set'
    ],
    answers: [0],
    explanation: 'The guide explicitly notes that after the handshake every packet has the ACK flag set.',
    source: 'TCP Fundamentals — normal lossless data transfer',
    tags: ['ACK flag', 'mid-stream']
  },
  {
    id: 'tcp-data-sequence',
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'A TCP segment starts at Sequence Number 5000 and carries 800 bytes. If received contiguously, what ACK number should the receiver return?',
    options: ['5001', '5799', '5800', '800'],
    answers: [2],
    explanation: 'The segment covers bytes 5000 through 5799, so the next expected byte is 5800.',
    source: 'TCP Fundamentals — byte-level sequencing and self-assessment',
    tags: ['sequence number', 'ACK calculation']
  },
  {
    id: 'tcp-cumulative-ack',
    domain: 'tcp',
    topic: 'Sequence and ACK numbers',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'An ACK value of 150001 means:',
    options: [
      'All bytes up to and including 150000 have been received contiguously',
      'Exactly one packet numbered 150001 has been received',
      '150001 bytes remain in the receive buffer',
      'The sender may now transmit exactly 150001 packets'
    ],
    answers: [0],
    explanation: 'TCP ACKs are cumulative in the supplied material: ACK 150001 means the receiver next needs byte 150001.',
    source: 'TCP Fundamentals — cumulative acknowledgment',
    tags: ['cumulative ACK']
  },
  {
    id: 'tcp-out-of-order',
    domain: 'tcp',
    topic: 'Loss recovery',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'The receiver is waiting for byte 28501 but receives a later out-of-order segment instead. What ACK behaviour is described in the guide?',
    options: [
      'Repeat ACK 28501 for the last contiguous position',
      'ACK the end of the out-of-order segment as if nothing were missing',
      'Set ACK to zero until the gap is filled',
      'Immediately close the connection with FIN'
    ],
    answers: [0],
    explanation: 'The receiver repeats the ACK for the next byte it still needs. Repeated identical ACKs provide evidence of a missing segment.',
    source: 'TCP Fundamentals — fast retransmit via duplicate ACKs',
    tags: ['duplicate ACK', 'out of order']
  },
  {
    id: 'tcp-rto',
    domain: 'tcp',
    topic: 'Loss recovery',
    difficulty: 'core',
    type: 'single',
    prompt: 'What triggers a TCP retransmission timeout (RTO) retransmission in the supplied guide?',
    options: [
      'An ACK covering the sequence number fails to arrive before the timer expires',
      'The receiver advertises a larger window',
      'The sender receives any ACK at all',
      'The application writes more data into the transmit buffer'
    ],
    answers: [0],
    explanation: 'The sender starts a retransmission timer based on estimated RTT. If an ACK covering the data does not arrive before expiry, the segment is retransmitted.',
    source: 'TCP Fundamentals — retransmission timeouts',
    tags: ['RTO', 'retransmission']
  },
  {
    id: 'tcp-fast-retransmit',
    domain: 'tcp',
    topic: 'Loss recovery',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What is the purpose of duplicate ACKs in the loss-recovery explanation?',
    options: [
      'They can let the sender infer a gap and retransmit without waiting for the RTO',
      'They increase the advertised receive window',
      'They prove every later packet is corrupted',
      'They reset both sequence numbers to zero'
    ],
    answers: [0],
    explanation: 'Repeated ACKs for the same next-needed byte signal a likely missing segment and can trigger fast retransmit sooner than an RTO.',
    source: 'TCP Fundamentals + TCP quick re-cap — duplicate ACKs',
    tags: ['fast retransmit', 'duplicate ACK']
  },
  {
    id: 'tcp-sack',
    domain: 'tcp',
    topic: 'Loss recovery',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What capability does SACK add according to the recap slides?',
    options: [
      'Selective acknowledgment of multiple received ranges despite gaps',
      'A guarantee of zero packet loss',
      'A fixed congestion window of ten packets',
      'A replacement for sequence numbers'
    ],
    answers: [0],
    explanation: 'The recap notes that TCP options can provide SACK so the receiver can selectively acknowledge multiple data ranges with gaps.',
    source: 'TCP quick re-cap — ACK timeouts and retransmissions',
    tags: ['SACK', 'loss recovery']
  },
  {
    id: 'tcp-advertised-window',
    domain: 'tcp',
    topic: 'Flow control',
    difficulty: 'core',
    type: 'single',
    prompt: 'What does the advertised window communicate?',
    options: [
      'How much receive-buffer space the receiving host currently has available',
      'How many routers are on the path',
      'The sender’s estimate of network congestion',
      'The current retransmission timeout'
    ],
    answers: [0],
    explanation: 'The receiver advertises available receive-buffer space to prevent a fast sender from overwhelming it.',
    source: 'TCP Fundamentals + TCP quick re-cap — advertised window',
    tags: ['advertised window', 'flow control']
  },
  {
    id: 'tcp-zero-window',
    domain: 'tcp',
    topic: 'Flow control',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What should the sender do if the receiver advertises a window of 0?',
    options: [
      'Stop sending data until a non-zero window update is received',
      'Double cwnd immediately',
      'Ignore the receiver and continue at line rate',
      'Reset the TCP connection automatically'
    ],
    answers: [0],
    explanation: 'The guide states that a zero advertised window means the sender must stop transmitting data until the receiver later advertises non-zero space.',
    source: 'TCP Fundamentals — advertised window and flow control',
    tags: ['zero window', 'flow control']
  },
  {
    id: 'tcp-window-stale',
    domain: 'tcp',
    topic: 'Flow control',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Why may an advertised-window value be stale by the time the remote sender receives it? Select ALL that apply.',
    options: [
      'The receiving application may have read data and freed buffer space',
      'Packets already in flight may since have arrived and consumed buffer space',
      'Advertised window values never change',
      'The sender necessarily knows the exact remote buffer state in real time'
    ],
    answers: [0, 1],
    explanation: 'The guide gives both reasons: the app may free space after the value was computed, and packets in flight may arrive afterward and consume space.',
    source: 'TCP Fundamentals — advertised window and flow control',
    tags: ['advertised window', 'staleness', 'in flight']
  },
  {
    id: 'tcp-flow-vs-congestion',
    domain: 'tcp',
    topic: 'Flow vs congestion control',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Which distinction best matches the supplied material?',
    options: [
      'Flow control protects the receiver; congestion control protects the network path',
      'Flow control protects routers; congestion control protects the receiver buffer',
      'Both are just two names for the advertised window',
      'Neither affects how much data can be in flight'
    ],
    answers: [0],
    explanation: 'The guide distinguishes receiver protection through advertised window from network congestion control through cwnd.',
    source: 'TCP Fundamentals — advertised window and congestion window',
    tags: ['flow control', 'congestion control']
  },
  {
    id: 'tcp-effective-window',
    domain: 'tcp',
    topic: 'Transmission window',
    difficulty: 'core',
    type: 'single',
    prompt: 'Advertised Window = 64 KB and cwnd = 16 KB. Ignoring any smaller amount of application data available, what is the maximum unacknowledged data permitted in flight?',
    options: ['16 KB', '64 KB', '80 KB', '4 KB'],
    answers: [0],
    explanation: 'The guide gives the effective transmission window as the minimum of the estimated advertised window and congestion window. min(64 KB, 16 KB) = 16 KB.',
    source: 'TCP Fundamentals — effective transmission window',
    tags: ['cwnd', 'advertised window', 'min']
  },
  {
    id: 'tcp-window-data-available',
    domain: 'tcp',
    topic: 'Transmission window',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'The recap slides list three practical constraints on how much a sender can send before waiting for ACKs. Which is NOT one of them?',
    options: [
      'Amount of application data available to send',
      'The other side’s advertised window',
      'The sender’s congestion window',
      'The Ethernet MAC address of the receiver'
    ],
    answers: [3],
    explanation: 'The recap includes data available, advertised window, and cwnd as the relevant constraints.',
    source: 'TCP quick re-cap — sender transmit window',
    tags: ['transmit window', 'constraints']
  },
  {
    id: 'tcp-cwnd',
    domain: 'tcp',
    topic: 'Congestion control',
    difficulty: 'core',
    type: 'single',
    prompt: 'What is cwnd in the supplied TCP material?',
    options: [
      'A sender-side congestion-control variable limiting unacknowledged data in flight',
      'The receive buffer size stored only at the receiver',
      'The destination TCP port',
      'The time between SYN and SYN-ACK'
    ],
    answers: [0],
    explanation: 'cwnd is maintained by each TCP sender and estimates how much the network path can currently tolerate.',
    source: 'TCP Fundamentals + TCP quick re-cap — congestion window',
    tags: ['cwnd', 'sender side']
  },
  {
    id: 'tcp-cwnd-signals',
    domain: 'tcp',
    topic: 'Congestion control',
    difficulty: 'tricky',
    type: 'multi',
    prompt: 'Which statements match the recap’s basic cwnd behaviour? Select ALL that apply.',
    options: [
      'ACKs are used to grow cwnd',
      'Timeouts or multiple losses cause cwnd to shrink',
      'cwnd is a fixed constant for the lifetime of a connection',
      'cwnd is maintained by the receiver only'
    ],
    answers: [0, 1],
    explanation: 'The recap says senders grow cwnd with ACKs and shrink it on timeout/multiple losses.',
    source: 'TCP quick re-cap — congestion window',
    tags: ['cwnd', 'ACK', 'loss']
  },
  {
    id: 'tcp-bdp-goal',
    domain: 'tcp',
    topic: 'Congestion control',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What goal for cwnd is stated in the recap slides?',
    options: [
      'Make cwnd match the currently available RTT bandwidth-delay product',
      'Make cwnd equal the TCP port number',
      'Keep cwnd permanently at one packet',
      'Make cwnd equal the receive-buffer physical address'
    ],
    answers: [0],
    explanation: 'The recap explicitly states the congestion-control goal as matching cwnd to the currently available BDP, while noting that the available BDP changes and is not directly known.',
    source: 'TCP quick re-cap — managing cwnd',
    tags: ['BDP', 'cwnd']
  },
  {
    id: 'tcp-initial-cwnd',
    domain: 'tcp',
    topic: 'Slow start and AIMD',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What initial cwnd value does the recap say is typical “these days”?',
    options: ['1 packet', '4 packets', '10 packets', '100 packets'],
    answers: [2],
    explanation: 'The recap gives an example typical initial cwnd of 10.',
    source: 'TCP quick re-cap — managing cwnd',
    tags: ['initial cwnd', '10']
  },
  {
    id: 'tcp-slow-start',
    domain: 'tcp',
    topic: 'Slow start and AIMD',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Why is TCP Slow Start not actually “slow” in the recap slides?',
    options: [
      'Increasing cwnd by 1 for each ACK makes cwnd roughly double per lossless RTT',
      'It instantly sets cwnd to infinity',
      'It disables acknowledgments',
      'It uses a fixed linear +1 packet per hour'
    ],
    answers: [0],
    explanation: 'The recap describes exponential growth: e.g. 10, 20, 40, 80 packets across successive RTTs if all goes well.',
    trap: '“Increase by 1 per ACK” sounds linear until you remember that a larger cwnd produces more ACKs per RTT.',
    source: 'TCP quick re-cap — Slow Start',
    tags: ['slow start', 'exponential growth']
  },
  {
    id: 'tcp-ssthresh',
    domain: 'tcp',
    topic: 'Slow start and AIMD',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What role does ssthresh play in the recap?',
    options: [
      'Slow Start grows up to ssthresh or until loss, then congestion avoidance is used',
      'It is the destination port of the server',
      'It is the receive buffer pointer for the last byte read by the app',
      'It is always equal to zero'
    ],
    answers: [0],
    explanation: 'The recap says Slow Start runs only up to the slow-start threshold (ssthresh) or until loss occurs.',
    source: 'TCP quick re-cap — Slow Start',
    tags: ['ssthresh', 'congestion avoidance']
  },
  {
    id: 'tcp-aimd',
    domain: 'tcp',
    topic: 'Slow start and AIMD',
    difficulty: 'brutal',
    type: 'single',
    prompt: 'Which description best matches AIMD in the supplied recap?',
    options: [
      'Congestion avoidance grows cwnd roughly linearly, while loss triggers a multiplicative decrease',
      'cwnd doubles forever with no response to loss',
      'cwnd is controlled only by the advertised window',
      'AIMD is a port-allocation algorithm'
    ],
    answers: [0],
    explanation: 'The recap describes additive increase during congestion avoidance and multiplicative decrease after loss, with example reduction factors such as 0.7 or 0.5.',
    source: 'TCP quick re-cap — AIMD',
    tags: ['AIMD', 'congestion avoidance']
  },
  {
    id: 'tcp-bottleneck-drop',
    domain: 'tcp',
    topic: 'Congestion control',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'What happens in the simple bottleneck model when TCP senders inject more traffic than the bottleneck can carry?',
    options: [
      'The bottleneck queue fills and excess packets can be tail-dropped',
      'The path loss automatically decreases',
      'The receiver’s port number changes',
      'Every packet is guaranteed delivery without retransmission'
    ],
    answers: [0],
    explanation: 'The recap uses a simple FIFO queue with tail drops as the basic congestion example.',
    source: 'TCP quick re-cap — congestion control',
    tags: ['bottleneck', 'tail drop']
  },
  {
    id: 'tcp-flavours-purpose',
    domain: 'tcp',
    topic: 'TCP flavours',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'According to the supplied material, TCP “flavours” mainly differ in how they:',
    options: [
      'Estimate and adjust congestion-control behaviour such as cwnd',
      'Change the IP address format',
      'Remove sequence numbers from TCP',
      'Assign Ethernet MAC addresses'
    ],
    answers: [0],
    explanation: 'The guide says different TCP implementations primarily differ in how they dynamically estimate and adjust cwnd/congestion-control behaviour.',
    source: 'TCP Fundamentals — TCP flavours',
    tags: ['TCP flavours', 'cwnd']
  },
  {
    id: 'tcp-flavours-names',
    domain: 'tcp',
    topic: 'TCP flavours',
    difficulty: 'brutal',
    type: 'multi',
    prompt: 'Which flavour descriptions are stated in the recap slides? Select ALL that apply.',
    options: [
      'Hybla: optimised for high-latency links such as satellite',
      'CUBIC: current Linux default in the supplied recap',
      'Compound TCP: used in Windows',
      'BBR: estimates BDP using amount of data acknowledged during the last RTT',
      'Reno/NewReno: a satellite frequency band'
    ],
    answers: [0, 1, 2, 3],
    explanation: 'The recap lists Hybla, CUBIC, Compound TCP and BBR with those properties. Reno/NewReno is a TCP flavour, not a frequency band.',
    source: 'TCP quick re-cap — famous TCP flavours',
    tags: ['Hybla', 'CUBIC', 'BBR', 'Compound TCP']
  },
  {
    id: 'tcp-flavours-interoperate',
    domain: 'tcp',
    topic: 'TCP flavours',
    difficulty: 'tricky',
    type: 'single',
    prompt: 'Can the two endpoints of one TCP connection use different TCP flavours according to the recap?',
    options: [
      'Yes, different flavours are usually interoperable',
      'No, both sides must run byte-identical congestion-control code',
      'Only if both endpoints use the same operating system',
      'Only on GEO satellite links'
    ],
    answers: [0],
    explanation: 'The recap explicitly notes that different TCP flavours are usually interoperable.',
    source: 'TCP quick re-cap — TCP flavours',
    tags: ['interoperability', 'TCP flavours']
  }
]
