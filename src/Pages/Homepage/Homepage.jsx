import React from "react";
import "../../App.css";

const Homepage = props => {
  return (
    <div className="homepage">
      <div>
        <button onClick={() => props.roleHandler("student")}>Student</button>
        <button onClick={() => props.roleHandler("SI")}>SI Leader</button>
      </div>
    </div>
  );
};

export default Homepage;
