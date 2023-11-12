import { useState} from "react";
import './ProjectItem.css'
import * as utils from '../../resources/utils/utils'
import InfoIcon from '@mui/icons-material/Info';
import Tasks from '../Tasks/Tasks'
import Box from '@mui/material/Box'
export default function ProjectItem({project,user}) {
  const [taskShow,setTaskShow] =useState(false)
  let handleClick = (e)=>{
  setTaskShow(!taskShow)
  
  }
  return (
    <>
    <Box sx={{fontSize:'20px',fontWeight:'medium'}} >
      <div className='projectItem' onClick ={handleClick}>
        {utils.logoSelect(project.projDivision)}&emsp;
        {project.projName}
        <InfoIcon color='secondary'fontSize='inherit'/>&emsp;
        {project.projStatus}&emsp;
        Deadline:&nbsp;{utils.shortDate(project.projTargetEndDate)}&emsp;
        {utils.calcDaysRemain(project.projTargetEndDate)<0?<div style={{ backgroundColor: '#d28b89',color:'#921515', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Overdue:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)*-1} days</div>:
        <div style={{ backgroundColor: '#a2da9c',color:'#006400', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Remaining:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)} days</div>
        }
              
      </div>
    </Box>
    
      {taskShow?<Tasks project={project}user={user}/>:null}
      </>
  )
}
