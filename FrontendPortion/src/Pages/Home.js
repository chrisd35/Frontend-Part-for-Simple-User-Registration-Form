import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    // object storing user's info
    // uses React state
    const[users,setUsers]=useState([]);

    const {id} = useParams();

    // load user's info every time the pages reloads
    // empty array at the end makes it so it runs once only if page reloads
    useEffect(() => {
        loadUsers();
    },[])

    // loads the info
    const loadUsers= async() => {
        const result= await axios.get("http://localhost:8080/users") // gets all the info from the inputted address
        setUsers(result.data);
    }

    // function to delete user without reloading page
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers();
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>

                    </tr>
                 </thead>
                 <tbody>

                    {
                        // whenever new user is created, it will be added on the table (as an array)
                        // makes input data dynamic
                        users.map((user,index) =>(
                            <tr>
                            <th scope="row" key ={index}>{index+1}</th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <Link className='btn btn-outline-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                            <Link className='btn btn-outline-primary mx-2' to ={`/edituser/${user.id}`}>Edit</Link>
                            <button className='btn btn-outline-primary mx-2' onClick={()=> deleteUser(user.id)}>
                            Delete 
                            </button>
                            </tr>
                        ))
                    }
    
  </tbody>
</table>
        </div>
    </div>
  )
}
