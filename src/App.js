import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";
import moment from 'moment';

// import $ from 'jquery';
// import Popper from 'popper.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./components/home";
import Profile from "./components/profile";
import Medical from "./components/medical";
import Forgot from "./components/forgot";
import Signup from "./components/signup";
import Logout from "./components/logout";
import UserList from "./components/users/user-list";
import User from "./pages/users";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useFetch } from "./hooks/use-fetch";
import Login from "./features/login";

const API_SESSIONS = "http://localhost:4000/sessions";

function App() {
  useEffect(()=>{
return <Redirect to="/login"/>;
  },[])
  return (
    <div className="container-fluid" style={{ textAlign: "center" }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
        <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/medical">
            <Medical />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/users">
            <User />
          </Route>
          <Route path="/userlist">
            <UserList />
          </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
