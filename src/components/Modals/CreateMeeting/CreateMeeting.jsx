import { useState} from "react";

import "./CreateMeeting.css"

//import Material UI utils
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';


import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertToRaw} from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML} from 'draft-convert';
import draftToHtml from 'draftjs-to-html';

export default function CreateMeeting({openCreate,setOpenCreate,project,setMeetingUpdated,meetingUpdated}) {
 
  const[meeting,setMeeting]=useState({date:"",details:""})
  const[noDate,setNodate]=useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleClose = () => {
    console.log(project)
    setOpenCreate(false);
    setNodate(false)
    setMeeting({date:"",details:""})
    setEditorState(()=>EditorState.createEmpty())
  };
  const handleChangeEditor= (e)=>{
    //convert comment to html
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setMeeting({...meeting,details:`${html}`})
    // let raw = convertToRaw(editorState.getCurrentContent())
    // setMeeting({...meeting,details:`${raw}`})
  }

  const errorDisplay = ()=>{
    if(noDate){return(<Alert variant='filled' severity="error" sx={{ width: '100%' }}>A Date Must Be Selected</Alert>)}
  }

  
  const handleSubmit = async (e) => {
   if(meeting.date){
   e.preventDefault();
   let body = {...meeting}
   let jwt =localStorage.getItem('token')
   try{
    const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(body)
        }
        const fetchResponse = await fetch(`/api/meetings/${project._id}/create`, options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
   handleClose()
  setMeetingUpdated(!meetingUpdated)}
   catch(err){
    console.log(err)
    console.log ("Meeting Creation error");
   }
  }else setNodate(true)
  }

 
  return (
    <div>
    <Dialog open={openCreate} 
         onClose={handleClose}
         fullScreen>
      <DialogTitle style={{display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
            <div>New Meeting Minutes 
              </div>
            <DialogActions>
              
               <Button variant='contained' onClick={handleSubmit}>Save Notes</Button>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
         
        </DialogActions>
      </DialogTitle>
      
      <Stack spacing={5}>
      <FormControl >
        <LocalizationProvider 
        dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
            slotProps={{
        textField: {
            readOnly: true,
        },
    }}
          label="Meeting Date"
          name='meetingDate'
          // value={meetingInfo.meetingDate}
          onChange={(newValue) => 
            {setMeeting({...meeting, date:newValue})
          setNodate(false)}}/>
          </DemoContainer>
        </LocalizationProvider>{errorDisplay()}
      </FormControl>
      <FormControl style={{height:'500px'}}>
         <Editor
        
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onChange={handleChangeEditor}
      />
              
              </FormControl>
      
        </Stack>
    </Dialog>
    </div>
  )
}
