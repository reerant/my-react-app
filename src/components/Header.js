import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

function Header() {
  return (
    <div className="Center-text">
      {/* This is for later on when the app has DB and login working. 
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header"><b>What to Watch</b></div>
          <div className="navbar-login"><b>Login</b></div>
        </div>
      </nav> */}
      <Jumbotron className="Jumbotron">
        <h1>What to Watch</h1>
        <h3>Search for movies and so much more.</h3>
      </Jumbotron>
    </div>
 
  );
}

export default Header;
