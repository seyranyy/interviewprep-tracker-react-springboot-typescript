import axiosInstance from './axiosInstance'
import type {
  DashboardSummaryResponse,
  InterviewQuestion,
  QuestionCreateRequest,
  QuestionUpdateRequest,
} from '../types/question.types'

export const getQuestions = async () => {
  const response = await axiosInstance.get<InterviewQuestion[]>('/questions')
  return response.data
}

export const createQuestion = async (payload: QuestionCreateRequest) => {
  const response = await axiosInstance.post<InterviewQuestion>('/questions', payload)
  return response.data
}

export const updateQuestion = async (id: number, payload: QuestionUpdateRequest) => {
  const response = await axiosInstance.put<InterviewQuestion>(`/questions/${id}`, payload)
  return response.data
}

export const deleteQuestion = async (id: number) => {
  await axiosInstance.delete(`/questions/${id}`)
}

export const getDashboardSummary = async () => {
  const response = await axiosInstance.get<DashboardSummaryResponse>('/dashboard/summary')
  return response.data
}
