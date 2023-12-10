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



export default function ProjectItem({project,user,resource,setProjectAdded,projectAdded,projectProgress,setTaskUpdateWatch,taskUpdateWatch}) {

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
  };
  const handleStatusClick =async (e)=>{
    e.preventDefault();
        let body = {
        projStatus:e.currentTarget.value,
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

  
   
  return (
    <>
      
    <div>

    <Box sx={{fontSize:'20px',fontWeight:'medium',padding:'4px'}} >
      
      <div className='projectItem' onClick ={handleClick}>
        <div style={{width:'300px',display:'flex',flexDirection:'row',alignItems:'center'}}>
        {utils.logoSelect(project.projDivision)}&nbsp;
        <Tooltip title="Project information"><IconButton size='small' onClick={showDescription}><InfoIcon color='secondary'/></IconButton></Tooltip>&nbsp;
        {project.projName}
        </div>
    
         <div style={{width:'150px',display:'flex', alignItems:'center'}}>
          {project.projStatus} <IconButton  onClick={handleStatusMenuClick}><EditIcon sx={{fontSize:'20px'}}/></IconButton>
          </div>&emsp;
        {utils.shortDate(project.projTargetEndDate)}&emsp;
        {utils.calcDaysRemain(project.projTargetEndDate)<0?<div style={{ backgroundColor: '#d28b89',color:'#921515', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Overdue:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)*-1} days&emsp;</div>:
        <div style={{ backgroundColor: '#a2da9c',color:'#006400', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Remaining:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)} days&emsp;</div>
        }
        {resource==='auditProj'?<div>&emsp;{project.projOwner.fullName}</div>:null}
        {user.authLevel==="superadmin" || user.authLevel==="admin"|| user.projOwner===user.id?<Button onClick={()=>setOpen(true)}>Edit</Button> 
        :null} 


<div >
  {/* {getProjectProgress()} */}
  <LinearProgress sx={{width:'100px'}}variant='determinate' value={getProjectProgress()}  />
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
        {utils.taskStatusEnums().map(status=><Button onClick={handleStatusClick} value= {status}>{status}</Button>)}
      
        </Stack>
      </Menu>
          </>
  )
}
