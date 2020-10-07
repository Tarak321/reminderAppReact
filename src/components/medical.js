import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import Layout from "../pages/layout";
import moment from "moment"


export default function Medical() {
  const id = localStorage.getItem("id");
  const [delid, setDelid] = useState(1);
  const API = `http://localhost:4000/medical_histories/${id}/users_with_deps.json`;
  const APIMED = "http://localhost:4000/medical_histories.json";
  const APIDEL = `http://localhost:4000/medical_histories/${delid}.json`;

  const { isLoading, response, error, doFetch, doLogout } = useFetch(API);
  const {
    isLoading: medisLoading,
    response: medresponse,
    error: mederror,
    doFetch: meddoFetch,
    doLogout: meddoLogout,
  } = useFetch(APIMED);
  const {
    isLoading: delisLoading,
    response: delresponse,
    error: delerror,
    doFetch: deldoFetch,
    doLogout: deldoLogout,
  } = useFetch(APIDEL);

  useEffect(() => {
    doFetch({
      method: "get",
    });
  }, []);
  const [presentMed, setPresentMed] = useState({
    illness: "",
    drname: "",
    medicine: "",
    start_date: "",
    end_date: "",
    dosage_amount: "",
    dosage_frequency: "",
    dosage_time: "",
    email_notify: "",
  });

  const handlechange = (e) => {
    setPresentMed({
      ...presentMed,
      [e.target.name]: e.target.value,
    });
  };
  const [med, setMed] = useState(null);
  const [history, setHistory] = useState([]);
  const [tabledata, setTableData] = useState([]);
  const [selval, setSelval] = useState();
  const [depid, setDepid] = useState(null);
  const [depnames, setDepnames] = useState({
    Mother:false,
    Father:false,
    Brother:false,
    Sister:false,
    Spouse:false,
    Mother_in_law:false,
    Father_in_law:false
  });

  useEffect(() => {
    if (response) {
      let updateddepnames={...depnames};
      const tdata = response.reduce((accum, item) => {
        if (item.dependent_id === null) accum.push(item);
        else{
        updateddepnames[item.relation]=true;
        }
        return accum;
      }, []);
      setDepnames(updateddepnames);
      setTableData(tdata);
      setHistory(response);
    }
  }, [response]);
 

  const selFun = (e) => {
    e.preventDefault();
    setSelval(e.target.value.toString());
    // var vel = document.getElementById("Hist").value.toString();
    // TODO: remove hardcoding
    if (e.target.value.toString() === "Self") {
      setDepid(null);
      const tdata = history.reduce((accum, item) => {
        if (item.dependent_id === null) accum.push(item);
        return accum;
      }, []);
      setTableData(tdata);
    } else {
      const tdata = history.reduce((accum, item) => {
        if (
          item.relation !== null &&
          item.relation !== undefined &&
          item.relation.toString() === e.target.value
        ) {
          accum.push(item);
          setDepid(item.dependent_id);
        }
        return accum;
      }, []);

      setTableData(tdata);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    meddoFetch({
      method: "post",
      body: JSON.stringify({
        medical_history: {
          user_id: id,
          dependent_id: depid,
          relation: selval,
          illness: presentMed.illness,
          drname: presentMed.drname,
          medicine: presentMed.medicine,
          start_date: presentMed.start_date,
          end_date: presentMed.end_date,
          dosage_amount: presentMed.dosage_amount,
          dosage_frequency: presentMed.dosage_frequency,
          dosage_time: presentMed.dosage_time,
          email_notify: presentMed.email_notify,
        },
      }),
    });
  };

  useEffect(() => {
    if (medresponse) {
      setHistory([...history, medresponse]);
      setTableData([...tabledata, medresponse]);
      alert("Medical History Updates");
    }
  }, [medresponse]);

  const deleterow = (e) => {
    setDelid(e);
    deldoFetch({
      method: "delete",
    });
    const tdata = tabledata.reduce((accum, item) => {
      if (item.id !== e) accum.push(item);
      return accum;
    }, []);
    setTableData(tdata);
    const hdata = history.reduce((accum, item) => {
      if (item.id !== e) accum.push(item);
      return accum;
    }, []);
    setHistory(hdata);
  };
  const toggle = (e) => {
    setDelid(e);
    const tdata = tabledata.reduce((accum, item) => {
      if (item.id === e) {
        if (item.email_notify === true) {
          deldoFetch({
            method: "put",
            body: JSON.stringify({
              email_notify: false,
            }),
          });
          item.email_notify = false;
        } else {
          deldoFetch({
            method: "put",
            body: JSON.stringify({
              email_notify: true,
            }),
          });
          item.email_notify = true;
        }
      }
      accum.push(item);
      return accum;
    }, []);
    setTableData(tdata);
    const hdata = history.reduce((accum, item) => {
      accum.push(item);
      return accum;
    }, []);
    setHistory(hdata);
  };

  const specialhandlechange = (e) => {
    var vel;
    if (e.target.checked) {
      vel = true;
    } else vel = false;
    setPresentMed({
      ...presentMed,
      [e.target.name]: vel,
    });
  };

  return (
    <div>
      <Layout />
      <div className="container-fluid card">
        <div className="row card-header">
          <div className="col-3">View History</div>
          <div className="col-3">
            <select name="Hist" id="Hist" onChange={selFun}>
              <option value="Self">Self</option>
              {depnames.Mother && <option value="Mother">Mother</option>}
              {depnames.Father && <option value="Father">Father</option>}
              {depnames.Brother && <option value="Brother">Brother</option>}
              {depnames.Sister && <option value="Sister">Sister</option>}
              {depnames.Spouse && <option value="Spouse">Spouse</option>}
              {depnames.Mother_in_law && (
                <option value="Mother-in-law">Mother-in-law</option>
              )}
              {depnames.Father_in_law && (
                <option value="Father-in-law">Father-in-law</option>
              )}
            </select>
          </div>
        </div>
      </div>
      <table
        id="myTableData"
        className="table animate__animated animate__flipInX"
      >
        <thead>
          <tr>
            <td>Illness</td>
            <td>Doctor details</td>
            <td>Medicine</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Dosage amount</td>
            <td>Dosage frequency</td>
            <td>Dosage time</td>
            <td>Email</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {tabledata &&
            tabledata.map((item) => (
              <tr key={item.id}>
                <td>{item.illness}</td>
                <td>{item.drname}</td>
                <td>{item.medicine}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td>{item.dosage_amount}</td>
                <td>{item.dosage_frequency}</td>
                <td>{item.dosage_time}</td>
                <td>
                  <span onClick={() => toggle(item.id)}>
                    {item.email_notify ? (
                      <i className="fas fa-toggle-on"></i>
                    ) : (
                      <i className="fas fa-toggle-off"></i>
                    )}
                  </span>
                </td>
                <td>
                  <button onClick={() => deleterow(item.id)}>DELETE</button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="card animate__animated animate__fadeInBottomRight">
        <form onSubmit={handleSubmit}>
          <div className="container-fluid">
            <div className="row card-header">
              <div className="col ">
                <h5>Do Fill the details</h5>
              </div>
            </div>

            <div className="row">
              <div className="col text-right">
                <label htmlFor="ill">Illness</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="text"
                  name="illness"
                  id="ill"
                  value={presentMed.illness}
                  onChange={handlechange}
                  required
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="doc">Doctor Details</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="text"
                  name="drname"
                  id="doc"
                  value={presentMed.drname}
                  onChange={handlechange}
                  required
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="medi">Medicine</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="text"
                  name="medicine"
                  id="medi"
                  value={presentMed.medicine}
                  onChange={handlechange}
                  required
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">Start Date</div>
              <div className="col text-left">
                <input
                  type="date"
                  name="start_date"
                  id="sdate"
                  max={moment().format("YYYY-MM-DD")}
                  value={presentMed.start_date}

                  onChange={handlechange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="edate">End Date</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="date"
                  name="end_date"
                  id="edate"
                  value={presentMed.end_date}
                  min={presentMed.start_date}
                  onChange={handlechange}
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="amnt">Dosage Amount</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="number"
                  name="dosage_amount"
                  id="amnt"
                  value={presentMed.dosage_amount}
                  max={5}
                  onChange={handlechange}
                  required
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="freq">Dosage Frequency</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="number"
                  name="dosage_frequency"
                  id="freq"
                  value={presentMed.dosage_frequency}
                  max={5}
                  onChange={handlechange}
                  required
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="time">Dosage Time</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="time"
                  name="dosage_time"
                  id="time"
                  value={presentMed.dosage_time}
                  onChange={handlechange}
                  required
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <label htmlFor="time">Email</label>{" "}
              </div>
              <div className="col text-left">
                {" "}
                <input
                  type="checkbox"
                  id="swi"
                  className="checkbox"
                  name="email_notify"
                  onChange={specialhandlechange}
                />
                <label htmlFor="switch" className="toggle"></label>
                <p>YES</p>{" "}
              </div>
            </div>
            <div className="row pd card-footer">
              <div className="col text-right">
                {" "}
                <input
                  type="submit"
                  className="btn btn-outline-primary "
                  value="Submit"
                />
              </div>
              <div className="col text-left">
                {" "}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setPresentMed({
                      illness: "",
                      drname: "",
                      medicine: "",
                      start_date: "",
                      end_date: "",
                      dosage_amount: "",
                      dosage_frequency: "",
                      dosage_time: "",
                      email_notify: "",
                    });
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
  );
}
