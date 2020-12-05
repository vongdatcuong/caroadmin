import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import './App.css';
// Material UI Core
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Header from '../Header';
import Footer from '../Footer';
import DashBoard from '../../components/DashBoard';
import LogIn from '../../components/LogIn';
import SignUp from '../../components/SignUp';
import Profile from '../../components/Profile';
import Loading from '../../layouts/Loading';
import createHashHistory from 'history/createHashHistory';

//const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

function App() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Loading loading={isLoading}/>
      <Router /*history={hashHistory} basename={process.env.PUBLIC_URL} */>
        <Switch>
          <Route path="/logIn">
              {/* Header */}
              <Header/>
              <LogIn setIsLoading={setIsLoading}/>
          </Route>
          <Route path="/signUp">
              {/* Header */}
              <Header/>
              <SignUp setIsLoading={setIsLoading}/>
          </Route>
          <Route path="/profile">
              {/* Header */}
              <Header/>
              <Profile setIsLoading={setIsLoading}/>
          </Route>
          <Route path="/dashboard">
            {/* Header */}
            <Header/>
            {/* End Header */}
            <DashBoard setIsLoading={setIsLoading}/>
            {/* Footer */}
            <Footer/>
            {/* End footer */}
          </Route>
          <Route path="/">
            <Redirect to="/dashboard"/>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;