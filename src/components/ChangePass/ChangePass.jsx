import { useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LockResetIcon from '@mui/icons-material/LockReset';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';

import './ChangePass.css'
import * as utils from '../../resources/utils/utils'

export default function ChangePass() {
  const[currentPass,setCurrentPass]=useState('')
  const[newPass,setNewPass]=useState('')
  const[confPass,setConfPass]=useState('')
  const[serverResp, setServerResp]=useState(null)
  
  const handleCurrentPassChange=(e)=>{
        setCurrentPass(e.target.value)
      }
  const handleNewPassChange=(e)=>{
    setNewPass(e.target.value)
  }
  const handleConfPassChange=(e)=>{
    setConfPass(e.target.value)
  }
  
const errorDisplay = ()=>{
    if(serverResp==='Bad Password')return(<Alert o variant='filled' severity="error" sx={{ width: '100%' }}>Incorrect Password</Alert>)
    else if(serverResp==='ok')return(<Alert  variant='filled' severity="success" sx={{bgcolor:'green',width: '100%'}}>Password change success
        </Alert>)
    else if(serverResp==='checkCompare')return(
        <Alert variant='filled' severity="error"  sx={{ width: '100%' }}>
         The New Password and Confirm New Password fields do not match
         </Alert>)
         
      
    }
  
    
    
    const changePassSubmit=async (e)=>{
      e.preventDefault();
                   
            try{
              if(newPass===confPass){
                let body={currentPass:currentPass,userPass:newPass}
                let options=utils.putBuilder(body)
                const fetchResponse = await fetch('/api/user/pass/update',options)
                if(!fetchResponse.ok)
                { let error= await fetchResponse.json()
                  setServerResp(error)
                  
                  throw new Error('Fetch failed - Bad Request')}
                let token= await fetchResponse.json()
                localStorage.setItem('token',token.token)
                setServerResp(token.message)
                
                setCurrentPass('')
                setNewPass('')
                setConfPass('')
              
              }else {setServerResp('checkCompare')
            }
                
          }
          catch(err){
            console.log(err)
            }
        
    }


  return (
    <div className='changePass'>

        <div>Change Your Password</div>
        <br/>
        <br/>
        <Stack sx={{ width: '300px', }}spacing={4}>
            
        <FormControl >
          <InputLabel>Current Password</InputLabel>
          {serverResp!=="Bad Password"?
          <OutlinedInput label="Project Name"
          name='currentPass'
          value={currentPass}
          onClick={()=>setServerResp(null)}
          
          onChange={handleCurrentPassChange}
        />:<OutlinedInput label="Project Name"
          error
          name='currentPass'
          value={currentPass}
          onClick={()=>setServerResp(null)}
          onChange={handleCurrentPassChange}/>
          
        }
        </FormControl>

        
        <FormControl>
          <InputLabel>New Password</InputLabel>
          {serverResp!=='checkCompare'?
          <OutlinedInput label="Project Name"
          name='firstName'
          value={newPass}
          onClick={()=>setServerResp(null)}
          onChange={handleNewPassChange}
        />:<OutlinedInput label="Project Name"
          error
          name='firstName'
          value={newPass}
          onClick={()=>setServerResp(null)}
          onChange={handleNewPassChange}
        />}
        </FormControl>
         
       

        <FormControl >
          <InputLabel>Confirm New Password</InputLabel>
          {serverResp!=='checkCompare'?
          <OutlinedInput label="Project Name"
          name='firstName'
          value={confPass}
          onClick={()=>setServerResp(null)}
          onChange={handleConfPassChange}
        />:
        <OutlinedInput label="Project Name"
        error
          name='firstName'
          value={confPass}
          onClick={()=>setServerResp(null)}
          onChange={handleConfPassChange}
        />}
        </FormControl>

        <Button onClick={changePassSubmit}><LockResetIcon/>&nbsp;Change My Password </Button>
        </Stack>
        {errorDisplay()}
      
        </div>
  )
}
