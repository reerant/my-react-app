import React from "react";
import { Link } from "react-router-dom";
import image from "./images/movies.png";
import { Col, Row } from "react-bootstrap";

// home/landing page for the application
function Home() {
  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: " rgb(223, 223, 223)",
          paddingTop: "50px",
          paddingBottom: "50px",
          borderRadius: "10px",
          marginBottom: "80px",
          borderStyle: "double",
          boxShadow: "5px 10px 18px #888888"
        }}
      >
        <div className="container">
          <Row>
            <Col md="6">
              <div className="row justify-content-center">
                <img
                  src={image}
                  alt="movies"
                  className="responsive-img"
                  style={{ marginBottom: "40px" }}
                />
              </div>
            </Col>
            <Col md="6">
              <div
                className="row justify-content-center text-center"
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <h3>
                  Don't Know What to Watch? Click on Search and Start Exploring!
                </h3>
              </div>

              <br></br>
              <div className="row justify-content-center">
                {/* Router link to movie search page */}
                <Link className="buttonLink" to="/search">
                  Search
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Home;
