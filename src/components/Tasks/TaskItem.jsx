import { useState, useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';  
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function TaskItem({task}) {
  const [open, setOpen] = useState(false);
  const [commentInfo, setCommentInfo]=useState("")
  const[commentAdded,setCommentAdded]=useState(false)
  const handleOpenCreateCommentModal=()=>{
  setOpen(true);
 }

 const handleChange= (e)=>{
    setCommentInfo(e.target.value)
  }

 const handleClose = () => {
        setOpen(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let body = { comment:commentInfo
      }
    let jwt = localStorage.getItem('token')
    try{
    const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(body)
        }
        const fetchResponse = await fetch(`/api/comments//projectTasks/${task._id}/comments/create`, options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
        setCommentInfo("")
        setOpen(false)
        setCommentAdded(!commentAdded)
      }
   catch(err){
    console.log(err)
    console.log ("Task Creation error");
    
  }
      };

  return (
    <div>
    <ul className='projectItem'>
        <li>Description: {task.taskDescription}</li>
        <li>Due date: {task.taskTargetEndDate}</li>
        <li>Assigned to: {task.taskOwner}</li>
        <li>Status: {task.taskStatus}</li>
        <li>Priority: {task.taskPriority}</li>
              
      </ul>
      <div>
        Comment
        <div>
          <IconButton onClick={handleOpenCreateCommentModal} color= 'info'><AddCircleIcon /></IconButton>
          Add a Comment
        </div>
        <div className='.modal'>
          <Dialog open={open} 
          onClose={handleClose}>
            <DialogTitle>Create Comment</DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                  id="Task comment"
                  label="Task comment"
                  onChange={handleChange}
                  value = {commentInfo}
                  multiline
                  rows={4}/>
                </FormControl>
              </Stack>
            </DialogContent>
             <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Save Comment</Button>
        </DialogActions>
          </Dialog>
      </div>
      </div>
      </div>
  )
}
