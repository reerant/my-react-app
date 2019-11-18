import React from "react";
import Button from "react-bootstrap/Button";

function Search() {
  return (
    <div className="Center-text">
      <form>
        <input placeholder="Search for..." />
        <Button className="Button-style">Search</Button>
      </form>
     
    </div>
   
  );
}

export default Search;
