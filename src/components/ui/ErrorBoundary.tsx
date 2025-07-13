import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-white shadow-sm rounded-lg max-w-md mx-auto mt-8">
          <ErrorMessage
            message={this.state.error?.message || "Something went wrong"}
            onRetry={this.handleRetry}
          />
        </div>
      );
    }

    return this.props.children;
  }
} 