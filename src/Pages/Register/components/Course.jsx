import React from "react";
import Dropdown from "../../FormElements/Dropdown";
import "./component.css";

const Course = props => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div className="dropdownContainer">
      <Dropdown
        id="dropdown"
        title="Select Course"
        name="course"
        items={props.courseList}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Course;
