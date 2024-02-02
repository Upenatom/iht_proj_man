import { useState} from "react";

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

export default function CreateMeeting({openCreate,setOpenCreate}) {
  const [meetingInfo,setMeetingInfo]=useState({meetingInfo:""})
  const[meetingDate,setMeetingDate]=useState()
  const handleClose = () => {
   
      setOpenCreate(false);
      setMeetingDate(null)
      
  };
  const handleChange= (e)=>{
    setMeetingInfo({...meetingInfo,[e.target.name]:e.target.value})
  }
  const handleSubmit = () => {}

  return (
    <div>
    <Dialog open={openCreate} 
         onClose={handleClose}
         fullScreen>
      <DialogTitle>
            New Meeting Minutes
      </DialogTitle>
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

      <FormControl>
        <InputLabel>Add Requirement</InputLabel>
              <OutlinedInput label="Add Requirement" name='agendaItem' value={meetingInfo.agendaItem} onChange={handleChange}/>+
      </FormControl>

      <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Save Project</Button>
        </DialogActions>
    </Dialog>
    </div>
  )
}
