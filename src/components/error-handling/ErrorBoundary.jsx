import { PureComponent } from 'react'

import { reportFatalError } from '../../utils/errorHandling';

class ErrorBoundary extends PureComponent {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    reportFatalError(error, info);
    console.log(error, info);
  }
  
  render() {
    const { error } = this.state;
    const { children, renderError } = this.props;

    if (error) return renderError(error);

    return children;
  }
}

export default ErrorBoundary;
