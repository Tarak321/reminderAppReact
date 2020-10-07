import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
//import LoginContext from '../context/logincontext';
import { useFetch } from "../hooks/use-fetch";

const API_USERS = "http://localhost:4000/sessions";

export default function Logout() {
  const { isLoading, response, error, doFetch, doLogout } = useFetch(API_USERS);
  useEffect(() => {
    doFetch({
      method: "delete",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    });
    doLogout({});
  }, []);

  return (
    // <LoginContext.Provider value={false}>

    <div>
      <h2>Congrats, succefully logged out</h2>
      <Redirect to="/login"/>
    </div>
    // </LoginContext.Provider>
  );
}
