import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchString: "",
      genreData: [],
      selectedGenre: "",
      selectedSorting: "",
      title: ""
    };
    this.sendDataToDisplay = this.sendDataToDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    // listing options for radio buttons, so that the selected option's label name could be passed to the display component as title
    this.sortingOptions = [
      { displayName: "Most popular", query: "popular" },
      { displayName: "Top rated", query: "top_rated" },
      { displayName: "Upcoming", query: "upcoming" }
    ];
  }

  // passing search/sorting data to display component where it is used in API calls
  sendDataToDisplay = event => {
    event.preventDefault();

    // passes whatever user types into input field
    this.props.getSearchString(this.state.searchString);

    // passes the genre Id that user selects
    this.props.getGenre(this.state.selectedGenre);

    // passes the sorting option that user selects
    this.props.getSorting(this.state.selectedSorting);

    // passes the title to the display that shows what option is used for searching/sorting movies after user clicks search button :
    //if search => title = whatever user types in
    //if genre => title = value from the dropdown
    //if sorting options => title = label from the radio button options
    this.props.getTitle(this.state.title);

    // after search button is clicked the form fields are all cleared
    event.target.reset();
    this.setState({ selectedGenre: "" });
    this.setState({ searchString: "" });
    this.setState({ selectedSorting: "" });
  };
  // displays everything that user types into input field
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, title: value });
  }

  // gets the genre options from API
  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=4dc1cd589c5dc2d032439dc978cbb411&language=en-US"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          //genre array filled with genre options
          genreData: data.genres
        });
      });
  }

  //handles the genre selecting feature
  onSelect(event) {
    //gets the selected genre's id from data-key attribute
    const selectedIndex = event.target.options.selectedIndex;
    const genreId = event.target.options[selectedIndex].getAttribute(
      "data-key"
    );
    //gets the name of the selected genre
    const genreTitle = event.currentTarget.value;

    //setting the id and name of the selected genre
    this.setState({
      selectedGenre: genreId,
      title: genreTitle
    });
  }

  //handles the sorting options feature
  handleSorting(event) {
    //gets the selected sorting option as object that contains the value used for api call and the label name
    // by matching the query to the current target value
    let sortingOption = this.sortingOptions.find(
      sorting => sorting.query === event.currentTarget.value
    );
    //gets the title from the sorting option object
    const labelTitle = sortingOption.displayName;
    //value is used in api calls
    const selectedOption = event.currentTarget.value;

    // setting the sorting's title and api call value
    this.setState({
      selectedSorting: selectedOption,
      title: labelTitle
    });
  }

  render() {
    //mapping genre items for dropdown
    let dropdownItems = this.state.genreData.map(genre => (
      <option data-key={genre.id} key={genre.id}>
        {genre.name}
      </option>
    ));

    //mapping sorting options as radio buttons
    let sortingItems = this.sortingOptions.map(sorting => (
      <Form.Check
        style={{ marginBottom: "8px" }}
        value={sorting.query}
        type="radio"
        label={sorting.displayName}
        checked={this.state.selectedSorting === sorting.query}
        onChange={this.handleSorting}
      />
    ));

    return (
      <div className="container searchForm">
        <Form className="form" onSubmit={this.sendDataToDisplay}>
          <Form.Group>
            <Form.Label className="formLabel">
              Search for movies by name
            </Form.Label>
            <Form.Control
              type="text"
              name="searchString"
              value={this.state.searchString}
              //displays everything that user types in input field
              onChange={this.handleChange}
              placeholder="Type here"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="formLabel">Or search by genre</Form.Label>
            <Form.Control as="select" onChange={this.onSelect}>
              {/*Choose genre is the "default" option and data-key is empty so that it wont be passed to display and used in api calls */}
              <option data-key="">Choose genre</option>
              {/* listing all of the genre options */}
              {dropdownItems}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="formLabel">
              Or search by options below
            </Form.Label>
            {/* listing all of the sorting options: most popular, top rated and upcoming */}
            {sortingItems}
          </Form.Group>
          {/* when  button gets clicked data is "send" to Display component => function sendDataToDisplay*/}
          <Button
            variant="dark"
            type="submit"
            className="Button-style buttonStyle"
          >
            Search
          </Button>
        </Form>
      </div>
    );
  }
}

export default Search;
