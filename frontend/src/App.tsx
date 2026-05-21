import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import QuestionsPage from './pages/QuestionsPage'

type ActiveTab = 'dashboard' | 'questions'

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0)

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">Mülakat Hazırlık Paneli</p>
          <strong>InterviewPrep Tracker</strong>
        </div>

        <nav className="tab-nav" aria-label="Ana sayfalar">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            type="button"
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'questions' ? 'active' : ''}
            type="button"
            onClick={() => setActiveTab('questions')}
          >
            Sorular
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'dashboard' ? (
          <DashboardPage refreshKey={dashboardRefreshKey} />
        ) : (
          <QuestionsPage onDataChanged={() => setDashboardRefreshKey((key) => key + 1)} />
        )}
      </main>
    </div>
  )
}

export default App
