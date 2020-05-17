import React from "react";

const Name = props => {
  if (props.currentStep !== 0) {
    return null;
  }
  return (
    <div>
      <lable htmlFor="name">First Name</lable>
      <input
        type="text"
        name="name"
        placeholder="Enter First Name"
        value={props.fName}
        onChange={props.handleChange}
      />

      <lable htmlFor="name">Last Name</lable>
      <input
        type="text"
        name="name"
        placeholder="Enter Last Name"
        value={props.lName}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Name;
