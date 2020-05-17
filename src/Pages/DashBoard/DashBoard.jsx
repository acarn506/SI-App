import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DashBoard.css";

class DashBoard extends Component {
  state = {
    startDate: new Date(),
    sessions: 3,
    attendees: 6,
    totatlVisits: 25,
    idList: ["as3659", "lo6598", "df6549", "as1236"]
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    let list = this.state.idList.map((id, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{id}</td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <h1 className="header">SI Dashboard</h1>
        <div className="body">
          <div className="sectionContainer">
            <p>Number of Sessions</p>
            <section className="A">{this.state.sessions}</section>
            <p>Number of New Attendees</p>
            <section className="B">{this.state.attendees}</section>
            <p>Total Number of Visits</p>
            <section className="C">{this.state.totatlVisits}</section>
          </div>
          <div className="listContainer">
            <DatePicker
              className="datePicker"
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
            <h3 className="listHeader">Attendees</h3>
            <table>
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
      </React.Fragment>
    );
  }
}

export default DashBoard;
