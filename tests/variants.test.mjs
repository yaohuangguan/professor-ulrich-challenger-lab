import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { test } from 'node:test'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const bank = await vite.ssrLoadModule('/src/data/bank.ts')
await vite.close()

test('variants never reveal another photographed original and stay within the original topic', () => {
  const originals = bank.staticQuestions.filter((q) => q.id.startsWith('past-'))
  assert.equal(originals.length, 15)
  for (const q of originals) {
    const v = bank.nextVariantQuestion(q)
    assert.equal(v.topic, q.topic, q.id)
    assert.equal(v.domain, q.domain, q.id)
    assert.equal(v.id.startsWith('past-'), false, q.id)
    assert.notEqual(v.id, q.id, q.id)
    assert.ok(v.answers.length >= 1, q.id)
    assert.ok(v.answers.every((i) => i >= 0 && i < v.options.length), q.id)
  }
})

test('repeated variant generation avoids displaying the same question when siblings exist', () => {
  const source = bank.staticQuestions.find((q) => q.id === 'past-5239-q01')
  const seen = []
  for (let i = 0; i < 4; i += 1) {
    const next = bank.nextVariantQuestion(source, seen)
    assert.equal(next.topic, source.topic)
    const signature = [next.prompt, next.context ?? '', ...(next.statements ?? [])].join('|')
    assert.ok(!seen.some((q) => [q.prompt, q.context ?? '', ...(q.statements ?? [])].join('|') === signature))
    seen.push(next)
  }
})
