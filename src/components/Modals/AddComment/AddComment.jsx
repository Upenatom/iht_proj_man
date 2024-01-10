import { useState, useEffect} from "react";
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddComment({commentModal,task,setCommentAdded,commentAdded,handleClose}) {
const [commentInfo, setCommentInfo]=useState("")
const handleChange= (e)=>{
    setCommentInfo(e.target.value)
  }
 
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
        const fetchResponse = await fetch(`/api/comments/projectTasks/${task._id}/comments/create`, options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
        setCommentInfo("")
        handleClose()
        setCommentAdded(!commentAdded)
      }
   catch(err){
    console.log(err)
    console.log ("Task Creation error");
    
  }
}

  return (
    <div>
         <Dialog open={commentModal} 
          onClose={handleClose}
          maxWidth='md'
          fullWidth>
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
  )
}
