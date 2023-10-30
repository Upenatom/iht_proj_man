import { useState} from "react";
import './ProjectItem.css'
import * as utils from '../../resources/utils/utils'
import InfoIcon from '@mui/icons-material/Info';
import Tasks from '../Tasks/Tasks'
export default function ProjectItem({project,user}) {
  const [taskShow,setTaskShow] =useState(false)
  let handleClick = (e)=>{
  setTaskShow(!taskShow)
  
  }
  return (
    <div >
      <ul className='projectItem' onClick ={handleClick}>
        <li>{utils.logoSelect(project.projDivision)}</li>
        <li>{project.projName}</li>
        <li><InfoIcon color='secondary'fontSize='inherit'/></li>
        <li>{project.projStatus}</li>
              
      </ul>
      {taskShow?<Tasks project={project}user={user}/>:null}
    </div>
  )
}
