import React, { Component } from "react";
import Dropdown from "../FormElements/Dropdown";
import Switch from "../FormElements/Switch";
import "./Dark/main.css";
import axios from "axios";

let host = "http://localhost";
let port = "1212";

class DashBoard extends Component {
  state = {
    siInfo: {
      sessions: 3,
      attendees: 6,
      totatlVisits: 25
    },
    studentList: ["as3659", "lo6598", "df6549", "as1236"],
    dateList: ["8-10-20", "8-14-20", "8-26-20"],
    studentID: "",
    theme: "light",
    switchValue: false,
    isLoading: true,
    error: null
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

  removeStudent() {
    let studentList = [...this.state.studentList];

    let newStudentList = studentList.filter(id => {
      return id !== this.state.studentID;
    });

    this.setState({
      studentList: newStudentList
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

  //***** API calls *****

  //GET SI Info when component mounts
  async getPosts() {
    const response = await axios.get(`${host}:${port}/api/course/`);
    try {
      const siInfo = response.data;
      this.setState({
        siInfo: siInfo,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  //GET students based on selected date
  async getStudentList(event) {
    console.log("date", event);

    const response = await axios.get(`${host}:${port}/api/course//${event}`);
    try {
      const studentList = response.data;
      this.setState({
        studentList: studentList,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  //DELETE student from session
  async deleteStudent() {
    this.removeStudent();

    let student = this.state.studentID;
    const response = await axios.delete(
      `${host}:${port}/api/course//${student}`
    );
    try {
      console.log(response);
      console.log(response.data);
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  componentDidMount() {
    //this.getPosts();
  }

  render() {
    const { sessions, attendees, totatlVisits } = this.state.siInfo;
    const { isLoading } = this.state.isLoading;

    let list = this.state.studentList.map((id, i) => {
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
          {this.state.error ? <p>{this.state.error.message}</p> : null}

          {!isLoading ? (
            <div className="statContainer">
              <div className="A">
                <p className="pA">Sessions</p>
                <section>{sessions}</section>
              </div>
              <div className="B">
                <p className="pB">Unique Students</p>
                <section>{attendees}</section>
              </div>
              <div className="C">
                <p className="pC">Visits</p>
                <section>{totatlVisits}</section>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div className="mainContainer">
            <div className="dd-container">
              <Dropdown
                id="dropdown"
                title="Select Course"
                name="course"
                items={options}
                onSelect={this.getStudentList.bind(this)}
              />
            </div>
            <h3 className="listHeader">Attendees</h3>
            <div className="listContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th className="thI">#</th>
                    <th className="thID">Student ID</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </table>

              <div className="buttonContainer">
                {/*<label>RemoveStudent</label> */}
                <div>
                  <input
                    className="inputD"
                    type="text"
                    name="netid"
                    value={this.state.studentID}
                    placeholder="Enter Students ID"
                    onChange={this.studentIDHandler.bind(this)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="buttonR"
                    onClick={this.deleteStudent.bind(this)}
                  >
                    Remove Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
