import React from "react";
import {Col, Row} from "react-bootstrap";
import errorImage from "./images/error.jpg";

function Movie(props) {
  // checks if the movie has image available or not, if true displays the image, if not displays the default errorImage
  let moviePoster = props.movieProps.poster_path
    ? "http://image.tmdb.org/t/p/w342//" + props.movieProps.poster_path
    : errorImage;

  return (
    <Col xl="4" className="movie">
      <Row>
        <Col sm="auto">
          <img src={moviePoster} alt="movie poster" className="image" style={{width:"300px", height:"278", displayInline:"block"}}/>
        </Col>
        {/*Movie component gets its properties from Display movies array*/}
        <Col md="auto">
          <h3>{props.movieProps.title}</h3>
          <h5>Story Overview:</h5>
          <p>{props.movieProps.overview}</p>
          <h5>Release Date:</h5>
          <p> {props.movieProps.release_date}</p>
          <h5>Rating:</h5>
          <p> {props.movieProps.vote_average}</p>
        </Col>
      </Row>
    </Col>
  );
}
export default Movie;
