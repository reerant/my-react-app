import React from "react";
//import moviesData from "./moviesData";
import Movie from "./Movie.js";

class Display extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=4dc1cd589c5dc2d032439dc978cbb411&language=en-US&query=marvel&page=1&include_adult=false"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results
        });
        //console.log(this.state.movies);
      });
  }

  render() {
    const movieList = this.state.movies.map(movie => <Movie  movieProps={movie} />)
    

    return (
      <div className="container-fluid">
        <div className="row">{movieList}
        </div>
     </div>
      
    )
    }}


export default Display;
