import { useState, useEffect} from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as fetches from '../../../resources/utils/fetches'
import * as utils from '../../../resources/utils/utils'

export default function AssignTask({reassignModal,closeReassign,department,setDepartment,usersByDept,setUsersByDept,task,setTaskUpdateWatch,taskUpdateWatch})
 {
const[newAssignedUser,setNewAssignedUser] =useState("")

useEffect(()=>{
    
    },[usersByDept])
    
    let user="null"
    const handleSubmit = async (e)=> {
        e.preventDefault();
        let body = {
        taskOwner:newAssignedUser,
        
        }
    let jwt = localStorage.getItem('token')
        try{
            const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(body)
        }
        const fetchResponse = await fetch(`/api/tasks/update/${task._id}`, options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
    setTaskUpdateWatch(!taskUpdateWatch)
    closeReassign()

}catch(err){
    console.log(err)
}
}
    const departmentEnums=utils.departmentEnums()
    const fetchUserByDepart = async ()=>{
        
        try{
            const options=fetches.getFetchOptions()
            const fetchResponse = await fetch (`/api/users/findBy/${department}`,options);
            if (!fetchResponse.ok) {
                throw new Error("Fetch failed - Bad Request");
            }
            let users = await fetchResponse.json()
            setUsersByDept(users)
        }
        
        catch(err){
            console.log(err);
            console.log("User By department Fetch failed")
        }
    }
    const sendUserSearch = async (department)=>{
        let users = await fetchUserByDepart(department)
        
        }

    const handleChange = async (e)=>{
       let dept=e.target.value
        setDepartment(dept)}

        
    const handleuserChange = async (e)=>{
       user=e.target.value
       setNewAssignedUser(user)
       
       }
        


    return (
        <div className='.modalreasign'>
          <Dialog open={reassignModal} 
          onClose={closeReassign}>
            <DialogTitle>Reassign to user</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="departments"> Select Department</InputLabel>
                    <Select
                    labelId="Departments"
                    id="departments"
                    name = "departments"
                    value={department}
                    label="Users"
                    onChange={handleChange}
                    > {departmentEnums.map(dept=><MenuItem value={dept} key = {dept}>{dept}</MenuItem>)}
                        
                    </Select>
                </FormControl>
                
              

                {department?<Button variant='contained' onClick={sendUserSearch}>Search</Button>:null}
          
                {department&&usersByDept?<>
                <FormControl fullWidth>
                    <InputLabel id="usersfiltered"> Select User</InputLabel>
                    <Select
                    labelId="usersfiltered"
                    id="usersfiltered"
                    value={newAssignedUser}
                    defaultValue={task['taskOwner']['firstName']}
                    label="users"
                    onChange={handleuserChange}
                    >{usersByDept?
                        
                         usersByDept.map(userlist=><MenuItem key={userlist.ceratedAt} value={userlist._id}>{userlist.firstName}{" "}{userlist.lastName}</MenuItem>):null}
                    </Select>
                </FormControl></>:null}
                </Stack>
              
            </DialogContent>
             <DialogActions>
          <Button variant='contained' onClick={closeReassign}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Re-assign</Button>
        </DialogActions>
          </Dialog>
           
      </div>
  )
}
