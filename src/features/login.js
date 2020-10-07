import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useFetch } from "../hooks/use-fetch";


export default function Login() {
  
  const API_SESSIONS = "http://localhost:4000/sessions";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { isLoading, response, error, doFetch, doLogout } = useFetch(
    API_SESSIONS
  );

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

 
  if (response?.email && !error) {
    localStorage.setItem("MEM_AUTH_TOKEN", response.token);
    localStorage.setItem("email", response.email);
    localStorage.setItem("id", response.id);
    console.log(response);
    return <Redirect to="/home" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    doFetch({
      method: "post",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  };
  
  
  return (
    <div className="animate__animated animate__backInUp" >
      <h1>Welcome to pill reminder!!</h1>
      <form className="container" onSubmit={handleSubmit}>
        {response && <h3>Email or password is invalid!!</h3>}
        {/* {error && JSON.stringify(error)} */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange}
            value={user.email}
            name="email"
            className="form-control"
          />
        </div>
        <div className="form-group  " >
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            className="form-control"
            // style={{width:"200px" }}
          />
        </div>
    
        <button className="btn btn-primary md-4" type="submit">
          Sign in
        </button>
      </form>
      <div>
        <NavLink to="/forgot">
          <button className="btn btn-primary mr-2 mt-2">Reset</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="btn btn-primary ml-2 mt-2">Sign up</button>
        </NavLink>
      </div>
    </div>
  );
}
