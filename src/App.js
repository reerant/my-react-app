import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Display from "./components/Display.js";
import Footer from "./components/Footer.js";
import ErrorBoundary from "./components/ErrorBoundary.js";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/*ErrorBoundary catches error and shows the fallback UI */}
        <ErrorBoundary>
        <Display />
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
}
export default App;
