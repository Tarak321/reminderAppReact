import React from "react";
import { NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <nav className="navbar navbar-center navbar-light navbar-expand-lg bg-success tsg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#top-nav"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div id="top-nav" className="collapse navbar-collapse">
        <NavLink className="navbar-brand" to="/home">
          Home
        </NavLink>
        <NavLink className="navbar-brand" to="/profile">
          My Profile
        </NavLink>
        <NavLink className="navbar-brand" to="/medical">
          Medical History
        </NavLink>
      </div>
      <NavLink className="navbar-brand" to="/logout">
        Logout
      </NavLink>
    </nav>
  );
}
