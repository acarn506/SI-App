import React from "react";

const Netid = props => {
  if (props.currentStep !== 0) {
    return null;
  }
  return (
    <div>
      <lable htmlFor="id">Net ID</lable>
      <input
        type="text"
        name="netID"
        placeholder="Enter Net ID"
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Netid;
