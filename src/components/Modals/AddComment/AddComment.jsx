import { useState} from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,RichUtils } from 'draft-js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert';
import './AddComment.css'


export default function AddComment({commentModal,task,setCommentAdded,commentAdded,handleClose}) {
const [commentInfo, setCommentInfo]=useState()
const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

const handleChange= ()=>{
  //convert comment to html
  
  let html = convertToHTML(editorState.getCurrentContent())
  setCommentInfo(html)

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
        setEditorState(() => EditorState.createEmpty())
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
                {/* <FormControl>
                  <TextField
                  id="Task comment"
                  label="Task comment"
                  onChange={handleChange}
                  value = {commentInfo}
                  multiline
                  rows={4}/>
                </FormControl> */}
                <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onChange={handleChange}
      />

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
