import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link} from "react-router-dom";


function Header() {
  return (
    //navigation bar for router link
    <div className="Center-text">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link className="homeLink" to="/">Home </Link>
          </div>
        </div>
      </nav>
      <Jumbotron className="Jumbotron">
        <h1>What to Watch</h1>
        <h3>Search for Movies and So Much More</h3>
      </Jumbotron>
    </div>
  );
}

export default Header;
