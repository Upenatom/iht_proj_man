import { useState} from "react";
import CommentItem from '../Comments/CommentItem'
import { Box} from '@mui/system'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as utils from '../../resources/utils/utils'
import IconButton from '@mui/material/IconButton';

import AddCommentIcon from '@mui/icons-material/AddComment';
import ForumIcon from '@mui/icons-material/Forum';
import AddComment from '../Modals/AddComment/AddComment'
import './Comments.css'
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

export default function Comment({task,recentComment,commentAdded,setCommentAdded}) {

    const [allComments, setAllComments]=useState([])
    const [historyModal, sethistoryModal] = useState(false);
    const [commentModal,setCommentModal] =useState(false)

    const handleOpenCreateCommentModal=()=>{
  setCommentModal(true);
 }
 const handleClose = () => {
        setCommentModal(false);}
        
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
    
      setAllComments(getComments)
      }
      catch(err){
        console.log(err);
        console.log("Latest comment Fetch failed");
      }
    }


  return (
    <div >  
      {recentComment.comment? 
      <div style ={{display:'flex', flexDirection:'column'}}>
        <div className='commentitem' dangerouslySetInnerHTML={{__html: recentComment.comment}}/>
        {/* <div className='commentitem' 
      >{recentComment.comment}</div> */}
      
      <Divider/>
        
        <Box sx={{
          fontSize:'12px',color:'text.secondary',fontWeight:'light',fontStyle:'italic',display:'flex', alignItems:'center',
          width:'100%',
        }}>
          <Divider/>
          
        <IconButton sx={{margin:'5px',padding:'5px',boxShadow: 4}} onClick={handleOpenCreateCommentModal} color= 'info'><Tooltip title="Add A Comment"><AddCommentIcon sx={{
          fontSize:'20px'
        }}/></Tooltip></IconButton>
        <IconButton sx={{margin:'5px',padding:'5px',boxShadow: 4}}onClick={historyOpen} color= 'info'><Tooltip title="View Comment History"><ForumIcon sx={{
          fontSize:'20px'
        }}/></Tooltip></IconButton>
        
        &nbsp;Added by:&nbsp; {recentComment.author}  &emsp;                    
        Created:&nbsp;{utils.shortDate(recentComment.createdAt)}&emsp;
        Edited:&nbsp;{utils.shortDate(recentComment.updatedAt)}
        </Box>
        </div> : <>No comments for this task yet<IconButton onClick={handleOpenCreateCommentModal} color= 'info'><AddCommentIcon sx={{
          fontSize:'20px'
        }}/></IconButton></>}
        
        <Dialog open={historyModal} taskid={task._id}
          onClose={historyClose} fullWidth>
            <DialogTitle>Comment History</DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
              {allComments.map (comment=><CommentItem comment={comment} key={comment._id}/>)  }
              </Stack>
            </DialogContent>
             <DialogActions>
          <Button variant='contained' onClick={historyClose}> Exit</Button>
         
        </DialogActions>
          </Dialog>
        <AddComment commentModal={commentModal}
                commentAdded={commentAdded}
        setCommentAdded={setCommentAdded}
        task={task}
        handleClose={handleClose}
        setCommentModal={setCommentModal}/>
        </div>
  )
}

