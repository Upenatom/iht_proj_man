import { useState,useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/system';
import * as utils from '../../resources/utils/utils'
import * as fetches from '../../resources/utils/fetches'
import './EditUserForm.css'


export default function EditUserForm({user}) 
{
    const [passReset, setPassReset]=useState(false)
    const [serverResp, setserverResp]=useState('')
    const[allUsers, setAllUsers]=useState([])
    const [open, setOpen] = useState(false);
    const loading = open && allUsers.length === 0;

    const selectedUser=(value)=>{
    value?setEditUser(value):setEditUser([])
}
    const handleSwitch = (e) => {
        
        setPassReset(!passReset);
        if(passReset===false && editUser!==null){
            
        }
  };
    const [editUser,setEditUser]=useState({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})

    


    useEffect(()=>{
        let active= true
        if (!loading) {
            return undefined;
    }
    
    (async () => {
      

      if (active) {
        fetchAllUsers()
      }
    })();

    return () => {
      active = false;
    };
    },[loading])

    useEffect(() => {
    if (!open) {
      setAllUsers([]);
    }
  }, [open]);

const fetchAllUsers = async ()=>{
        
        try{
            const options=fetches.getFetchOptions()
            const fetchResponse = await fetch ('/api/users/index',options);
            if (!fetchResponse.ok) {
                throw new Error("Fetch failed - Bad Request");
            }
            let userArray = await fetchResponse.json()
            setAllUsers(userArray)
        }
        
        catch(err){
            console.log(err);
            console.log("User By department Fetch failed")
        }
    }
    

    

let departments=utils.departmentEnums()

const handleChange = (e) =>{
  setEditUser({...editUser,[e.target.name]:e.target.value})
  }

const handleSubmit = async (e) =>{
  e.preventDefault()
  let options
  let jwt = localStorage.getItem('token')
  try{
    //1. Post updated user to server
    if(passReset===true){
     options = {
      method:"PUT",
      headers:{"Content-Type": "application/json",Authorization: 'Bearer ' + jwt},
      body: JSON.stringify({
        firstName:editUser.firstName,
        lastName:editUser.lastName,
        department:editUser.department,
        userName:editUser.userName,
        userPass:editUser.userPass,
        authLevel:editUser.authLevel,
        statusLevel:editUser.statusLevel
      })
    }}else{
        options = {
      method:"PUT",
      headers:{"Content-Type": "application/json",
      Authorization: 'Bearer ' + jwt},
      body: JSON.stringify({
        firstName:editUser.firstName,
        lastName:editUser.lastName,
        department:editUser.department,
        userName:editUser.userName,
        authLevel:editUser.authLevel,
        statusLevel:editUser.statusLevel
      })
    }

    }
     const fetchResponse = await fetch (`/api/user/update/${editUser._id}`,options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')
    
  }
    else{
      let notification = await fetchResponse.status() 
      console.log('notification===>', notification)}
    
        
    setEditUser({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})
    setPassReset(false)

  }
  catch(err){
    console.log ("user update error",err);
    setEditUser({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})
  }
  }

  const errorDisplay = ()=>{
    if(serverResp==='Bad Password'||serverResp==="Cannot read properties of null (reading 'userPass')")return(<Alert variant='filled' severity="error" sx={{ width: '100%' }}>Bad Username or Password</Alert>)
    else if(serverResp==='ok')return(<Alert  variant='filled' severity="success" sx={{bgcolor:'green',width: '100%'}}>Password change success
        </Alert>)}

  
  return (
   
    <div className='edituserform' >
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <p>UPDATE USER</p>
        
        <Stack spacing={10}>
        <div>
        <Autocomplete 
        id ='user search'
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
            setOpen(true);
        }}
        onChange={(event,value)=>{selectedUser(value)}}
        onClose={() => {
        setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.fullName === value.fullName}
        getOptionLabel={(option) =>  option.fullName
            }
        options={allUsers}
        loading={loading}
        renderInput={(params) => (
             <TextField
              {...params}
              label="Search By First Name"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          />
      )}/>

           

        </div>
        {editUser.authLevel?<div style={{width:'300px'}}>
        <Stack spacing={2}>
        <FormControl style={{}} >
          <InputLabel>First Name</InputLabel>
          <OutlinedInput label="Project Name"
          name='firstName'
          value={editUser.firstName}
          onChange={handleChange}
        />
        </FormControl>

        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <OutlinedInput label="Last Name"
          name='lastName'
          value={editUser.lastName}
          onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
                label="Division"
                name='department'
                value={editUser.department}
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
                value={editUser.authLevel}
                onChange={handleChange}
               >
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
          value={editUser.userName}
          onChange={handleChange}
          />
        </FormControl>
        
        <Box component="section" sx={{ p: 2, border: '1px solid grey',borderRadius: 1 }}>
            <Stack spacing={2}>
            <FormControlLabel control={<Switch
      checked={passReset}
      onChange={handleSwitch}
      inputProps={{ 'aria-label': 'resetpass' }}
    />} label='Reset Password'/>
        {passReset?<FormControl>
          <InputLabel>Temporary Password</InputLabel>
          <OutlinedInput label="Temporary Password"
          name='userPass'
          value={editUser.userPass}
          onChange={handleChange}
          />
        </FormControl>:null}
        </Stack>
        </Box>
        <Button onClick={handleSubmit}>
         Submit Changes
        </Button>

      </Stack>
      </div>:null}
      </Stack>
      </div>
    
    </div>
  )
}
