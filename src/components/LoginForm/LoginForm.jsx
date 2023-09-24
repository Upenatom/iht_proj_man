import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
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
  <div 
  className = "loginform"
  >
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
    <FormControl autoComplete="off" >
         <InputLabel htmlFor="E-mail">E-mail</InputLabel>
        <OutlinedInput
          id="E-mail"
          label="E-mail"
          placeholder="ipsumlorem@ihtgroup.ca"
          type="text"
          name="userName"
          value={userCreds.userName} 
          onChange={handleChange}
          required
          /> 
          </FormControl>
          <br/>
          <FormControl autoComplete="off" >
          <InputLabel htmlFor="Password">Password</InputLabel>
          <OutlinedInput
          id="Password"
          label="Password"           
          type="password"
          name="userPass"
          value={userCreds.userPass} 
          onChange={handleChange}
          required
          />
         </FormControl>       
     
      <br/>
      
      
        <Button  variant="contained" type="submit"
        onClick={handleSubmit} >LOG IN</Button>
      
    
    </Box>
  </div>
      
  )
}
