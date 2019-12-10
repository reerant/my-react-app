import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class TitleOfSearch extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container TitleOfSearch">
        <br></br>
        <div className="col-md-12">
          {/* the title is defined by the functionality (search, genre or sorting options) that is used in the search form 
          if search => title = whatever user types in
          if genre => title = value from the dropdown
          if sorting options => title = label from the radio button options                   
          */}
          <h2 className="heading2">{this.props.title}</h2>
        </div>
        <br></br>
        <div className="col-md-12">
          <Button
            // when button gets clicked it fires a function in Display component which clears the movies list by setting movie array empty.
            onClick={this.props.clearList}
            variant="dark"
            type="submit"
            className="Button-style buttonStyle"
          >
            Clear list
          </Button>
        </div>
      </div>
    );
  }
}
export default TitleOfSearch;
