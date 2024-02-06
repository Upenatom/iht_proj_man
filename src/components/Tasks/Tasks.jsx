import { useState, useEffect} from "react";
import TaskList from './TaskList'
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import EditNoteIcon from '@mui/icons-material/EditNote';
import GroupsIcon from '@mui/icons-material/Groups';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FunctionsIcon from '@mui/icons-material/Functions';
import HourglassBottomSharpIcon from '@mui/icons-material/HourglassBottomSharp';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Tasks.css'
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import ViewMeetings from'../Modals/Meeting/ViewMeetings'


export default function Tasks({project,taskUpdateWatch,setTaskUpdateWatch}) {
 
  const[projectTasks,setProjectTasks]=useState([])
  const[taskAdded,setTaskAdded]=useState(false)
  const[filter,setFilter]=useState('Active')
  const [meetingOpen,setMeetingOpen]=useState(false)
  const [noDate,setNoDate]=useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)

//Open Meetings modal
  const handleOpenMeeting=()=>{
    setMeetingOpen(true)
  }

  //fetch tasks on mount
  useEffect(()=>{
    const fetchProjectTasks = async () =>{
      try {
    let projectid=project._id
    let jwt = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
     
    };

    const fetchResponse = await fetch(`/api/tasks/projectTasks/${projectid}/${filter}`, options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let tasks = await fetchResponse.json();

    setProjectTasks(tasks.projTasks)
    
  } catch (err) {
    console.log(err);
    console.log("Project Tasks fetch failed");
  }
  }
fetchProjectTasks()

    },[taskAdded,taskUpdateWatch,filter])

  
  
  const[taskInfo,setTaskInfo]=useState({
    taskStartDate:startDate,
    taskTargetEndDate:endDate,
    taskDescription:"",
    
    
  })
  const handleChange= (e)=>{
    setTaskInfo({...taskInfo,[e.target.name]:e.target.value})
  }
  
  const [open, setOpen] = useState(false);
  const handleOpenTaskCreateModal = () => {
    setOpen(true);
  };
  const handleClose = () => {

    setTaskInfo({...taskInfo,
        taskStatus:"Not Started",
        taskDescription:"",                     
        })
      setNoDate(false)
      setOpen(false);
      setStartDate(null)
      setEndDate(null)
  };
  const handleSubmit = async(e) => {
    if(startDate!==null && endDate!==null){
    e.preventDefault();
    let body = { ...taskInfo, 
      taskStartDate:startDate,
      taskTargetEndDate:endDate,
      taskParentProject:project._id
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
        const fetchResponse = await fetch(`/api/tasks/create/`, options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
    setTaskInfo({...taskInfo,
        taskStartDate:startDate,
        taskTargetEndDate:endDate,
        taskDescription:"",})
        setOpen(false)
        setTaskAdded(!taskAdded)
      }
   catch(err){
    console.log(err)
    console.log ("Task Creation error");
    
  }}else{
    setNoDate(true)
  }
      };
    
      //filter stuff
    const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }
  const errorDisplay = ()=>{
    if(noDate){return(<Alert variant='filled' severity="error" sx={{ width: '100%' }}>A Start and End Date Must Be Selected</Alert>)}
  }

    return (
    <div className='taskpage'>
      <Paper square={false} elevation={20} sx={{margin:'10px',bgcolor:'#d2cecc',borderRadius: 5,paddingBottom:'5px'}}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between', height:'50px',margin:'0px 100px 10px 40px',paddingTop:'10px'}}>
        
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'30%'}}>
          
          <Tooltip title="Add a Task">
          <Button  sx={{ border:'1px solid #6b65ac',boxShadow: 4,borderRadius:'10px' }} onClick={handleOpenTaskCreateModal} color= 'primary'><AssignmentRoundedIcon sx={{fontSize:'40px',color:'#6b65ac'}}/><AddCircleTwoToneIcon 
          sx={{fontSize:'20px',color:'#6b65ac',transform:'translate(-5px,-10px)'}}
        /></Button></Tooltip> 
        &nbsp;

          <Tooltip title="Meeting Notes (Under Development)">
            <Button onClick={handleOpenMeeting} sx={{ border:'1px solid #6b65ac',boxShadow: 4,borderRadius:'10px' }} >
            <GroupsIcon sx={{paddingLeft:'15px',fontSize:'40px',transform:'translate(0,5px)',color:'#6b65ac'}}/><EditNoteIcon sx={{transform:'translate(-15px,-8px)',fontSize:'20px',color:'#6b65ac'}}/>
         
            </Button>
          </Tooltip>
          &nbsp;
          <Tooltip title="Project Expenses(Coming Soon)">
            <Button sx={{ border:'1px solid #6b65ac' ,boxShadow: 4,borderRadius:'10px' }} color='secondary'>
              <FunctionsIcon sx={{paddingLeft:'15px',fontSize:'40px',color:'#6b65ac'}}/>
              <AttachMoneyIcon  sx={{transform:'translate(-19px,0)',fontSize:'25px',color:'#6b65ac'}}/>
            </Button>
          </Tooltip>
          &nbsp;
          <Tooltip title="Project Hours (Coming Soon)">
          <Button sx={{ border:'1px solid #6b65ac',boxShadow: 4,borderRadius:'10px' }} color='secondary'><FunctionsIcon sx={{paddingLeft:'15px',fontSize:'40px',color:'#6b65ac'}}/><HourglassBottomSharpIcon  sx={{transform:'translate(-19px,0)',fontSize:'20px',color:'#6b65ac'}}
          /></Button></Tooltip>

           </div> 

      <div style={{display:'flex',alignItems:'center'}}>Task Filter:&nbsp;<FormControl sx={{paddingRight:'10px'}}>
        <InputLabel id="select filter"></InputLabel>
        <Select sx={{height:'40px'}}
          autoWidth
          labelId="select filter"
          id="demo-simple-select"
          value={filter}
          defaultValue='Active'
          label="Filter"
          onChange={handleFilterChange}
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'Inactive'}>Inactive</MenuItem>
          <MenuItem value={'All'}>All</MenuItem>
        </Select>
      </FormControl></div>
      
      </div>
      <Divider />
      <br/>
      <TaskList 
      projectTasks={projectTasks} 
      taskUpdateWatch={taskUpdateWatch}
      setTaskUpdateWatch={setTaskUpdateWatch}
      
      />
      <div className='.modal'>
       <Dialog open={open} 
         onClose={handleClose}>
         <DialogTitle>Create Task</DialogTitle>
         <DialogContent>
          <DialogContentText>
            Enter the details of your Task
          </DialogContentText>
          <Stack spacing={2}>             
          <FormControl>
             <TextField
             id="Task Description"
             label="Task Description"
             name = 'taskDescription'
             onChange={handleChange}
             value = {taskInfo.taskDescription}
             multiline
             rows={4}/>
          </FormControl>       

         

          <FormControl fullWidth>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
         <DatePicker
          label="Start Date"
          name='projStartDate'
          value={taskInfo.taskStartDate}
          onChange={(newValue) => setStartDate(newValue)}
          
          />
          
        <DatePicker
          label="Target End Date"
          name='taskTargetEndDate'
          value={taskInfo.taskTargetEndDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
          </FormControl>
        </Stack>
         </DialogContent>
         <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Save Task</Button>
        </DialogActions>
        {errorDisplay()}
       </Dialog>
       </div>
       </Paper>

       <ViewMeetings
       meetingOpen={meetingOpen}
       setMeetingOpen={setMeetingOpen}
        />
      </div>
  )
}
