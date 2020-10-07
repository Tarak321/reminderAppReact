import React, {useEffect} from 'react'
import {useFetch} from '../../hooks/use-fetch';

const ides =localStorage.getItem("id");
const API_responseS = `http://localhost:4000/users/${ides}.json`;


export default function UserList() {


  const {isLoading, response, error, doFetch,doLogout} = useFetch(API_responseS);

  useEffect(() => {
    doFetch({
      method: "get"
    })

  }, [])

  return (
    <div className="container">
      {error && "Please Login To view these details"}         
      {/* { response && JSON.stringify(response)} */}
      {
        response &&
            <div className="card">
              <div className="card-body">
                  <p>Username: {response.name}</p>
                  <p>Contact: {response.contact_number}</p>
                  <p>Email: {response.email}</p>
                  <p>D.O.B.:{response.date_of_birth}</p>
                  <p>Country: {response.country}</p>
              </div>
            </div>
     
      }
    </div>
  )
}


//JSON.stringify(error)}