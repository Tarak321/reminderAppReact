import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFetch } from "../hooks/use-fetch";
import Layout from "../pages/layout";

export default function Home() {
  const [names, setNames] = useState({
    Self: "",
    Mother: "",
    Father: "",
    Sister: "",
    Brother: "",
    Spouse: "",
    FatherInlaw: "",
    MotherInlaw: "",
  });
  const [usertable, setUsertabledata] = useState(null);
  const [dependenttable, setDependenttabledata] = useState(null);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("MEM_AUTH_TOKEN");
  const API = `http://localhost:4000/users/${id}.json`;
  const API_USER = `http://localhost:4000/medical_histories/${id}/users.json`;
  const API_DEP = `http://localhost:4000/medical_histories/${id}/deps.json`;

  const { isLoading, response, error, doFetch, doLogout } = useFetch(API);
  const {
    isLoading: userisLoading,
    response: userresponse,
    error: usererror,
    doFetch: userdoFetch,
    doLogout: userdoLogout,
  } = useFetch(API_USER);
  const {
    isLoading: depisLoading,
    response: depresponse,
    error: deperror,
    doFetch: depdoFetch,
    doLogout: depdoLogout,
  } = useFetch(API_DEP);
  const [imagestate, setImagestate] = useState({
    id: id,
  });

  useEffect(() => {
    doFetch({
      method: "get",
    });
    userdoFetch({
      method: "get",
    });
    depdoFetch({
      method: "get",
    });
  }, []);
  useEffect(() => {
    if (response) {
      setNames({
        ...names,
        Self: response.name.toString(),
      });
    }
  }, [response]);
  useEffect(() => {
    if (userresponse) {
      setUsertabledata(userresponse);
    }
  }, [userresponse]);
  useEffect(() => {
    if (depresponse) {
      setDependenttabledata(depresponse);
    }
  }, [depresponse]);

  const handleimagesubmit = (e) => {
    e.preventDefault();
    if (imagestate.profile_image) {
      const formData = new FormData();
      formData.append("user[id]", id);
      formData.append("user[profile_image]", imagestate.profile_image);

      console.log("formData", formData);
      doFetch({
        method: "put",
        noContentType: true,
        body: formData,
      });
    }
  };

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setImagestate({
      ...imagestate,
      profile_image: e.target.files[0],
    });
  };
  return (
    <div >
      <Layout />
      <div className="container-fluid">
        {response && (
          <div>
            <h3>Hello {response.name}</h3>
            <div className="card animate__animated animate__backInRight" style={{ width: "150px", height: "150px" }}>
              <img
                src={response.profile_image2}
                width="100%"
                height="100%"
                alt="not there"
              />
            </div>
            <form onSubmit={handleimagesubmit} style={{textAlign:"left"}}>
            <input type="file" onChange={onChangeFile} /> 
            <input type="submit" className="btn btn-secondary"/>
          </form>
          </div>
        )}
    
        <NavLink to="/medical">
          <button className="btn btn-primary">Add Medical History</button>
        </NavLink>
        <div className="row">
          <div className="col card animate__animated animate__backInDown">
            <div className="card-header">
              <h6>Pill Schedule: {names.Self} </h6>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <td></td>
                  <td>Medicine</td>
                  <td>Dosage </td>
                  <td>Time</td>
                </tr>
              </thead>
              <tbody>
                {usertable &&
                  usertable.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{item.medicine}</td>
                      <td>{item.dosage_amount}</td>
                      <td>{item.dosage_time}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col card animate__animated animate__backInDown">
            <div className="card-header">
              {" "}
              <h6>Pill Schedule: Dependents </h6>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <td></td>
                  <td>Relation</td>
                  <td>Medicine</td>
                  <td>Dosage </td>
                  <td>Time</td>
                </tr>
              </thead>
              <tbody>
                {dependenttable &&
                  dependenttable.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{item.relation}</td>
                      <td>{item.medicine}</td>
                      <td>{item.dosage_amount}</td>
                      <td>{item.dosage_time}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
