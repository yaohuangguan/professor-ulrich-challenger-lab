import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'

// Type-only imports disappear after transpilation. Load the exact source used by Vite.
const source = readFileSync(new URL('../src/data/pastexams.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { examQuestionsFor, pastExamQuestions, pastExamMeta } = await import(
  'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
)

test('all 15 original questions are present, in printed order and split correctly', () => {
  assert.equal(pastExamQuestions.length, 15)
  assert.equal(new Set(pastExamQuestions.map((q) => q.id)).size, 15)
  for (const [version, count, domain] of [['5239', 10, 'wireless'], ['8246', 5, 'satellite']]) {
    const questions = examQuestionsFor(version)
    assert.equal(questions.length, count)
    assert.equal(pastExamMeta[version].count, count)
    questions.forEach((q, i) => {
      assert.equal(q.id, `past-${version}-q${String(i + 1).padStart(2, '0')}`)
      assert.equal(q.domain, domain)
      assert.match(q.source, new RegExp(version))
      assert.match(q.source, new RegExp(`Q${i + 1}\\b`))
    })
  }
})

test('answer key matches the independently computed values', () => {
  assert.deepEqual(examQuestionsFor('5239').map((q) => q.answers[0]), [0, 2, 3, 0, 0, 2, 3, 1, 3, 2])
  assert.deepEqual(examQuestionsFor('8246').map((q) => q.answers[0]), [2, 3, 1, 1, 0])
  assert.ok(Math.abs(10 * Math.log10(78500) - 48.95) < 0.01)
  assert.ok(Math.abs(10 ** (-38 / 10) - 0.00016) < 0.00001)
  const thermalDbm = 10 * Math.log10((1.38e-23 * 292.15 * 33000) / 0.001)
  assert.ok(Math.abs(thermalDbm - -129) < 0.5)
  assert.ok(Math.abs(-73 - 20 * Math.log10(6) + 89) < 0.5)
  assert.ok(Math.abs(20 * Math.log10(8) - 18.06) < 0.02)
  assert.equal(22 - 3 + 27 + 34 - 136 - 4, -60)
  assert.equal(-60 - (-95 + 49), -14)
  assert.equal(23 - 2 + 29 + 16 - 3 - 130, -67)
  assert.equal(-67 - (-95 + 25), 3)
  assert.ok(3 - 20 * Math.log10(3) < 0)
})

test('every original question has bilingual feedback and valid A–E mapping', () => {
  for (const q of pastExamQuestions) {
    assert.equal(q.type, 'single')
    assert.equal(q.options.length, 5)
    assert.equal(q.answers.length, 1)
    assert.ok(q.answers[0] >= 0 && q.answers[0] < 5)
    assert.ok(q.explanationZh?.length >= 35, q.id)
    assert.ok(q.explanation?.length >= 35, q.id)
    assert.ok(q.trapZh?.length > 10, q.id)
    if (q.statements) {
      assert.equal(q.format, 'professor-xyz')
      assert.equal(q.statements.length, 3)
      assert.equal(q.statementTruth.length, 3)
      const answer = q.options[q.answers[0]]
      const [x, y, z] = q.statementTruth
      const expected = !x && !y && !z
        ? 'None of X, Y and Z'
        : [x, y, z].filter(Boolean).length >= 2
          ? (x && y && z ? 'All' : x && y ? 'X and Y' : x && z ? 'X and Z' : 'Y and Z')
          : x ? 'X only' : y ? 'Y only' : 'Z only'
      // Both original mapping schemes use "None, or only one..." or "All, or two...".
      const isValid = answer.includes(expected)
        || (!x && !y && !z && answer.startsWith('None'))
        || (x && y && z && answer.startsWith('All'))
      assert.ok(isValid, `${q.id}: mapping ${answer} vs ${expected}`)
    }
  }
})
