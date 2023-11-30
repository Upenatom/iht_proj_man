import { useState} from "react";
//component imports
import {ReactComponent as IhtHeatingLogo} from '../../../resources/logo/iht-heating-avatar-gradient.svg'
import {ReactComponent as IhtCoolingLogo} from '../../../resources/logo/iht-cooling-avatar-gradient.svg'
import {ReactComponent as IhtGroupLogo} from '../../../resources/logo/iht-group-avatar-gradient.svg'
import {ReactComponent as IhtLightingLogo} from '../../../resources/logo/iht-lighting-avatar-colour.svg'
//import Material UI Icon

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
import Box from '@mui/material/Box';



export default function CreateProject({open,projectAdded,setProjectAdded,setOpen,projInfo,setprojInfo,user,startDate,setStartDate,endDate,setEndDate}) {


    const handleChange= (e)=>{
    setprojInfo({...projInfo,[e.target.name]:e.target.value})
  }
    
  const handleClose = () => {

    setprojInfo({...projInfo,projName:"",
        projStatus:"Not Started",
        projDivision:"",
        projDescription:"",
        projDepartment:user.department,
      })
      setOpen(false);
      setReqArray([])
  };

  const [ongoing,setOngoing] = useState(false)
  const handleOngoingChange = ()=>{setOngoing(!ongoing)}

  const handleSubmit = async(e) => {
    e.preventDefault();
    let body = { ...projInfo, 
      projStartDate:startDate,
        projTargetEndDate:endDate,
        projRequirements:reqArray
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
        const fetchResponse = await fetch('/api/projects/create', options)
    if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
    setprojInfo({...projInfo,projName:"",
        projDivision:"",
        projStartDate:startDate,
        projTargetEndDate:endDate,
        projDescription:"",})
        setOpen(false)
        setProjectAdded(!projectAdded)
        setReqArray([])
      }
   catch(err){
    console.log(err)
    console.log ("Project Creation error");
    
  }
      };

    const [reqArray,setReqArray]=useState([])
    const [requirement,setRequirement]=useState('')
    const handleReqChange=(e)=>{
      setRequirement(e.target.value)
    }
    const pushToArray=()=>{
      setReqArray([...reqArray,requirement])
      setRequirement('')
    }

    const delreq=(e)=>{
      reqArray.splice(e.currentTarget.name,1)
      setReqArray([...reqArray])
    }
  return (
    <div>
        <Dialog open={open} 
         onClose={handleClose}
         fullScreen
         >
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
           <FormControl fullWidth>
             <InputLabel>Add Requirement</InputLabel>
              <OutlinedInput label="Add Requirement" value={requirement} onChange={handleReqChange}/>
              <Button variant='contained' onClick={pushToArray}>Add</Button>
           </FormControl>
          {reqArray.length? <Box  sx={{ p: 2, border: '5px solid grey',borderRadius:'10px' }}>
           <span style={{fontSize:'18px',fontWeight:'bold',textDecoration:'underline'}}>Project Requirements (click requirement to delete):</span>
         {reqArray.map(ele=><Button fullWidth name={reqArray.indexOf(ele)}onClick={delreq} sx={{display:'flex',alignItems:'center',justifyContent:'flex-start', "&:hover":{textDecoration:'line-through',color:'red'}}}>

         {ele}</Button>)}
         </Box>:null}
        </Stack>
         </DialogContent>
         <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Save Project</Button>
        </DialogActions>
       </Dialog>
    </div>
  )
}
