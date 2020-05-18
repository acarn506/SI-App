import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Switch from "../FormElements/Switch";
import "./Dark/main.css";

class DashBoard extends Component {
  state = {
    startDate: new Date(),
    sessions: 3,
    attendees: 6,
    totatlVisits: 25,
    idList: ["as3659", "lo6598", "df6549", "as1236"],
    dateList: ["8/10/20", "8/14/20", "8/26/20"],
    studentID: "",
    theme: "light",
    switchValue: false
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  studentIDHandler(event) {
    this.setState({
      studentID: event.target.value
    });
  }

  addStudent() {
    let idList = [...this.state.idList];
    if (idList.includes(this.state.studentID)) {
      return;
    } else {
      idList.push(this.state.studentID);
    }
    this.setState({
      idList: idList
    });
  }

  removeStudent() {
    let idList = [...this.state.idList];

    let newidList = idList.filter(id => {
      return id !== this.state.studentID;
    });

    this.setState({
      idList: newidList
    });
  }

  handleToggle() {
    let switchValue = this.state.switchValue;
    let theme = this.state.theme;
    theme = theme === "light" ? "dark" : "light";

    this.setState({
      switchValue: !switchValue,
      theme: theme
    });
  }

  render() {
    let list = this.state.idList.map((id, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{id}</td>
        </tr>
      );
    });

    const options = this.state.dateList.map(date => {
      return date;
    });
    return (
      <div className={`body${this.state.theme}`}>
        <h1 className="header">SI Dashboard</h1>
        <div className="container">
          <div className="toggle-container">
            <h1 className="switchTitle">Light / Dark Mode</h1>
            <Switch
              className="switch"
              isOn={this.state.switchValue}
              handleToggle={this.handleToggle.bind(this)}
              onColor="#0077FF"
            />
          </div>
          <div className="statContainer">
            <p className="pA">Sessions</p>
            <section className="A">{this.state.sessions}</section>
            <p className="pB">Unique Students</p>
            <section className="B">{this.state.attendees}</section>
            <p className="pC">Visits</p>
            <section className="C">{this.state.totatlVisits}</section>
          </div>
          <div className="mainContainer">
            <Dropdown
              id="dropdown"
              options={options}
              onChange={this._onSelect}
              placeholder="Select Session Date"
            />
            <div className="buttonContainer">
              {/*<label>Student ID</label> */}
              <input
                type="text"
                value={this.state.studentID}
                placeholder="Enter Students ID"
                onChange={this.studentIDHandler.bind(this)}
              />
              <button type="submit" onClick={this.addStudent.bind(this)}>
                Add Student
              </button>
              <button type="submit" onClick={this.removeStudent.bind(this)}>
                Remove Student
              </button>
            </div>
            <h3 className="listHeader">Attendees</h3>
            <table className="table">
              <thead>
                <tr>
                  <th className="thI">#</th>
                  <th className="thID">Student ID</th>
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
