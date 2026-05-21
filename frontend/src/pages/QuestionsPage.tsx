import { type FormEvent, useEffect, useMemo, useState } from 'react'
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from '../api/questionApi'
import type {
  Difficulty,
  InterviewQuestion,
  QuestionCategory,
  QuestionCreateRequest,
  QuestionStatus,
} from '../types/question.types'

const categories: QuestionCategory[] = [
  'JAVA',
  'SPRING_BOOT',
  'REACT',
  'TYPESCRIPT',
  'DATABASE',
  'SYSTEM_DESIGN',
  'HR',
]

const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD']
const statuses: QuestionStatus[] = ['NOT_STARTED', 'LEARNING', 'REVIEW', 'MASTERED']

const categoryLabels: Record<QuestionCategory, string> = {
  JAVA: 'Java',
  SPRING_BOOT: 'Spring Boot',
  REACT: 'React',
  TYPESCRIPT: 'TypeScript',
  DATABASE: 'Veritabanı',
  SYSTEM_DESIGN: 'Sistem Tasarımı',
  HR: 'İK',
}

const difficultyLabels: Record<Difficulty, string> = {
  EASY: 'Kolay',
  MEDIUM: 'Orta',
  HARD: 'Zor',
}

const statusLabels: Record<QuestionStatus, string> = {
  NOT_STARTED: 'Başlanmadı',
  LEARNING: 'Öğreniliyor',
  REVIEW: 'Tekrar',
  MASTERED: 'Uzmanlaşıldı',
}

const emptyForm: QuestionCreateRequest = {
  title: '',
  answer: '',
  category: 'JAVA',
  difficulty: 'EASY',
  status: 'NOT_STARTED',
  notes: '',
}

type QuestionsPageProps = {
  onDataChanged: () => void
}

function QuestionsPage({ onDataChanged }: QuestionsPageProps) {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [form, setForm] = useState<QuestionCreateRequest>(emptyForm)
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [listError, setListError] = useState('')

  const loadQuestions = async () => {
    try {
      await Promise.resolve()
      setIsLoading(true)
      setListError('')
      const data = await getQuestions()
      setQuestions(data)
    } catch {
      setListError('Sorular yüklenemedi. Backend servisinin çalıştığından emin olun.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    getQuestions()
      .then((data) => {
        if (isMounted) {
          setQuestions(data)
          setListError('')
        }
      })
      .catch(() => {
        if (isMounted) {
          setListError('Sorular yüklenemedi. Backend servisinin çalıştığından emin olun.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredQuestions = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('tr-TR')

    if (!query) {
      return questions
    }

    return questions.filter((question) => {
      const searchableText = [
        question.title,
        categoryLabels[question.category],
        difficultyLabels[question.difficulty],
        statusLabels[question.status],
        question.category,
        question.difficulty,
        question.status,
      ]
        .join(' ')
        .toLocaleLowerCase('tr-TR')

      return searchableText.includes(query)
    })
  }, [questions, searchTerm])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingQuestionId(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.title.trim() || !form.answer.trim()) {
      setFormError('Başlık ve cevap alanları zorunludur.')
      return
    }

    try {
      setIsSaving(true)
      setFormError('')

      if (editingQuestionId) {
        await updateQuestion(editingQuestionId, form)
      } else {
        await createQuestion(form)
      }

      resetForm()
      await loadQuestions()
      onDataChanged()
    } catch {
      setFormError('Soru kaydedilemedi. Lütfen tekrar deneyin.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (question: InterviewQuestion) => {
    setEditingQuestionId(question.id)
    setForm({
      title: question.title,
      answer: question.answer,
      category: question.category,
      difficulty: question.difficulty,
      status: question.status,
      notes: question.notes ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (questionId: number) => {
    const shouldDelete = window.confirm('Bu soruyu silmek istediğine emin misin?')

    if (!shouldDelete) {
      return
    }

    try {
      setListError('')
      await deleteQuestion(questionId)
      await loadQuestions()
      onDataChanged()

      if (editingQuestionId === questionId) {
        resetForm()
      }
    } catch {
      setListError('Soru silinemedi. Lütfen tekrar deneyin.')
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Soru Havuzu</p>
          <h1>Sorular</h1>
        </div>
        <p className="section-description">
          Mülakat sorularını ekle, düzenle ve çalışma durumuna göre takip et.
        </p>
      </div>

      <form className="question-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{editingQuestionId ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}</h2>
          {editingQuestionId && (
            <button className="ghost-button" type="button" onClick={resetForm}>
              Vazgeç
            </button>
          )}
        </div>

        <label>
          Başlık
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="Örn. Spring Boot Bean lifecycle nedir?"
          />
        </label>

        <label>
          Cevap
          <textarea
            value={form.answer}
            onChange={(event) => setForm({ ...form, answer: event.target.value })}
            placeholder="Kısa ve net cevabını yaz..."
            rows={5}
          />
        </label>

        <div className="form-grid">
          <label>
            Kategori
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value as QuestionCategory })
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Zorluk
            <select
              value={form.difficulty}
              onChange={(event) =>
                setForm({ ...form, difficulty: event.target.value as Difficulty })
              }
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficultyLabels[difficulty]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Durum
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as QuestionStatus })
              }
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Notlar
          <textarea
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Hatırlatıcılar, kaynak linkleri veya eksik konular..."
            rows={3}
          />
        </label>

        {formError && <div className="inline-error">{formError}</div>}

        <button className="primary-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Kaydediliyor...' : editingQuestionId ? 'Güncelle' : 'Soru Ekle'}
        </button>
      </form>

      <div className="list-toolbar">
        <label>
          Ara
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Başlık, kategori, zorluk veya durum..."
          />
        </label>
        <span>{filteredQuestions.length} soru</span>
      </div>

      {listError ? (
        <div className="state-card state-card--error">{listError}</div>
      ) : isLoading ? (
        <div className="state-card">Sorular yükleniyor...</div>
      ) : filteredQuestions.length === 0 ? (
        <div className="state-card">Henüz gösterilecek soru yok.</div>
      ) : (
        <div className="question-list">
          {filteredQuestions.map((question) => (
            <article className="question-card" key={question.id}>
              <div className="question-card__top">
                <h2>{question.title}</h2>
                <div className="question-actions">
                  <button type="button" onClick={() => handleEdit(question)}>
                    Düzenle
                  </button>
                  <button
                    className="danger-button"
                    type="button"
                    onClick={() => handleDelete(question.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>

              <div className="badge-row">
                <span className="badge badge--category">{categoryLabels[question.category]}</span>
                <span className={`badge badge--${question.difficulty.toLowerCase()}`}>
                  {difficultyLabels[question.difficulty]}
                </span>
                <span className={`badge badge--${question.status.toLowerCase()}`}>
                  {statusLabels[question.status]}
                </span>
              </div>

              <p className="answer-text">{question.answer}</p>
              {question.notes && <p className="notes-text">{question.notes}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default QuestionsPage
