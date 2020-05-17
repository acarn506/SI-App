import React, { Component } from "react";
import Name from "./components/Name.jsx";
import Netid from "./components/Netid";

class Register extends Component {
  state = {
    currentStep: 0,
    role: "student",
    fName: "",
    lName: "",
    netID: "",
    course: "",
    sessionCode: "",
    password: ""
  };

  roleHandler(event) {
    this.setState({
      role: event
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 0 ? 1 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 0 ? 0 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  get prevButton() {
    let currentStep = this.state.currentStep;

    if (currentStep !== 0) {
      return (
        <button type="button" onClick={this.prev.bind(this)}>
          Previous
        </button>
      );
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;

    if (currentStep < 1) {
      return (
        <button type="button" onClick={this.next.bind(this)}>
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    let choice = null;
    switch (this.state.role) {
      case "student":
        choice = (
          <React.Fragment>
            <Name
              currentStep={this.state.currentStep}
              handleChange={this.handleChange.bind(this)}
            />
            <Netid
              currentStep={this.state.currentStep}
              handleChange={this.handleChange.bind(this)}
            />
          </React.Fragment>
        );
        break;
      case "siLeader":
        break;
      default:
        choice = <h1>Some type of Problem!</h1>;
    }

    return (
      <div>
        {choice}
        {this.prevButton}
        {this.nextButton}
        <button onClick={() => this.roleHandler.bind(this, "student")}>
          Student
        </button>
        <button onClick={() => this.roleHandler.bind(this, "siLeader")}>
          SI Leader
        </button>
      </div>
    );
  }
}

export default Register;
