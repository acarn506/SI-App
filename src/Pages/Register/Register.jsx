import React, { Component } from "react";
import Netid from "./components/Netid";
import Course from "./components/Course";
import Password from "./components/Password";
import "./components/component.css";

//Session-Type: Weekly or review

class Register extends Component {
  state = {
    currentStep: 0,
    role: "student",
    fName: "",
    lName: "",
    netID: "",
    course: "",
    courseList: ["CS401-01", "CS401-02", "ENGL115-01"],
    sessionCode: "",
    password: ""
  };

  roleHandler(event) {
    console.log("switch role");
    this.setState({
      role: event
    });
  }

  handleChange(event) {
    //console.log("event", event.target);
    const { name, value } = event.target;
    console.log("name: ", name, "value: ", value);
    this.setState({
      [name]: value
    });
    //console.log("NetID", this.state.netID);
  }

  courseHandler(course) {
    console.log("Course", course);
    this.setState({
      course: course
    });
  }

  next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 1 ? 2 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
    console.log("next", currentStep);
  }

  prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 0 ? 0 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
    console.log("prev", currentStep);
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

    if (currentStep < 2) {
      return (
        <button type="button" onClick={this.next.bind(this)}>
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    let role = this.state.role === "student" ? "Student" : "SI Leader";

    let choice = null;
    switch (this.state.role) {
      case "student":
        choice = (
          <React.Fragment>
            <Netid
              currentStep={this.state.currentStep}
              handleChange={this.handleChange.bind(this)}
            />
          </React.Fragment>
        );
        break;
      case "siLeader":
        choice = (
          <React.Fragment>
            <Netid
              currentStep={this.state.currentStep}
              handleChange={this.handleChange.bind(this)}
            />
            <Course
              courseList={this.state.courseList}
              handleChange={this.courseHandler.bind(this)}
              currentStep={this.state.currentStep}
            />
            <Password
              currentStep={this.state.currentStep}
              handleChange={this.handleChange.bind(this)}
            />
          </React.Fragment>
        );
        break;
      default:
        choice = <h1>Some type of Problem!</h1>;
    }

    return (
      <div className="regContainer">
        <h1>{`Register ${role}`}</h1>
        <h2> CurrentStep {this.state.currentStep}</h2>
        <div className="componentContainer">{choice}</div>
        {this.nextButton}
        <button onClick={this.roleHandler.bind(this, "student")}>
          Student
        </button>
        <button onClick={this.roleHandler.bind(this, "siLeader")}>
          SI Leader
        </button>
      </div>
    );
  }
}

export default Register;
