import "./CreateUserForm.css"
import { useState} from 'react'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import * as utils from '../../resources/utils/utils'
import './CreateUserForm.css'

export default function CreateUserForm({user}) {

const [createUser,setCreateUser]=useState({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})

let departments=utils.departmentEnums()

const handleChange = (e) =>{
  console.log(user)
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
  <div className='createUser' >
    CREATE USER
    <br/>
    <br/>
    
      <Stack spacing={2}>
        <FormControl >
          <InputLabel>First Name</InputLabel>
          <OutlinedInput label="Project Name"
          name='firstName'
          value={createUser.firstName}
          onChange={handleChange}
        />
        </FormControl>

        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <OutlinedInput label="Last Name"
          name='lastName'
          value={createUser.lastName}
          onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
                label="Division"
                name='department'
                value={createUser.department}
                onChange={handleChange}
               >
                 <MenuItem  value=""></MenuItem>
                {departments.map(department=><MenuItem  value={department} key={department}>{department}</MenuItem>)}
             
            </Select>
          </FormControl>
        
         <FormControl fullWidth>
            <InputLabel>Authorization Level</InputLabel>
            <Select
                label="Authorization Level"
                name='authLevel'
                value={createUser.authLevel}
                onChange={handleChange}
               >
                 <MenuItem  value=""></MenuItem>
                 {user.authLevel==='superadmin'?
                 <MenuItem  value="superadmin">Super Admin</MenuItem>:null}
                 <MenuItem  value="admin">Admin</MenuItem>
                 <MenuItem  value="user">User</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
          <InputLabel>E-mail</InputLabel>
          <OutlinedInput label="E-mail"
          name='userName'
          value={createUser.userName}
          onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <InputLabel>Temporary Password</InputLabel>
          <OutlinedInput label="Temporary Password"
          name='userPass'
          value={createUser.userPass}
          onChange={handleChange}
          />
        </FormControl>
        <Button onClick={handleSubmit}>
         Add User
        </Button>

      </Stack>
       
  </div>
  )
}
 