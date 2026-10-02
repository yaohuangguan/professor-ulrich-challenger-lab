export type Domain = 'wireless' | 'satellite' | 'starlink'
export type Difficulty = 'core' | 'tricky' | 'brutal'
export type QuestionType = 'single' | 'multi'
export type QuestionFormat = 'standard' | 'professor-xyz'
export type StudyFormat = 'professor' | 'mixed' | 'standard'
export type UiLanguage = 'zh' | 'en'

export interface Question {
  id: string
  domain: Domain
  topic: string
  difficulty: Difficulty
  type: QuestionType
  format?: QuestionFormat
  prompt: string
  context?: string
  statements?: string[]
  statementTruth?: boolean[]
  options: string[]
  answers: number[]
  explanation: string
  trap?: string
  source: string
  tags: string[]
}

export interface Attempt {
  questionId: string
  domain: Domain
  topic: string
  correct: boolean
  timestamp: number
  format?: QuestionFormat
}
