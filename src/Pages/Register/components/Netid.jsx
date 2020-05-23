import React from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PATTERN
} from "../../FormElements/Util/Validators.jsx";

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
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_PATTERN()]}
      />
    </div>
  );
};

export default Netid;
