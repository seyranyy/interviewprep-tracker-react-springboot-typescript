import { useEffect, useState } from 'react'
import { getDashboardSummary } from '../api/questionApi'
import type { DashboardSummaryResponse } from '../types/question.types'

const summaryCards: Array<{
  key: keyof DashboardSummaryResponse
  label: string
  tone: string
}> = [
  { key: 'totalQuestions', label: 'Toplam Soru', tone: 'blue' },
  { key: 'notStartedCount', label: 'Başlanmadı', tone: 'slate' },
  { key: 'learningCount', label: 'Öğreniliyor', tone: 'amber' },
  { key: 'reviewCount', label: 'Tekrar', tone: 'violet' },
  { key: 'masteredCount', label: 'Uzmanlaşıldı', tone: 'green' },
  { key: 'easyCount', label: 'Kolay', tone: 'green' },
  { key: 'mediumCount', label: 'Orta', tone: 'amber' },
  { key: 'hardCount', label: 'Zor', tone: 'red' },
]

type DashboardPageProps = {
  refreshKey: number
}

function DashboardPage({ refreshKey }: DashboardPageProps) {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    getDashboardSummary()
      .then((data) => {
        if (isMounted) {
          setSummary(data)
          setError('')
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Dashboard özeti yüklenemedi. Backend servisinin çalıştığından emin olun.')
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
  }, [refreshKey])

  if (isLoading) {
    return <div className="state-card">Dashboard yükleniyor...</div>
  }

  if (error) {
    return <div className="state-card state-card--error">{error}</div>
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Genel Bakış</p>
          <h1>InterviewPrep Tracker</h1>
        </div>
        <p className="section-description">
          Çalışma durumunu ve zorluk dağılımını tek ekranda takip et.
        </p>
      </div>

      <div className="summary-grid">
        {summaryCards.map((card) => (
          <article className={`summary-card summary-card--${card.tone}`} key={card.key}>
            <span>{card.label}</span>
            <strong>{summary?.[card.key] ?? 0}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
