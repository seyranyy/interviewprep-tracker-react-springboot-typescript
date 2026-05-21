export type QuestionCategory =
  | 'JAVA'
  | 'SPRING_BOOT'
  | 'REACT'
  | 'TYPESCRIPT'
  | 'DATABASE'
  | 'SYSTEM_DESIGN'
  | 'HR'

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type QuestionStatus = 'NOT_STARTED' | 'LEARNING' | 'REVIEW' | 'MASTERED'

export interface InterviewQuestion {
  id: number
  title: string
  answer: string
  category: QuestionCategory
  difficulty: Difficulty
  status: QuestionStatus
  notes: string
  createdAt: string
  updatedAt: string
}

export interface QuestionCreateRequest {
  title: string
  answer: string
  category: QuestionCategory
  difficulty: Difficulty
  status: QuestionStatus
  notes: string
}

export type QuestionUpdateRequest = QuestionCreateRequest

export interface DashboardSummaryResponse {
  totalQuestions: number
  notStartedCount: number
  learningCount: number
  reviewCount: number
  masteredCount: number
  easyCount: number
  mediumCount: number
  hardCount: number
}
