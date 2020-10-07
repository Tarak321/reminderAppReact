import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { Redirect,NavLink } from "react-router-dom";

export default function Forgot() {
  const API_SESSIONS = "http://localhost:4000/sessions/changepass";

  const { isLoading, response, error, doFetch, doLogout } = useFetch(
    API_SESSIONS
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
    newpassword: "",
    newpassword2: "",
  });
  const handlechange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var name =user.email;
    var oldpassword=user.password;
    var password = user.newpassword;
    var password2 = user.newpassword2;

    if (name.toString() === "") {
      alert("Error: name cannot be blank!");
      return false;
    }
    var re = /^\w+$/;
   
    if (oldpassword.toString().length < 8) {
      alert("Error: Password must contain at least eight characters!");
      return false;
    }
    if (oldpassword.toString() === name.toString()) {
      alert("Error: Password must be different from email!");
      return false;
    }
    re = /[0-9]/;
    if (!re.test(oldpassword.toString())) {
      alert("Error: Password must contain at least one number (0-9)!");
      return false;
    }
    re = /[a-z]/;
    if (!re.test(oldpassword.toString())) {
      alert(
        "Error: Password must contain at least one lowercase letter (a-z)!"
      );
      return false;
    }
    re = /[A-Z]/;
    if (!re.test(oldpassword.toString())) {
      alert(
        "Error: Password must contain at least one uppercase letter (A-Z)!"
      );
      return false;
    }

    if (password.toString() !== "" && password.toString() === password2.toString()) {
      if (password.toString().length < 8) {
        alert("Error: New Password must contain at least eight characters!");
        return false;
      }
      if (password.toString() === name.toString()) {
        alert("Error: New Password must be different from email!");
        return false;
      }
      re = /[0-9]/;
      if (!re.test(password.toString())) {
        alert("Error: New Password must contain at least one number (0-9)!");
        return false;
      }
      re = /[a-z]/;
      if (!re.test(password.toString())) {
        alert(
          "Error: New Password must contain at least one lowercase letter (a-z)!"
        );
        return false;
      }
      re = /[A-Z]/;
      if (!re.test(password.toString())) {
        alert(
          "Error: New Password must contain at least one uppercase letter (A-Z)!"
        );
        return false;
      }
    } else {
      alert("Error: Please check that both the new passwords are same!")
      return false;
    }

    doFetch({
      method: "post",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        newpassword: user.newpassword
      }),
    });
  };
  useEffect(() => {
    console.log(response);
  }, [response]);
  // const cancelFun = (e) => {
  //   e.preventDefault();
  //   return <Redirect to="/login" />;
  // };
  if (response?.email && !error) {
    localStorage.setItem("MEM_AUTH_TOKEN", response.token);
    localStorage.setItem("email", response.email);
    localStorage.setItem("id", response.id);
    console.log(response);
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div className="jumbotron text-center animate__animated animate__rollIn">
        <h1>CHANGE PASSWORD</h1>
      </div>
      {response && <h3>Email or password is invalid!!</h3>}
        <div className="container-fluid animate__animated animate__rollIn">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="empemail">Email Address</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="email"
                name="email"
                id="eemail"
                value={user.email}
                onChange={handlechange}
                required
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="empname">Old Password</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="password"
                name="password"
                id="epass"
                value={user.password}
                onChange={handlechange}
                required
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="empname">New Password</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="password"
                name="newpassword"
                id="enewpass"
                value={user.newpassword}
                onChange={handlechange}
                required
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="empname">Confirm Password</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="password"
                name="newpassword2"
                id="enewpass2"
                value={user.newpassword2}
                onChange={handlechange}
                required
              />{" "}
            </div>
          </div>
          <div className="row pd">
            <div className="col text-right">
              {" "}
              <input
                type="submit"
                className="btn btn-outline-primary"
                value="Submit"
              />
            </div>
            <div className="col text-left">
            <NavLink to="/login">
              <button className="btn btn-primary" >
                Cancel
              </button>
              </NavLink>
            </div>
          </div>
          </form>
        </div>
    </div>
  );
}
