import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
import Display from "./components/Display.js";
import Footer from "./components/Footer.js";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

   render() {
    return (
      <div className="App">
        <Header />
        <Search />
        <Display />
        <Footer />
      </div>
    );
  }
}
export default App;
