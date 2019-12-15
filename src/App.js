import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Display from "./components/Display.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary.js";
import { Route, Switch } from "react-router-dom";
import ErrorUrl from "./components/ErrorUrl";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/search"
            render={() => (
              //ErrorBoundary catches error (api calls don't work etc) and shows error message but doesn't break the whole UI.
              <ErrorBoundary>
                <Display />
              </ErrorBoundary>
            )}
          />
          {/*If cannot find the given url, shows error message but doesn't break the whole UI.*/}
          <Route component={ErrorUrl} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
