import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import Layout from "../pages/layout";
import moment from "moment"
export default function Profile() {
  const id = localStorage.getItem("id");
  const usename = localStorage.getItem("name");
  const API = `http://localhost:4000/users/${id}.json`;
  const API_DEPENDENTS = `http://localhost:4000/dependents/${id}/deps.json`;
  const [cancelUser, setCancelUser] = useState({
    empname: "",
    empemail: "",
    empcontact: "",
    empblood: "",
    empdob: "",
    empweight: "",
    empheight: "",
  });
  const [cancelDep, setCancelDep] = useState({
    depname: "",
    depemail: "",
    depcontact: "",
    depblood: "",
    depdob: "",
    depweight: "",
    depheight: "",
  });
  const [screenName, setscreenName] = useState(null);

  const [user, setUser] = useState({
    empname: "",
    empemail: "",
    empcontact: "",
    empblood: "",
    empdob: "",
    empweight: "",
    empheight: "",
  });
  const [changedep, setchangeDep] = useState(null);
  const [depIsPresent, setDepIsPresent] = useState(false);
  const API_DEPNEW = "http://localhost:4000/dependents.json";
  const {
    isLoading: depnewisLoading,
    response: depnewresponse,
    error: depnewperror,
    doFetch: depnewdoFetch,
    doLogout: depnewdoLogout,
  } = useFetch(API_DEPNEW);

  const API_DEPCHANGE = `http://localhost:4000/dependents/${changedep}.json`;
  const {
    isLoading: depchangeisLoading,
    response: depchangeresponse,
    error: dechangeerror,
    doFetch: depchangedoFetch,
    doLogout: depchangedoLogout,
  } = useFetch(API_DEPCHANGE);

  const userhandleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const {
    isLoading: userisLoading,
    response: userresponse,
    error: usererror,
    doFetch: userdoFetch,
    doLogout: userdoLogout,
  } = useFetch(API);

  useEffect(() => {
    userdoFetch({
      method: "get",
    });
  }, []);

  useEffect(() => {
    if (userresponse) {
      setUser({
        empname: userresponse.name,
        empemail: userresponse.email,
        empcontact: userresponse.contact_number,
        empblood: userresponse.blood_group,
        empdob: userresponse.date_of_birth,
        empweight: userresponse.weight,
        empheight: userresponse.height,
      });
      setCancelUser({
        empname: userresponse.name,
        empemail: userresponse.email,
        empcontact: userresponse.contact_number,
        empblood: userresponse.blood_group,
        empdob: userresponse.date_of_birth,
        empweight: userresponse.weight,
        empheight: userresponse.height,
      });
      setscreenName(userresponse.name);
    }
  }, [userresponse]);

  const [dep, setDep] = useState({
    depname: "",
    depemail: "",
    depcontact: "",
    depblood: "",
    depdob: "",
    depweight: "",
    depheight: "",
  });

  const dephandleChange = (e) => {
    setDep({
      ...dep,
      [e.target.name]: e.target.value,
    });
  };

  const {
    isLoading: depisLoading,
    response: depresponse,
    error: deperror,
    doFetch: depdoFetch,
    doLogout: depdoLogout,
  } = useFetch(API_DEPENDENTS);

  // document.getElementById("ename").value=userresponse.name;

  useEffect(() => {
    depdoFetch({
      method: "get",
    });
  }, []);
  const [deptotalstate, setDeptotalstate] = useState(null);
  useEffect(() => {
    setDeptotalstate(depresponse);
  }, [depresponse]);

  const [dummydep, setdummydep] = useState(0);
  const myDep = (e) => {
    var pres = false;
    e.preventDefault();
    setdummydep(e.target.value.toString());
    for (var i = 0; i < deptotalstate.length; i++) {
      if (
        deptotalstate[i].relationship.toString() === e.target.value.toString()
      ) {
        pres = true;
        setchangeDep(deptotalstate[i].id);
        setDep({
          depname: deptotalstate[i].name,
          depemail: deptotalstate[i].email_address,
          depcontact: deptotalstate[i].contact_number,
          depblood: deptotalstate[i].blood_group,
          depdob: deptotalstate[i].date_of_birth,
          depweight: deptotalstate[i].weight,
          depheight: deptotalstate[i].height,
        });
        setCancelDep({
          depname: deptotalstate[i].name,
          depemail: deptotalstate[i].email_address,
          depcontact: deptotalstate[i].contact_number,
          depblood: deptotalstate[i].blood_group,
          depdob: deptotalstate[i].date_of_birth,
          depweight: deptotalstate[i].weight,
          depheight: deptotalstate[i].height,
        });
        setDepIsPresent(true);
      }
    }
    if (!pres) {
      setDep({
        depname: "",
        depemail: "",
        depcontact: "",
        depblood: "",
        depdob: "",
        depweight: "",
        depheight: "",
      });
      setCancelDep({
        depname: "",
        depemail: "",
        depcontact: "",
        depblood: "",
        depdob: "",
        depweight: "",
        depheight: "",
      });
      setDepIsPresent(false);
    }
  };

  const userChange = (e) => {
    e.preventDefault();
    userdoFetch({
      method: "put",
      body: JSON.stringify({
        name: user.empname,
        email: user.empemail,
        contact_number: user.empcontact,
        blood_group: user.empblood,
        date_of_birth: user.empdob,
        weight: user.empweight,
        height: user.empheight,
      }),
    });
  };

  const depChange = (e) => {
    e.preventDefault();
    if (changedep === null) return;
    if (depIsPresent) {
      depchangedoFetch({
        method: "put",
        body: JSON.stringify({
          name: dep.depname,
          email_address: dep.depemail,
          contact_number: dep.depcontact,
          blood_group: dep.depblood,
          date_of_birth: dep.depdob,
          weight: dep.depweight,
          height: dep.depheight,
        }),
      });
      const vel = () => {
        return deptotalstate.map((item) => {
          if (item.id === changedep) {
            item.name = dep.depname;
            item.email_address = dep.depemail;
            item.contact_number = dep.depcontact;
            item.blood_group = dep.depblood;
            item.date_of_birth = dep.depdob;
            item.weight = dep.depweight;
            item.height = dep.depheight;
            return item;
          } else {
            return item;
          }
        });
      };
      setDeptotalstate(vel);
    } else {
      depnewdoFetch({
        method: "post",
        body: JSON.stringify({
          user_id: id,
          relationship: dummydep,
          name: dep.depname,
          email_address: dep.depemail,
          contact_number: dep.depcontact,
          blood_group: dep.depblood,
          date_of_birth: dep.depdob,
          weight: dep.depweight,
          height: dep.depheight,
        }),
      });
    }
  };
 
  useEffect(() => {
    if (depnewresponse) {
      setDeptotalstate([...deptotalstate, depnewresponse]);
    }
  }, [depnewresponse]);

  return (
    <div>
      <Layout />
      <div className="container-fluid">
        <div className="row">
          <div className="col card animate__animated animate__bounceInLeft">
            <form onSubmit={userChange}>
              <div className="container-fluid">
                <div className="row">
                  {/* <div className="col text-right"> Hello </div> */}
                  <div className="col card-header">
                    <h5> Welcome {screenName}</h5>{" "}
                  </div>
                </div>

                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="empname">Name</label>{" "}
                  </div>
                  <div className="col ">
                    {" "}
                    <input
                      type="text"
                      name="empname"
                      id="ename"
                      value={user.empname}
                      onChange={userhandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="empemail">Email Address</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="email"
                      name="empemail"
                      id="eemail"
                      value={user.empemail}
                      onChange={userhandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="empcontact">Contact No.</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="number"
                      name="empcontact"
                      id="econtact"
                      value={user.empcontact}
                      onChange={userhandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">Blood Group</div>
                  <div className="col">
                    <input
                      type="text"
                      name="empblood"
                      id="eblood"
                      value={user.empblood}
                      onChange={userhandleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="empdob">Date of Birth</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="date"
                      name="empdob"
                      id="edob"
                      value={user.empdob}
                      max={moment().format("YYYY-MM-DD")}
                      onChange={userhandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="empweight">Weight(in Kgs)</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="text"
                      name="empweight"
                      id="eweight"
                      value={user.empweight}
                      onChange={userhandleChange}
                      required
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="empheight">Height(in cms)</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="text"
                      name="empheight"
                      id="eheight"
                      value={user.empheight}
                      onChange={userhandleChange}
                      required
                    />{" "}
                  </div>
                </div>
                <div className="row pd card-footer">
                  <div className="col text-right">
                    {" "}
                    <input
                      type="submit"
                      className="btn btn-outline-primary"
                      value="Submit"
                    />
                  </div>
                  <div className="col">
                    {" "}
                    <button
                      type="cancel"
                      className="btn btn-outline-primary"
                      onClick={() => setUser(cancelUser)}
                    >
                      Cancel{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col card animate__animated animate__bounceInRight">
            <form onSubmit={depChange}>
              <div className="container-fluid">
                <div className="row" style={{ minheight: "5000" }}>
                  <div className="col text-right card-header">
                    <h5>Dependent</h5>
                  </div>
                  <div className="col card-header">
                    <select name="dep" id="dep" onChange={myDep}>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Mother_in_law">Mother-in-law</option>
                      <option value="Father_in_law">Father-in-law</option>
                    </select>{" "}
                  </div>
                </div>
                <div className="row ">
                  <div className="col text-right ">
                    <label htmlFor="depname">Name</label>{" "}
                  </div>
                  <div className="col ">
                    {" "}
                    <input
                      type="text"
                      name="depname"
                      id="depname"
                      value={dep.depname}
                      onChange={dephandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row ">
                  <div className="col text-right">
                    <label htmlFor="depemail">Email Address</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="text"
                      name="depemail"
                      id="depemail"
                      value={dep.depemail}
                      onChange={dephandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="depcontact">Contact No.</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="number"
                      name="depcontact"
                      id="depcontact"
                      value={dep.depcontact}
                      onChange={dephandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">Blood Group</div>
                  <div className="col">
                    <input
                      type="text"
                      name="depblood"
                      id="depblood"
                      value={dep.depblood}
                      onChange={dephandleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="depdob">Date of Birth</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="date"
                      name="depdob"
                      id="depdob"
                      value={dep.depdob}
                      max={moment().format("YYYY-MM-DD")}
                      onChange={dephandleChange}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="depweight">Weight(in Kgs)</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="number"
                      name="depweight"
                      id="depweight"
                      value={dep.depweight}
                      onChange={dephandleChange}
                      required
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <label htmlFor="depheight">Height(in cms)</label>{" "}
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="number"
                      name="depheight"
                      id="depheight"
                      value={dep.depheight}
                      onChange={dephandleChange}
                      required
                    />{" "}
                  </div>
                </div>
                <div className="row pd card-footer">
                  <div className="col text-right">
                    {" "}
                    <input
                      type="submit"
                      className="btn btn-outline-primary"
                      value="Submit"
                    />
                  </div>
                  <div className="col">
                    {" "}
                    <button
                      type="cancel"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setDep(cancelDep);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
