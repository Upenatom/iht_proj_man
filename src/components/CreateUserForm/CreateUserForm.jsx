import React from 'react'
import "./CreateUserForm.css"
import { useState} from 'react'

export default function CreateUserForm() {

const [createUser,setCreateUser]=useState({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})


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
        department:createUser.department,
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
    setCreateUser({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})


  }
  catch(err){
    console.log ("user creation error",err);
    setCreateUser({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})
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
        <label>Department: </label>
        <select className = "input"
        name="department"
        onChange={handleChange}
        required>
          <option>Select Option</option>
          <option value="R&D">R&D</option>
          <option value="Office">Office</option>
          <option value="Marketing / Promo">Marketing / Promo</option>
          <option value="Technical Support, Product Support, QC, ETL">Technical Support, Product Support, QC, ETL</option>
          <option value="Warehouse & Packaging">Warehouse & Packaging</option>
          <option value="Inventory & Purchasing">Inventory & Purchasing</option>
          <option value="Building Maintenance">Building Maintenance</option>
          <option value="Safety">Safety</option>
          <option value="HR">HR</option>
        </select><br/><br/>
        <label>Authorization Level: </label>
        <select className = "input"
        name="authLevel"
        onChange={handleChange}
        required>
          <option>Select Option</option>
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
