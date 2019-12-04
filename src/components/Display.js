import React from "react";
import Movie from "./Movie.js";
import Search from "./Search.js";
import image from "./images/popcorn.png";
import TitleOfSearch from "./TitleOfSearch.js";

class Display extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      title: ""
    };
    this.resetList = this.resetList.bind(this);
  }
  //gets the searchString from child component Search and uses that in API call query
  filterBySearch = searchString => {
    if (searchString !== "") {
      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=en-US&query=" +
          searchString +
          "&page=1&include_adult=false"
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            //movies array filled with movie data
            movies: data.results
          });
        });
    }
  };

  filterByGenre = genre => {
    if (genre !== "") {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
          genre
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            //movies array filled with movie data
            movies: data.results
          });
        });
    }
  };

  filterBySorting = option => {
    if (option !== "") {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          option +
          "?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=en-US&page=1"
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            //movies array filled with movie data
            movies: data.results
          });
        });
    }
  };

  setTitle = newTitle => {
    const x = "Results for: " + newTitle;
    this.setState({
      title: x
    });
  };

  resetList() {
    this.setState({
      movies: []
    });
  }

  render() {
    return (
      <div className="container-fluid">
        {/*Search component passes query string that user has typed into the input field */}
        <Search
          getSearchString={this.filterBySearch}
          getGenre={this.filterByGenre}
          getSorting={this.filterBySorting}
          getTitle={this.setTitle}
        />
        {/* checks if the movies array is empty, if so does nothing, 
        else shows TitleOfSearch and clear-button */}
        {this.state.movies.length === 0 ? (
          ""
        ) : (
          <TitleOfSearch title={this.state.title} clearList={this.resetList} />
        )}
        <div className="row movieListing">
          {/* checks if the movies array is empty, if so displays the popcorn image,
          else movies are mapped one by one into separate Movie components*/}
          {this.state.movies.length === 0 ? (
            <div className="container" style={{ paddingTop: "50px" }}>
              <div className="row justify-content-center">
                <img src={image} alt="popcorn" className="responsive-img" />
              </div>
            </div>
          ) : (
            this.state.movies.map(movie => <Movie movieProps={movie} />)
          )}
        </div>
      </div>
    );
  }
}

export default Display;
