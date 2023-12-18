import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function LoginForm({setUser}) {
  const [userCreds,setUserCreds]=useState({userName:"",userPass:""})
  const [hidePass,setHidePass]=useState(true)
  const[serverResp, setServerResp]=useState(null)

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
    { let error= await fetchResponse.json()
      console.log('error===>',error)
      setServerResp(error)  
      throw new Error('Fetch failed - Bad Request') }
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
  const errorDisplay = ()=>{
    if(serverResp==='Bad Password'||serverResp==="Cannot read properties of null (reading 'userPass')")return(<Alert variant='filled' severity="error" sx={{ width: '100%' }}>Bad Username or Password</Alert>)
    else if(serverResp==='ok')return(<Alert  variant='filled' severity="success" sx={{bgcolor:'green',width: '100%'}}>Password change success
        </Alert>)}

  return (
  <div 
  className = "loginform"
  ><Stack spacing={2}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      
    <FormControl autoComplete="off" sx={{ m: 1, width: '25ch' }} >
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
          
          <FormControl autoComplete="off"  sx={{ m: 1, width: '25ch' }}>
          <InputLabel htmlFor="Password">Password</InputLabel>
          
          <OutlinedInput
          id="Password"
          label="Password"           
          type={hidePass ? 'password' : 'text'}
          name="userPass"
          value={userCreds.userPass} 
          onChange={handleChange}
          required
          onClick={()=>setServerResp(null)}
           endAdornment={
            <InputAdornment position="end"><IconButton  onClick={()=>setHidePass(!hidePass)}>
              {hidePass ? <VisibilityIcon color='neutral' /> : <VisibilityOffIcon color='neutral'/>}
              </IconButton></InputAdornment>}
          />
         </FormControl>      
     
      <br/>
      
      
        <Button  variant="contained" type="submit"
        onClick={handleSubmit} >LOG IN</Button>
      
    </Box>
    <br/>
    {errorDisplay()}
    </Stack>
    
  </div>
      
  )
}