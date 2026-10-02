export type Domain = 'wireless' | 'satellite' | 'starlink'
export type Difficulty = 'core' | 'tricky' | 'brutal'
export type QuestionType = 'single' | 'multi'

export interface Question {
  id: string
  domain: Domain
  topic: string
  difficulty: Difficulty
  type: QuestionType
  prompt: string
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
}
