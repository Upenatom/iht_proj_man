import React from 'react'
import "./CreateUserForm.css"
import { useState} from 'react'

export default function CreateUserForm({setUserInState}) {

const [createUser,setCreateUser]=useState({firstName:"",lastName:"",userName:"",userPass:"",authLevel:"",statusLevel:'active'})


const handleChange = (e) =>{
  setCreateUser({...createUser,[e.target.name]:e.target.value})
  }
const handleSubmit = async (e) =>{
  e.preventDefault()
  try{
    //1. Post new user to server
    const options = {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        firstName:createUser.firstName,
        lastName:createUser.lastName,
        userName:createUser.userName,
        userPass:createUser.userPass,
        authLevel:createUser.authLevel,
        statusLevel:createUser.statusLevel
      })
    }
    const fetchResponse = await fetch ('/api/users/signup',options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
    
    let token = await fetchResponse.json()
    localStorage.setItem('token',token)

    let user= JSON.parse(atob()(token.split('.')[1])).user
    setUserInState(user)


  }
  catch(err){
    console.log ("user creation error",err);
  }
  }
  return (
  <div>
    CREATE USER
    <br/>
    <br/>
    <div className = "createuserform">
      <form autoComplete="off\">
        <label>First Name: </label>
        <input className = "input"
        type="text"
        name="firstName"
        value={createUser.firstName}
        onChange={handleChange}
        required
        />
        <br/><br/>
        <label>Last Name: </label>
        <input className = "input"
        type="text"
        name="lastName"
        value={createUser.lastName}
        onChange={handleChange}
        required
        />
        <br/><br/>
        <label>Authorization Level: </label>
        <select className = "input"
        name="authLevel"
        onChange={handleChange}
        required>
          <option value="superadmin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select><br/><br/>
        <label>User Name: </label>
        <input className = "input"
        type="text"
        name="userName"
        value={createUser.userName}
        onChange={handleChange}
        required
        /><br/><br/>
        <label>Temporary Password: </label>
        <input className = "input"
        type="password"
        name="userPass"
        value={createUser.userPass}
        onChange={handleChange}
        required
        /><br/><br/>
        <button type="submit"
        onClick={handleSubmit}>Add User</button>
        </form>
    </div>
  </div>
  )
}
