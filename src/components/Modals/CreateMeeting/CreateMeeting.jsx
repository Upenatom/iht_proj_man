import { useState} from "react";
import AgendaItem from "./AgendaItem"

//import Material UI utils
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import Box from '@mui/material/Box';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export default function CreateMeeting({openCreate,setOpenCreate}) {
 
  const[meetingDate,setMeetingDate]=useState()
  const [agendaItems,setAgendaItems]=useState([])
  
  const handleClose = () => {
   
      setOpenCreate(false);
      setMeetingDate(null)
      setAgendaItems([])
      
  };
 
  const handleSubmit = () => {}

  const addAgendaItem=()=>{
       setAgendaItems((agendaItems)=>
    [...agendaItems,1])
       console.log(agendaItems)
  }
  const removeLastAgendaItem=()=>{
    let tempAgendaItems=[...agendaItems]
    tempAgendaItems.pop()
    setAgendaItems(tempAgendaItems)


  }
  return (
    <div>
    <Dialog open={openCreate} 
         onClose={handleClose}
         fullScreen>
      <DialogTitle style={{display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
            <div>New Meeting Minutes
              <IconButton 
              sx={{margin:'5px',padding:'5px',boxShadow: 4}}
              onClick={addAgendaItem}>
                <LibraryAddIcon color='info' /></IconButton>
                <IconButton sx={{margin:'5px',padding:'5px',boxShadow: 4}}
              onClick={removeLastAgendaItem}><PlaylistRemoveIcon color='info'/></IconButton></div>
            <DialogActions>
               <Button variant='contained' onClick={handleSubmit}>Save Notes</Button>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
         
        </DialogActions>
      </DialogTitle>
      
      <Stack spacing={5}>
      <FormControl >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
          label="Meeting Date"
          name='projStartDate'
          // value={meetingInfo.meetingDate}
          onChange={(newValue) => setMeetingDate(newValue)}/>
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
      <div>
        {agendaItems.length? agendaItems.map(item=><AgendaItem
        agendaItems={agendaItems}
        setAgendaItems={setAgendaItems}
             />):<div> No Agenda Items Added for this meeting</div>}
        {/* <AgendaItem
        agendaItems={agendaItems}
        setAgendaItems={setAgendaItems}
        meetingInfo={meetingInfo}
        setMeetingInfo={setMeetingInfo}
        /> */}
     
      </div>
      {/* <FormControl>
        <InputLabel>Add Action Item</InputLabel>
              <OutlinedInput label="Add Requirement" name='actionItem' value={meetingInfo.agendaItem} onChange={handleChange}/>+
      </FormControl> */}

      
        </Stack>
    </Dialog>
    </div>
  )
}
