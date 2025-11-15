import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console or send to error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
    
    // In production, you would send this to an error reporting service
    if (import.meta.env.VITE_NODE_ENV === 'production') {
      // sendErrorToService(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-4">
                We're sorry, but something went wrong. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#255F38] hover:bg-[#1d4829] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Refresh Page
              </button>
              
              {import.meta.env.VITE_NODE_ENV === 'development' && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500">Error Details (Development)</summary>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                    {this.state.error && this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary