import React from "react";
import Movie from "./Movie.js";
import Search from "./Search.js";

class Display extends React.Component {
  constructor() {
    super();
    this.state = {
       movies: []
    };
  }
  //gets the searchString from child component Search and uses that in API call query
  searchData = searchString => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=4dc1cd589c5dc2d032439dc978cbb411&language=en-US&query=" +
        searchString +
        "&page=1&include_adult=false"
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        this.setState({
          //movies array filled with movie data 
          movies: data.results
        });
      });
  };

  render() {
    return (
      <div className="container-fluid">
        {/*Search component passes query string that user has typed into the input field */}
        <Search getSearchString={this.searchData} />
        <div className="row">
          {/* checks if the movies array is empty, if so displays the text below. */}
          {this.state.movies.length === 0 ? (
            <div>No movies found.</div>
          ) : 
           /*if movies array has data in it, movies are mapped one by one into separate Movie components*/
          (this.state.movies.map(movie => <Movie movieProps={movie} />)
          )}
        </div>
      </div>
    );
  }
}

export default Display;
