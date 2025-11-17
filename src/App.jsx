import { useState, lazy, Suspense } from 'react'
import { block } from 'million/react'
import ErrorBoundary from './components/common/ErrorBoundary'

// Lazy load components for better performance
const LoginPage = lazy(() => import('./components/LoginPage/LoginPage'))

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
    <div className="text-center">
      <div className="w-16 h-16 bg-[#255F38] rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

const App = block(function App() {
  const [currentPage, setCurrentPage] = useState('login')

  function renderPage() {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />
      // Remove register case entirely
      default:
        return <LoginPage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        {renderPage()}
      </Suspense>
    </ErrorBoundary>
  )
})

export default App