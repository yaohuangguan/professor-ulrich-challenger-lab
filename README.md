# Professor Ulrich Challenger Lab

A focused COMPSCI 742 exam trainer built around four knowledge areas and the course's X/Y/Z → A–E question style.

Production: https://compsci742-trap-lab.pages.dev/

Repository: https://github.com/yaohuangguan/professor-ulrich-challenger-lab

## Coverage

- **Wireless** — dB/dBm/dBW, antennas, Friis/path loss, thermal noise, interference/fading, Shannon-Hartley, QAM/SNR, link budgets and fade margin.
- **Satellite Internet** — GEO/MEO/LEO service models, satellite bands, pointing/link budgets, BDP, TCP queue oscillation, load regimes and diagnosis.
- **Starlink** — Dishy/phased arrays, H3 cells, beams and reuse, visible vs usable satellites, GEO arc protection, EPFD, cell capacity, user-density management, laser ISLs, routing and CDN implications.
- **TCP** — ports/header fields, SEQ/ACK arithmetic, three-way handshake, retransmission, duplicate ACKs, SACK, advertised window, cwnd, transmission windows, Slow Start, AIMD and TCP flavours.

## Training design

The goal is transfer, not memorisation.

- **XYZ Mode** trains three independent statements first, then maps their truth pattern to the current A–E combination scheme.
- The A–E mapping deliberately changes between the two schemes seen in the photographed test, so answer-letter shortcuts do not work.
- Curated questions cover lecture concepts and parameterised generators change numbers and combine constraints.
- **Brutal** difficulty uses qualifiers such as `only`, `must`, `will`, `need to`, `could`, `visible`, `usable`, `aggregate`, `high utilisation` and `underutilisation`.
- The bank also includes **plausible technical nonsense**: statements containing correct vocabulary but invalid causal links, category errors or conclusions unrelated to the premise.
- TCP includes chained SEQ/ACK drills, out-of-order loss + duplicate-ACK recovery, and combined application-data / advertised-window / cwnd constraints.
- 10-question mock tests prefer topic diversity.
- Attempts and weak-topic accuracy are stored locally in the browser.
- The UI can be Chinese or English while all question text and answer choices stay in English.
- Shared URLs preserve UI language with `?lang=zh` or `?lang=en`.

## Past-test evidence

Photographed Test questions are kept separate from generated variants. Exact wording is preserved where available; missing wording is not invented.

When adding another real test question, preserve:

1. exact qualifiers and modality;
2. the X/Y/Z statements;
3. the exact A–E combination mapping;
4. verified answer evidence when available;
5. why each tempting distractor is wrong;
6. whether the distractor is a calculation error, necessity/sufficiency error, category error, causal error, or plausible technical nonsense.

## Source structure

```
src/
  app.tsx
  data/
    wireless.ts
    wirelessextra.ts
    satellite.ts
    satelliteextra.ts
    starlink.ts
    starlinkextra.ts
    tcp.ts
    professor.ts
    professorgenerators.ts
    generators.ts
    examevidence.ts
    bank.ts
  styles.css
  types.ts
```

The app contains self-authored training questions derived from supplied course material and photographed test questions. It does not ship the original lecture files.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deployment

```bash
npm run build
wrangler pages deploy dist --project-name compsci742-trap-lab --branch main
```
