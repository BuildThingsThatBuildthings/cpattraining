import React from 'react';
import { ErrorBoundaryProps } from '../types';

// Hook for easy error boundary usage in functional components
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<ErrorBoundaryProps>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => {
    const ErrorBoundary = React.lazy(() => import('../components/common/ErrorBoundary'));
    
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary {...errorBoundaryProps}>
          <Component {...props} />
        </ErrorBoundary>
      </React.Suspense>
    );
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};