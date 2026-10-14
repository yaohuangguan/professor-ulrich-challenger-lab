import { useEffect, useMemo, useState } from 'react'
import type {
  Attempt,
  Difficulty,
  Domain,
  Question,
  StudyFormat,
  UiLanguage,
} from './types'
import {
  countByDomain,
  countProfessorByDomain,
  createMock,
  nextPracticeQuestion,
  staticQuestions,
  topicCoverage,
} from './data/bank'
import { examEvidenceQuestions } from './data/examevidence'
import { examQuestionsFor, pastExamMeta, pastExamQuestions, type PastExamVersion } from './data/pastexams'
import { professorQuestions } from './data/professor'

const domainMeta: Record<Domain, { label: string; sub: string }> = {
  wireless: { label: 'Wireless', sub: 'dB · Link budget · SNR · Shannon' },
  satellite: { label: 'Satellite', sub: 'GEO/MEO · BDP · TCP queues' },
  starlink: { label: 'Starlink', sub: 'EPFD · beams · geometry · ISLs' },
  tcp: { label: 'TCP', sub: 'SEQ/ACK · windows · loss · cwnd · flavours' },
}

const copy = {
  zh: {
    subtitle: '不是背题。专练限定词、X/Y/Z 组合判断、跨概念推理和计算陷阱。',
    coverage: '覆盖矩阵',
    hideCoverage: '收起覆盖矩阵',
    mock: '10 题模拟',
    backPractice: '返回练习',
    attempts: '次作答',
    accuracy: '正确率',
    pastImported: '道历史考试题型',
    xyzImported: '道 XYZ 题型原型',
    format: '题型',
    professor: 'XYZ 模式',
    mixed: '混合',
    standard: '普通 ABCD',
    questionsStayEnglish: '题目、X/Y/Z 陈述和 A–E 选项始终保持英文。',
    coverageTitle: '知识点覆盖矩阵',
    coverageDesc: 'Mock 优先跨 topic；Brutal 会混入参数化新题，防止只背原题。',
    evidenceTitle: '真实考试证据层',
    evidenceDesc: 'Test 1 v5239（Wireless，10题）和 Test 2 v8246（Satellite，5题）已按原题面独立归档。另有重构题型和生成变式。',
    selectAll: '多选题',
    single: '单选题',
    combo: 'X/Y/Z → A–E 组合题',
    check: '检查答案',
    skip: '跳过 / 新变式',
    correct: '答对了。',
    wrong: '这题没对。',
    trap: '陷阱复盘',
    next: '下一题',
    finish: '完成模拟',
    complete: '模拟完成',
    anotherMock: '再生成一套',
    returnPractice: '回到练习',
    mockDesc: '目标不是记住 A/B/C/D/E，而是先独立判断 X、Y、Z，再把真值映射到本题的组合选项。',
    wordingFirewall: 'WORDING FIREWALL',
    wordingTitle: '看到这些词先降速',
    wordingDesc: '先判断：必要还是可能？因果有没有真的成立？这句话是在回答题目，还是只是听起来很专业？最后才映射 A–E。',
    weakTopics: 'WEAK TOPICS',
    weakTitle: '当前最需要补',
    weakEmpty: '先做几道，系统会按 topic 记录正确率。',
    why: 'XYZ MODE',
    whyDesc: '先逐条判断 X/Y/Z。专业术语很多、听起来像课件的话，也可能只是和题目无关的废话；最后再把真值映射到 A–E。',
    footer: '题目依据：你的 Wireless / Satellite Internet / Starlink / TCP 资料 + 已提供的 Test 题面。',
    reset: '重置统计',
    resetConfirm: '确定清空本浏览器里的全部练习统计吗？',
    truthAudit: 'X/Y/Z 真值',
    trueLabel: 'TRUE',
    falseLabel: 'FALSE',
    curated: '固定题',
    generators: '生成变式',
    language: '界面语言',
    share: '复制分享链接',
    copied: '已复制',
    pastTitle: '考试原题 · 顺序复现',
    pastDesc: '按原试卷顺序练习，保留题面数字、A–E 选项和 X/Y/Z 对应关系。',
    pastCaution: '答案为独立推导，非官方批改结果；部分卫星 TCP 题取决于课堂模型。',
    pastRestart: '重做本套原题',
  },
  en: {
    subtitle: 'Train qualifiers, X/Y/Z combination logic, cross-concept reasoning and calculation traps — not memorisation.',
    coverage: 'Coverage guard',
    hideCoverage: 'Hide coverage',
    mock: '10-question mock',
    backPractice: 'Back to practice',
    attempts: 'attempts',
    accuracy: 'accuracy',
    pastImported: 'past-test patterns',
    xyzImported: 'XYZ prototypes',
    format: 'Format',
    professor: 'XYZ Mode',
    mixed: 'Mixed',
    standard: 'Standard ABCD',
    questionsStayEnglish: 'Question text, X/Y/Z statements and A–E options always stay in English.',
    coverageTitle: 'Concept coverage matrix',
    coverageDesc: 'Mocks prefer topic diversity; Brutal mode mixes in parameterised variants so you cannot memorise surfaces.',
    evidenceTitle: 'Past-test evidence layer',
    evidenceDesc: 'Test 1 v5239 (Wireless, 10) and Test 2 v8246 (Satellite, 5) are archived as original-paper replays. Reconstructed and generated drills stay separate.',
    selectAll: 'SELECT ALL THAT APPLY',
    single: 'SINGLE ANSWER',
    combo: 'X/Y/Z → A–E COMBINATION',
    check: 'Check answer',
    skip: 'Skip / new variant',
    correct: 'Correct.',
    wrong: 'Not quite.',
    trap: 'Trap audit',
    next: 'Next question',
    finish: 'Finish mock',
    complete: 'MOCK COMPLETE',
    anotherMock: 'Generate another mock',
    returnPractice: 'Return to practice',
    mockDesc: 'Do not memorise A/B/C/D/E. Judge X, Y and Z independently, then map the truth pattern to this question’s answer choices.',
    wordingFirewall: 'WORDING FIREWALL',
    wordingTitle: 'Slow down on these words',
    wordingDesc: 'Check necessity, causality and relevance: does the statement actually answer the question, or merely sound technical? Then decode A–E.',
    weakTopics: 'WEAK TOPICS',
    weakTitle: 'Current weak topics',
    weakEmpty: 'Answer a few questions and topic-level accuracy will appear here.',
    why: 'XYZ MODE',
    whyDesc: 'Judge X/Y/Z independently. Technical-sounding statements can still be irrelevant or causally wrong; only then map the truth pattern to A–E.',
    footer: 'Source basis: your Wireless / Satellite Internet / Starlink / TCP materials plus the test questions you provided.',
    reset: 'Reset stats',
    resetConfirm: 'Reset all local practice statistics?',
    truthAudit: 'X/Y/Z truth audit',
    trueLabel: 'TRUE',
    falseLabel: 'FALSE',
    curated: 'curated',
    generators: 'generators',
    language: 'UI language',
    share: 'Copy share URL',
    copied: 'Copied',
    pastTitle: 'Real exam papers · in original order',
    pastDesc: 'Replay the photographed papers with original numbers, A–E choices and X/Y/Z mappings.',
    pastCaution: 'Answers are independently derived, not official marking feedback. Satellite TCP cases use the course model.',
    pastRestart: 'Replay this paper',
  },
} as const

const difficultyMeta: Record<Difficulty, { label: string; zh: string; en: string }> = {
  core: { label: 'Core', zh: '基础不丢分', en: 'Protect the basics' },
  tricky: { label: 'Tricky', zh: '加入 wording 与近似概念', en: 'Wording + close distractors' },
  brutal: { label: 'Brutal', zh: '跨知识点 + 限定词 + 计算', en: 'Cross-topic + qualifiers + maths' },
}

const trapRegex =
  /(only|must|will|need to|necessarily|always|never|input|output|visible|usable|aggregate|underutilisation|underutilization|high utilisation|high utilization|all|exactly|guarantee(?:d)?|up to|could|every|regardless)/gi
const exactTrap =
  /^(only|must|will|need to|necessarily|always|never|input|output|visible|usable|aggregate|underutilisation|underutilization|high utilisation|high utilization|all|exactly|guarantee(?:d)?|up to|could|every|regardless)$/i

function highlightedText(text: string) {
  const parts = text.split(trapRegex)

  return parts.map((part, i) => {
    const previous = parts[i - 1] ?? ''
    const next = parts[i + 1] ?? ''
    const embeddedInWord =
      /[A-Za-z]$/.test(previous) || /^[A-Za-z]/.test(next)

    return exactTrap.test(part) && !embeddedInWord
      ? <mark key={i}>{part}</mark>
      : part
  })
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

function loadLanguage(): UiLanguage {
  const urlValue = new URLSearchParams(window.location.search).get('lang')
  if (urlValue === 'en' || urlValue === 'zh') return urlValue
  const value = localStorage.getItem('742-ui-language')
  return value === 'en' ? 'en' : 'zh'
}

function loadStudyFormat(): StudyFormat {
  const value = localStorage.getItem('742-study-format')
  if (value === 'mixed' || value === 'standard' || value === 'professor') return value
  return 'professor'
}

function loadPastVersion(): PastExamVersion | null {
  const v = new URLSearchParams(window.location.search).get('exam')
  return v === '5239' || v === '8246' ? v : null
}

function setExamUrl(version: PastExamVersion | null) {
  const url = new URL(window.location.href)
  if (version) url.searchParams.set('exam', version)
  else url.searchParams.delete('exam')
  window.history.replaceState(null, '', url)
}

export default function App() {
  const [language, setLanguage] = useState<UiLanguage>(loadLanguage)
  const [studyFormat, setStudyFormat] = useState<StudyFormat>(loadStudyFormat)
  const [domain, setDomain] = useState<Domain>(() => loadPastVersion() ? pastExamMeta[loadPastVersion()!].domain : 'wireless')
  const [difficulty, setDifficulty] = useState<Difficulty>('brutal')
  const [mode, setMode] = useState<'practice' | 'mock' | 'past'>(() => loadPastVersion() ? 'past' : 'practice')
  const [pastVersion, setPastVersion] = useState<PastExamVersion | null>(loadPastVersion)
  const [question, setQuestion] = useState<Question>(() =>
    loadPastVersion() ? examQuestionsFor(loadPastVersion()!)[0] : nextPracticeQuestion('wireless', 'brutal', [], loadStudyFormat()),
  )
  const [selected, setSelected] = useState<number[]>([])
  const [revealed, setRevealed] = useState(false)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const [recentIds, setRecentIds] = useState<string[]>([])
  const [attempts, setAttempts] = useState<Attempt[]>(loadAttempts)
  const [showCoverage, setShowCoverage] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [mockQuestions, setMockQuestions] = useState<Question[]>(() => loadPastVersion() ? examQuestionsFor(loadPastVersion()!) : [])
  const [mockIndex, setMockIndex] = useState(0)
  const [mockScore, setMockScore] = useState(0)
  const [mockFinished, setMockFinished] = useState(false)

  const t = copy[language]

  useEffect(() => {
    localStorage.setItem('742-trap-attempts', JSON.stringify(attempts.slice(-1000)))
  }, [attempts])

  useEffect(() => {
    localStorage.setItem('742-ui-language', language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    const url = new URL(window.location.href)
    url.searchParams.set('lang', language)
    window.history.replaceState(null, '', url)
  }, [language])

  useEffect(() => {
    localStorage.setItem('742-study-format', studyFormat)
  }, [studyFormat])

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

  function loadPractice(
    d = domain,
    level = difficulty,
    format = studyFormat,
  ) {
    const next = nextPracticeQuestion(d, level, recentIds, format)
    setQuestion(next)
    setRecentIds((prev) => [...prev.slice(-7), next.id])
    resetAnswerState()
  }

  function changeDomain(nextDomain: Domain) {
    setPastVersion(null)
    setExamUrl(null)
    setDomain(nextDomain)
    setMode('practice')
    setMockFinished(false)
    setMockQuestions([])
    const next = nextPracticeQuestion(nextDomain, difficulty, [], studyFormat)
    setQuestion(next)
    setRecentIds([next.id])
    resetAnswerState()
  }

  function changeDifficulty(next: Difficulty) {
    setDifficulty(next)
    if (mode === 'practice') {
      const q = nextPracticeQuestion(domain, next, [], studyFormat)
      setQuestion(q)
      setRecentIds([q.id])
      resetAnswerState()
    }
  }

  function changeStudyFormat(next: StudyFormat) {
    setPastVersion(null)
    setExamUrl(null)
    setStudyFormat(next)
    setMode('practice')
    setMockFinished(false)
    setMockQuestions([])
    const q = nextPracticeQuestion(domain, difficulty, [], next)
    setQuestion(q)
    setRecentIds([q.id])
    resetAnswerState()
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
        format: question.format,
      },
    ])
    if (mode !== 'practice' && correct) setMockScore((s) => s + 1)
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

  function startPastExam(version: PastExamVersion) {
    const qs = examQuestionsFor(version)
    setPastVersion(version)
    setExamUrl(version)
    setDomain(pastExamMeta[version].domain)
    setMode('past')
    setMockQuestions(qs)
    setMockIndex(0)
    setMockScore(0)
    setMockFinished(false)
    setQuestion(qs[0])
    resetAnswerState()
  }

  function startMock() {
    setPastVersion(null)
    setExamUrl(null)
    const qs = createMock(domain, difficulty, 10, studyFormat)
    setMode('mock')
    setMockQuestions(qs)
    setMockIndex(0)
    setMockScore(0)
    setMockFinished(false)
    setQuestion(qs[0])
    resetAnswerState()
  }

  function backToPractice() {
    setPastVersion(null)
    setExamUrl(null)
    setMode('practice')
    setMockFinished(false)
    setMockQuestions([])
    loadPractice()
  }

  async function copyShareUrl() {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', language)
    try {
      await navigator.clipboard.writeText(url.toString())
      setShareCopied(true)
      window.setTimeout(() => setShareCopied(false), 1400)
    } catch {
      window.prompt(language === 'zh' ? '复制这个链接：' : 'Copy this URL:', url.toString())
    }
  }

  const domainStatic = staticQuestions.filter((q) => q.domain === domain)
  const topicCounts = new Map<string, number>()
  for (const q of domainStatic) {
    topicCounts.set(q.topic, (topicCounts.get(q.topic) || 0) + 1)
  }

  const questionKind =
    question.format === 'professor-xyz'
      ? t.combo
      : question.type === 'multi'
        ? t.selectAll
        : t.single

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">COMPSCI 742 · EXAM TRAINER</div>
          <h1>742 Trap Lab</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        <div className="header-actions">
          <div className="language-switch" aria-label={t.language}>
            <button
              className={language === 'zh' ? 'active' : ''}
              onClick={() => setLanguage('zh')}
            >
              中文
            </button>
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
          <button className="ghost share-button" onClick={copyShareUrl}>
            {shareCopied ? t.copied : t.share}
          </button>
          <button className="ghost" onClick={() => setShowCoverage((v) => !v)}>
            {showCoverage ? t.hideCoverage : t.coverage}
          </button>
          {mode === 'practice' ? (
            <button className="primary small" onClick={startMock}>{t.mock}</button>
          ) : (
            <button className="ghost" onClick={backToPractice}>{t.backPractice}</button>
          )}
        </div>
      </header>

      <section className="past-exam-panel" aria-label={t.pastTitle}>
        <div className="past-exam-intro">
          <span className="eyebrow">ORIGINAL EXAM PAPERS · 15 QUESTIONS</span>
          <h2>{t.pastTitle}</h2>
          <p>{t.pastDesc}</p>
          <small>{t.pastCaution}</small>
        </div>
        <div className="past-exam-actions">
          {(['5239', '8246'] as PastExamVersion[]).map((version) => (
            <button
              key={version}
              className={mode === 'past' && pastVersion === version ? 'past-exam-button active' : 'past-exam-button'}
              onClick={() => startPastExam(version)}
              aria-pressed={mode === 'past' && pastVersion === version}
            >
              <b>{pastExamMeta[version].name}</b>
              <span>VERSION {version} · {pastExamMeta[version].count} Q</span>
            </button>
          ))}
        </div>
      </section>

      <section className="domain-tabs" aria-label="Knowledge domain">
        {(Object.keys(domainMeta) as Domain[]).map((d) => (
          <button
            key={d}
            className={domain === d ? 'domain-card active' : 'domain-card'}
            onClick={() => changeDomain(d)}
          >
            <span>{domainMeta[d].label}</span>
            <small>{domainMeta[d].sub}</small>
            <em>
              {countByDomain(d)} {t.curated} · {countProfessorByDomain(d)} XYZ · ∞ {t.generators}
            </em>
          </button>
        ))}
      </section>

      <section className="format-row">
        <div className="format-label">
          <span className="eyebrow">{t.format}</span>
          <small>{t.questionsStayEnglish}</small>
        </div>
        <div className="segmented format-segmented">
          {([
            ['professor', t.professor],
            ['mixed', t.mixed],
            ['standard', t.standard],
          ] as [StudyFormat, string][]).map(([value, label]) => (
            <button
              key={value}
              className={studyFormat === value ? 'active' : ''}
              onClick={() => changeStudyFormat(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="control-row">
        <div className="segmented">
          {(Object.keys(difficultyMeta) as Difficulty[]).map((d) => (
            <button
              key={d}
              className={difficulty === d ? 'active' : ''}
              onClick={() => changeDifficulty(d)}
              title={language === 'zh' ? difficultyMeta[d].zh : difficultyMeta[d].en}
            >
              {difficultyMeta[d].label}
            </button>
          ))}
        </div>
        <div className="stats-strip">
          <span><b>{currentAttempts.length}</b> {t.attempts}</span>
          <span><b>{accuracy}%</b> {t.accuracy}</span>
          <span><b>{pastExamQuestions.length}</b> {language === 'zh' ? '道考试原题' : 'original exam questions'}</span>
          <span><b>{examEvidenceQuestions.length}</b> {t.pastImported}</span>
          <span><b>{professorQuestions.length}</b> {t.xyzImported}</span>
        </div>
      </section>

      {showCoverage && (
        <section className="coverage-panel">
          <div className="coverage-head">
            <div>
              <span className="eyebrow">COVERAGE GUARD</span>
              <h2>{domainMeta[domain].label} · {t.coverageTitle}</h2>
            </div>
            <p>{t.coverageDesc}</p>
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
            <b>{t.evidenceTitle}:</b> {t.evidenceDesc}
          </div>
        </section>
      )}

      <main className="study-layout">
        <section className={question.format === 'professor-xyz' ? 'question-card professor-card' : 'question-card'}>
          <div className="question-meta">
            <span className={'difficulty ' + question.difficulty}>{question.difficulty}</span>
            <span>{question.topic}</span>
            <span>{questionKind}</span>
            {question.format === 'professor-xyz' && <span className="prof-badge">X/Y/Z</span>}
            {mode === 'past' && pastVersion && <span className="prof-badge">v{pastVersion} · Q{mockIndex + 1}</span>}
            {mode !== 'practice' && (
              <span className="mock-counter">Q {mockIndex + 1}/{mockQuestions.length}</span>
            )}
          </div>

          {mockFinished ? (
            <div className="mock-finished">
              <span className="eyebrow">{t.complete}</span>
              <h2>{mockScore} / {mockQuestions.length}</h2>
              <p>{t.mockDesc}</p>
              <div className="mock-actions">
                <button className="primary" onClick={() => mode === 'past' && pastVersion ? startPastExam(pastVersion) : startMock()}>{mode === 'past' ? t.pastRestart : t.anotherMock}</button>
                <button className="ghost" onClick={backToPractice}>{t.returnPractice}</button>
              </div>
            </div>
          ) : (
            <>
              {question.context && (
                <div className="question-context">{highlightedText(question.context)}</div>
              )}

              <h2 className="prompt">{highlightedText(question.prompt)}</h2>

              {question.statements?.length ? (
                <div className="xyz-statements">
                  {question.statements.map((statement, i) => (
                    <div className="xyz-statement" key={statement}>
                      <span className="xyz-letter">{['X', 'Y', 'Z'][i]}</span>
                      <span className="xyz-text">{highlightedText(statement)}</span>
                      {revealed && question.statementTruth && (
                        <span className={question.statementTruth[i] ? 'truth true' : 'truth false'}>
                          {question.statementTruth[i] ? t.trueLabel : t.falseLabel}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}

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
                    {t.check}
                  </button>
                  <button
                    className="ghost"
                    onClick={() => loadPractice()}
                    disabled={mode !== 'practice'}
                  >
                    {t.skip}
                  </button>
                </div>
              ) : (
                <div className={lastCorrect ? 'result correct-result' : 'result wrong-result'}>
                  <div className="result-head">
                    <strong>{lastCorrect ? t.correct : t.wrong}</strong>
                    <span>{question.source}</span>
                  </div>

                  {question.statementTruth && (
                    <div className="truth-summary">
                      <b>{t.truthAudit}</b>
                      <span>
                        X={question.statementTruth[0] ? 'TRUE' : 'FALSE'} ·
                        Y={question.statementTruth[1] ? 'TRUE' : 'FALSE'} ·
                        Z={question.statementTruth[2] ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                  )}

                  <p>{language === 'zh' ? question.explanationZh ?? question.explanation : question.explanation}</p>

                  {question.trap && (
                    <div className="trap-box">
                      <b>{t.trap}</b>
                      <span>{language === 'zh' ? question.trapZh ?? question.trap : question.trap}</span>
                    </div>
                  )}

                  <button className="primary" onClick={next}>
                    {mode !== 'practice' && mockIndex + 1 >= mockQuestions.length
                      ? t.finish
                      : t.next}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <aside className="side-panel">
          <section className="panel-block">
            <span className="eyebrow">{t.wordingFirewall}</span>
            <h3>{t.wordingTitle}</h3>
            <div className="trap-chips">
              {[
                'only',
                'must',
                'will',
                'need to',
                'could',
                'all',
                'none',
                'input',
                'output',
                'visible ≠ usable',
                'aggregate',
                'underutilisation',
                'up to',
              ].map((x) => <span key={x}>{x}</span>)}
            </div>
            <p className="muted">{t.wordingDesc}</p>
          </section>

          <section className="panel-block">
            <span className="eyebrow">{t.weakTopics}</span>
            <h3>{t.weakTitle}</h3>
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
              <p className="muted">{t.weakEmpty}</p>
            )}
          </section>

          <section className="panel-block compact professor-explainer">
            <span className="eyebrow">{t.why}</span>
            <p>{t.whyDesc}</p>
            <div className="mapping-mini">
              <code>judge X → judge Y → judge Z</code>
              <span>↓</span>
              <code>then decode A / B / C / D / E</code>
            </div>
          </section>
        </aside>
      </main>

      <footer>
        <span>{t.footer}</span>
        <button
          className="text-button"
          onClick={() => {
            if (window.confirm(t.resetConfirm)) setAttempts([])
          }}
        >
          {t.reset}
        </button>
      </footer>
    </div>
  )
}
