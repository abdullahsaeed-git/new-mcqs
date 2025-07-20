import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Log error
    // eslint-disable-next-line no-console
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <h2>Something went wrong.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}
