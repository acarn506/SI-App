import React from "react";

const Password = props => {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div>
      <label htmlFor="pass">Password (8 characters minimum):</label>
      <input
        type="password"
        className="password"
        name="password"
        placeholder="Enter Password"
        onChange={props.handleChange}
        minLength="8"
      />
    </div>
  );
};

export default Password;
