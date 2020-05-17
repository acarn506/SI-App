import React from "react";

const Netid = props => {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div>
      <lable htmlFor="id">Net ID</lable>
      <input
        type="text"
        placeholder="Enter Net ID"
        value={props.netID}
        onChange={props.changeHandler}
      />
    </div>
  );
};

export default Netid;
