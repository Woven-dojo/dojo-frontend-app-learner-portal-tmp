import { PureComponent } from 'react'

import { reportError } from '../../utils/sentry';

class SentryErrorBoundary extends PureComponent {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    reportError(error, info)
  }
  
  render() {
    const { error } = this.state;
    const { children, renderError } = this.props;

    if (error) return renderError(error);

    return children;
  }
}

export default SentryErrorBoundary;
