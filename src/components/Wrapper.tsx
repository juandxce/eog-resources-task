import React, { Component, ReactNode } from 'react';

export type WrapperState = {
  errorInfo?: {componentStack: string};
  error?: any;
}

export type WrapperComponentProps = {
  children: ReactNode;
}


class Wrapper extends Component<{}, WrapperState> {
  constructor(props: WrapperComponentProps) {
    super(props);
    this.state = { };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div style={{ width: '100vw', textAlign: 'center' }}>
          <h2>{`Sorry, it seems like my app broke`}</h2>
          <strong style={{ fontSize: '50px' }}>{`:'< `}</strong>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return <div style={{ height: '100vh', display: 'flex' }}>{this.props.children}</div>;
  }
}

export default Wrapper;
