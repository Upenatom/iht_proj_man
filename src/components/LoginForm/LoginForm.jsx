import React from 'react'
import { useState } from 'react'
import "./LoginForm.css"

export default function LoginForm() {
  const [userName,setUserName]=useState(null)
  const [userPass,setUserPass]=useState(null)
  const handleUserNameChange = (e) =>{
    setUserName(e.target.value)
  }
const handleUserPassChange = (e) =>{
    setUserPass(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDevfault()
  
  }
    return (
    <div className = "loginform">
        <div className = "loginform">
            <form autoComplete="off\">
                <label>User Name:</label>
                <input className = "input"
                type="text"
                name="userName"
                value={userName} 
                onChange={handleUserNameChange}
                required
                /> <br/><br/>
                <label>Password:</label>
                <input className = "input"
                type="password"
                name="password"
                value={userPass} 
                onChange={handleUserPassChange}
                required
                /><br/><br/>
                 <button type="submit"
                 onClick={handleSubmit}>LOG IN</button>
            </form>
        </div>
        </div>
  )
}
