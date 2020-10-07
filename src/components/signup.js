import React, { useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { Redirect,NavLink } from "react-router-dom";
import moment from "moment"


export default function Signup() {
  const API_USERNEW = "http://localhost:4000/users.json";

  const { isLoading, response, error, doFetch, doLogout } = useFetch(
    API_USERNEW
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact_number: "",
    country: "",
    dob: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const myFun = () => {
    if (alert("Are you sure you want to cancel?") === true)
      window.location.href = "login.html";
  };

  

  const checkForm = (e) => {
    e.preventDefault();
    var name =user.name;
    var password = user.password;
    var password2 = user.password2;

    if (name.toString() === "") {
      alert("Error: name cannot be blank!");
      return false;
    }
    var re = /^\w+$/;
    if (!re.test(name.toString())) {
      alert("Error: name must contain only letters, numbers and underscores!");
      return false;
    }

    if (password.toString() !== "" && password.toString() === password2.toString()) {
      if (password.toString().length < 6) {
        alert("Error: Password must contain at least six characters!");
        return false;
      }
      if (password.toString() === name.toString()) {
        alert("Error: Password must be different from name!");
        return false;
      }
      re = /[0-9]/;
      if (!re.test(password.toString())) {
        alert("Error: password must contain at least one number (0-9)!");
        return false;
      }
      re = /[a-z]/;
      if (!re.test(password.toString())) {
        alert(
          "Error: password must contain at least one lowercase letter (a-z)!"
        );
        return false;
      }
      re = /[A-Z]/;
      if (!re.test(password.toString())) {
        alert(
          "Error: password must contain at least one uppercase letter (A-Z)!"
        );
        return false;
      }
    } else {
      alert("Error: Please check that both the password are same!")
      return false;
    }

    doFetch({
      method: "post",
      body: JSON.stringify({
        user: {
          name: user.name,
          email: user.email,
          contact_number: user.contact_number,
          date_of_birth: user.dob,
          country: user.country,
          password: user.password,
          password_confirmation: user.password2,
        },
      }),
    });
  };

  const cancelFun = () => {
    return <Redirect to="/login" />;
  };

  if (response?.email && response.email.toString()!=="has already been taken") {

    localStorage.setItem("MEM_AUTH_TOKEN", response.token);
    localStorage.setItem("email", response.email);
    localStorage.setItem("id", response.id);
    console.log(response);
    return <Redirect to="/home" />;
  }
  return (
    <div style={{ textAlign: "center" }}>

      <div className="jumbotron text-center">
        <h1>REGISTRATION</h1>
      </div>
      {response && <h3>Email is allready taken</h3>}
      <div className="animate__animated animate__rotateInUpLeft"><h5>Please Enter below information to Register!!</h5></div>
      <form action="#" onSubmit={checkForm}>
        <div className="container-fluid animate__animated animate__rotateInUpRight">
          <div className="row">
            <div className="col text-right">
              <label htmlFor="name">Name*</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="text"
                name="name"
                id="ename"
                value={user.name}
                onChange={handleChange}
                required
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="email">Email Address*</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="email"
                name="email"
                id="eemail"
                value={user.email}
                onChange={handleChange}
                required
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="contact_number">Contact No.</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="number"
                name="contact_number"
                id="econtact"
                value={user.contact_number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="country">Country</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="text"
                name="country"
                id="ecountry"
                value={user.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="dob">Date of Birth</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="date"
                name="dob"
                id="edob"
                value={user.dob}
                max={moment().format("YYYY-MM-DD")}
                onChange={handleChange}
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="password">Password*</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="password"
                pattern=".{8,}"
                name="password"
                id="epass"
                value={user.password}
                required
                title="8 characters minimum"
                onChange={handleChange}
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="password2">Confirm Password*</label>{" "}
            </div>
            <div className="col text-left">
              {" "}
              <input
                type="password"
                name="password2"
                id="epass2"
                value={user.password2}
                onChange={handleChange}
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
              {" "}
              <NavLink to="/login">
              <button className="btn btn-outline-primary">
                Cancel
              </button>
              </NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
