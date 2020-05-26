import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import SignIn from "./Pages/Sign-in/SignIn";
import Logged from "./Pages/Logged/Logged";
import ThanksReg from "./Pages/ThanksReg/ThanksReg";
import "./App.css";
import RegisterStudent from "./Pages/Register/RegisterStudent";
import RegisterSI from "./Pages/Register/RegisterSI";
import { AuthContext } from "./Pages/FormElements/Context/Context";
import Aux from "./Hoc/components/Aux";
import DashBoard from "./Pages/DashBoard/DashBoard";
import SISignIn from "./Pages/Sign-in/SISignIn";
import Homepage from "./Pages/Homepage/Homepage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [thanksReg, setThanksReg] = useState(false);
  const [role, setRole] = useState("");

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const signIn = useCallback(() => {
    setThanksReg(true);
  }, []);

  const roleHandler = role => {
    console.log("role", role);
    setRole(role);
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/logged">
          <Logged />
        </Route>
        <Redirect to="/logged" />
      </Switch>
    );
  } else if (thanksReg) {
    routes = (
      <Switch>
        <Route path="/ThanksReg">
          <ThanksReg />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/logged">
          <Logged />
        </Route>
        <Redirect to="/ThanksReg" />
      </Switch>
    );
  } else {
    routes = (
      <div>
        {role === "SI" ? (
          <ul className="mainNav">
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/loginSI">Sign-in SI</Link>
            </li>
            <li>
              <Link to="/registerSI">Register SI</Link>
            </li>
            <li>
              <Link to="/dashBoard">DashBoard</Link>
            </li>
          </ul>
        ) : (
          <ul className="mainNav">
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/loginStudent">Sign-in</Link>
            </li>
            <li>
              <Link to="/registerStudent">Register</Link>
            </li>
          </ul>
        )}

        <Switch>
          <Route path="/" exact>
            <Homepage roleHandler={roleHandler} />
          </Route>
          <Route path="/loginStudent">
            <SignIn />
          </Route>
          <Route path="/registerStudent">
            <RegisterStudent />
          </Route>
          <Route path="/registerSI">
            <RegisterSI />
          </Route>
          <Route path="/loginSI">
            <SISignIn />
          </Route>
          <Route path="/dashBoard">
            <DashBoard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }

  return (
    <Aux>
      <div>
        <h4 className="header-tag">CSU East Bay</h4>
      </div>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          login: login,
          thanksReg: thanksReg,
          signIn: signIn
        }}
      >
        <Router>{routes}</Router>
      </AuthContext.Provider>

      {/*
      <div className="roleHeader">
        {role === "SI" ? <h2>Student</h2> : <h2>SI Leader</h2>}
  </div> */}

      <footer className="footer">
        Development Team: &nbsp;
        <a href="https://github.com/Fs4remi">Fatemeh Saremi,</a> &nbsp;
        <a href="https://github.com/acarn506">Anthony Carnero</a>
      </footer>
    </Aux>
  );
};

export default App;
//example date in background of input slot
