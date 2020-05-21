import React, { Component } from "react";
import Dropdown from "../FormElements/Dropdown";
import Switch from "../FormElements/Switch";
import "./Dark/main.css";
import API from "../FormElements/Util/API";

class DashBoard extends Component {
  state = {
    startDate: new Date(),
    siInfo: {
      sessions: 3,
      attendees: 6,
      totatlVisits: 25
    },
    idList: ["as3659", "lo6598", "df6549", "as1236"],
    dateList: ["8/10/20", "8/14/20", "8/26/20"],
    selctedDate: "",
    studentID: "",
    theme: "light",
    switchValue: false,
    isLoading: true,
    error: null
  };

  async getPosts() {
    const response = await API.get(`courses/`);
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

  dateHandler(date) {
    console.log("Date", date);
    this.setState({
      selctedDate: date
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

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { sessions, attendees, totatlVisits } = this.state.siInfo;
    const { isLoading } = this.state.isLoading;

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
                onChange={this.dateHandler.bind(this)}
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
                <input
                  className="inputD"
                  type="text"
                  value={this.state.studentID}
                  placeholder="Enter Students ID"
                  onChange={this.studentIDHandler.bind(this)}
                />
                {/* <button type="submit" onClick={this.addStudent.bind(this)}>
                Add Student
            </button> */}
                <button
                  type="submit"
                  className="buttonR"
                  onClick={this.removeStudent.bind(this)}
                >
                  Remove Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
