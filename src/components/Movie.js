import React from "react";
import {Col, Row} from "react-bootstrap";

function Movie(props) {
  return (
    <Col lg="4" className="movie">
      <Row>
        <Col md="auto">
          <img
            src={
              "http://image.tmdb.org/t/p/w185//" + props.movieProps.poster_path
            }
            alt="img" className="image"
          ></img>
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
