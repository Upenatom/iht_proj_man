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
import './ViewMeetings.css'
import Box from '@mui/material/Box';
import CreateMeeting from '../CreateMeeting/CreateMeeting'
//mui Icons

import CloseIcon from '@mui/icons-material/Close';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import Tooltip from '@mui/material/Tooltip';

export default function ViewMeetings({meetingOpen,setMeetingOpen}) {
    const[openCreate,setOpenCreate]=useState(false)
    const handleClose = () => {
   
      setMeetingOpen(false);
      
  };

  const handleAddMeeting = ()=>{
    setOpenCreate(true)
  }

  return (
    <div>
        <Dialog open={meetingOpen} 
         onClose={handleClose}
         fullScreen
         >
             <DialogTitle style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'27px',width: '300px'}}>Meetings 
                    <Tooltip title="Add a Meeting">
                    <Button onClick={handleAddMeeting} sx={{ border:'1px solid #6b65ac',boxShadow: 4,borderRadius:'10px',  }} >
            
            <GroupsIcon sx={{paddingLeft:'15px',fontSize:'40px',transform:'translate(0,5px)',color:'#6b65ac'}}/>
         
            <AddRoundedIcon sx={{transform:'translate(-15px,-8px)',fontSize:'20px',color:'#6b65ac'}}/>            
         
            </Button>
            </Tooltip>
                </div>
                <IconButton size='large' onClick={handleClose}><CloseIcon/></IconButton>
            </DialogTitle>
            <Divider />
            <div className='viewMeetingsPage'>
                <div className='dateMenu'><DialogTitle> Date<Divider/></DialogTitle>
                Under Development</div>
                <Divider orientation='vertical'/>
                <div className='meetingContents'><DialogTitle>Meeting Minutes<Divider/></DialogTitle>Under Development</div>
            </div>
        </Dialog>
        <CreateMeeting 
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        />
        
    </div>
  )
}
