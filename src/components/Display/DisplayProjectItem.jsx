import { useState,useEffect} from "react";
import './DisplayProjectItem.css'
import * as utils from '../../resources/utils/utils'
import InfoIcon from '@mui/icons-material/Info';
import Tasks from '../Tasks/Tasks'
import Box from '@mui/material/Box'

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Tooltip from '@mui/material/Tooltip';
import EditProject from '../Modals/EditProject/EditProject'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';


export default function ProjectItem({project,user,resource,setProjectAdded,projectAdded,setTaskUpdateWatch,taskUpdateWatch}) {

  //editproject modal stuff

  const [open, setOpen] = useState(false)
 
  
  useEffect(()=>{},[taskUpdateWatch])

  const [taskShow,setTaskShow] =useState(false)
  // let handleClick = ()=>{
  //     setTaskShow(!taskShow)
     
      
  // }


  
  //project info pop up
  const [descShow, setDescShow]=useState(false)

  const showDescription=()=>{
    setDescShow(true)
  }
  const closeDescription=()=>{
    setDescShow(false)
  }

  //edit status menu
  
  
  
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

  
   
  return (
    <>
      
    <div>

    <Box sx={{fontSize:'20px',fontWeight:'medium',padding:'4px'}} >
      
      <div className='displayprojectItem' 
      // onClick ={handleClick}
      >
        
        <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bolder',justifyContent:'center',fontSize:'25px',color:'#363455'}}>
        {utils.logoSelect(project.projDivision)}&nbsp;&nbsp;
        
       {project.projName}&nbsp;<Tooltip title="Project information"><IconButton size='small' onClick={showDescription}><InfoIcon color='secondary'/></IconButton></Tooltip>
        </div>
         {utils.calcDaysRemain(project.projTargetEndDate)<0?<div style={{ backgroundColor: '#d28b89',color:'#921515', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Overdue:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)*-1} days</div>:
        <div style={{ backgroundColor: '#a2da9c',color:'#006400', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Remaining:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)} days</div>
        }
        <div className='projOwner' >  <span style={{fontWeight:'bold'}}>Project Lead:</span>&nbsp;{project.projOwner.fullName}</div>
    
         <div style={{width:'100%',display:'flex', alignItems:'center',justifyContent:'center'}}>
          <span style={{fontWeight:'bold'}}>Status:</span>&nbsp;{project.projStatus} 
          </div>
          <div style={{display:'flex', alignItems:'center',justifyContent:'center',width:'50%' }}>
  <LinearProgress className="progress-bar"  sx={{width:'80%',height:'20px',backgroundColor:'inherit',
  border:'2px solid #6a7d88',
  borderRadius:'7px',
  "& .MuiLinearProgress-bar":
  {background: 'linear-gradient(#3ca636,#7fcc7b,#3ca636)',
 borderRadius:'4px'}
 
     }}variant='determinate' value={getProjectProgress()}  />
  &nbsp;
  <span style={{fontWeight:'bold'}}>{getProjectProgress()}%</span>
  </div>
       <div><span style={{fontWeight:'bold'}}>Due:</span>&nbsp;{utils.shortDate(project.projTargetEndDate)}</div>
       
    
       


<div >
  
  
    
  
  
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
  
          </>
  )
}
