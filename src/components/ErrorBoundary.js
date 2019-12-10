import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // The fallback UI if error happens
      return (
        <div className="row justify-content-center">
          <h1>Oops! Something went wrong.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
