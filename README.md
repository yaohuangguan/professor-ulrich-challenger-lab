# Professor Ulrich Challenger Lab

A focused COMPSCI 742 exam trainer built around four knowledge areas and the course's X/Y/Z → A–E question style.

Production: https://compsci742-trap-lab.pages.dev/

Repository: https://github.com/yaohuangguan/professor-ulrich-challenger-lab

## Original photographed Test papers

The **Past Exams** section at the top replays two complete photographed paper versions **in the printed order**, with original English prompts, A–E option ordering, X/Y/Z statements, bilingual reasoning and mistake traps:

| Paper | Version | Questions | Deep link |
| --- | --- | ---: | --- |
| Test 1 — Wireless | 5239 | 10 | [Replay 5239](https://compsci742-trap-lab.pages.dev/?lang=zh&exam=5239) |
| Test 2 — Satellite | 8246 | 5 | [Replay 8246](https://compsci742-trap-lab.pages.dev/?lang=zh&exam=8246) |

- The original questions live in `src/data/pastexams.ts`; reconstructed variants still live in `src/data/examevidence.ts`.
- **Original-paper replay is deterministic**, unlike generated practice/mocks. It tracks answers, advances through all 10 or 5 questions and shows the final score; previously saved browser attempts are preserved.
- Answer keys were **independently calculated**, not copied from official marking feedback. In particular, satellite TCP queue-oscillation/overload questions use the class model and must not be mistaken for officially confirmed answers.
- Question explanations and trap audits switch between Chinese/English with the interface; the exam text and options stay English.
- Question IDs encode paper and index (e.g. `past-8246-q04`). Link query parameter `?exam=8246` opens the corresponding paper directly, including after refresh.
- Use `npm test` to check 15 question IDs, answer keys, link-budget calculations, bilingual feedback and X/Y/Z answer mapping.

## Skip and same-topic variants

The answer toolbar has separate **Skip** and **Variant** actions (Chinese: 跳过 / 变式).

- **Skip** advances to a new practice question or to the next question of a mock/original paper without awarding a point. Skipping the last exam question finishes that paper.
- **Variant** opens a question on the **same topic**. When the question originated in a mock or original paper, its slot, answer selection, and score are preserved until **Return to original**. Variant answers never add to the exam score.
- Original exam questions are excluded from variant selection so no later original-paper questions are leaked prematurely.
- After answering any question, you can open another variant without changing your original-paper result.

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
    pastexams.ts
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
npm test
```

## Deployment

```bash
npm run build
wrangler pages deploy dist --project-name compsci742-trap-lab --branch main
```
