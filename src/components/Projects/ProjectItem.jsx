import { useState} from "react";
import './ProjectItem.css'
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



export default function ProjectItem({project,user,resource}) {

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

 
  
  return (
    <>
      
    <div>

    <Box sx={{fontSize:'20px',fontWeight:'medium',padding:'4px'}} >
      
      <div className='projectItem' onClick ={handleClick}>
        <div style={{width:'300px',display:'flex',flexDirection:'row',alignItems:'center'}}>
        {utils.logoSelect(project.projDivision)}&nbsp;
        <IconButton size='small' onClick={showDescription}><InfoIcon color='secondary'/></IconButton>&nbsp;
        {project.projName}
        </div>
    
         <div style={{width:'105px',}}>
          {project.projStatus}
          </div>&emsp;
        {utils.shortDate(project.projTargetEndDate)}&emsp;
        {utils.calcDaysRemain(project.projTargetEndDate)<0?<div style={{ backgroundColor: '#d28b89',color:'#921515', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Overdue:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)*-1} days&emsp;</div>:
        <div style={{ backgroundColor: '#a2da9c',color:'#006400', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Remaining:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)} days&emsp;</div>
        }
        {resource==='auditProj'?<div>&emsp;{project.projOwner.fullName}</div>:null}

<Dialog
        open={descShow}
        onClose={closeDescription}>
           <DialogTitle>Project Description and requirements</DialogTitle>
            <DialogContent>
          <DialogContentText>
           {project.projDescription}
          </DialogContentText>
        </DialogContent>
        </Dialog>

      </div>

      
     
    </Box>
      {taskShow?<Tasks project={project}user={user}/>:null}
      
      </div>
          </>
  )
}
