import React from "react";

function Movie(props) {
  return (
    <div className="col-md-6 movie">
      <div className="row">
        <div className="col-md-3">
          <img
            src={
              "http://image.tmdb.org/t/p/w185//" + props.movieProps.poster_path
            }
            alt="img"
          ></img>
        </div>
        {/*Movie component gets its properties from Display movies array -> data.results from API call  */}
        <div className="col-md-9">
          <h3>{props.movieProps.title}</h3>
          <h5>Story Overview:</h5>
          <p>{props.movieProps.overview}</p>
          <h5>Release Date:</h5>
          <p> {props.movieProps.release_date}</p>
        </div>
      </div>
    </div>
  );
}
export default Movie;
