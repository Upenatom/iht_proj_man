import { useState} from "react";
//text editor tools
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,RichUtils } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert';
//mui imports editor tools
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

export default function AgendaItem({agendaItems,setAgendaItems}) {
 const [agendaInfo,setAgendaInfo]=useState({agendaItem:"",agendaItemDetails:""})
    const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

    const handleChangeEditor= (e)=>{
        //convert comment to html
    let html = convertToHTML(editorState.getCurrentContent())
  
    setAgendaInfo({...agendaInfo,agendaItemDetails:html})
  }

  const handleChange= (e)=>{
    setAgendaInfo({...agendaInfo,agendaItem:[e.target.value]})}


  return (
    <div style={{border:'1px black solid'}}>
        <Stack style={{padding:'30px',border:'1px black solid'}} spacing={3}>
        <FormControl>
        <InputLabel>Agenda Item</InputLabel>
              <OutlinedInput style={{marginLeft:'5px'}}label="Agenda Item" name='agendaItem' value={agendaInfo.agendaItem} onChange={handleChange}/>
        </FormControl>
        <FormControl>
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
    </div>
  )
}
