import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SignIn from './Pages/Sign-in/SignIn'
import Logged from './Pages/Logged/Logged'
import ThanksReg from './Pages/ThanksReg/ThanksReg'
import './App.css';
import Register from './Pages/Register/Register';
import {AuthContext} from './Pages/FormElements/Context/Context'
import Aux from './Hoc/components/Aux'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [thanksReg, setThanksReg] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const signIn = useCallback(() => {
    setThanksReg(true);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
      <Route path='/logged'>
        <Logged/>
      </Route>
      <Redirect to='/logged'/>
      </Switch>
    )
  }  else if (thanksReg) {
    routes = (
      <Switch>
      <Route path='/ThanksReg'>
        <ThanksReg/>
      </Route>
      <Route path='/sign-in'>
           <SignIn/>
      </Route>
      <Route path='/logged'>
        <Logged/>
      </Route>
      <Redirect to='/ThanksReg'/>
      </Switch>
    )
  }
  else {
    routes = (
         <Switch>
         <Route path='/sign-in' exact>
           <SignIn/>
         </Route>
         <Route path='/register'>
           <Register/>
         </Route>
         <Redirect to='/sign-in'/>
       </Switch>
    )
  }


  return (
    <Aux>
      <div>
        <h1 className='header'>CS 301 Data Structures</h1>
        <h4 className='header-tag'>CSU East Bay</h4>
      </div>
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, thanksReg: thanksReg, signIn: signIn}}>
        <Router>
          {routes}
        </Router>
      </AuthContext.Provider>
      <footer className='footer'>
        Development Team: &nbsp; 
        <a href="https://github.com/Fs4remi">Fatemeh Saremi,</a> &nbsp; 
        <a href="https://github.com/acarn506">Anthony Carnero</a>

      </footer>
    </Aux>

  )
}

export default App
//example date in background of input slot

