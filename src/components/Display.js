import React from "react";
import Movie from "./Movie.js";
import Search from "./Search.js";
import image from "./images/popcorn.png";
import TitleOfSearch from "./TitleOfSearch.js";

class Display extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      title: ""
    };
    this.resetList = this.resetList.bind(this);
  }
  //gets the searchString and uses that in API call query
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

//gets the selected genre and uses that in API call query
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

//gets the selected sorting option and uses that in API call query
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

  //shows what search string or sorting option/genre is used 
  setTitle = newTitle => {
    const x = "Results for: " + newTitle;
    this.setState({
      title: x
    });
  };

  //when clicking clear list- button, this sets the movies null
  // --> then display shows the default (popcorn) img
  resetList() {
    this.setState({
      movies: null
    });
  }

  render() {
    let displayResult;
    // if this.state.movies is null, it means that user has just entered the page, refreshed it or cleared the movie list.
    // then the displayResults shows default (popcorn) img
    if (this.state.movies === null) {
      displayResult = (
        <div className="container" style={{ paddingTop: "50px" }}>
          <div className="row justify-content-center">
            <img src={image} alt="popcorn" className="responsive-img" />
          </div>
        </div>
      );
    } else {
      // shows the title of the search, clear list - button and the results for the movie search/query
      displayResult = (
        <>
          <TitleOfSearch title={this.state.title} clearList={this.resetList} />
          <div className="row movieListing">
            {/* checks if the movies array is empty, if true displays message,
      else movies are mapped one by one into separate Movie components*/}
            {this.state.movies.length === 0 ? (
              <div className="container" style={{ paddingTop: "50px" }}>
                <div className="row justify-content-center">
                  <h2 style={{color:"rgb(128, 13, 13)"}} >Sorry no movies found.</h2>
                </div>
              </div>
            ) : (
              this.state.movies.map(movie => (
                <Movie key={movie.id} movieProps={movie} />
              ))
            )}
          </div>
        </>
      );
    }

    return (
      <div className="container-fluid">
        {/*Search component passes query string that user has typed into the input field */}
        <Search
          getSearchString={this.filterBySearch}
          getGenre={this.filterByGenre}
          getSorting={this.filterBySorting}
          getTitle={this.setTitle}
        />
        {/* displays either movielisting or popcorn image depending on the if else above*/}
        {displayResult}
      </div>
    );
  }
}

export default Display;
