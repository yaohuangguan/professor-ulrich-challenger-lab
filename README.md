# 742 Trap Lab

A focused COMPSCI 742 exam trainer for three domains:

- **Wireless** — dB/dBm/dBW, antennas, Friis/path loss, thermal noise, interference/fading, Shannon-Hartley, QAM/SNR, link budgets and fade margin.
- **Satellite Internet** — GEO/MEO/LEO service models, satellite bands, pointing/link budgets, BDP, TCP queue oscillation, load regimes and diagnosis.
- **Starlink** — Dishy/phased arrays, H3 cells, beams and reuse, visible vs usable satellites, GEO arc protection, EPFD, pre-/post-late-2025 cell capacity, user-density management, laser ISLs, routing and CDN implications.

Production: https://compsci742-trap-lab.pages.dev/

## Training design

The goal is transfer, not memorisation.

- Curated questions cover lecture concepts.
- Parameterised generators change numbers and combine constraints.
- **Brutal** difficulty deliberately uses wording traps such as `only`, `must`, `will`, `need to`, `visible`, `usable`, `aggregate`, `high utilisation` and `underutilisation`.
- 10-question mock tests prefer topic diversity.
- Attempts and weak-topic accuracy are stored locally in the browser.
- A separate **past-test evidence layer** holds only question patterns that can be reconstructed with confidence. Missing original wording is never invented.

## Source structure

```
src/
  app.tsx
  data/
    wireless.ts
    satellite.ts
    starlink.ts
    generators.ts
    examevidence.ts
    bank.ts
  styles.css
  types.ts
```

The app contains self-authored training questions derived from the supplied lecture material; it does not ship the original PPT files.

## Add exact Test 1 / Test 2 questions

Put faithfully transcribed questions in `src/data/examevidence.ts`. Preserve:

1. exact qualifiers (`only`, `must`, `will`, `need to`);
2. whether the prompt asks for input, output, consequence, necessity, or sufficiency;
3. all X/Y/Z statements and combination-answer mapping;
4. the user's selected answer and official/verified answer when available;
5. a short explanation of why each tempting distractor fails.

Then add one or more generated variants to `src/data/generators.ts` if the pattern is reusable.

## Development

```bash
npm install
npm run dev
npm run build
```

Deployment is currently manual via Cloudflare Pages:

```bash
npm run build
wrangler pages deploy dist --project-name compsci742-trap-lab --branch main
```
