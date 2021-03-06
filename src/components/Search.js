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
    // checks if the form fields are empty, if true alert message pops up
    if (
      this.state.searchString === "" &&
      this.state.selectedGenre === "" &&
      this.state.selectedSorting === ""
    ) {
      event.preventDefault();
      alert("Please type in movie title or choose from other options.");
    } else {
      event.preventDefault();
      // passes whatever user types into input field
      this.props.getSearchString(this.state.searchString);

      // passes the genre Id that user selects
      this.props.getGenre(this.state.selectedGenre);

      // passes the sorting option that user selects
      this.props.getSorting(this.state.selectedSorting);

      // passes the title to the display that shows what option is used for searching/sorting movies after user clicks search button :
      //if search => title = whatever user types in
      //if genre => title = genre name from the dropdown
      //if sorting options => title = label from the radio button options
      this.props.getTitle(this.state.title);

      // after search button is clicked the form fields are all cleared
      event.target.reset();
      this.setState({ selectedGenre: "" });
      this.setState({ searchString: "" });
      this.setState({ selectedSorting: "" });
    }
  };
  // displays what user types into input field
  // and also clears selectedGenre and selectedSorting so that user is allowed to use only one search functionality at a time.
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      title: value,
      selectedGenre: "",
      selectedSorting: ""
    });
  }
  // gets the genre options from API
  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_API_KEY +
        "&language=en-US"
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
    //checks if user has picked a genre option, if there is no value it means that the default option "choose genre" is active
    if (event.target.value !== "") {
      //gets the selected genre's id
      const genreId = Number(event.currentTarget.value);
      //gets the name of the selected genre by matching the selected genre id in the genredata and getting the name of the right match.
      const foundGenreData = this.state.genreData.find(
        genre => genre.id === genreId
      );
      const genreTitle = foundGenreData.name;

      //setting the id and name of the selected genre
      // and also clears searchString and selectedSorting so that user is allowed to use only one search functionality at a time.
      this.setState({
        selectedGenre: genreId,
        selectedSorting: "",
        searchString: "",
        title: genreTitle
      });
    } else {
      this.setState({
        selectedGenre: ""
      });
    }
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
    // and also clears searchString and selectedGenre so that user is allowed to use only one search functionality at a time.
    this.setState({
      selectedSorting: selectedOption,
      selectedGenre: "",
      searchString: "",
      title: labelTitle
    });
  }

  render() {
    //mapping genre items for dropdown
    let dropdownItems = this.state.genreData.map(genre => (
      <option value={genre.id} key={genre.id}>
        {genre.name}
      </option>
    ));

    //mapping sorting options for radio buttons
    let sortingItems = this.sortingOptions.map(sorting => (
      <Form.Check
        key={sorting.query}
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
            <Form.Control
              as="select"
              value={this.state.selectedGenre}
              onChange={this.onSelect}
            >
              {/*Choose genre is the "default" option and value is empty so that it wont be passed to display and used in api calls */}
              <option value="">Choose genre</option>
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
          {/* when  button gets clicked data is handled => function sendDataToDisplay*/}
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
