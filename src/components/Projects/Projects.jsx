import { useState, useEffect} from "react";
import ProjectList from '../ProjectList/ProjectList'
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader'
import CreateProject from'../Modals/CreateProject/CreateProject'
import './Projects.css'
import * as fetches from '../../resources/utils/fetches'
//component imports
import {ReactComponent as IhtHeatingLogo} from '../../resources/logo/iht-heating-avatar-gradient.svg'
import {ReactComponent as IhtCoolingLogo} from '../../resources/logo/iht-cooling-avatar-gradient.svg'
import {ReactComponent as IhtGroupLogo} from '../../resources/logo/iht-group-avatar-gradient.svg'
import {ReactComponent as IhtLightingLogo} from '../../resources/logo/iht-lighting-avatar-colour.svg'
//import Material UI Icon
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
   
export default function Projects({user,resource}) {
  const[myProjects,setMyProjects]=useState([])
  const[projectAdded,setProjectAdded]=useState(false)
   
  //fetch projects on mount
  useEffect(()=>{
    const fetchMyProjects = async () =>{
      try {
    let jwt = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    const fetchResponse = await fetch("/api/projects/myProjects", options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let myprojects = await fetchResponse.json();

    setMyProjects(myprojects)
  } catch (err) {
    console.log(err);
    console.log("My Project fetch failed");
  }
  }
fetchMyProjects()
    },[projectAdded])

  const [startDate, setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  
  // const [ongoing,setOngoing] = useState(false)
  // const handleOngoingChange = ()=>{setOngoing(!ongoing)}
  
  const[projInfo,setprojInfo]=useState({
    projName:"",
    projDivision:"",
    projStartDate:startDate,
    projTargetEndDate:endDate,
    projDescription:"",
    
  })
  // const handleChange= (e)=>{
  //   setprojInfo({...projInfo,[e.target.name]:e.target.value})
  // }
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {

  //   setprojInfo({...projInfo,projName:"",
  //       projStatus:"Not Started",
  //       projDivision:"",
  //       projDescription:"",
  //       projDepartment:user.department,
  //     })
  //     setOpen(false);
  // };
  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   let body = { ...projInfo, 
  //     projStartDate:startDate,
  //       projTargetEndDate:endDate
  //     }
  //   let jwt = localStorage.getItem('token')
  //   try{
  //   const options = {
  //           method: "POST",
  //           headers: {
  //               "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
  //           },
  //           body: JSON.stringify(body)
  //       }
  //       const fetchResponse = await fetch('/api/projects/create', options)
  //   if(!fetchResponse.ok)
  //   { throw new Error('Fetch failed - Bad Request')}
  //   setprojInfo({...projInfo,projName:"",
  //       projDivision:"",
  //       projStartDate:startDate,
  //       projTargetEndDate:endDate,
  //       projDescription:"",})
  //       setOpen(false)
  //       setProjectAdded(!projectAdded)
  //     }
  //  catch(err){
  //   console.log(err)
  //   console.log ("Project Creation error");
    
  // }
  //     };

  return (
    <div className="projectspage">
      <ProjectHeader handleClickOpen={handleClickOpen} />
      <ProjectList user={user} myProjects={myProjects} resource={resource}/>

      <div className='.modal'>

        <CreateProject
        open={open}
        projectAdded={projectAdded}
        setProjectAdded={setProjectAdded}
        setOpen={setOpen}
        projInfo={projInfo}
        setprojInfo={setprojInfo}
        user={user}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}/>

       {/* <Dialog open={open} 
         onClose={handleClose}>
         <DialogTitle>Create Project</DialogTitle>
         <DialogContent>
          <DialogContentText>
            Enter the details of your project
          </DialogContentText>
          <Stack spacing={2}>
          
          <FormControl fullWidth>
            <InputLabel>Project Name</InputLabel>
            <OutlinedInput label="Project Name" name='projName' value={projInfo.projName} onChange={handleChange}/>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
                label="Division"
                name='projDivision'
                value={projInfo.projDivision}
                onChange={handleChange}
               >
                 <MenuItem  value=""></MenuItem>
                <MenuItem   value="IHTgroup"><IhtGroupLogo style ={{height:'20px', width:'20px'}}/>&nbsp;IHT Group</MenuItem>
                <MenuItem value="IHTheating"><IhtHeatingLogo style ={{height:'20px', width:'20px'}}/>&nbsp;IHT Heating</MenuItem>
                <MenuItem value="IHTcooling"><IhtCoolingLogo style ={{height:'20px', width:'20px'}}/>&nbsp;IHT Cooling</MenuItem>
                <MenuItem value="IHTlighting"><IhtLightingLogo style ={{height:'20px', width:'20px'}}/>&nbsp;IHT Lighting</MenuItem>
                <MenuItem value="IHTplastic">IHT Plastics</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl>
             <TextField
          id="Project Description"
          label="Project Description"
          name = 'projDescription'
          onChange={handleChange}
          value = {projInfo.projDescription}
          multiline
          rows={4}
          
        />
          </FormControl>
          <FormControlLabel
      control={<Switch onChange={handleOngoingChange}/>} label='Ongoing?' 
  />
          <FormControl fullWidth>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
         <DatePicker
          label="Start Date"
          name='projStartDate'
          value={projInfo.projStartDate}
          onChange={(newValue) => setStartDate(newValue)}
          
          />
          {ongoing?null:
        <DatePicker
          label="Target End Date"
          name='projTargetEndDate'
          value={projInfo.projTargetEndDate}
          onChange={(newValue) => setEndDate(newValue)}
        />}
      </DemoContainer>
    </LocalizationProvider>
          </FormControl>
        </Stack>
         </DialogContent>
         <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Save Project</Button>
        </DialogActions>
       </Dialog> */}
       </div>
          
      </div>
  )
}
