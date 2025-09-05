import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryState, ErrorBoundaryProps, ErrorInfo as CustomErrorInfo } from '../../types';

/**
 * Comprehensive Error Boundary for luxury therapeutic components
 * Provides fallback UI with therapeutic styling and error reporting
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const customErrorInfo: CustomErrorInfo = {
      componentStack: errorInfo.componentStack || '',
      errorBoundary: this.constructor.name || 'ErrorBoundary',
      errorBoundaryStack: (errorInfo as any).errorBoundaryStack || undefined
    };

    this.setState({
      hasError: true,
      error,
      errorInfo: customErrorInfo
    });

    // Call the onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, customErrorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error.message);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Error Stack:', error.stack);
      console.groupEnd();
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    
    // Reset error state if resetKeys have changed
    if (this.state.hasError && resetKeys && prevProps.resetKeys !== resetKeys) {
      if (resetKeys.some((key, idx) => prevProps.resetKeys?.[idx] !== key)) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
    
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined 
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback && this.state.error && this.state.errorInfo) {
        return this.props.fallback(this.state.error, this.state.errorInfo);
      }

      // Default therapeutic-styled error UI
      return (
        <div 
          className="min-h-[400px] flex items-center justify-center p-8 rounded-2xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(247, 245, 243, 0.95), rgba(232, 240, 229, 0.9))',
            borderColor: 'rgba(200, 133, 106, 0.3)',
            boxShadow: '0 8px 32px -8px rgba(143, 166, 142, 0.15)'
          }}
          role="alert"
          aria-labelledby="error-boundary-title"
        >
          <div className="text-center max-w-md space-y-6">
            {/* Therapeutic Icon */}
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(200, 133, 106, 0.1), rgba(200, 133, 106, 0.05))',
                color: '#C8856A'
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Error Title */}
            <div>
              <h2 
                id="error-boundary-title"
                className="text-xl font-semibold mb-2"
                style={{ color: '#6B7D6A' }}
              >
                🌿 Something Went Wrong
              </h2>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#8FA68E' }}
              >
                We encountered an unexpected error. The therapeutic environment is designed to be resilient, and we're working to restore normal function.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div 
                className="text-left p-4 rounded-xl text-xs font-mono"
                style={{ 
                  background: 'rgba(200, 133, 106, 0.05)',
                  border: '1px solid rgba(200, 133, 106, 0.2)',
                  color: '#C8856A'
                }}
              >
                <div className="font-semibold mb-2">Development Error Details:</div>
                <div className="break-all">{this.state.error.message}</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.resetErrorBoundary}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #A8C09A, #8FA68E)',
                  color: 'white',
                  border: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(143, 166, 142, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 16px -8px rgba(143, 166, 142, 0.2)';
                }}
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg border"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#6B7D6A',
                  borderColor: 'rgba(143, 166, 142, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Refresh Page
              </button>
            </div>

            {/* Therapeutic Message */}
            <div 
              className="text-xs italic"
              style={{ color: '#A8C09A' }}
            >
              "In every difficulty lies opportunity for growth and healing."
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

