import { useState, useEffect} from "react";
import TaskList from './TaskList'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as utils from '../../resources/utils/utils'
import Menu from '@mui/material/Menu';
import './Tasks.css'
import Paper from '@mui/material/Paper';


export default function Tasks({project,taskUpdateWatch,setTaskUpdateWatch}) {
 
  const[projectTasks,setProjectTasks]=useState([])
  const[taskAdded,setTaskAdded]=useState(false)
  const[filter,setFilter]=useState('Active')
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

  const [startDate, setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  

 
  

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
      setOpen(false);
  };
  const handleSubmit = async(e) => {
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
    
  }
      };
    
      //filter stuff
    const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }

    return (
    <div className='taskpage'>
      <Paper square={false} elevation={20} sx={{margin:'10px',bgcolor:'#d2cecc',borderRadius: 5,paddingBottom:'5px'}}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}><IconButton onClick={handleOpenTaskCreateModal} color= 'secondary'><AddCircleIcon sx={{
          fontSize:'20px'
        }}/></IconButton>
      Add a Task</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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
       </Dialog>
       </div>
       </Paper>
      </div>
  )
}
