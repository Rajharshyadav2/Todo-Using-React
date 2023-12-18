'use client';
import { useErrorBoundary } from 'react-error-boundary';

/**
 * Props for the ErrorPage component.
 * @interface ErrorPageProps
 */
interface ErrorPageProps {
  /**
   * The error object containing information about the error.
   * @type {Error}
   */
  error: Error;
}
const ErrorPage = ({ error }: ErrorPageProps) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert" className="delete-modal">
      <h4>Something went wrong:</h4>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
};

export default ErrorPage;
