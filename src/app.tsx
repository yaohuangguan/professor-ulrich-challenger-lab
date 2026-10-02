import { useEffect, useMemo, useState } from 'react'
import type { Attempt, Difficulty, Domain, Question } from './types'
import {
  countByDomain,
  createMock,
  nextPracticeQuestion,
  staticQuestions,
  topicCoverage,
} from './data/bank'
import { examEvidenceQuestions } from './data/examevidence'

const domainMeta: Record<Domain, { label: string; sub: string }> = {
  wireless: { label: 'Wireless', sub: 'dB · Link budget · SNR · Shannon' },
  satellite: { label: 'Satellite', sub: 'GEO/MEO · BDP · TCP queues' },
  starlink: { label: 'Starlink', sub: 'EPFD · beams · geometry · ISLs' },
}

const difficultyMeta: Record<Difficulty, { label: string; note: string }> = {
  core: { label: 'Core', note: '先保证基础不丢分' },
  tricky: { label: 'Tricky', note: '加入 wording 与近似概念干扰项' },
  brutal: { label: 'Brutal', note: '跨知识点 + 计算 + 限定词陷阱' },
}

const trapRegex =
  /(only|must|will|need to|necessarily|always|never|input|output|visible|usable|aggregate|underutilisation|underutilization|high utilisation|high utilization|all|exactly|guarantee(?:d)?|up to)/gi

function highlightedPrompt(text: string) {
  const exactTrap = /^(only|must|will|need to|necessarily|always|never|input|output|visible|usable|aggregate|underutilisation|underutilization|high utilisation|high utilization|all|exactly|guarantee(?:d)?|up to)$/i
  return text.split(trapRegex).map((part, i) =>
    exactTrap.test(part) ? <mark key={i}>{part}</mark> : part,
  )
}

function sameAnswer(a: number[], b: number[]) {
  const aa = [...a].sort((x, y) => x - y)
  const bb = [...b].sort((x, y) => x - y)
  return aa.length === bb.length && aa.every((v, i) => v === bb[i])
}

function loadAttempts(): Attempt[] {
  try {
    return JSON.parse(localStorage.getItem('742-trap-attempts') || '[]')
  } catch {
    return []
  }
}

export default function App() {
  const [domain, setDomain] = useState<Domain>('wireless')
  const [difficulty, setDifficulty] = useState<Difficulty>('brutal')
  const [mode, setMode] = useState<'practice' | 'mock'>('practice')
  const [question, setQuestion] = useState<Question>(() =>
    nextPracticeQuestion('wireless', 'brutal'),
  )
  const [selected, setSelected] = useState<number[]>([])
  const [revealed, setRevealed] = useState(false)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const [recentIds, setRecentIds] = useState<string[]>([])
  const [attempts, setAttempts] = useState<Attempt[]>(loadAttempts)
  const [showCoverage, setShowCoverage] = useState(false)
  const [mockQuestions, setMockQuestions] = useState<Question[]>([])
  const [mockIndex, setMockIndex] = useState(0)
  const [mockScore, setMockScore] = useState(0)
  const [mockFinished, setMockFinished] = useState(false)

  useEffect(() => {
    localStorage.setItem('742-trap-attempts', JSON.stringify(attempts.slice(-1000)))
  }, [attempts])

  const currentAttempts = attempts.filter((a) => a.domain === domain)
  const accuracy = currentAttempts.length
    ? Math.round((currentAttempts.filter((a) => a.correct).length / currentAttempts.length) * 100)
    : 0

  const weakTopics = useMemo(() => {
    const map = new Map<string, { total: number; correct: number }>()
    for (const a of currentAttempts) {
      const v = map.get(a.topic) || { total: 0, correct: 0 }
      v.total += 1
      if (a.correct) v.correct += 1
      map.set(a.topic, v)
    }
    return [...map.entries()]
      .filter(([, v]) => v.total >= 1)
      .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
      .slice(0, 3)
  }, [currentAttempts])

  function resetAnswerState() {
    setSelected([])
    setRevealed(false)
    setLastCorrect(null)
  }

  function loadPractice(d = domain, level = difficulty) {
    const next = nextPracticeQuestion(d, level, recentIds)
    setQuestion(next)
    setRecentIds((prev) => [...prev.slice(-7), next.id])
    resetAnswerState()
  }

  function changeDomain(nextDomain: Domain) {
    setDomain(nextDomain)
    setMode('practice')
    setMockFinished(false)
    setMockQuestions([])
    const next = nextPracticeQuestion(nextDomain, difficulty)
    setQuestion(next)
    setRecentIds([next.id])
    resetAnswerState()
  }

  function changeDifficulty(next: Difficulty) {
    setDifficulty(next)
    if (mode === 'practice') {
      const q = nextPracticeQuestion(domain, next)
      setQuestion(q)
      setRecentIds([q.id])
      resetAnswerState()
    }
  }

  function toggleOption(i: number) {
    if (revealed) return
    if (question.type === 'single') {
      setSelected([i])
    } else {
      setSelected((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
      )
    }
  }

  function submit() {
    if (!selected.length || revealed) return
    const correct = sameAnswer(selected, question.answers)
    setLastCorrect(correct)
    setRevealed(true)
    setAttempts((prev) => [
      ...prev,
      {
        questionId: question.id,
        domain: question.domain,
        topic: question.topic,
        correct,
        timestamp: Date.now(),
      },
    ])
    if (mode === 'mock' && correct) setMockScore((s) => s + 1)
  }

  function next() {
    if (mode === 'practice') {
      loadPractice()
      return
    }

    if (mockIndex + 1 >= mockQuestions.length) {
      setMockFinished(true)
      return
    }
    const nextIndex = mockIndex + 1
    setMockIndex(nextIndex)
    setQuestion(mockQuestions[nextIndex])
    resetAnswerState()
  }

  function startMock() {
    const qs = createMock(domain, difficulty, 10)
    setMode('mock')
    setMockQuestions(qs)
    setMockIndex(0)
    setMockScore(0)
    setMockFinished(false)
    setQuestion(qs[0])
    resetAnswerState()
  }

  function backToPractice() {
    setMode('practice')
    setMockFinished(false)
    setMockQuestions([])
    loadPractice()
  }

  const domainStatic = staticQuestions.filter((q) => q.domain === domain)
  const topicCounts = new Map<string, number>()
  for (const q of domainStatic) topicCounts.set(q.topic, (topicCounts.get(q.topic) || 0) + 1)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">COMPSCI 742 · EXAM TRAINER</div>
          <h1>742 Trap Lab</h1>
          <p className="subtitle">
            不是背题。专练 <strong>限定词、跨概念组合、单位、因果方向</strong>。
          </p>
        </div>
        <div className="header-actions">
          <button className="ghost" onClick={() => setShowCoverage((v) => !v)}>
            {showCoverage ? 'Hide coverage' : 'Coverage guard'}
          </button>
          {mode === 'practice' ? (
            <button className="primary small" onClick={startMock}>10-question mock</button>
          ) : (
            <button className="ghost" onClick={backToPractice}>Back to practice</button>
          )}
        </div>
      </header>

      <section className="domain-tabs" aria-label="Knowledge domain">
        {(Object.keys(domainMeta) as Domain[]).map((d) => (
          <button
            key={d}
            className={domain === d ? 'domain-card active' : 'domain-card'}
            onClick={() => changeDomain(d)}
          >
            <span>{domainMeta[d].label}</span>
            <small>{domainMeta[d].sub}</small>
            <em>{countByDomain(d)} curated + generators</em>
          </button>
        ))}
      </section>

      <section className="control-row">
        <div className="segmented">
          {(Object.keys(difficultyMeta) as Difficulty[]).map((d) => (
            <button
              key={d}
              className={difficulty === d ? 'active' : ''}
              onClick={() => changeDifficulty(d)}
              title={difficultyMeta[d].note}
            >
              {difficultyMeta[d].label}
            </button>
          ))}
        </div>
        <div className="stats-strip">
          <span><b>{currentAttempts.length}</b> attempts</span>
          <span><b>{accuracy}%</b> accuracy</span>
          <span><b>{examEvidenceQuestions.length}</b> past-test questions imported</span>
        </div>
      </section>

      {showCoverage && (
        <section className="coverage-panel">
          <div className="coverage-head">
            <div>
              <span className="eyebrow">COVERAGE GUARD</span>
              <h2>{domainMeta[domain].label} concept matrix</h2>
            </div>
            <p>
              每个 mock 优先跨 topic 抽题；Brutal 还会混入参数化新题，避免只记住题面。
            </p>
          </div>
          <div className="coverage-grid">
            {topicCoverage[domain].map((topic) => (
              <div className="coverage-item" key={topic}>
                <span>{topic}</span>
                <b>{topicCounts.get(topic) || '∞'}{topicCounts.has(topic) ? '' : ' gen'}</b>
              </div>
            ))}
          </div>
          <div className="evidence-note">
            <b>Past-test evidence layer:</b> 已把能可靠重建的 Test 2 题型单独放进 evidence layer。
            Test 1 那些缺少 X/Y/Z 原句的版本不会硬猜；你补截图后再按原措辞扩成同型变式题。
          </div>
        </section>
      )}

      <main className="study-layout">
        <section className="question-card">
          <div className="question-meta">
            <span className={'difficulty ' + question.difficulty}>{question.difficulty}</span>
            <span>{question.topic}</span>
            <span>{question.type === 'multi' ? 'SELECT ALL THAT APPLY' : 'SINGLE ANSWER'}</span>
            {mode === 'mock' && (
              <span className="mock-counter">Q {mockIndex + 1}/{mockQuestions.length}</span>
            )}
          </div>

          {mockFinished ? (
            <div className="mock-finished">
              <span className="eyebrow">MOCK COMPLETE</span>
              <h2>{mockScore} / {mockQuestions.length}</h2>
              <p>
                目标不是把同一套题刷熟，而是让 unfamiliar wording 也能稳定拆成
                “已知条件 → 真正问法 → 约束 → 计算/因果”。
              </p>
              <div className="mock-actions">
                <button className="primary" onClick={startMock}>Generate another mock</button>
                <button className="ghost" onClick={backToPractice}>Return to practice</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="prompt">{highlightedPrompt(question.prompt)}</h2>

              <div className="options">
                {question.options.map((option, i) => {
                  const isSelected = selected.includes(i)
                  const isAnswer = question.answers.includes(i)
                  const state = revealed
                    ? isAnswer
                      ? 'correct'
                      : isSelected
                        ? 'wrong'
                        : ''
                    : isSelected
                      ? 'selected'
                      : ''
                  return (
                    <button
                      key={option}
                      className={'option ' + state}
                      onClick={() => toggleOption(i)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{option}</span>
                      {revealed && isAnswer && <span className="check">✓</span>}
                    </button>
                  )
                })}
              </div>

              {!revealed ? (
                <div className="answer-actions">
                  <button
                    className="primary"
                    disabled={!selected.length}
                    onClick={submit}
                  >
                    Check answer
                  </button>
                  <button className="ghost" onClick={() => loadPractice()} disabled={mode === 'mock'}>
                    Skip / new variant
                  </button>
                </div>
              ) : (
                <div className={lastCorrect ? 'result correct-result' : 'result wrong-result'}>
                  <div className="result-head">
                    <strong>{lastCorrect ? 'Correct.' : 'Not quite.'}</strong>
                    <span>{question.source}</span>
                  </div>
                  <p>{question.explanation}</p>
                  {question.trap && (
                    <div className="trap-box">
                      <b>Trap audit</b>
                      <span>{question.trap}</span>
                    </div>
                  )}
                  <button className="primary" onClick={next}>
                    {mode === 'mock' && mockIndex + 1 >= mockQuestions.length
                      ? 'Finish mock'
                      : 'Next question'}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <aside className="side-panel">
          <section className="panel-block">
            <span className="eyebrow">WORDING FIREWALL</span>
            <h3>看到这些词先降速</h3>
            <div className="trap-chips">
              {['only', 'must', 'will', 'need to', 'input', 'output', 'visible ≠ usable', 'aggregate', 'underutilisation', 'up to'].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="muted">
              先判断题目问的是“可能 / 必要 / 充分 / 结果 / 输入 / 输出”，再调用知识点。
            </p>
          </section>

          <section className="panel-block">
            <span className="eyebrow">WEAK TOPICS</span>
            <h3>当前最需要补</h3>
            {weakTopics.length ? (
              <div className="weak-list">
                {weakTopics.map(([topic, v]) => (
                  <div key={topic}>
                    <span>{topic}</span>
                    <b>{Math.round((v.correct / v.total) * 100)}%</b>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted">先做几道，系统会按 topic 记录正确率。</p>
            )}
          </section>

          <section className="panel-block compact">
            <span className="eyebrow">WHY THIS BANK IS DIFFERENT</span>
            <p>
              Static questions cover slide concepts. Generated questions change numbers and combine
              constraints, so memorising option positions does not work.
            </p>
          </section>
        </aside>
      </main>

      <footer>
        <span>Source basis: your Wireless / Satellite Internet / Starlink lecture decks.</span>
        <button
          className="text-button"
          onClick={() => {
            if (window.confirm('Reset all local practice statistics?')) setAttempts([])
          }}
        >
          Reset stats
        </button>
      </footer>
    </div>
  )
}
