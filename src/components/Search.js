import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Search extends Component {
  constructor() {
    super();
    this.state = { searchString: "" };
    this.sendDataToDisplay = this.sendDataToDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // passing query data to Display component where it is used in API call
    sendDataToDisplay = (event) => {
    event.preventDefault()
    this.props.getSearchString(this.state.searchString);
}
  // displays everything that user types in input field
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
   
  }

  render() {
    return (
      <div className="Center-text">
        <form>
          <input
            type="text"
            name="searchString"
            value={this.state.searchString}
            //displays everything that user types in input field
            onChange={this.handleChange}
            placeholder="Search for..."
          />
          {/* when this button gets clicked the query data gets "send" to Display component */}
          <Button onClick={this.sendDataToDisplay} type="submit" className="Button-style">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default Search;
