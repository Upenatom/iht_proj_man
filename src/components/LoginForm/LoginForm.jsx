import React from 'react'
import { useState } from 'react'
import "./LoginForm.css"

export default function LoginForm({setUser}) {
  const [userCreds,setUserCreds]=useState({userName:"",userPass:""})

  const handleChange = (e) =>{
    setUserCreds({...userCreds,[e.target.name]:e.target.value})
  }


  const handleSubmit =async (e) =>{
    e.preventDefault()
       try{
      const options = {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        userName:userCreds.userName,
        userPass:userCreds.userPass,
      })
    }
    const fetchResponse = await fetch ('/api/users/login',options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
    let token= await fetchResponse.json()
    localStorage.setItem('token',token)

    const user = JSON.parse(atob(token.split('.')[1])).user
    setUser(user)
  }
  catch(err){
    console.log ("user login error");
    console.log(err)
  }
  }
    return (
    
        <div className = "loginform">
            <form autoComplete="off" >
              <div className='lineitem'>
                <label>User Name:</label>
                <input 
                type="text"
                name="userName"
                value={userCreds.userName} 
                onChange={handleChange}
                required
                /> </div> <br/><br/>
                <div className='lineitem'>
                <label>Password:</label>
                <input 
                type="password"
                name="userPass"
                value={userCreds.userPass} 
                onChange={handleChange}
                required
                />
                </div><br/><br/>
                <div className='lineitem'>
                 <button type="submit"
                 onClick={handleSubmit} >LOG IN</button>
                 </div>
                 
            </form>
        </div>
      
  )
}
