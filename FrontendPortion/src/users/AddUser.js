import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

  let navigate = useNavigate()

  // object storing user's info onto the page
  // uses React state
const [user,setUser]=useState({
  name:"",
  username:"",
  email:""
})

const{name,username,email} = user;

// when input changes, event is called
const onInputChange=(e) => {

  // split operator keeps adding the new update
  // stores the info inside the state dynamically
  setUser({...user,[e.target.name]: e.target.value}) 
}

// upon pressing submit, it will post data to db
// and display on home page
const onSubmit = async (e) => {
  e.preventDefault(); // prevents from displaying the info on the URL 
  await axios.post("http://localhost:8080/user",user) 
  navigate("/");

}



  return (
    <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Register User</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input type={"text"} 
                       className="form-control"
                       placeholder="Enter your name"
                       name="name"
                       value ={name} 
                       onChange={(e) => onInputChange(e)}>
                      
                </input>
              </div>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Username
                </label>
                <input type={"text"} 
                       className="form-control"
                       placeholder="Enter your username"
                       name="username"
                       value ={username}
                       onChange={(e) => onInputChange(e)} >
                </input>
              </div>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Email
                </label>
                <input type={"text"} 
                       className="form-control"
                       placeholder="Enter your email"
                       name="email"
                       value ={email} 
                       onChange={(e) => onInputChange(e)}>
                       
                </input>
              </div>
              <button type="submit" className="btn btn-outline-primary">Submit </button>
              <Link className="btn btn-outline-primary" to = "/">Cancel </Link>
              </form>
          </div>
        </div>

    </div>
  )
}
