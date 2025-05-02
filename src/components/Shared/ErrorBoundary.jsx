// src/components/Shared/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error);
    console.error("Error Info:", errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div className="text-center bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry, but an unexpected error occurred.
            </p>
            {this.state.error && (
              <div className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-h-64 mb-4">
                <h2 className="font-bold mb-2">Error Details:</h2>
                <pre className="text-xs text-red-700">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            {this.state.errorInfo && (
              <div className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-h-64">
                <h2 className="font-bold mb-2">Component Stack:</h2>
                <pre className="text-xs text-gray-700">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Reload Page
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;