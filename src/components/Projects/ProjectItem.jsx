import { useState} from "react";
import './ProjectItem.css'
import * as utils from '../../resources/utils/utils'
import InfoIcon from '@mui/icons-material/Info';
import Tasks from '../Tasks/Tasks'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'



export default function ProjectItem({project,user}) {
  const [taskShow,setTaskShow] =useState(false)
  let handleClick = ()=>{
      setTaskShow(!taskShow)
  }

 
  
  return (
    <>
    
    <div>
    <Box sx={{fontSize:'20px',fontWeight:'medium',padding:'4px'}} >
      
      <div className='projectItem' onClick ={handleClick}>
        <div style={{width:'300px',display:'flex'}}>
        {utils.logoSelect(project.projDivision)}&nbsp;
        <InfoIcon color='secondary'fontSize='inherit'/>&nbsp;
        {project.projName}
        </div>
    
         <div style={{width:'105px',}}>
          {project.projStatus}
          </div>&emsp;
        {utils.shortDate(project.projTargetEndDate)}&emsp;
        {utils.calcDaysRemain(project.projTargetEndDate)<0?<div style={{ backgroundColor: '#d28b89',color:'#921515', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Overdue:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)*-1} days</div>:
        <div style={{ backgroundColor: '#a2da9c',color:'#006400', borderRadius:'10px', paddingLeft:'10px',paddingRight:'10px'}}>Remaining:&nbsp;{utils.calcDaysRemain(project.projTargetEndDate)} days</div>
        }
              
      </div>
      
     
    </Box>
      {taskShow?<Tasks project={project}user={user}/>:null}
      </div>
          </>
  )
}
