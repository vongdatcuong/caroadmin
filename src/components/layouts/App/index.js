import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
// Material UI Core
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "../Header";
import Footer from "../Footer";
import DashBoard from "../../../feature/Main/DashBoard/index";
import LogIn from "../../../feature/Authentication/LogIn/index";
import SignUp from "../../../feature/Authentication/SignUp/index";
import Profile from "../../../feature/Profile/index";
import Loading from "../Loading";
import createHashHistory from "history/createHashHistory";
import { SocketStateProvider } from "../../../context/socket-context";
import { LoadingStateProvider } from "../../../context/loading-context";
import Game from "../../../feature/Main/Game";
import AccountValidation from "../../../feature/Authentication/AccountValidation";
import ResetPassword from "../../../feature/Authentication/ResetPassword";
import ForgetPassword from "../../../feature/Authentication/ForgetPassword";
import LeftDrawer from "../Drawer";
import Main from "../Main";
import PlayerManager from "../../../feature/Main/PlayerManager";
import StaffManager from "../../../feature/Main/StaffManager";
import GameManager from "../../../feature/Main/GameManager";
//const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

function App() {
  return (
    <SocketStateProvider>
      <LoadingStateProvider>
        <React.Fragment>
          <CssBaseline />
          <Loading />
          <Router /*history={hashHistory} basename={process.env.PUBLIC_URL} */>
            <Switch>
              <Route path="/logIn">
                {/* Header */}
                <Header />
                <LogIn />
              </Route>
              {/*<Route path="/signUp">
                <Header />
                <SignUp />
              </Route>*/}
              <Route path="/profile">
                <Main>
                  <Profile />
                </Main>
              </Route>
              <Route path="/player">
                <Main>
                  <PlayerManager />
                </Main>
              </Route>
              <Route path="/staff">
                <Main>
                  <StaffManager />
                </Main>
              </Route>
              <Route path="/user/:userid">
                <Main>
                  <GameManager />
                </Main>
              </Route>
              <Route path="/game">
                <Main>
                  <GameManager />
                </Main>
              </Route>
              <Route path="/account-validation/:token">
                <Header />
                <AccountValidation />
              </Route>
              <Route path="/forget-password">
                <Header />
                <ForgetPassword />
              </Route>
              <Route path="/reset-password/:token">
                <Header />
                <ResetPassword />
              </Route>
              <Route path="/">
                <Redirect to="/logIn" />
              </Route>
            </Switch>
          </Router>
        </React.Fragment>
      </LoadingStateProvider>
    </SocketStateProvider>
  );
}

export default App;
