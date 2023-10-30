import { useState, useEffect} from "react";
import CommentItem from '../Comments/CommentItem'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Comment({task,recentComment}) {

    const [allComments, setAllComments]=useState([])
    const [historyModal, sethistoryModal] = useState(false);
    const historyClose = () => {
        console.log('comemnt history exit')
        sethistoryModal(false);
    };
    const historyOpen=()=>{
      console.log('comment history open')
      sethistoryModal(true);
        fetchCommentHistory()
    }
    
    const fetchCommentHistory = async ()=>{
      try{
        let jwt = localStorage.getItem("token");
        const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: "Bearer " + jwt,
      },
    };
     const fetchResponse = await fetch(`/api/comments/projectComments/${task._id}`, options);
     if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let getComments=await fetchResponse.json()
    getComments.sort((a,b)=>a.createdAt - b.createdAt)
    console.log(getComments)
      setAllComments(getComments)
      }
      catch(err){
        console.log(err);
        console.log("Latest comment Fetch failed");
      }
    }


  return (
    <div  
      onClick={historyOpen} >  
      {recentComment.comment? <div className='commentitem'>
        <p>Comment: {recentComment.comment}</p>
        Added by: {recentComment.author}
                      
        Created:{recentComment.createdAt}
        edited at:{recentComment.updatedAt}
        </div> : <>Comment: No comments for this task yet</>}
        
        <Dialog open={historyModal} taskid={task._id}
          onClose={historyClose} fullWidth>
            <DialogTitle>Comment History</DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
              {allComments.map (comment=><CommentItem comment={comment} key={comment._id}/>)  }
              </Stack>
            </DialogContent>
             <DialogActions>
          <Button variant='contained' onClick={historyClose}> (press Esc key to exit)</Button>
         
        </DialogActions>
          </Dialog>

        </div>
  )
}

