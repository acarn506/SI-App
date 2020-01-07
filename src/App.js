import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import FirstPage from './Pages/FirstPage/FirstPage'
import Register from './Pages/Register/Register'
import SignIn from './Pages/Sign-in/SignIn'
import Logged from './Pages/Logged/Logged'
import './App.css';

const App = () => {
  return (
<Router>
      <Switch>
        <Route path='/' exact>
          <FirstPage/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/sign-in'>
          <SignIn/>
        </Route>
        <Route path='/logged'>
          <Logged/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    </Router>
  )
}

export default App