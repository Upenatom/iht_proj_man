import { useState,useEffect} from "react";
import './ProjectItem.css'
import * as utils from '../../resources/utils/utils'
import InfoIcon from '@mui/icons-material/Info';
import Tasks from '../Tasks/Tasks'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import EditProject from '../Modals/EditProject/EditProject'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';


export default function ProjectItem({project,user,resource,setProjectAdded,projectAdded,setTaskUpdateWatch,taskUpdateWatch}) {

  //editproject modal stuff

  const [open, setOpen] = useState(false)
 
  
  useEffect(()=>{},[taskUpdateWatch])

  const [taskShow,setTaskShow] =useState(false)
  let handleClick = ()=>{
      setTaskShow(!taskShow)
           
  }
  
  //project info pop up
  const [descShow, setDescShow]=useState(false)

  const showDescription=()=>{
    setDescShow(true)
  }
  const closeDescription=()=>{
    setDescShow(false)
  }

  //edit status menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openEditStatus = Boolean(anchorEl);
  const handleStatusMenuClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };
  const handleStatusEditClose = () => {
    setAnchorEl(null);
    console.log(project)
  };
  const handleStatusClick =async (e)=>{
    e.preventDefault();
        let body = {
        projStatus:e.currentTarget.value,
        projOwner:user._id
        }
       let options=utils.putBuilder(body)
       try{
        
        const fetchResponse = await fetch(`/api/projects/update/${project._id}`, options)
        if(!fetchResponse.ok)
        { throw new Error('Fetch failed - Bad Request')}

        setProjectAdded(!projectAdded)
        handleStatusEditClose()}
        catch(err){
          console.log(err)
        }
    
  }
  //project progress bar
    const getProjectProgress=()=>{
   
      let percentCompleted
      if (project.projTasks.length){
      
     const totalTasks = project.projTasks.filter((item)=>
      {if(item.taskStatus==="In Progress" ||
    item.taskStatus==="Not Started" || item.taskStatus==="Completed"){
      return true
    }
    }).length
    
     const completedTasks=project.projTasks.filter((item)=>{if(item.taskStatus==='Completed'){
      return true
     }
    }).length
     percentCompleted = Math.round(completedTasks/totalTasks*100)
    
    }else{
      percentCompleted=0
    }

    return (percentCompleted)
  }

  const statusIndicator =()=>{
    
    if (project.projStatus=== 'Completed'){
      return(<div style={{ backgroundColor: '#76ff03',color:'#33691e',paddingLeft:'10px',paddingRight:'10px'}}>COMPLETED</div>)
    }
    else if (project.projStatus=== 'Paused'){
      return(<div style={{ backgroundColor: '#fff176',color:'black',paddingLeft:'10px',paddingRight:'10px'}}>PAUSED</div>)
    }
     else if (project.projStatus=== 'Cancelled'){
      return(<div style={{ backgroundColor: '#212121',color:'white',paddingLeft:'10px',paddingRight:'10px'}}>CANCELLED</div>)
    }else if (project.projStatus=== 'In Progress'){
      if(utils.calcDaysRemain(project.projTargetEndDate)<0){
        return(<div style={{ border:'solid 3px #921515',backgroundColor: '#d28b89',color:'#921515', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Overdue:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)*-1} days&emsp;</div>)
      }
      else return(<div style={{ border:'solid 3px #006400',backgroundColor: '#a2da9c',color:'#006400', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Remaining:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)} days&emsp;</div>)
      
    }else if (project.projStatus=== 'Not Started'){
      return(<div style={{ backgroundColor: '#757575',color:'white',paddingLeft:'10px',paddingRight:'10px'}}>NOT STARTED</div>)
    }
    
    }

  
   
  return (
    <>
      
    <div>

    <Box sx={{fontSize:'20px',fontWeight:'medium',padding:'4px'}} >
      
      <div className='projectItem' onClick ={handleClick}>
        <div style={{width:'300px',display:'flex',flexDirection:'row',alignItems:'center'}}>
        {utils.logoSelect(project.projDivision)}&nbsp;
        <Tooltip title="Project information"><IconButton sx={{margin:'5px',padding:'5px',boxShadow: 4}} size='small' onClick={showDescription}><InfoIcon color='secondary'/></IconButton></Tooltip>&nbsp;
        {project.projName}
        </div>
    
         <div style={{width:'150px',display:'flex', alignItems:'center'}}>
          {project.projStatus} <IconButton sx={{margin:'5px',padding:'5px',boxShadow: 4}}  onClick={handleStatusMenuClick}><EditIcon sx={{fontSize:'20px'}}/></IconButton>
          </div>&emsp;
        {utils.shortDate(project.projTargetEndDate)}&emsp;

        {statusIndicator()}


        {resource==='auditProj'?<div className='projOwner' >&emsp;{project.projOwner.fullName}</div>:null}
        {user.authLevel==="superadmin" || user.authLevel==="admin"|| project.projOwner===user.id?
        <Button 
        variant="contained"
        sx={{height:'40%'}}
        onClick={()=>setOpen(true)}
        
        >Edit</Button> 
        :null} 


<div>
  
  
    <div style={{display:'flex', alignItems:'center' }}>
  <LinearProgress className="progress-bar"  sx={{width:'100px',height:'20px',backgroundColor:'inherit',
  border:'2px solid #6a7d88',
  borderRadius:'7px',
  "& .MuiLinearProgress-bar":
  {background: 'linear-gradient(#3ca636,#7fcc7b,#3ca636)',
 borderRadius:'4px'}
 
     }}variant='determinate' value={getProjectProgress()}  />
  <Typography
          style={{
               
            color: "black",
            transform: "translateX(-66px)",
          }}
        >
  {getProjectProgress()}%
  </Typography>
  </div>
  
  
  </div>

  



<Dialog
        open={descShow}
        onClose={closeDescription}>
           <DialogTitle>Project: {project.projName}</DialogTitle>
            <DialogContent>
          <DialogContentText>
           <h4>Description:</h4>
           {project.projDescription}
            <h4>Requirements:</h4>
           {project.projRequirements.map(requirement=><div>-&nbsp;{requirement}</div>)}
          </DialogContentText>
        </DialogContent>
        </Dialog>

      </div>

      
     
    </Box>
    <EditProject 
    open={open}
    setOpen={setOpen}
    projectAdded={projectAdded}
    setProjectAdded={setProjectAdded}
    user={user}
    project={project}
    />
    

      {taskShow?<Tasks 
      
      project={project}
      user={user}
      taskUpdateWatch={taskUpdateWatch}
      setTaskUpdateWatch={setTaskUpdateWatch}/>:null}
  
      
      </div>
  <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openEditStatus}
        onClose={handleStatusEditClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      ><Stack spacing ={1}>
        {utils.taskStatusEnums().map(status=><Button onClick={handleStatusClick} key={status}value= {status}>{status}</Button>)}
      
        </Stack>
      </Menu>
          </>
  )
}
