import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SignIn from './Pages/Sign-in/SignIn'
import Logged from './Pages/Logged/Logged'
import './App.css';
import Register from './Pages/Register/Register';
import {AuthContext} from './Pages/FormElements/Context/Context'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
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
  } else {
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
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login}}>
      <Router>
       {routes}
      </Router>
    </AuthContext.Provider>
  )
}

export default App
//example date in background of input slot


