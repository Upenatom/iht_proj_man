import { useState, useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';  
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function TaskItem({task}) {
  const [open, setOpen] = useState(false);
  const [commentInfo, setCommentInfo]=useState("")
  const[commentAdded,setCommentAdded]=useState(false)
  const[recentComment,setRecentComment]=useState([])

  useEffect(()=>{
    
    const fetchSingleComment = async()=>{
      try{
        let jwt = localStorage.getItem("token");
        const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: "Bearer " + jwt,
      },
    };
    const fetchResponse = await fetch(`/api/comments/projectComments/${task._id}/getfirst`, options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let comment = await fetchResponse.json();
    let comment0= comment[0]
    if(comment0!==null){setRecentComment(comment0)
    }else return
      }
      catch(err){console.log(err);
    console.log("Latest comment Fetch failed");}
    }
    fetchSingleComment()
  },[commentAdded])

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
        <li>Assigned to: {task["taskOwner"]["firstName"]} {task["taskOwner"]["lastName"]}</li>
        <li>Status: {task.taskStatus}</li>
        <li>Priority: {task.taskPriority}</li>
              
      </ul>
      <div>
        
        <div>
          <IconButton onClick={handleOpenCreateCommentModal} color= 'info'><AddCircleIcon /></IconButton>
          Add a Comment
        </div>

      {recentComment?<div className='commentitem'>
        <p>Comment: {recentComment.comment}</p>
        Added by: {recentComment.taskCommentOwner}
        Created:{recentComment.createdAt}
        edited at:{recentComment.updatedAt}
        </div>:null}

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
