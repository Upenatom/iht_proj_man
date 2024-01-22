import React from 'react'

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
import './ViewMeetings.css'
import Box from '@mui/material/Box';

//mui Icons
import CloseIcon from '@mui/icons-material/Close';


export default function ViewMeetings({meetingOpen,setMeetingOpen}) {

    const handleClose = () => {

    
      setMeetingOpen(false);
      
  };

  return (
    <div>
        <Dialog open={meetingOpen} 
         onClose={handleClose}
         fullScreen
         >
             <DialogTitle style={{display:'flex',justifyContent:'space-between'}}>
                <div>Meetings</div>
                <IconButton size='large' onClick={handleClose}><CloseIcon/></IconButton>
            </DialogTitle>
            <div className='viewMeetingsPage'>
                <div className='dateMenu'><DialogTitle> Date<Divider/></DialogTitle>
                Under Development</div>
                <Divider orientation='vertical'/>
                <div className='meetingContents'><DialogTitle>Meeting Minutes<Divider/></DialogTitle>Under Development</div>
            </div>
        </Dialog>
        
    </div>
  )
}
